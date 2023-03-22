import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext } from 'next';
import { Container, Group, Text } from '@mantine/core';
import { useQuery } from 'react-query';
import axios from 'axios';
import { PageProps } from '../types';
import { Layout } from '../../../layouts';
import ProfileCard from '../../../layouts/components/ProfileCard';
import HospitalList from '../../../layouts/components/HospitalList';
import { useAuth } from '../../../lib/auth';

HospitalsPage.getLayout = function getLayout(page: any) {
	return <Layout variant={'patient'}>{page}</Layout>;
};

export default function HospitalsPage({ user }: PageProps) {
	const { authToken } = useAuth();
	let dataAsObjects;
	const { isLoading, error, data } = useQuery(
		'hospitals',
		async () => {
			const { data } = await axios.post(`/api/hospitals`, {
				token: authToken,
				id: user.user_metadata.id,
				email: user.email,
			});
			return data;
		},
		{
			enabled: !!authToken,
			refetchOnMount: true,
			refetchOnWindowFocus: false,
			// cacheTime: 900000,
		}
	);

	if (data) {
		dataAsObjects = data.response.map((item: string) => JSON.parse(item));
	}

	const { data: res } = useQuery(
		'userObject',
		async () => {
			const { data } = await axios.post(`/api/users/${user.user_metadata.id}`, {
				token: authToken,
				id: user.user_metadata.id,
				email: user.email,
			});

			return data;
		},
		{
			enabled: !!authToken,
			refetchOnMount: true,
			refetchOnWindowFocus: false,
		}
	);

	// }

	return (
		<Container size='xl' py='xl'>
			<Group spacing={50}>
				<ProfileCard
					avatar={``}
					mobile={user.user_metadata.mobile}
					name={user.user_metadata.name}
					email={`${user.email}`}
				/>

				{isLoading && <Text>Loading</Text>}
				{dataAsObjects && res ? (
					<HospitalList
						data={dataAsObjects}
						id={`${user.user_metadata.id}`}
						email={user.email}
						permissions={res.permissions}
					/>
				) : null}
			</Group>
		</Container>
	);
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	// Create authenticated Supabase Client
	const supabase = createServerSupabaseClient(ctx);
	// Check if we have a session
	const {
		data: { session },
	} = await supabase.auth.getSession();

	// console.log('cookies');
	// console.log(ctx.req.cookies);

	if (!session)
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};

	return {
		props: {
			initialSession: session,
			user: session.user,
		},
	};
};
