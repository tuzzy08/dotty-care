export class ParamedicNote {
	// @Property()
	docType: string;
	noteID: string;
	patientName: string;
	paramedicName: string;
	patientID: string;
	paramedicID: string;
	paramedicEmail: string;
	incidentDetails: {
		servicecode: string;
		servicetype: string;
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
		timeofincident: string;
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
			musculoskeletal: string;
			integumentary: string;
			reproductive: string;
			respiratory: string;
			renal: string;
		};
		generalAssessment: {
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
		procedureType: string;
		DeviceType: string;
		treatmentType: string;
		procedureStartTime: string;
		procedureEndTime: string;
	};
}
