import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext } from 'next';
import {
	Box,
	Button,
	Card,
	Center,
	Container,
	Flex,
	Group,
	Paper,
	Text,
} from '@mantine/core';
import { RecordsTable } from '../components/RecordsTable';
import { Layout } from '../../../layouts';

RecordsPage.getLayout = function getLayout(page: any) {
	return <Layout variant={'user'}>{page}</Layout>;
};

export default function RecordsPage() {
	return (
		// <Box>
		// <Container>
		// <Center>
		<div style={{ width: '80vw' }}>
			<Card
			// shadow='sm'
			// sx={(theme) => ({
			// 	padding: '10px',
			// })}
			>
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
						<RecordsTable data={data} />
					</Box>
				</Center>
			</Card>
		</div>
		// </Center>
		// </Container>
		// </Box>

		// <Group mt={50} position="apart">

		// <Logout />
		// </Group>
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

const data = [
	{
		hospital: 'Athena Weissnat',
		doctor_name: 'Scott - Rippin',
		date_created: '12-12-2023',
	},
	{
		hospital: 'Deangelo Runolfsson',
		doctor_name: 'Greenfelder - Krajcik',
		date_created: '12-12-2023',
	},
	{
		hospital: 'Danny Carter',
		doctor_name: 'Kohler Frank',
		date_created: '12-12-2023',
	},
];
