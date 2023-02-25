import { Property } from 'fabric-contract-api';

export class Paramedic {
	@Property()
	docType: string;
	@Property()
	paramedic_ID: string;
	@Property()
	paramedic_name: string;
}
