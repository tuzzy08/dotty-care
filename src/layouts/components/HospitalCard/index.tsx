import { useEffect, useState } from 'react';
import {
	Card,
	Image,
	Text,
	Group,
	Badge,
	createStyles,
	Center,
	Switch,
} from '@mantine/core';
import { IconMail, IconPhone } from '@tabler/icons';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useAuth } from '../../../lib/auth';

const useStyles = createStyles((theme) => ({
	card: {
		backgroundColor:
			theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
	},

	imageSection: {
		padding: theme.spacing.md,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderBottom: `1px solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
		}`,
	},

	label: {
		marginBottom: theme.spacing.xs,
		lineHeight: 1,
		fontWeight: 700,
		fontSize: theme.fontSizes.xs,
		letterSpacing: -0.25,
		textTransform: 'uppercase',
	},

	section: {
		padding: theme.spacing.md,
		borderTop: `1px solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
		}`,
	},

	icon: {
		marginRight: 5,
		color:
			theme.colorScheme === 'dark'
				? theme.colors.dark[2]
				: theme.colors.gray[5],
	},
}));

const mockdata = [
	{ label: 'test@test.com', icon: IconMail },
	{ label: '+1 2358 5698', icon: IconPhone },
	// { label: 'Automatic gearbox', icon: IconManualGearbox },
	// { label: 'Electric', icon: IconGasStation },
];

export default function HospitalCard({ hospital_ID, id, email }: any) {
	const { classes } = useStyles();
	const { authToken, permissions, setPermissions } = useAuth();
	const [checked, setChecked] = useState(true);
	const features = mockdata.map((feature) => (
		<Center key={feature.label}>
			<feature.icon size={18} className={classes.icon} stroke={1.5} />
			<Text size='xs'>{feature.label}</Text>
		</Center>
	));
	console.log('hsp id');
	console.log(hospital_ID);

	console.log('patient id');
	console.log(id);

	console.log('permissions');
	console.log(permissions);

	async function changeAccess(id: string, accessType: string) {
		await axios.post(`/api/hospitals/access/${hospital_ID}`, {
			token: authToken,
			id,
			email,
			accessType,
		});
		const { data } = await axios.post(`/api/users/${id}`, {
			token: authToken,
			id: id,
			email: email,
		});

		if (data) {
			if (setPermissions) setPermissions(data.permissions);
		}
	}

	// if (authToken) {
	const { isLoading, error, data } = useQuery(`${hospital_ID}`, async () => {
		const { data } = await axios.post(`/api/hospitals/${hospital_ID}`, {
			token: authToken,
			id,
			email,
		});
		return data;
	});

	return (
		<Card withBorder radius='md' className={classes.card}>
			<Card.Section className={classes.imageSection}>
				<Image src='https://i.imgur.com/09XGozT.jpeg' alt='' />
			</Card.Section>
			{isLoading && <Text>Loading</Text>}
			{data && (
				<>
					<Group position='apart' mt='md'>
						<div>
							<Text weight={500} transform='uppercase'>
								{`${data.response.hospital_name}`}
							</Text>
							{/* <Text size="xs" color="dimmed">
            Free recharge at any station
          </Text> */}
						</div>
						<Badge
							variant='light'
							color={permissions.denied.includes(hospital_ID) ? 'red' : 'green'}
						>
							{permissions.denied.includes(hospital_ID)
								? 'Access Denied'
								: 'Access Granted'}
						</Badge>
					</Group>

					<Card.Section className={classes.section} mt='md'>
						<Text size='sm' color='dimmed' className={classes.label}>
							Contact Information
						</Text>

						<Group spacing={8} mb={-8}>
							{features}
						</Group>
					</Card.Section>

					<Card.Section className={classes.section}>
						<Group position='apart'>
							<div>
								<Text size='lg' weight={700} sx={{ lineHeight: 1 }}>
									Change Access
								</Text>
								{/* <Text size="sm" color="dimmed" weight={500} sx={{ lineHeight: 1 }} mt={3}>
              per day
            </Text> */}
							</div>

							<Switch
								size='md'
								onLabel='Granted'
								offLabel='Denied'
								// label="Grant/Revoke"
								color='lime'
								checked={
									permissions.denied.includes(hospital_ID) ? false : checked
								}
								onChange={(event) => {
									const accessType = permissions.denied.includes(hospital_ID)
										? 'grant'
										: 'suspend';
									setChecked(event.currentTarget.checked);
									changeAccess(id, accessType);
								}}
							/>
						</Group>
					</Card.Section>
				</>
			)}
		</Card>
	);
}
