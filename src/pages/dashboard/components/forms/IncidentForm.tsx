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
import { IncidentDetailsInput } from '../../../../types/formTypes';

interface Props {
	patientID: string;
	form: any;
}

export const IncidentForm = forwardRef(
	(options: Props, ref: ForwardedRef<HTMLFormElement>) => {
		// const {
		// 	control,
		// 	register,
		// 	handleSubmit,
		// 	formState: { errors },
		// } = useForm<IncidentDetailsInput>();
		// const form = useForm({});
		// options.form.setValues({ patientID: options.patientID });

		return (
			<Group mt={'lg'}>
				{/* <form
					onSubmit={form.onSubmit((values, event) =>
						options.submitHandler(values, event)
					)}
					ref={ref}
				> */}
				<Flex wrap={'wrap'} gap='md'>
					<TextInput
						label='Patient ID'
						{...options.form.getInputProps('patientID')}
						// value={`${options.patientID}`}
						readOnly={true}
						// {...register('patientID')}
					/>
					<TextInput
						label='Paramedic Name'
						{...options.form.getInputProps('paramedicName')}
					/>
					<TextInput
						label='Service Code'
						{...options.form.getInputProps('servicecode')}
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
				<Flex wrap={'wrap'} gap='md'>
					<Group>
						<Text>Incident Location</Text>
						<TextInput
							placeholder='street'
							{...options.form.getInputProps('street')}
						/>
						<TextInput
							placeholder='province'
							{...options.form.getInputProps('province')}
						/>
						<TextInput
							placeholder='postal code'
							{...options.form.getInputProps('postalcode')}
						/>
					</Group>
					<Group>
						<Text>Destination Location</Text>
						<TextInput
							placeholder='street'
							{...options.form.getInputProps('destinationstreet')}
						/>
						<TextInput
							placeholder='province'
							{...options.form.getInputProps('destinationprovince')}
						/>
						<TextInput
							placeholder='postal code'
							{...options.form.getInputProps('destinationpostalcode')}
						/>
					</Group>
					<Group>
						<Text>Service Payment</Text>
						<TextInput
							placeholder='Responsibility'
							{...options.form.getInputProps('responsibility')}
						/>
						<TextInput
							placeholder='Number'
							{...options.form.getInputProps('number')}
						/>
					</Group>
					<Group>
						<TextInput
							placeholder='Factors affecting ems'
							{...options.form.getInputProps('factors')}
						/>
						<TextInput
							placeholder='Patient Disposition'
							{...options.form.getInputProps('disposition')}
						/>
					</Group>
				</Flex>
				{/* </form> */}
			</Group>
		);
	}
);
