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
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { useAuth } from '../../lib/auth/useAuth';

type Inputs = {
	email: string;
	password: string;
	name: string;
	mobile: string;
	accountType: string;
};

const useStyles = createStyles((theme) => ({
	wrapper: {
		minHeight: 900,
		backgroundSize: 'cover',
		backgroundImage:
			'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
	},

	form: {
		borderRight: `1px solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
		}`,
		minHeight: 900,
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

export default function AuthenticationImage() {
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
					<Link href='/'>
						<Text weight={700}>Login</Text>
					</Link>
				</Text>
			</Paper>
		</div>
	);
}
