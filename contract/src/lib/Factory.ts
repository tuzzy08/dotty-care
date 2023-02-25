import { Record } from './Record';
import { Patient } from './Patient';
import { Hospital } from './Hospital';
import { Paramedic } from './Paramedic';
import { ParamedicNote } from './ParamedicNote';

export function createRecord({
	recordID,
	patientID,
	hospitalID,
	doctorName,
	medicalNote,
	createdAt,
}): Record {
	return {
		docType: 'record',
		recordID,
		patientID,
		hospitalID,
		doctorName,
		medicalNote,
		createdAt,
	};
}

export function createParamedicNote({
	patientID,
	noteID,
	paramedicID,
	paramedicName,
	paramedicNote,
	createdAt,
}): ParamedicNote {
	return {
		docType: 'note',
		noteID,
		patientID,
		paramedicID,
		paramedicName,
		paramedicNote,
		createdAt,
	};
}

export function createPatient(patient_ID: string, full_name: string): Patient {
	// Init permissions
	const permissions = { grantAll: true, denied: [] };
	// Create patient object
	const patient: Patient = {
		docType: 'patient',
		patient_ID,
		full_name,
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
