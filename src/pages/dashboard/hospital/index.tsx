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
	Text,
	TextInput,
} from '@mantine/core';
import {} from '@tabler/icons';
import { GetServerSidePropsContext } from 'next';
import { getCookie } from 'cookies-next';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Layout } from '../../../layouts';

type Inputs = {
	email: string;
	password: string;
};

NewMedicalRecordPage.getLayout = function getLayout(page: any) {
	return <Layout variant={'hospital'}>{page}</Layout>;
};
function getpatientRecord(patient_ID: string) {
	const authToken = getCookie('token');
	if (authToken) {
		const { isLoading, error, data } = useQuery(`${patient_ID}`, async () => {
			const { data } = await axios.post('/api/records', {
				token: authToken,
			});
			return data;
		});
		console.log('hospital list');
		console.log(data);
	}
}

export default function NewMedicalRecordPage() {
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

	return (
		<>
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
				w='600px'
				mah={600}
				withBorder
				mt='xs'
			>
				<Group position='apart' mb='lg'>
					<Text weight={500}>Create medical record</Text>
					<Badge
						variant='gradient'
						gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
					>
						Hospital-ID-Here
					</Badge>
				</Group>
				<form>
					<Stack align='flex-start'>
						<TextInput label='Enter patient ID' placeholder='user-5cbda-2345' />
						<Group
							sx={(theme) => ({
								border: `1px solid ${theme.colors.gray[3]}`,
							})}
							p='md'
						>
							<Checkbox.Group
								defaultValue={['react']}
								label='Some options here'
								// description='This is anonymous'
								withAsterisk
							>
								<Checkbox value='option1' label='Option 1' />
								<Checkbox value='option2' label='Option 2' />
								<Checkbox value='option3' label='Option 3' />
								<Checkbox value='option4' label='Option 4' />
							</Checkbox.Group>
						</Group>
						<Text weight={100}>Enter additional notes</Text>
						<Box style={{ overflow: 'scroll', maxHeight: 250 }}>
							<Rte value={value} onChange={onChange} />
						</Box>
						<Button variant='outline' mt='sm' size='md' type='submit'>
							Submit
						</Button>
					</Stack>
				</form>
			</Card>
			{/* </Center> */}
			{/* </Flex> */}
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
