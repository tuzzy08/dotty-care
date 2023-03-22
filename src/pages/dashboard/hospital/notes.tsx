import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext } from 'next';
import {
	Badge,
	Button,
	Card,
	Center,
	Group,
	Modal,
	Stack,
	Table,
	Text,
	TextInput,
	useMantineTheme,
} from '@mantine/core';
import { Layout } from '../../../layouts';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useAuth } from '../../../lib/auth';
import NotesTable from '../components/NotesTable';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { showNotification } from '@mantine/notifications';
import { IconError404 } from '@tabler/icons';
import { ParamedicNoteState } from 'state-machine';
import Note from '../components/Note';

type Inputs = {
	noteID: string;
};

HospitalNotesPage.getLayout = function getLayout(page: any) {
	return <Layout variant={'hospital'}>{page}</Layout>;
};

async function getNote(
	noteID: string,
	id: string,
	email: string,
	token: string = ''
): Promise<ParamedicNoteState | null> {
	try {
		const { data } = await axios.post(`/api/notes/${noteID}`, {
			token,
			id,
			email,
		});
		if (data === 'denied') {
			showNotification({
				title: 'Fast Health',
				message: 'Access Denied',
				color: 'red',
				icon: <IconError404 />,
				autoClose: 5000,
			});
			return null;
		}
		const parsedNote = JSON.parse(data);
		return parsedNote;
	} catch (error) {
		console.log(error);
	}
	return null;
}

const ths = (
	<tr>
		{/* <th>Patient ID</th> */}
		<th>Patient Name</th>
		<th>Paramedic Name</th>
		<th>Actions</th>
	</tr>
);

export default function HospitalNotesPage({ user }: any) {
	const theme = useMantineTheme();
	const [emsNote, setEmsNote] = useState<ParamedicNoteState | null>(null);
	const { authToken } = useAuth();
	const [opened, setOpened] = useState(false);
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const searchNote: SubmitHandler<Inputs> = async (form_data) => {
		const note = await getNote(
			form_data.noteID.trim(),
			user.user_metadata.id,
			user.email,
			authToken
		);

		note && setEmsNote(note);
		reset((formValues) => ({
			...formValues,
			noteID: '',
		}));
	};
	return (
		<div style={{ width: '80vw' }}>
			<Stack spacing={'xl'}>
				<Modal
					opened={opened}
					size='lg'
					closeButtonLabel='Close Note'
					closeOnEscape={false}
					closeOnClickOutside={false}
					overlayColor={
						theme.colorScheme === 'dark'
							? theme.colors.dark[9]
							: theme.colors.gray[2]
					}
					overlayOpacity={0.55}
					overlayBlur={3}
					onClose={() => setOpened(false)}
					title='Emergency Note'
				>
					<Note note={emsNote!} />
				</Modal>

				<Card
					shadow='sm'
					radius={'md'}
					p='md'
					w='650px'
					mah={600}
					withBorder
					mt='xs'
				>
					<Group position='apart' mb='lg'>
						<Text weight={500}>Search for EMS Note</Text>
						<Badge
							variant='gradient'
							gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
						>
							{`Hospital: ${user.user_metadata.hospitalName}`}
						</Badge>
					</Group>
					<form onSubmit={handleSubmit(searchNote)}>
						<Stack align='flex-start'>
							<TextInput
								label='Enter note ID'
								placeholder='note-5cbda-2345'
								{...register('noteID')}
							/>

							<Button variant='outline' mt='sm' size='md' type='submit'>
								Submit
							</Button>
						</Stack>
					</form>
				</Card>

				<Card shadow='sm' radius={'md'} p='md' w='700px'>
					<Table highlightOnHover>
						<caption>EMS Note details</caption>
						<thead>{ths}</thead>
						<tbody>
							{emsNote ? (
								<tr>
									{/* <td>{patientInfo.patientID}</td> */}
									<td>{emsNote.patientName}</td>
									<td>{emsNote.paramedicName}</td>
									<td>
										<Button
											size='xs'
											onClick={() => setOpened(true)}
											variant='outline'
											color={'teal'}
										>
											view
										</Button>
									</td>
								</tr>
							) : (
								<></>
							)}
						</tbody>
					</Table>
				</Card>
			</Stack>
		</div>
	);
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	// Create authenticated Supabase Client
	const supabase = createServerSupabaseClient(ctx);
	// Check if we have a session
	const {
		data: { session },
	} = await supabase.auth.getSession();

	console.log('user session');
	console.log(session);

	if (!session || session.user.user_metadata.accountType !== 'Hospital')
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};

	return {
		props: {
			initialSession: session,
			user: session.user,
		},
	};
};
