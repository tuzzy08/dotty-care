import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext } from 'next';
import { Container, Group } from '@mantine/core';
import { useQuery } from 'react-query';
import axios from 'axios';
import { PageProps } from '../types';
import { Layout } from '../../../layouts';
import { RecordsTable } from '../components/RecordsTable';
import ProfileCard from '../../../layouts/components/ProfileCard';
import { useAuth } from '../../../lib/auth/useAuth';

IndexPage.getLayout = function getLayout(page: any) {
	return <Layout variant={'patient'}>{page}</Layout>;
};

export default function IndexPage({ user }: PageProps) {
	const { authToken, permissions, setPermissions } = useAuth();
	console.log('Auth Token');
	console.log(authToken);
	if (authToken) {
		const {
			isLoading,
			error,
			data: records,
		} = useQuery(
			'myRecords',
			async () => {
				const { data } = await axios.post(
					`/api/records/${user.user_metadata.id}`,
					{
						token: authToken,
						id: user.user_metadata.id,
						email: user.email,
					}
				);
				return data;
			},
			{
				enabled: !!authToken,
			}
		);
		console.log('Records');
		console.log(records);
		// if (data) {
		// 	console.log('records list');
		// 	console.log(data);
		// }
	}

	if (authToken) {
		const { data } = useQuery(
			'userObject',
			async () => {
				const { data } = await axios.post(
					`/api/users/${user.user_metadata.id}`,
					{
						token: authToken,
						id: user.user_metadata.id,
						email: user.email,
					}
				);

				return data;
			},
			{
				enabled: !!authToken,
			}
		);
		if (data) {
			console.log('User Object');
			console.log(data);
			if (setPermissions) setPermissions(data.permissions);
		}
	}

	return (
		<Container size='xl' py='xl'>
			<Group spacing={50}>
				<ProfileCard
					avatar={``}
					mobile={user.user_metadata.mobile}
					name={user.user_metadata.name}
					email={`${user.email}`}
				/>
				<RecordsTable data={[]} />
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
