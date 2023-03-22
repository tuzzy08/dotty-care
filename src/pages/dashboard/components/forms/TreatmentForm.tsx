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
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { TreatmentDetailsInput } from '../../../../types/formTypes';

interface Props {
	submitHandler: SubmitHandler<TreatmentDetailsInput>;
}

export const TreatmentForm = forwardRef(
	({ submitHandler }: Props, ref: ForwardedRef<HTMLFormElement>) => {
		const {
			control,
			register,
			handleSubmit,
			formState: { errors },
		} = useForm<TreatmentDetailsInput>();
		const timeInputRef = useRef<HTMLInputElement>(null);

		return (
			<>
				<form onSubmit={handleSubmit(submitHandler)} ref={ref}>
					<Card>
						<Stack spacing={'lg'}>
							<Group>
								<Controller
									control={control}
									name='procedureStartTime'
									render={({ field: { onChange } }) => (
										<TimeInput
											onChange={onChange}
											label='Procedure Start Time'
											withAsterisk
										/>
									)}
								/>

								<TextInput
									placeholder='Type of procedure'
									{...register('procedureType')}
								/>
							</Group>
							<Group>
								<Controller
									control={control}
									name='procedureEndTime'
									render={({ field: { onChange } }) => (
										<TimeInput
											onChange={onChange}
											label='Procedure End Time'
											withAsterisk
										/>
									)}
								/>

								<TextInput
									placeholder='Device/Method'
									{...register('DeviceType')}
								/>
								<TextInput
									placeholder='Type of treatment'
									{...register('treatmentType')}
								/>
							</Group>
						</Stack>
					</Card>
				</form>
			</>
		);
	}
);
