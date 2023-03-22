import { Property } from 'fabric-contract-api';

export class Record {
	docType: string = 'record';
	recordID: string = '';
	patientName: string = '';
	patientID: string;
	doctorName: string;
	doctorID: string = '';
	doctorEmail: string = '';
	hospitalName: string;
	hospitalID: string;

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
}
