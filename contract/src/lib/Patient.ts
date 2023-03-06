import { Property } from 'fabric-contract-api';
import { Permission } from './Permission';

export class Patient {
	patient_ID: string;
	full_name: string;
	email: string;
	permissions: Permission = { grantAll: true, denied: [] };
	docType: string;
}
