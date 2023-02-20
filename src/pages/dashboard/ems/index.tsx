import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import {
	Box,
	Button,
	Card,
	Center,
	Flex,
	Group,
	Text,
	TextInput,
} from '@mantine/core';
import {} from '@tabler/icons';
import { GetServerSidePropsContext } from 'next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Layout } from '../../../layouts';

type Inputs = {
	email: string;
	password: string;
};

NewEventPage.getLayout = function getLayout(page: any) {
	return <Layout variant={'ems'}>{page}</Layout>;
};

export default function NewEventPage() {
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
			<Flex
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
			>
				{/* <Center> */}
				<Card shadow='sm' radius={'md'} p='sm'>
					<form>
						<TextInput placeholder='Enter patient ID' />
					</form>
				</Card>
				<Text
					component='span'
					align='center'
					variant='gradient'
					gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
					size='xl'
					weight={700}
					style={{ fontFamily: 'Greycliff CF, sans-serif' }}
				>
					Create New Event
				</Text>
				<Rte value={value} onChange={onChange} />
				{/* </Center> */}
			</Flex>
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
