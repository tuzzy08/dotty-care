import {
	Paper,
	createStyles,
	TextInput,
	PasswordInput,
	Checkbox,
	Button,
	Title,
	Text,
	Anchor,
	NativeSelect,
} from '@mantine/core';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext } from 'next';
import { useSupabaseClient, User, useUser } from '@supabase/auth-helpers-react';
import { useAuth } from '../../../lib/auth/useAuth';

type Inputs = {
	email: string;
	password: string;
};

const useStyles = createStyles((theme) => ({
	wrapper: {
		minHeight: '100vh',
		backgroundSize: 'cover',
		backgroundImage:
			'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
	},

	form: {
		borderRight: `1px solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
		}`,
		// minHeight: '100vh',
		height: 200,
		maxWidth: 450,
		paddingTop: 80,

		[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
			maxWidth: '100%',
		},
	},

	title: {
		color: theme.colorScheme === 'dark' ? theme.white : theme.black,
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
	},

	logo: {
		color: theme.colorScheme === 'dark' ? theme.white : theme.black,
		width: 120,
		display: 'block',
		marginLeft: 'auto',
		marginRight: 'auto',
	},
}));

export default function Auth() {
	const { classes } = useStyles();
	const { signIn } = useAuth();

	//TODO: USE RIGHT INPUT PROP TYPES
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const handleLogin: SubmitHandler<Inputs> = async (form_data) => {
		try {
			console.log(form_data);
			if (signIn) {
				await signIn({
					email: form_data.email,
					password: form_data.password,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className={classes.wrapper}>
			<Paper className={classes.form} radius={0} p={30}>
				<Title
					order={2}
					className={classes.title}
					align='center'
					mt='md'
					mb={50}
				>
					Welcome to Fast Health
				</Title>
				{/* Login Form */}
				<form onSubmit={handleSubmit(handleLogin)}>
					<TextInput
						label='Email address'
						placeholder='hello@gmail.com'
						size='md'
						{...register('email')}
					/>
					<PasswordInput
						label='Password'
						placeholder='Your password'
						mt='md'
						size='md'
						{...register('password')}
					/>
					{/* <Checkbox label="Keep me logged in" mt="xl" size="md" /> */}

					<Button fullWidth mt='xl' size='md' type='submit'>
						Login
					</Button>
				</form>
				<Text align='center' mt='md'>
					Don&apos;t have an account?{' '}
					<Link href='/auth/signup'>
						<Text weight={700}>Register</Text>
					</Link>
				</Text>
			</Paper>
		</div>
	);
}
