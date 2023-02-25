import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext } from 'next';
import { Container, Group } from '@mantine/core';
import { getCookie } from 'cookies-next';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import axios from 'axios';
import { PageProps } from '../types';
import { Layout } from '../../../layouts';
import { RecordsTable } from '../components/RecordsTable';
import ProfileCard from '../../../layouts/components/ProfileCard';
import { useAuth } from '../../../lib/auth/useAuth';
// import HospitalList from '../../../layouts/components/HospitalList';
// import { data } from '../../../layouts/components/mock/hospitals';

IndexPage.getLayout = function getLayout(page: any) {
	return <Layout variant={'patient'}>{page}</Layout>;
};

export default function IndexPage({ user }: PageProps) {
	// console.log(user);
	// const authToken = getCookie('token');
	const { authToken } = useAuth();
	console.log('Auth Token');
	console.log(authToken);
	if (authToken) {
		const { isLoading, error, data } = useQuery('myRecords', async () => {
			const { data } = await axios.post(
				`/api/records/${user.user_metadata.patientID}`,
				{
					token: authToken,
					patientID: user.user_metadata.patientID,
					email: user.email,
				}
			);
			return data;
		});
		if (data) {
			console.log('records list');
			console.log(data);
		}
	}

	if (authToken) {
		const { data } = useQuery('userObject', async () => {
			const { data } = await axios.post(
				`/api/users/${user.user_metadata.patientID}`,
				{
					token: authToken,
					patientID: user.user_metadata.patientID,
					email: user.email,
				}
			);

			return data;
		});
		if (data) {
			console.log('User Object');
			console.log(data);
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

	// console.log('cookies');
	// console.log(ctx.req.cookies);

	if (!session)
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};

	const patientID = session.user.user_metadata.patientID;
	const email = session.user.email;
	// const queryClient = new QueryClient();
	// await queryClient.prefetchQuery('userObject', async () => {
	// 	const { data } = await axios.post(`/api/users/${patientID}`, {
	// 		patientID,
	// 		email,
	// 	});
	// 	console.log(data);
	// 	return data;
	// });

	return {
		props: {
			initialSession: session,
			user: session.user,
			// dehydratedState: dehydrate(queryClient),
		},
	};
};
