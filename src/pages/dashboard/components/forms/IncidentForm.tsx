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
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IncidentDetailsInput } from '../../../../types/formTypes';

interface Props {
	submitHandler: SubmitHandler<IncidentDetailsInput>;
	patientID: string;
}

export const IncidentForm = forwardRef(
	(options: Props, ref: ForwardedRef<HTMLFormElement>) => {
		const {
			control,
			register,
			handleSubmit,
			formState: { errors },
		} = useForm<IncidentDetailsInput>();

		return (
			<Group mt={'lg'}>
				<form onSubmit={handleSubmit(options.submitHandler)} ref={ref}>
					<Flex wrap={'wrap'} gap='md'>
						<TextInput
							label='Patient ID'
							value={`${options.patientID}`}
							readOnly={true}
							{...register('patientID')}
						/>
						<TextInput label='Paramedic Name' {...register('paramedicName')} />
						<TextInput label='Service Code' {...register('servicecode')} />
						<TextInput label='Service Type' {...register('servicetype')} />
						<Controller
							control={control}
							name='dateofincident'
							render={({ field: { onChange } }) => (
								<DatePicker
									onChange={onChange}
									placeholder='Pick date'
									label='Date of incident'
									withAsterisk
								/>
							)}
						/>
						<Controller
							control={control}
							name='timeofincident'
							render={({ field: { onChange } }) => (
								<TimeInput
									onChange={onChange}
									placeholder='Pick date'
									label='Time of incident'
									withAsterisk
								/>
							)}
						/>
					</Flex>

					<Space h='md' />
					<Flex wrap={'wrap'} gap='md'>
						<Group>
							<Text>Incident Location</Text>
							<TextInput placeholder='street' {...register('street')} />
							<TextInput placeholder='province' {...register('province')} />
							<TextInput
								placeholder='postal code'
								{...register('postalcode')}
							/>
						</Group>
						<Group>
							<Text>Destination Location</Text>
							<TextInput
								placeholder='street'
								{...register('destinationstreet')}
							/>
							<TextInput
								placeholder='province'
								{...register('destinationprovince')}
							/>
							<TextInput
								placeholder='postal code'
								{...register('destinationpostalcode')}
							/>
						</Group>
						<Group>
							<Text>Service Payment</Text>
							<TextInput
								placeholder='Responsibility'
								{...register('responsibility')}
							/>
							<TextInput placeholder='Number' {...register('number')} />
						</Group>
						<Group>
							<TextInput
								placeholder='Factors affecting ems'
								{...register('factors')}
							/>
							<TextInput
								placeholder='Patient Disposition'
								{...register('disposition')}
							/>
						</Group>
					</Flex>
				</form>
			</Group>
		);
	}
);
