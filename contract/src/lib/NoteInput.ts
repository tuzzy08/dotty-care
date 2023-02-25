import { Property } from 'fabric-contract-api';

export class NoteInput {
	@Property()
	paramedicID: string;
	@Property()
	patientID: string;
	@Property()
	paramedicName: string;
	@Property()
	paramedicNote: string;
}
