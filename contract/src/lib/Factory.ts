import { Record } from './Record';
import { Patient } from './Patient';
import { Hospital } from './Hospital';
import { Paramedic } from './Paramedic';
import { ParamedicNote } from './ParamedicNote';

export function createRecord(data): Record {
	data.docType = 'record';
	return data;
}

export function createParamedicNote(data): ParamedicNote {
	data.docType = 'note';
	return data;
}

export function createPatient(
	patient_ID: string,
	full_name: string,
	email: string
): Patient {
	// Init permissions
	const permissions = { grantAll: true, denied: [] };
	// Create patient object
	const patient: Patient = {
		docType: 'patient',
		patient_ID,
		full_name,
		email,
		permissions,
	};
	return patient;
}

export function createHospital(
	hospital_ID: string,
	hospital_name: string
): Hospital {
	return { docType: 'hospital', hospital_ID, hospital_name };
}

export function createParamedic(
	paramedic_ID: string,
	paramedic_name: string
): Paramedic {
	return { docType: 'paramedic', paramedic_ID, paramedic_name };
}

export const Factory = {
	createPatient,
	createRecord,
	createHospital,
	createParamedic,
	createParamedicNote,
};
