import {
	Paper,
	createStyles,
	TextInput,
	PasswordInput,
	Checkbox,
	Button,
	Title,
	Text,
	NativeSelect,
	Container,
} from '@mantine/core';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { setCookie } from 'cookies-next';
import { useAuth } from '../../../lib/auth/useAuth';

type Inputs = {
	email: string;
	password: string;
	name: string;
	mobile: string;
	accountType: string;
};

export interface SignupData {
	email: string;
	password: string;
	options: {
		data: {
			accountType: string;
			name: string;
			mobile: string;
			patientID?: string;
			paramedicID?: string;
			hospitalID?: string;
		};
	};
}

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

export default function SignupForm({ setVisibleForm }: any) {
	const { classes } = useStyles();
	const { authToken, setAuthToken, signUp } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	//TODO: USE RIGHT INPUT PROP TYPES
	const handleSignup: SubmitHandler<Inputs> = async (form_data) => {
		const id = `${uuidv4()}`;
		if (signUp) {
			const signupData: SignupData = {
				email: form_data.email,
				password: form_data.password,
				options: {
					data: {
						accountType: form_data.accountType,
						name: form_data.name,
						mobile: form_data.mobile,
					},
				},
			};

			if (form_data.accountType === 'Patient') {
				signupData.options.data.patientID = id;
			} else if (form_data.accountType === 'Hospital') {
				signupData.options.data.hospitalID = id;
			} else if (form_data.accountType === 'Ems') {
				signupData.options.data.paramedicID = id;
			}

			try {
				const data = await signUp(signupData);
				if (
					data !== null &&
					data !== undefined &&
					form_data.accountType === 'Patient'
				) {
					// Call api route to register user
					const { data: token } = await axios.post('/api/auth/signup', {
						id,
						fullname: form_data.name,
						email: form_data.email,
					});
					if (data && setAuthToken) {
						setAuthToken(token);
					}
				}
			} catch (error) {
				console.log(error);
			}
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
					{/* <Group position='center' dir='column'> */}
					<TextInput
						label='Full Name'
						placeholder='First Last Name'
						size='md'
						{...register('name')}
					/>
					<TextInput
						label='Mobile'
						placeholder='234 567 7876'
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
					{/* </Group> */}
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
