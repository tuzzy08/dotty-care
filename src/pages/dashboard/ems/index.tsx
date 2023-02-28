import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import {
	Badge,
	Box,
	Button,
	Card,
	Center,
	Checkbox,
	Flex,
	Group,
	Stack,
	Table,
	Text,
	TextInput,
} from '@mantine/core';
import {} from '@tabler/icons';
import { GetServerSidePropsContext } from 'next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Layout } from '../../../layouts';
import axios from 'axios';
import { useAuth } from '../../../lib/auth';
import { PageProps } from '../types';
import { useQuery } from 'react-query';

type Inputs = {
	patientID: string;
};

NewEventPage.getLayout = function getLayout(page: any) {
	return <Layout variant={'ems'}>{page}</Layout>;
};

export default function NewEventPage({ user }: PageProps) {
	const [patientInfo, setpatientInfo] = useState<any | null>(null);
	const { authToken } = useAuth();
	// Get Notes
	// if (authToken) {
	const { isLoading, error, data } = useQuery('myNotes', async () => {
		const { data } = await axios.post(`/api/notes/${user.user_metadata.id}`, {
			// token: authToken,
			id: user.user_metadata.id,
			email: user.email,
		});
		return data;
	});

	// }

	const handleSignup: SubmitHandler<Inputs> = async (form_data) => {
		const { data } = await axios.post(`/api/users/${form_data.patientID}`, {
			token: authToken,
			id: user.user_metadata.id,
			email: user.email,
		});
		setpatientInfo(data);
	};
	// dynamic import
	const Rte = useMemo(
		() =>
			dynamic(
				() => import('@mantine/rte').then((RichTextEditor) => RichTextEditor),
				{ ssr: false }
			),
		[]
	);
	const initialValue = '<p>Create a new  <b>note</b>.</p>';
	const [value, onChange] = useState(initialValue);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const onFormSubmit: SubmitHandler<Inputs> = async (form_data) => {
		try {
			console.log(form_data);
		} catch (error) {
			console.log(error);
		}
	};

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
			{/* <Flex
				// sx={() => ({
				// 	display: 'flex',
				// 	flexDirection: 'column',
				// 	width: '60vw',
				// 	justifyContent: 'center',
				// 	alignItems: 'center',
				// })}
				w={'60vw'}
				direction='column'
				justify={'center'}
				align={'center'}
			> */}
			{/* <Center> */}

			<Card
				shadow='sm'
				// style={{ overflow: 'scroll' }}
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
				<form onSubmit={handleSubmit(handleSignup)}>
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
									<Button variant='outline'>Create Record</Button>
								</td>
							</tr>
						) : (
							<></>
						)}
					</tbody>
					{/* {...rows} */}
				</Table>
			</Card>
			{/* </Center> */}
			{/* </Flex> */}
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
