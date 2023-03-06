import { Property } from 'fabric-contract-api';

export class Record {
	docType: string = 'record';
	recordID: string;
	patientID: string;
	hospitalName: string;
	hospitalID: string;
	doctorName: string;
	doctorNote: string;
}
