import { Property } from 'fabric-contract-api';

export class RecordInput {
	@Property()
	hospitalID: string;
	@Property()
	doctorName: string;
	@Property()
	medicalNote: string;
}
