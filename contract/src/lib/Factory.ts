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
	patientID: string,
	full_name: string,
	email: string
): Patient {
	// Init permissions
	const permissions = { grantAll: true, denied: [] };
	// Create patient object
	const patient: Patient = {
		docType: 'patient',
		patientID,
		full_name,
		email,
		permissions,
	};
	return patient;
}

export function createHospital(
	hospitalID: string,
	hospitalName: string
): Hospital {
	return { docType: 'hospital', hospitalID, hospitalName };
}

export function createParamedic(
	paramedicID: string,
	paramedicName: string
): Paramedic {
	return { docType: 'paramedic', paramedicID, paramedicName };
}

export const Factory = {
	createPatient,
	createRecord,
	createHospital,
	createParamedic,
	createParamedicNote,
};
