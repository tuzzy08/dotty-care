import {
	Text,
	LoadingOverlay,
	Button,
	Stepper,
	Group,
	Stack,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { v4 as uuidv4 } from 'uuid';
import { updateState } from '../../../utils/updateRecordState';
import { AssessmentForm, DoctorIncidentForm, TreatmentForm } from './forms';
import { RecordState } from 'state-machine';
import { useStateMachine } from 'little-state-machine';

interface Props {
	patientID: string;
	hospital: any;
	patientName: string;
}

export default function Record({ patientID, hospital, patientName }: Props) {
	const [active, setActive] = useState(0);
	const formOne = useForm();
	const formTwo = useForm();
	const formThree = useForm();

	useEffect(() => {
		formOne.setValues({ patientName, patientID });
	}, []);

	const [highestStepVisited, setHighestStepVisited] = useState(active);
	const { actions, state } = useStateMachine({ updateState });

	const handleStepChange = (nextStep: number) => {
		const isOutOfBounds = nextStep > 3 || nextStep < 0;

		if (isOutOfBounds) {
			return;
		}
		console.log(`next step: ${nextStep}`);

		if (nextStep === 1 && formOne.values) {
			const { doctorName, patientID, ...rest } = formOne.values;
			actions.updateState({
				doctorName,
				patientName,
				patientID,
				incidentDetails: { ...rest },
			});
		} else if (nextStep === 2 && formTwo.values) {
			const data = formTwo.values;
			const neuroResponse = {
				normal: data.normal,
				confused: data.confused,
				combative: data.combative,
				dysphasia: data.dysphasia,
				hallucinations: data.hallucinations,
				seizures: data.seizures,
				lethargic: data.lethargic,
				tremors: data.tremors,
				others: data.others,
			};

			const bodyAssessment = {
				cardiovascular: data.cardiovascular,
				endocrine: data.endocrine,
				centralNervousSystem: data.centralNervousSystem,
				gI: data.gI,
				musculoskeletal: data.musculoskeletal,
				integumentary: data.integumentary,
				reproductive: data.reproductive,
				respiratory: data.respiratory,
				renal: data.renal,
			};

			const generalAssessment = {
				gI: data.gI,
				musculoskeletal: data.musculoskeletal,
				integumentary: data.integumentary,
				reproductive: data.reproductive,
				respiratory: data.respiratory,
				renal: data.renal,
				asthma: data.asthma,
				cHF: data.cHF,
				diabetes: data.diabetes,
				hypertension: data.hypertension,
				seizureDisorder: data.seizureDisorder,
				stroke: data.stroke,
				cancer: data.cancer,
				cOPD: data.cOPD,
				angina: data.angina,
				myocardialInfraction: data.myocardialInfraction,
				renalDisease: data.renalDisease,
				psychiatricIllness: data.psychiatricIllness,
				dNROrder: data.dNROrder,
				other: data.other,
			};

			actions.updateState({
				assessmentDetails: { neuroResponse, bodyAssessment, generalAssessment },
			});
			console.log('form 2 values');
			console.log(formTwo.values);
		} else if (nextStep === 3 && formThree.values) {
			actions.updateState({
				treatmentDetails: { ...formThree.values },
			});
			console.log('current State');
			console.log(state);
			console.log('form 3 values');
			console.log(formThree.values);
		}

		setActive(nextStep);
		setHighestStepVisited((hSC) => Math.max(hSC, nextStep));
	};

	const handleFinalsubmit = async (state: RecordState) => {
		console.log(state);
		try {
			const recordID = `${uuidv4()}`;
			state.recordID = recordID;
			state.doctorID = hospital.user_metadata.id;
			state.doctorEmail = hospital.email;
			state.patientName = patientName;
			state.hospitalName = hospital.user_metadata.hospitalName;
			const { data } = await axios.post('/api/records/create', state);
			// console.log(state)
			if (data) {
				showNotification({
					title: 'Fast Health',
					message: 'Record saved successfully',
					color: 'green',
					icon: <IconCheck />,
					autoClose: 5000,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	// Allow the user to freely go back and forth between visited steps.
	const shouldAllowSelectStep = (step: number) =>
		highestStepVisited >= step && active !== step;

	return (
		<>
			<Stepper active={active} onStepClick={setActive} breakpoint='sm'>
				<Stepper.Step
					label='Incident Details'
					// description='Create an account'
					allowStepSelect={shouldAllowSelectStep(0)}
				>
					<DoctorIncidentForm
						form={formOne}
						patientID={`${patientID}`}
						patientName={`${patientName}`}
					/>
				</Stepper.Step>
				<Stepper.Step
					label='Assessment'
					// description='Verify email'
					allowStepSelect={shouldAllowSelectStep(1)}
				>
					<AssessmentForm form={formTwo} />
				</Stepper.Step>
				<Stepper.Step
					label='Treatment'
					// description='Get full access'
					allowStepSelect={shouldAllowSelectStep(2)}
				>
					<TreatmentForm form={formThree} />
				</Stepper.Step>
				<Stepper.Completed>
					<Stack spacing={'lg'}>
						<Text>Completed, click to submit form</Text>
						<Button onClick={() => handleFinalsubmit(state.recordState)}>
							Submit
						</Button>
					</Stack>
				</Stepper.Completed>
			</Stepper>

			<Group position='center' mt='xl'>
				<Button
					variant='default'
					onClick={() => {
						handleStepChange(active - 1);
					}}
				>
					Back
				</Button>
				<Button onClick={() => handleStepChange(active + 1)}>Next step</Button>
			</Group>
		</>
	);
}
