import { NoteState } from './types';

export type ParamedicNote = {
	noteID: string;
	patientName: string;
	paramedicName: string;
	patientID: string;
	paramedicID: string;
	paramedicEmail: string;
	incidentDetails: {
		servicecode: string;
		servicetype: string;
		dateofincident: string;
		timeofincident: string;
		street: string;
		province: string;
		postalcode: string;
		destinationstreet: string;
		destinationprovince: string;
		destinationpostalcode: string;
		responsibility: string;
		number: string;
		factors: string;
		disposition: string;
	};
	assessmentDetails: {
		neuroResponse: {
			normal: string;
			confused: string;
			combative: string;
			dysphasia: string;
			hallucinations: string;
			seizures: string;
			lethargic: string;
			tremors: string;
			others: string;
		};
		bodyAssessment: {
			cardiovascular: string;
			endocrine: string;
			centralNervousSystem: string;
			gI: string;
			musculoskeletal: string;
			integumentary: string;
			reproductive: string;
			respiratory: string;
			renal: string;
		};
		generalAssessment: {
			gI: string;
			musculoskeletal: string;
			integumentary: string;
			reproductive: string;
			respiratory: string;
			renal: string;
			asthma: string;
			cHF: string;
			diabetes: string;
			hypertension: string;
			seizureDisorder: string;
			stroke: string;
			cancer: string;
			cOPD: string;
			angina: string;
			myocardialInfraction: string;
			renalDisease: string;
			psychiatricIllness: string;
			dNROrder: string;
			other: string;
		};
	};
	treatmentDetails: {
		procedureStartTime: string;
		procedureType: string;
		procedureEndTime: string;
		deviceType: string;
		treatmentType: string;
	};
};
