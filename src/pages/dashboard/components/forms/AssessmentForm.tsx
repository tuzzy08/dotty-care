import { Tabs, LoadingOverlay, Checkbox, Stack, Flex } from '@mantine/core';
import { useState, forwardRef, ForwardedRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AssessmentInput } from '../../../../types/formTypes';

interface Props {
	form: any;
}

export const AssessmentForm = forwardRef(
	({ form }: Props, ref: ForwardedRef<HTMLFormElement>) => {
		// const {
		// 	register,
		// 	handleSubmit,
		// 	formState: { errors },
		// } = useForm<AssessmentInput>();

		return (
			<>
				{/* <form onSubmit={handleSubmit(submitHandler)} ref={ref}> */}
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
									label='Normal'
									{...form.getInputProps('normal')}
									// value='normal'
								/>
								<Checkbox
									// checked={false}
									size='md'
									// value='confused'
									label='Confused'
									{...form.getInputProps('confused')}
								/>
								<Checkbox
									// checked={false}
									size='md'
									// value='combative'
									label='Combative'
									{...form.getInputProps('combative')}
								/>
							</Flex>
							<Flex gap='xl'>
								<Checkbox
									// checked={false}
									size='md'
									value='dysphasia'
									label='Dysphasia'
									{...form.getInputProps('dysphasia')}
								/>
								<Checkbox
									// checked={false}
									size='md'
									value='hallucinations'
									label='Hallucinations'
									{...form.getInputProps('hallucinations')}
								/>
								<Checkbox
									// checked={false}
									size='md'
									value='seizures'
									label='Seizures'
									{...form.getInputProps('seizures')}
								/>
							</Flex>
							<Flex gap='xl'>
								<Checkbox
									// checked={false}
									size='md'
									value='lethargic'
									label='Lethargic'
									{...form.getInputProps('lethargic')}
								/>
								<Checkbox
									// checked={false}
									size='md'
									value='tremors'
									label='Tremors'
									{...form.getInputProps('tremors')}
								/>
								<Checkbox
									// checked={false}
									size='md'
									value='others'
									label='Others'
									{...form.getInputProps('others')}
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
									{...form.getInputProps('cardiovascular')}
								/>
								<Checkbox
									// checked={false}
									size='md'
									value='endocrine'
									label='Endocrine'
									{...form.getInputProps('endocrine')}
								/>
								<Checkbox
									// checked={false}
									size='md'
									value='centralNervousSystem'
									label='Central Nervous System'
									{...form.getInputProps('centralNervousSystem')}
								/>
							</Flex>
							<Flex gap='xl'>
								<Checkbox size='md' value='gI' label='GI' />
								<Checkbox
									// checked={false}
									size='md'
									value='musculoskeletal'
									label='Musculoskeletal'
									{...form.getInputProps('musculoskeletal')}
								/>
								<Checkbox
									// checked={false}
									size='md'
									value='integumentary'
									label='Integumentary'
									{...form.getInputProps('integumentary')}
								/>
							</Flex>
							<Flex gap='xl'>
								<Checkbox
									// checked={false}
									size='md'
									value='reproductive'
									label='Reproductive'
									{...form.getInputProps('reproductive')}
								/>
								<Checkbox
									// checked={false}
									size='md'
									value='respiratory'
									label='Respiratory'
									{...form.getInputProps('respiratory')}
								/>
								<Checkbox
									// checked={false}
									size='md'
									value='renal'
									label='Renal'
									{...form.getInputProps('renal')}
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
									{...form.getInputProps('asthma')}
								/>
								<Checkbox
									// checked={false}
									size='md'
									value='cHF'
									label='CHF'
									{...form.getInputProps('cHF')}
								/>
								<Checkbox
									// checked={false}
									size='md'
									value='diabetes'
									label='Diabetes'
									{...form.getInputProps('diabetes')}
								/>
							</Flex>
							<Flex gap='xl'>
								<Checkbox
									// checked={false}
									size='md'
									value='hypertension'
									label='Hypertension'
									{...form.getInputProps('hypertension')}
								/>
								<Checkbox
									// checked={false}
									size='md'
									value='seizureDisorder'
									label='Seizure Disorder'
									{...form.getInputProps('seizureDisorder')}
								/>
								<Checkbox
									// checked={false}
									size='md'
									value='stroke'
									label='Stroke'
									{...form.getInputProps('stroke')}
								/>
							</Flex>
							<Flex gap='xl'>
								<Checkbox
									// checked={false}
									size='md'
									value='cancer'
									label='Cancer'
									{...form.getInputProps('cancer')}
								/>
								<Checkbox
									// checked={false}
									size='md'
									value='cOPD'
									label='COPD'
									{...form.getInputProps('cOPD')}
								/>
								<Checkbox
									// checked={false}
									size='md'
									value='angina'
									label='Angina'
									{...form.getInputProps('angina')}
								/>
							</Flex>
							<Flex gap='xl'>
								<Checkbox
									// checked={false}
									size='md'
									value='myocardialInfraction'
									label='Myocardial Infraction'
									{...form.getInputProps('myocardialInfraction')}
								/>
								<Checkbox
									// checked={false}
									size='md'
									value='renalDisease'
									label='Renal Disease'
									{...form.getInputProps('renalDisease')}
								/>
								<Checkbox
									// checked={false}
									size='md'
									value='psychiatricIllness'
									label='Psychiatric illness'
									{...form.getInputProps('psychiatricIllness')}
								/>
							</Flex>
							<Flex gap='xl'>
								<Checkbox
									// checked={false}
									size='md'
									value='dNROrder'
									label='DNR Order'
									{...form.getInputProps('dNROrder')}
								/>
								<Checkbox
									// checked={false}
									size='md'
									value='other'
									label='Other'
									{...form.getInputProps('other')}
								/>
							</Flex>
						</Stack>
					</Tabs.Panel>
				</Tabs>
				{/* </form> */}
			</>
		);
	}
);
