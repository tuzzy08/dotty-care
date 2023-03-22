import { useState } from 'react';
import {
	createStyles,
	Table,
	Text,
	ScrollArea,
	Button,
	Modal,
} from '@mantine/core';
import { RecordCard, RecordProps } from './RecordCard';
import { filterObject } from '../../../utils/filterObject';
import { RecordState } from 'state-machine';

const useStyles = createStyles((theme) => ({
	header: {
		position: 'sticky',
		top: 0,
		backgroundColor:
			theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
		transition: 'box-shadow 150ms ease',

		'&::after': {
			content: '""',
			position: 'absolute',
			left: 0,
			right: 0,
			bottom: 0,
			borderBottom: `1px solid ${
				theme.colorScheme === 'dark'
					? theme.colors.dark[3]
					: theme.colors.gray[2]
			}`,
		},
	},

	scrolled: {
		boxShadow: theme.shadows.sm,
	},
}));

interface RecordsTableProps {
	data: {
		recordID: string;
		patientName: string;
		hospitalName?: string;
		doctorName: string;
		dateCreated?: string;
	}[];
}

export function RecordsTable({ data }: any) {
	const dataAsObject = data.map((item: any) => filterObject(JSON.parse(item)));
	console.log('parsed record');
	console.log(dataAsObject);
	const initialValues = {
		recordID: '',
		patientName: '',
		hospitalName: '',
		doctorName: '',
	};

	const { classes, cx } = useStyles();
	const [scrolled, setScrolled] = useState(false);
	const [opened, setOpened] = useState(false);
	const [record, setRecord] = useState<any>(initialValues);

	const rows = dataAsObject.map((row: any) => (
		<tr key={row.hospitalName}>
			<td>{row.hospitalName}</td>
			<td>{row.doctorName}</td>
			<td>{row.patientName}</td>
			<td>
				{
					<Button
						variant='outline'
						gradient={{ from: 'indigo', to: 'cyan' }}
						size='xs'
						radius={10}
						onClick={() => {
							setRecord(row);
							setOpened(true);
						}}
					>
						view
					</Button>
				}
			</td>
		</tr>
	));

	return (
		<ScrollArea
			sx={{ height: 300 }}
			onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
		>
			<Modal
				size={'70%'}
				opened={opened}
				onClose={() => setOpened(false)}
				centered
				title='Patient Record'
			>
				<RecordCard record={record} />
			</Modal>
			<Text size={'md'} align={'center'} weight={'bold'} pb={25}>
				Medical Records
			</Text>
			<Table sx={{ minWidth: 700 }}>
				<thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
					<tr>
						<th>Hospital Name</th>
						<th>Doctor Name</th>
						<th>Patient Name</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{rows.length > 0 ? (
						rows
					) : (
						<tr>
							<td colSpan={2}>
								<Text weight={500} align='center'>
									Nothing found
								</Text>
							</td>
						</tr>
					)}
				</tbody>
			</Table>
		</ScrollArea>
	);
}
