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
	Center,
	Container,
} from '@mantine/core';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { useAuth } from '../../../lib/auth/useAuth';

type Inputs = {
	email: string;
	password: string;
	name: string;
	mobile: string;
	accountType: string;
};

const useStyles = createStyles((theme) => ({
	form: {
		height: 630,
		width: 500,
		// paddingTop: 20,

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

export default function SignupForm({ setVisibleForm }) {
	const { classes } = useStyles();
	const { signUp } = useAuth();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();
	//TODO: USE RIGHT INPUT PROP TYPES
	const handleSignup: SubmitHandler<Inputs> = async (form_data) => {
		console.log(form_data);
		if (signUp) {
			signUp({
				email: form_data.email,
				password: form_data.password,
				options: {
					data: {
						accountType: form_data.accountType,
						name: form_data.name,
						mobile: form_data.mobile,
					},
				},
			});
		}
	};
	const changeForm = () => setVisibleForm('login');
	return (
		<Paper className={classes.form} radius={15} p={20}>
			<Container>
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
				<form onSubmit={handleSubmit(handleSignup)}>
					<TextInput
						label='Full Name'
						placeholder='Enter full name'
						size='md'
						{...register('name')}
					/>
					<TextInput
						label='Mobile'
						placeholder='Enter Mobile no'
						size='md'
						{...register('mobile')}
					/>
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
					<NativeSelect
						data={[
							{ value: 'Patient', label: 'Patient' },
							{ value: 'Hospital', label: 'Hospital' },
							{ value: 'Ems', label: 'Ems' },
						]}
						placeholder='Select Role'
						label='Select your account type'
						required
						{...register('accountType')}
					/>
					{/* <Checkbox label="Keep me logged in" mt="xl" size="md" /> */}

					<Button fullWidth mt='xl' size='md' type='submit'>
						Register
					</Button>
				</form>
				<Text align='center' mt='md'>
					Have an account?{' '}
					<Link href='' onClick={changeForm}>
						<Text weight={700}>Login</Text>
					</Link>
				</Text>
			</Container>
		</Paper>
	);
}
