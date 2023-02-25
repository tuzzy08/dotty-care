import { Property } from 'fabric-contract-api';

export class Record {
	@Property()
	docType: string = 'record';
	@Property()
	recordID: string;
	@Property()
	patientID: string;
	@Property()
	hospitalID: string;
	@Property()
	doctorName: string;
	@Property()
	medicalNote: string;
	@Property()
	createdAt: string;

	// public async addNote(note: string) {
	// 	if (this.medicalNote !== null) {
	// 		throw new Error('Note already created for this record!');
	// 	}
	// 	if (Record.checkValid(note)) {
	// 		this.medicalNote = note;
	// 	}
	// }
	// private static checkValid(data: string) {
	// 	return data && data !== '';
	// }
}
