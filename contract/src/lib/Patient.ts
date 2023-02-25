import { Property } from 'fabric-contract-api';
import { Permission } from './Permission';

export class Patient {
	@Property()
	patient_ID: string;
	@Property()
	full_name: string;
	@Property()
	permissions: Permission = { grantAll: true, denied: [] };
	@Property()
	docType: string;
}
