import { Property, Object } from 'fabric-contract-api';

export class Hospital {
	@Property()
	docType: string;
	@Property()
	hospital_name: string;
	@Property()
	hospital_ID: string;
}
