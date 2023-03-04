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
import {} from '@tabler/icons';
import { GetServerSidePropsContext } from 'next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Layout } from '../../../layouts';
import axios from 'axios';
import { useAuth } from '../../../lib/auth';
import { PageProps } from '../types';
import { useQuery } from 'react-query';
import Record from '../components/Record';
import { RecordsTable } from '../components/RecordsTable';

type Inputs = {
	patientID: string;
};

Index.getLayout = function getLayout(page: any) {
	return <Layout variant={'hospital'}>{page}</Layout>;
};

export default function Index({ user }: PageProps) {
	const theme = useMantineTheme();
	const [opened, setOpened] = useState(false);
	const [records, setRecords] = useState(null);
	const [patientInfo, setpatientInfo] = useState<any>('');
	const { authToken } = useAuth();

	async function getRecords(patientID: string, id: string, email?: string) {
		const { data } = await axios.post(`/api/records/${patientID}`, {
			id,
			email,
		});
		console.log(data);
		setRecords(data);
	}

	const searchUser: SubmitHandler<Inputs> = async (form_data) => {
		const { data } = await axios.post(`/api/users/${form_data.patientID}`, {
			token: authToken,
			id: user.user_metadata.id,
			email: user.email,
		});
		data && setpatientInfo(data);
		reset((formValues) => ({
			...formValues,
			patientID: '',
		}));
	};

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const ths = (
		<tr>
			<th>Patient ID</th>
			<th>Patient Name</th>
			{/* <th>Email</th> */}
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
					patient_ID={`${patientInfo.patient_ID}`}
					hospital={user}
					setOpened={setOpened}
					setpatientInfo={setpatientInfo}
				/>
			</Modal>

			<Card
				shadow='sm'
				radius={'md'}
				p='md'
				w='650px'
				mah={600}
				withBorder
				mt='xs'
			>
				<Group position='apart' mb='lg'>
					<Text weight={500}>Search for patient</Text>
					<Badge
						variant='gradient'
						gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
					>
						{`ID: ${user.user_metadata.id}`}
					</Badge>
				</Group>
				<form onSubmit={handleSubmit(searchUser)}>
					<Stack align='flex-start'>
						<TextInput
							label='Enter patient ID'
							placeholder='user-5cbda-2345'
							{...register('patientID')}
						/>

						<Button variant='outline' mt='sm' size='md' type='submit'>
							Submit
						</Button>
					</Stack>
				</form>
			</Card>

			<Card shadow='sm' radius={'md'} p='md' w='700px'>
				<Table highlightOnHover>
					<caption>Patient details</caption>
					<thead>{ths}</thead>
					<tbody>
						{patientInfo ? (
							<tr>
								<td>{patientInfo.patient_ID}</td>
								<td>{patientInfo.full_name}</td>
								{/* <td></td> */}
								<td>
									<Group>
										<Button
											size='xs'
											onClick={() =>
												getRecords(
													patientInfo.patient_ID,
													user.user_metadata.id,
													user.email
												)
											}
											variant='outline'
											color={'teal'}
										>
											Get Records
										</Button>
										<Button
											size='xs'
											onClick={() => setOpened(true)}
											variant='outline'
										>
											Create Record
										</Button>
									</Group>
								</td>
							</tr>
						) : (
							<></>
						)}
					</tbody>
				</Table>
			</Card>
			{records && (
				<Card shadow='sm' radius={'md'} p='md' w='700px'>
					<RecordsTable data={[]} />
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

	if (!session || session.user.user_metadata.accountType !== 'Hospital')
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
