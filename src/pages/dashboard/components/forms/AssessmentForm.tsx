import { Tabs, LoadingOverlay, Checkbox, Stack, Flex } from '@mantine/core';
import { useState, forwardRef, ForwardedRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AssessmentInput } from '../../../../types/formTypes';

interface Props {
	submitHandler: SubmitHandler<AssessmentInput>;
}

export const AssessmentForm = forwardRef(
	({ submitHandler }: Props, ref: ForwardedRef<HTMLFormElement>) => {
		const {
			register,
			handleSubmit,
			formState: { errors },
		} = useForm<AssessmentInput>();

		return (
			<>
				<form onSubmit={handleSubmit(submitHandler)} ref={ref}>
					<Tabs defaultValue={'neuroResponse'}>
						<Tabs.List>
							<Tabs.Tab value='neuroResponse'>Neuro Response</Tabs.Tab>
							<Tabs.Tab value='bodySystem'>Body System</Tabs.Tab>
							<Tabs.Tab value='generalAssessment'>General Assessment</Tabs.Tab>
						</Tabs.List>

						<Tabs.Panel value='neuroResponse'>
							<Stack spacing={'xl'} py='lg'>
								<Flex gap='xl'>
									<Checkbox
										// checked={false}
										size='md'
										value='normal'
										label='Normal'
										{...register('normal')}
									/>
									<Checkbox
										// checked={false}
										size='md'
										value='confused'
										label='Confused'
										{...register('confused')}
									/>
									<Checkbox
										// checked={false}
										size='md'
										value='combative'
										label='Combative'
										{...register('combative')}
									/>
								</Flex>
								<Flex gap='xl'>
									<Checkbox
										// checked={false}
										size='md'
										value='dysphasia'
										label='Dysphasia'
										{...register('dysphasia')}
									/>
									<Checkbox
										// checked={false}
										size='md'
										value='hallucinations'
										label='Hallucinations'
										{...register('hallucinations')}
									/>
									<Checkbox
										// checked={false}
										size='md'
										value='seizures'
										label='Seizures'
										{...register('seizures')}
									/>
								</Flex>
								<Flex gap='xl'>
									<Checkbox
										// checked={false}
										size='md'
										value='lethargic'
										label='Lethargic'
										{...register('lethargic')}
									/>
									<Checkbox
										// checked={false}
										size='md'
										value='tremors'
										label='Tremors'
										{...register('tremors')}
									/>
									<Checkbox
										// checked={false}
										size='md'
										value='others'
										label='Others'
										{...register('others')}
									/>
								</Flex>
							</Stack>
						</Tabs.Panel>
						<Tabs.Panel value='bodySystem'>
							<Stack spacing={'xl'} py='lg'>
								<Flex gap='xl'>
									<Checkbox
										// checked={false}
										size='md'
										value='cardiovascular'
										label='Cardiovascular'
										{...register('cardiovascular')}
									/>
									<Checkbox
										// checked={false}
										size='md'
										value='endocrine'
										label='Endocrine'
										{...register('endocrine')}
									/>
									<Checkbox
										// checked={false}
										size='md'
										value='centralNervousSystem'
										label='Central Nervous System'
										{...register('centralNervousSystem')}
									/>
								</Flex>
								<Flex gap='xl'>
									<Checkbox size='md' value='gI' label='GI' />
									<Checkbox
										// checked={false}
										size='md'
										value='musculoskeletal'
										label='Musculoskeletal'
										{...register('musculoskeletal')}
									/>
									<Checkbox
										// checked={false}
										size='md'
										value='integumentary'
										label='Integumentary'
										{...register('integumentary')}
									/>
								</Flex>
								<Flex gap='xl'>
									<Checkbox
										// checked={false}
										size='md'
										value='reproductive'
										label='Reproductive'
										{...register('reproductive')}
									/>
									<Checkbox
										// checked={false}
										size='md'
										value='respiratory'
										label='Respiratory'
										{...register('respiratory')}
									/>
									<Checkbox
										// checked={false}
										size='md'
										value='renal'
										label='Renal'
										{...register('renal')}
									/>
								</Flex>
							</Stack>
						</Tabs.Panel>
						<Tabs.Panel value='generalAssessment'>
							<Stack spacing={'xl'} py='lg'>
								<Flex gap='xl'>
									<Checkbox
										// checked={false}
										size='md'
										value='asthma'
										label='Asthma'
										{...register('asthma')}
									/>
									<Checkbox
										// checked={false}
										size='md'
										value='cHF'
										label='CHF'
										{...register('cHF')}
									/>
									<Checkbox
										// checked={false}
										size='md'
										value='diabetes'
										label='Diabetes'
										{...register('diabetes')}
									/>
								</Flex>
								<Flex gap='xl'>
									<Checkbox
										// checked={false}
										size='md'
										value='hypertension'
										label='Hypertension'
										{...register('hypertension')}
									/>
									<Checkbox
										// checked={false}
										size='md'
										value='seizureDisorder'
										label='Seizure Disorder'
										{...register('seizureDisorder')}
									/>
									<Checkbox
										// checked={false}
										size='md'
										value='stroke'
										label='Stroke'
										{...register('stroke')}
									/>
								</Flex>
								<Flex gap='xl'>
									<Checkbox
										// checked={false}
										size='md'
										value='cancer'
										label='Cancer'
										{...register('cancer')}
									/>
									<Checkbox
										// checked={false}
										size='md'
										value='cOPD'
										label='COPD'
										{...register('cOPD')}
									/>
									<Checkbox
										// checked={false}
										size='md'
										value='angina'
										label='Angina'
										{...register('angina')}
									/>
								</Flex>
								<Flex gap='xl'>
									<Checkbox
										// checked={false}
										size='md'
										value='myocardialInfraction'
										label='Myocardial Infraction'
										{...register('myocardialInfraction')}
									/>
									<Checkbox
										// checked={false}
										size='md'
										value='renalDisease'
										label='Renal Disease'
										{...register('renalDisease')}
									/>
									<Checkbox
										// checked={false}
										size='md'
										value='psychiatricIllness'
										label='Psychiatric illness'
										{...register('psychiatricIllness')}
									/>
								</Flex>
								<Flex gap='xl'>
									<Checkbox
										// checked={false}
										size='md'
										value='dNROrder'
										label='DNR Order'
										{...register('dNROrder')}
									/>
									<Checkbox
										// checked={false}
										size='md'
										value='other'
										label='Other'
										{...register('other')}
									/>
								</Flex>
							</Stack>
						</Tabs.Panel>
					</Tabs>
				</form>
			</>
		);
	}
);
