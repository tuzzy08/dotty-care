import { useState } from 'react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import {
	Badge,
	Button,
	Card,
	Flex,
	Group,
	Modal,
	Stack,
	Table,
	Text,
	TextInput,
	useMantineTheme,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconError404 } from '@tabler/icons';
import { GetServerSidePropsContext } from 'next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Layout } from '../../../layouts';
import axios from 'axios';
import { useAuth } from '../../../lib/auth';
import { PageProps } from '../types';
import Record from '../components/Record';
import { RecordsTable } from '../components/RecordsTable';

type Inputs = {
	patientID: string;
};

Index.getLayout = function getLayout(page: any) {
	return <Layout variant={'admin'}>{page}</Layout>;
};

export default function Index({ user }: PageProps) {
	const theme = useMantineTheme();
	const [opened, setOpened] = useState(false);
	const [records, setRecords] = useState(null);
	const [patientInfo, setpatientInfo] = useState<any>('');
	const { authToken } = useAuth();

	const ths = (
		<tr>
			{/* <th>Patient ID</th> */}
			<th>Patient Name</th>
			<th>Email</th>
			<th>Actions</th>
		</tr>
	);

	return (
		<Stack spacing={'xl'}>
			<Modal
				opened={opened}
				size='lg'
				closeButtonLabel='Close Record'
				closeOnEscape={false}
				closeOnClickOutside={false}
				overlayColor={
					theme.colorScheme === 'dark'
						? theme.colors.dark[9]
						: theme.colors.gray[2]
				}
				overlayOpacity={0.55}
				overlayBlur={3}
				onClose={() => setOpened(false)}
				title='Create record'
			>
				<Record
					patientName={`${patientInfo.full_name}`}
					patientID={`${patientInfo.patientID}`}
					hospital={user}
				/>
			</Modal>

			{records && (
				<Card shadow='sm' radius={'md'} p='md' w='700px'>
					<RecordsTable data={records} />
				</Card>
			)}
		</Stack>
	);
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	// Create authenticated Supabase Client
	const supabase = createServerSupabaseClient(ctx);
	// Check if we have a session
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session || session.user.user_metadata.accountType !== 'Admin')
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};

	console.log(session.user);

	return {
		props: {
			initialSession: session,
			user: session.user,
		},
	};
};
