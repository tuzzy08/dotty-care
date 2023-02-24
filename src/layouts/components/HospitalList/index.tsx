import { useState } from 'react';
import {
	Badge,
	Box,
	Button,
	createStyles,
	Table,
	ScrollArea,
	UnstyledButton,
	Group,
	Text,
	Center,
	TextInput,
	Modal,
} from '@mantine/core';
import { keys } from '@mantine/utils';
import {
	IconSelector,
	IconChevronDown,
	IconChevronUp,
	IconSearch,
} from '@tabler/icons';
import HospitalCard from '../HospitalCard';

const useStyles = createStyles((theme) => ({
	th: {
		padding: '0 !important',
	},

	control: {
		width: '100%',
		padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

		'&:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[6]
					: theme.colors.gray[0],
		},
	},

	icon: {
		width: 21,
		height: 21,
		borderRadius: 21,
	},
}));

interface RowData {
	hospital_name: string;
	// email: string;
	// contact: string;
	access: string;
}

interface TableSortProps {
	data: RowData[];
}

interface ThProps {
	children: React.ReactNode;
	reversed?: boolean;
	sorted?: boolean;
	onSort?(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
	const { classes } = useStyles();
	const Icon = sorted
		? reversed
			? IconChevronUp
			: IconChevronDown
		: IconSelector;
	return (
		<th className={classes.th}>
			<UnstyledButton onClick={onSort} className={classes.control}>
				<Group position='apart'>
					<Text weight={500} size='sm'>
						{children}
					</Text>
					<Center className={classes.icon}>
						<Icon size={14} stroke={1.5} />
					</Center>
				</Group>
			</UnstyledButton>
		</th>
	);
}

function filterData(data: RowData[], search: string) {
	const query = search.toLowerCase().trim();
	return data.filter((item) =>
		keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
	);
}

function sortData(
	data: RowData[],
	payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
	const { sortBy } = payload;

	if (!sortBy) {
		return filterData(data, payload.search);
	}

	return filterData(
		[...data].sort((a, b) => {
			if (payload.reversed) {
				return b[sortBy].localeCompare(a[sortBy]);
			}

			return a[sortBy].localeCompare(b[sortBy]);
		}),
		payload.search
	);
}

export default function HospitalList({ data }: TableSortProps) {
	const [opened, setOpened] = useState(false);
	const [search, setSearch] = useState('');
	const [sortedData, setSortedData] = useState(data);
	const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
	const [reverseSortDirection, setReverseSortDirection] = useState(false);

	const setSorting = (field: keyof RowData) => {
		const reversed = field === sortBy ? !reverseSortDirection : false;
		setReverseSortDirection(reversed);
		setSortBy(field);
		setSortedData(sortData(data, { sortBy: field, reversed, search }));
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.currentTarget;
		setSearch(value);
		setSortedData(
			sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
		);
	};

	const rows = sortedData.map((row) => (
		<tr key={row.hospital_name}>
			<td>{row.hospital_name}</td>
			{/* <td>{row.email}</td> */}
			<td>
				{
					<Badge color={`${row.access === 'Granted' ? 'green' : 'red'}`}>
						{row.access}
					</Badge>
				}
			</td>
			<td>
				{
					<Button onClick={() => setOpened(true)} variant='outline' size='sm'>
						view
					</Button>
				}
			</td>
		</tr>
	));

	return (
		<Box
			sx={{
				width: '60vw',
			}}
		>
			<Modal opened={opened} onClose={() => setOpened(false)}>
				<HospitalCard />
			</Modal>
			<ScrollArea>
				<Text size={'md'} align={'center'} weight={'bold'} pb={25}>
					All Hospitals
				</Text>
				<TextInput
					placeholder='Search by any field'
					mb='md'
					icon={<IconSearch size={14} stroke={1.5} />}
					value={search}
					onChange={handleSearchChange}
				/>
				<Table
					horizontalSpacing='xs'
					verticalSpacing='xs'
					sx={{ tableLayout: 'fixed', minWidth: 700 }}
				>
					<thead>
						<tr>
							<Th
								sorted={sortBy === 'hospital_name'}
								reversed={reverseSortDirection}
								onSort={() => setSorting('hospital_name')}
							>
								Hospital
							</Th>
							{/* <Th
								sorted={sortBy === 'email'}
								reversed={reverseSortDirection}
								onSort={() => setSorting('email')}
							>
								Email
							</Th> */}
							{/* <Th
              sorted={sortBy === 'contact'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('contact')}
            >
              Contact
            </Th> */}
							<Th sorted={sortBy === 'access'} reversed={reverseSortDirection}>
								Access
							</Th>
							<Th>Action</Th>
						</tr>
					</thead>
					<tbody>
						{rows.length > 0 ? (
							rows
						) : (
							<tr>
								<td colSpan={Object.keys(data[0]).length}>
									<Text weight={500} align='center'>
										Nothing found
									</Text>
								</td>
							</tr>
						)}
					</tbody>
				</Table>
			</ScrollArea>
		</Box>
	);
}
