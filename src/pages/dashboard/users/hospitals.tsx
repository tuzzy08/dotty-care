import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext } from 'next';
import { Container, Group, Text } from '@mantine/core';
import { getCookie } from 'cookies-next';
import { useQuery } from 'react-query';
import axios from 'axios';
import { PageProps } from '../types';
import { Layout } from '../../../layouts';
import ProfileCard from '../../../layouts/components/ProfileCard';
import HospitalList from '../../../layouts/components/HospitalList';
// import { data } from '../../../layouts/components/mock/hospitals';

HospitalsPage.getLayout = function getLayout(page: any) {
	return <Layout variant={'patient'}>{page}</Layout>;
};

export default function HospitalsPage({ user }: PageProps) {
	const authToken = getCookie('token');
	let dataAsObjects;
	// if (authToken) {
	const { isLoading, error, data } = useQuery('hospitals', async () => {
		const { data } = await axios.post(`/api/hospitals`, {
			token: authToken,
		});
		return data;
	});

	if (data) {
		console.log('hospitals list');
		console.log(data.response);
		dataAsObjects = data.response.map((item: string) => JSON.parse(item));
	}

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
				{/* <HospitalList data={data} /> */}
				{isLoading && <Text>Loading</Text>}
				{dataAsObjects && <HospitalList data={dataAsObjects} />}
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

	console.log('cookies');
	console.log(ctx.req.cookies);

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
