import {
	createStyles,
	Flex,
	Group,
	List,
	Paper,
	Stack,
	Text,
	ThemeIcon,
	Title,
} from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons';
import { RecordState } from 'state-machine';

const useStyles = createStyles((theme) => ({
	card: {
		position: 'relative',
		cursor: 'pointer',
		overflow: 'hidden',
		transition: 'transform 150ms ease, box-shadow 100ms ease',
		padding: theme.spacing.xl,
		paddingLeft: theme.spacing.xl * 2,

		'&:hover': {
			boxShadow: theme.shadows.md,
			transform: 'scale(1.02)',
		},

		'&::before': {
			content: '""',
			position: 'absolute',
			top: 0,
			bottom: 0,
			left: 0,
			width: 6,
			backgroundImage: theme.fn.linearGradient(
				0,
				theme.colors.pink[6],
				theme.colors.orange[6]
			),
		},
	},
}));

export interface RecordProps {
	record: RecordState;
}

export function RecordCard({ record }: RecordProps) {
	const { classes } = useStyles();
	const incidentDetails = Object.values(record.incidentDetails);
	const treatmentDetails = Object.values(record.treatmentDetails);
	const neuroResponse = Object.values(record.assessmentDetails.neuroResponse);
	const bodyAssessment = Object.values(record.assessmentDetails.bodyAssessment);
	const generalAssessment = Object.values(
		record.assessmentDetails.neuroResponse
	);

	return (
		<Stack>
			<Paper withBorder radius='md' className={classes.card}>
				<Text>Patient: {`${record.patientName}`}</Text>
				<Stack spacing={'xl'}>
					<Title order={3} weight={100} underline align='center'>
						Neuro Assesment
					</Title>
					{/* <hr /> */}
					<Group>
						{neuroResponse.map((response) => (
							<Group>
								<ThemeIcon color='teal' size={24} radius='xl'>
									<IconCircleCheck size={16} />
								</ThemeIcon>
								{`${response}`}
							</Group>
						))}
					</Group>

					<Title order={3} weight={100} underline align='center'>
						Body Assesment
					</Title>
					<Group>
						{bodyAssessment.map((response) => (
							<Group>
								<ThemeIcon color='teal' size={24} radius='xl'>
									<IconCircleCheck size={16} />
								</ThemeIcon>
								{`${response}`}
							</Group>
						))}
					</Group>

					<Title order={3} weight={100} underline align='center'>
						General Assesment
					</Title>
					<Group>
						{generalAssessment.map((response) => (
							<Group>
								<ThemeIcon color='teal' size={24} radius='xl'>
									<IconCircleCheck size={16} />
								</ThemeIcon>
								{`${response}`}
							</Group>
						))}
					</Group>

					<Group>
						<Title order={3} weight={100} underline align='center'>
							Treatment Details
						</Title>
					</Group>
					{treatmentDetails.map((response) => (
						<Text>{`${response}`}</Text>
					))}
				</Stack>
				<Text>Doctor: {`${record.doctorName}`}</Text>
			</Paper>
		</Stack>
	);
}
