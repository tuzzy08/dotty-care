import { createStyles, Paper, Text, ThemeIcon } from '@mantine/core';
import { IconColorSwatch } from '@tabler/icons';

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
	recordID: string;
	patientID: string;
	hospitalID: string;
	hospitalName?: string;
	doctorName: string;
	doctorNote: string;
	dateCreated?: string;
}

export function RecordCard({
	hospitalName,
	doctorName,
	doctorNote,
}: RecordProps) {
	const { classes } = useStyles();
	return (
		<Paper withBorder radius='md' className={classes.card}>
			<ThemeIcon
				size='xl'
				radius='md'
				variant='gradient'
				gradient={{ deg: 0, from: 'pink', to: 'orange' }}
			>
				<IconColorSwatch size={28} stroke={1.5} />
			</ThemeIcon>
			<Text size='xl' weight={500} mt='md'>
				{`Hospital: ${hospitalName}`}
			</Text>
			<Text size='sm' mt='sm' color='dimmed'>
				{`Doctor: ${doctorName}`}
			</Text>
			<Text size='sm' mt='sm' color='dimmed'>
				{`Doctor's Notes: ${doctorNote}`}
			</Text>
		</Paper>
	);
}
