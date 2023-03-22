import {
	TextInput,
	Text,
	LoadingOverlay,
	Space,
	Group,
	Flex,
} from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { ForwardedRef, forwardRef } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { useForm } from '@mantine/form';
import { DoctorIncidentDetailsInput } from '../../../../types/formTypes';

interface Props {
	patientID: string;
	patientName: string;
	form: any;
}

export const DoctorIncidentForm = forwardRef(
	(options: Props, ref: ForwardedRef<HTMLFormElement>) => {
		// const {
		// 	control,
		// 	register,
		// 	handleSubmit,
		// 	formState: { errors },
		// } = useForm<DoctorIncidentDetailsInput>();

		return (
			<Group mt={'lg'}>
				{/* <form onSubmit={handleSubmit(options.submitHandler)} ref={ref}> */}
				<Flex wrap={'wrap'} gap='md'>
					<TextInput
						label='Patient ID'
						readOnly={true}
						{...options.form.getInputProps('patientID')}
					/>
					<TextInput
						readOnly
						label='Patient Name'
						// value={`${options.patientName}`}
						{...options.form.getInputProps('patientName')}
					/>
					<TextInput
						label='Doctor Name'
						{...options.form.getInputProps('doctorName')}
					/>
					<TextInput
						label='Service Type'
						{...options.form.getInputProps('servicetype')}
					/>
					<DatePicker
						placeholder='Pick date'
						label='Date of incident'
						withAsterisk
						{...options.form.getInputProps('dateofincident')}
					/>
					<TimeInput
						placeholder='Pick date'
						label='Time of incident'
						withAsterisk
						{...options.form.getInputProps('timeofincident')}
					/>
				</Flex>

				<Space h='md' />
				{/* <Flex wrap={'wrap'} gap='md'>
						<Group>
							<Text>Incident Location</Text>
							<TextInput placeholder='street' {...register('street')} />
							<TextInput placeholder='province' {...register('province')} />
							<TextInput
								placeholder='postal code'
								{...register('postalcode')}
							/>
						</Group>
					</Flex> */}
				{/* </form> */}
			</Group>
		);
	}
);
