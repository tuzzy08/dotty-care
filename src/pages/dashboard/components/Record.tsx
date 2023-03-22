import { Text, LoadingOverlay, Button, Stepper, Group } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';
import axios from 'axios';
import { useRef, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../../../lib/auth';
import { updateState } from '../../../utils/updateRecordState';

import {
	DoctorIncidentDetailsInput,
	TreatmentDetailsInput,
	AssessmentInput,
} from '../../../types/formTypes';

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
	// References to form DOM nodes
	const formOneRef = useRef<HTMLFormElement>(null);
	const formTwoRef = useRef<HTMLFormElement>(null);
	const formThreeRef = useRef<HTMLFormElement>(null);

	const [highestStepVisited, setHighestStepVisited] = useState(active);
	const { actions, state } = useStateMachine({ updateState });

	const handleStepChange = (nextStep: number) => {
		const isOutOfBounds = nextStep > 3 || nextStep < 0;

		if (isOutOfBounds) {
			return;
		}
		console.log(`next step: ${nextStep}`);

		if (nextStep === 1 && formOneRef.current) {
			formOneRef.current.requestSubmit();
		} else if (nextStep === 2 && formTwoRef.current) {
			formTwoRef.current.requestSubmit();
		} else if (nextStep === 3 && formThreeRef.current) {
			formThreeRef.current.requestSubmit();
			console.log('current State');
			console.log(state);
		}

		if (nextStep > 3) {
			console.log(state);
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

	const handleincidentFormSubmit: SubmitHandler<
		DoctorIncidentDetailsInput
	> = async (data, event) => {
		event?.preventDefault();
		console.log(data);
		const { doctorName, patientID, ...rest } = data;
		actions.updateState({
			doctorName,
			patientName,
			patientID,
			incidentDetails: { ...rest },
		});
	};

	const handleTreatmentFormSubmit: SubmitHandler<
		TreatmentDetailsInput
	> = async (data) => {
		console.log(data);
		actions.updateState({
			treatmentDetails: { ...data },
		});
	};

	const handleAssessmentFormSubmit: SubmitHandler<AssessmentInput> = async (
		data: AssessmentInput
	) => {
		console.log(data);

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
	};

	// Allow the user to freely go back and forth between visited steps.
	const shouldAllowSelectStep = (step: number) =>
		highestStepVisited >= step && active !== step;

	const { authToken } = useAuth();
	// const submitHandler: SubmitHandler<Inputs> = async (form_data) => {
	// 	const recordID = `${uuidv4()}`;
	// 	const { data } = await axios.post('/api/records/create', {
	// 		token: authToken,
	// 		recordID,
	// 		patientID,
	// 		id: hospital.user_metadata.id,
	// 		email: hospital.email,
	// 		hospitalID: hospital.user_metadata.hospitalID,
	// 		hospitalName: hospital.user_metadata.hospitalName,
	// 		doctorName: form_data.doctorName,
	// 		doctorNote: form_data.additionalInfo,
	// 	});
	// 	if (data) {
	// 		setOpened(false);
	// 		setpatientInfo('');
	// 		showNotification({
	// 			title: 'Fast Health',
	// 			message: 'Record saved successfully',
	// 			color: 'green',
	// 			icon: <IconCheck />,
	// 			autoClose: 5000,
	// 		});
	// 	}
	// };

	return (
		<>
			<Stepper active={active} onStepClick={setActive} breakpoint='sm'>
				<Stepper.Step
					label='Incident Details'
					// description='Create an account'
					allowStepSelect={shouldAllowSelectStep(0)}
				>
					<DoctorIncidentForm
						submitHandler={handleincidentFormSubmit}
						ref={formOneRef}
						patientID={`${patientID}`}
						patientName={`${patientName}`}
					/>
				</Stepper.Step>
				<Stepper.Step
					label='Assessment'
					// description='Verify email'
					allowStepSelect={shouldAllowSelectStep(1)}
				>
					<AssessmentForm
						submitHandler={handleAssessmentFormSubmit}
						ref={formTwoRef}
					/>
				</Stepper.Step>
				<Stepper.Step
					label='Treatment'
					// description='Get full access'
					allowStepSelect={shouldAllowSelectStep(2)}
				>
					<TreatmentForm
						submitHandler={handleTreatmentFormSubmit}
						ref={formThreeRef}
					/>
				</Stepper.Step>
				<Stepper.Completed>
					<Text>Completed, click to submit form</Text>
					<Button onClick={() => handleFinalsubmit(state.recordState)}>
						Submit
					</Button>
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
