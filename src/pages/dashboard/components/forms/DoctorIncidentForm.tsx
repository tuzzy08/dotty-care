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
import { DoctorIncidentDetailsInput } from '../../../../types/formTypes';

interface Props {
	submitHandler: SubmitHandler<DoctorIncidentDetailsInput>;
	patientID: string;
	patientName: string;
}

export const DoctorIncidentForm = forwardRef(
	(options: Props, ref: ForwardedRef<HTMLFormElement>) => {
		const {
			control,
			register,
			handleSubmit,
			formState: { errors },
		} = useForm<DoctorIncidentDetailsInput>();

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
						<TextInput
							readOnly
							label='Patient Name'
							value={`${options.patientName}`}
							{...register('patientName')}
						/>
						<TextInput label='Doctor Name' {...register('doctorName')} />
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
				</form>
			</Group>
		);
	}
);
