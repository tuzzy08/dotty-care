import { Property, Object } from 'fabric-contract-api';

export class NoteInput {
	// @Property()
	noteID: string;
	// @Property()
	patientID;
	// @Property()
	paramedicID: string;
	// @Property()
	paramedicName: string;
	// @Property()
	paramedicNote: string;
}
