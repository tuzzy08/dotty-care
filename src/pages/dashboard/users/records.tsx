import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext } from 'next';
import { Box, Card, Center, Text } from '@mantine/core';
import { RecordsTable } from '../components/RecordsTable';
import { Layout } from '../../../layouts';
import { useQuery } from 'react-query';
import axios from 'axios';

RecordsPage.getLayout = function getLayout(page: any) {
	return <Layout variant={'user'}>{page}</Layout>;
};

export default function RecordsPage({ user }: any) {
	const { isLoading, error, data } = useQuery('myRecords', async () => {
		const { data } = await axios.post(`/api/records/${user.user_metadata.id}`, {
			id: user.user_metadata.id,
			email: user.email,
		});
		return data;
	});
	console.log(data);
	return (
		<div style={{ width: '80vw' }}>
			<Card>
				<Center>
					<Box
						sx={() => ({
							display: 'flex',
							maxWidth: '900px',
							height: '500px',
							flexDirection: 'column',
							justifyContent: 'space-evenly',
						})}
					>
						<Text align='center' weight={700} transform='uppercase'>
							My records
						</Text>
						<RecordsTable data={[]} />
					</Box>
				</Center>
			</Card>
		</div>
	);
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	// Create authenticated Supabase Client
	const supabase = createServerSupabaseClient(ctx);
	// Check if we have a session
	const {
		data: { session },
	} = await supabase.auth.getSession();

	console.log('user session');
	console.log(session);

	if (!session || session.user.user_metadata.accountType !== 'Patient')
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
