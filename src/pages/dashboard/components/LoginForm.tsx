import {
	Paper,
	createStyles,
	TextInput,
	PasswordInput,
	Button,
	Title,
	Text,
} from '@mantine/core';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { setCookie } from 'cookies-next';
import { useAuth } from '../../../lib/auth/useAuth';

type Inputs = {
	email: string;
	password: string;
};

const useStyles = createStyles((theme) => ({
	form: {
		height: 450,
		width: 500,
		paddingTop: 20,

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

export default function LoginForm({ setVisibleForm }: any) {
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
				const data = await signIn({
					email: form_data.email,
					password: form_data.password,
				});
				if (data && data.user?.app_metadata.accountType === 'Patient') {
					// Call api route to register user or get token
					const { data: token } = await axios.post('/api/auth/login', {
						patientID: data.user?.app_metadata.patientID,
						email: form_data.email,
						password: form_data.password,
					});
					if (token) setCookie('token', token.token);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};
	const changeForm = () => setVisibleForm('signup');
	return (
		<Paper className={classes.form} radius={15} p={30}>
			<Title order={2} className={classes.title} align='center' mt='md' mb={50}>
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
				<Link href='' onClick={changeForm}>
					<Text weight={700}>Register</Text>
				</Link>
			</Text>
		</Paper>
	);
}
