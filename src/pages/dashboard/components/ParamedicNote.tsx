import { Text, Button, Space, Stepper, Group } from '@mantine/core';
import { useStateMachine } from 'little-state-machine';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';
import axios from 'axios';
import { useState, useRef, DetailedHTMLProps, FormHTMLAttributes } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { updateState } from '../../../utils/updateParamedicNoteState';
import {
	IncidentDetailsInput,
	TreatmentDetailsInput,
	AssessmentInput,
} from '../../../types/formTypes';

import { AssessmentForm, IncidentForm, TreatmentForm } from './forms';
import { ParamedicNoteState } from 'state-machine';

export default function ParamedicNote({
	patientID,
	paramedic,
	patientName,
}: any) {
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

		setActive(nextStep);
		setHighestStepVisited((hSC) => Math.max(hSC, nextStep));
	};

	const handleFinalsubmit = async (state: ParamedicNoteState) => {
		console.log('passed in state');
		console.log(state);
		try {
			const noteID = `${uuidv4()}`;
			state.noteID = noteID;
			state.paramedicID = paramedic.user_metadata.id;
			state.paramedicEmail = paramedic.email;
			state.patientName = patientName;
			const { data } = await axios.post('/api/notes/create', state);
			// console.log(state)
			if (data) {
				showNotification({
					title: 'Fast Health',
					message: 'Note saved successfully',
					color: 'green',
					icon: <IconCheck />,
					autoClose: 5000,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleincidentFormSubmit: SubmitHandler<IncidentDetailsInput> = async (
		data,
		event
	) => {
		event?.preventDefault();
		console.log(data);
		const { paramedicName, patientID, ...rest } = data;
		actions.updateState({
			paramedicName,
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

	return (
		<>
			<Stepper active={active} onStepClick={setActive} breakpoint='sm'>
				<Stepper.Step
					label='Incident Details'
					allowStepSelect={shouldAllowSelectStep(0)}
				>
					<IncidentForm
						submitHandler={handleincidentFormSubmit}
						ref={formOneRef}
						patientID={`${patientID}`}
					/>
				</Stepper.Step>
				<Stepper.Step
					label='Assessment'
					allowStepSelect={shouldAllowSelectStep(1)}
				>
					<AssessmentForm
						submitHandler={handleAssessmentFormSubmit}
						ref={formTwoRef}
					/>
				</Stepper.Step>
				<Stepper.Step
					label='Treatment'
					allowStepSelect={shouldAllowSelectStep(2)}
				>
					<TreatmentForm
						submitHandler={handleTreatmentFormSubmit}
						ref={formThreeRef}
					/>
				</Stepper.Step>

				<Stepper.Completed>
					<Text>Completed, click to submit form</Text>
					<Button onClick={() => handleFinalsubmit(state.paramedicNoteState)}>
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
