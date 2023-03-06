import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext } from 'next';
import { Card, Center, Stack, Text } from '@mantine/core';
import { Layout } from '../../../layouts';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useAuth } from '../../../lib/auth';
import NotesTable from '../components/NotesTable';

NotesPage.getLayout = function getLayout(page: any) {
	return <Layout variant={'user'}>{page}</Layout>;
};

export default function NotesPage({ user }: any) {
	const { authToken } = useAuth();
	const {
		isLoading: isLoadingRecords,
		error,
		data: notes,
	} = useQuery(
		'myNotes',
		async () => {
			const { data } = await axios.post(`/api/notes/${user.user_metadata.id}`, {
				token: authToken,
				id: user.user_metadata.id,
				email: user.email,
			});
			return data;
		},
		{
			enabled: !!authToken,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			cacheTime: 300000,
		}
	);

	return (
		<div style={{ width: '80vw' }}>
			<Card>
				<Center>
					<Stack
						sx={() => ({
							display: 'flex',
							maxWidth: '900px',
							height: '500px',
							flexDirection: 'column',
							justifyContent: 'space-evenly',
						})}
					>
						<Text align='center' weight={700} transform='uppercase'>
							My Notes
						</Text>
						{isLoadingRecords && <Text>Loading</Text>}
						{notes && <NotesTable data={notes} />}
					</Stack>
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
