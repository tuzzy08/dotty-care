import {
	Paper,
	createStyles,
	TextInput,
	PasswordInput,
	Button,
	Title,
	Text,
	NativeSelect,
	Container,
	Stack,
} from '@mantine/core';
import { useForm, SubmitHandler } from 'react-hook-form';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { IconAlertTriangle } from '@tabler/icons';
import { useAuth } from '../../../lib/auth/useAuth';
import { useState } from 'react';
import { showNotification } from '@mantine/notifications';

type Inputs = {
	email: string;
	password: string;
	name: string;
	mobile: string;
	accountType: string;
	hospitalName?: string;
	hospitalID?: string;
};

export interface SignupData {
	email: string;
	password: string;
	options: {
		data: {
			id: string;
			accountType: string;
			name: string;
			mobile: string;
			hospitalName?: string;
			hospitalID?: string;
		};
	};
}

const useStyles = createStyles((theme) => ({
	form: {
		minHeight: 660,
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
	const [toggle, setToggle] = useState<boolean>(false);
	const { classes } = useStyles();
	const { signUp } = useAuth();

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
						id: id,
						accountType: form_data.accountType,
						name: form_data.name,
						mobile: form_data.mobile,
						hospitalName: form_data.hospitalName,
					},
				},
			};
			if (form_data.hospitalName === 'acron') {
				signupData.options.data.hospitalID = 'id1';
			} else if (form_data.hospitalName === 'oakheart') {
				signupData.options.data.hospitalID = 'id2';
			} else if (form_data.hospitalName === 'zenith') {
				signupData.options.data.hospitalID = 'id3';
			}
			try {
				const res = await signUp(signupData);
				if (res?.message === 'success') {
					// Call api route to register user
					const { data: token } = await axios.post('/api/auth/signup', {
						id,
						fullname: form_data.name,
						email: form_data.email,
						accountType: form_data.accountType,
					});
					// if (token && setAuthToken) {
					// 	console.log(token);
					// 	// setAuthToken(token);
					// }
				} else if (res?.data.user === null) {
					showNotification({
						title: 'Fast Health',
						message: `${res.message}`,
						color: 'red',
						icon: <IconAlertTriangle />,
						autoClose: 5000,
					});
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	const handleChange = (event: any) => {
		if (event.target.value === 'Hospital') {
			setToggle(true);
		} else {
			setToggle(false);
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
				<Stack spacing={'xl'}>
					<form onSubmit={handleSubmit(handleSignup)}>
						{/* <Group position='center' dir='column'> */}
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
							onChange={handleChange}
						/>
						{toggle ? (
							<NativeSelect
								data={[
									{ value: 'acron', label: 'Acron Hospital' },
									{ value: 'oakheart', label: 'Oakheart Clinic' },
									{ value: 'zenith', label: 'Zenith Hospital' },
								]}
								placeholder='Select Your Hospital'
								label='Hospital'
								required
								{...register('hospitalName')}
							/>
						) : (
							<></>
						)}
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

						{/* <Checkbox label="Keep me logged in" mt="xl" size="md" /> */}

						<Button fullWidth mt='xl' size='md' type='submit'>
							Register
						</Button>
						{/* </Group> */}
					</form>
				</Stack>
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
