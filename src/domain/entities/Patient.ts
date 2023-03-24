export interface Patient {
	patientID: string;
	full_name: string;
	email: string;
	permissions: Permission;
	docType: string;
}

export interface Permission {
	grantAll: boolean;
	denied: string[];
}
