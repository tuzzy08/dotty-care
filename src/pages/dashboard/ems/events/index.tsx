import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Card, Text } from '@mantine/core';
import {} from '@tabler/icons';
import { GetServerSidePropsContext } from 'next';
import { Layout } from '../../../../layouts';
import NotesList from '../../components/NotesTable';
import { PageProps } from '../../types';
import { useQuery } from 'react-query';
import axios from 'axios';

EventsList.getLayout = function getLayout(page: any) {
	return <Layout variant={'ems'}>{page}</Layout>;
};

export default function EventsList({ user }: PageProps) {
	const { isLoading, error, data } = useQuery('myNotes', async () => {
		const { data } = await axios.post(`/api/notes/${user.user_metadata.id}`, {
			id: user.user_metadata.id,
			email: user.email,
		});
		return data;
	});
	if (data) {
		console.log(data.response);
	}

	return (
		<>
			<Card
				shadow='sm'
				// style={{ overflow: 'scroll' }}
				radius={'md'}
				p='md'
				w='800px'
				mah={600}
				withBorder
				mt='xs'
			>
				{isLoading && <Text>Loading</Text>}
				{data && <NotesList list={data.response} />}
			</Card>
		</>
	);
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	// Create authenticated Supabase Client
	const supabase = createServerSupabaseClient(ctx);
	// Check if we have a session
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session || session.user.user_metadata.accountType !== 'Ems')
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
