import {
	ActionIcon,
	TextInput,
	LoadingOverlay,
	Group,
	Stack,
	Card,
} from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { ForwardedRef, forwardRef, RefObject, useRef } from 'react';
import { SubmitHandler, Controller } from 'react-hook-form';
import { TreatmentDetailsInput } from '../../../../types/formTypes';

interface Props {
	form: any;
}

export const TreatmentForm = forwardRef(
	({ form }: Props, ref: ForwardedRef<HTMLFormElement>) => {
		// const {
		// 	control,
		// 	register,
		// 	handleSubmit,
		// 	formState: { errors },
		// } = useForm<TreatmentDetailsInput>();
		// const timeInputRef = useRef<HTMLInputElement>(null);

		return (
			<>
				{/* <form onSubmit={handleSubmit(submitHandler)} ref={ref}> */}
				<Card>
					<Stack spacing={'lg'}>
						<Group>
							<TimeInput
								label='Procedure Start Time'
								withAsterisk
								{...form.getInputProps('procedureStartTime')}
							/>

							<TextInput
								placeholder='Type of procedure'
								{...form.getInputProps('procedureType')}
							/>
						</Group>
						<Group>
							<TimeInput
								label='Procedure End Time'
								withAsterisk
								{...form.getInputProps('procedureEndTime')}
							/>

							<TextInput
								placeholder='Device/Method'
								{...form.getInputProps('DeviceType')}
							/>
							<TextInput
								placeholder='Type of treatment'
								{...form.getInputProps('treatmentType')}
							/>
						</Group>
					</Stack>
				</Card>
				{/* </form> */}
			</>
		);
	}
);
