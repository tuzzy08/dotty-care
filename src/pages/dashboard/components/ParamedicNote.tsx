import {
	TextInput,
	Text,
	Textarea,
	LoadingOverlay,
	Box,
	Checkbox,
	Button,
	Stack,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';
import axios from 'axios';
// import { RichTextEditor } from '@mantine/tiptap';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

type Inputs = {
	patient_ID: string;
	vitals: string[];
	additionalInfo: string;
	paramedicName: string;
};

export default function ParamedicNote({
	patient_ID,
	paramedic,
	setOpened,
	patientName,
	setpatientInfo,
}: any) {
	const router = useRouter();
	// dynamic import
	const Rte = useMemo(
		() =>
			dynamic(
				() => import('@mantine/rte').then((RichTextEditor) => RichTextEditor),
				{ ssr: false }
			),
		[]
	);

	const submitHandler: SubmitHandler<Inputs> = async (form_data) => {
		const noteID = `${uuidv4()}`;
		const { data } = await axios.post('/api/notes/create', {
			noteID,
			patient_ID,
			id: paramedic.user_metadata.id,
			patientName,
			paramedicName: form_data.paramedicName,
			email: paramedic.email,
			paramedicNote: form_data.additionalInfo,
		});
		if (data) {
			setOpened(false);
			setpatientInfo('');
			showNotification({
				title: 'Fast Health',
				message: 'Note saved successfully',
				color: 'green',
				icon: <IconCheck />,
				autoClose: 5000,
			});
		}
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const [visible, setVisible] = useState(false);

	return (
		<form onSubmit={handleSubmit(submitHandler)}>
			<Stack p={'lg'} spacing={'xl'}>
				<LoadingOverlay visible={visible} overlayBlur={2} />
				<TextInput
					label='Patient ID'
					value={`${patient_ID}`}
					readOnly={true}
					{...register('patient_ID')}
				/>
				<TextInput label='Paramedic Name' {...register('paramedicName')} />
				{/* <Checkbox.Group
					defaultValue={['react']}
					label='Vitals'
					// description='This is anonymous'
					withAsterisk
					{...register('vitals')}
				>
					<Checkbox value='option1' label='Option 1' />
					<Checkbox value='option2' label='Option 2' />
					<Checkbox value='option3' label='Option 3' />
					<Checkbox value='option4' label='Option 4' />
				</Checkbox.Group> */}
				<Textarea
					placeholder='Your comment'
					label='Your comment'
					withAsterisk
					{...register('additionalInfo')}
				/>
				{/* <Box style={{ overflow: 'scroll', maxHeight: 250 }}>
					<Rte value={value} onChange={onChange} />
				</Box> */}
				<Button
					variant='outline'
					mt='sm'
					size='md'
					type='submit'
					style={{ alignSelf: 'center' }}
					onClick={() => setVisible((v) => !v)}
				>
					Submit
				</Button>
			</Stack>
		</form>
	);
}
