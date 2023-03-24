export type DoctorIncidentDetailsInput = {
	patientID: string;
	doctorName: string;
	patientName: string;
	servicetype: string;
	dateofincident: string;
	timeofincident: string;
	street: string;
	province: string;
	postalcode: string;
};
export type IncidentDetailsInput = {
	patientID: string;
	paramedicName: string;
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
export type TreatmentDetailsInput = {
	procedureStartTime: string;
	procedureType: string;
	procedureEndTime: string;
	DeviceType: string;
	treatmentType: string;
};

export type AssessmentInput = {
	normal: string;
	confused: string;
	combative: string;
	dysphasia: string;
	hallucinations: string;
	seizures: string;
	lethargic: string;
	tremors: string;
	others: string;
	cardiovascular: string;
	endocrine: string;
	centralNervousSystem: string;
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

export interface SignupData {
	email: string;
	password: string;
	options: {
		data: {
			id: string;
			accountType: string;
			name: string;
			mobile: string;
			hospitalName?: string;
			hospitalID?: string;
		};
	};
}
