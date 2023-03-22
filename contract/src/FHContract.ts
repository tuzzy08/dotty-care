import {
	Context,
	Contract,
	Info,
	Returns,
	Transaction,
} from 'fabric-contract-api';
import { Iterators } from 'fabric-shim';
import { v4 as uuidv4 } from 'uuid';
import {
	Hospital,
	Paramedic,
	Patient,
	Record,
	RecordInput,
	Factory,
	NoteInput,
	ParamedicNote,
} from './lib';

@Info({
	title: 'First Health Contract',
	description: 'Smart Contract for First Health Mgmnt systm',
})
export class FHContract extends Contract {
	public constructor() {
		super('FHContract');
	}
	@Transaction()
	public async initialize(ctx: Context) {
		console.log('init called');
		try {
			// create composite key as hospitalID
			const hospitalID = `id1`;
			// create composite key as paramedicID
			const paramedicID = `fastresp-${uuidv4()}`;
			// Create some Hospitals & Paramedics
			const new_hospital = await this.createHospital(
				ctx,
				hospitalID,
				'Acron Hospital'
			);
			const new_paramedic = await this.createParamedic(
				ctx,
				paramedicID,
				'FastResp'
			);
			console.log(new_hospital);
			console.log(new_paramedic);
		} catch (error) {
			console.log(error);
		}
		console.log('Contract Initialized');
	}

	/**
	 * Create a new patient
	 *
	 * @param {Context} ctx the transaction context
	 * @param {String} The Id of the patient
	 */
	@Transaction()
	public async createPatient(
		ctx: Context,
		patientID: string,
		fullname: string,
		email: string
	): Promise<Patient> {
		//
		// if (!this.checkValid(patientID)) throw new Error('Invalid patient ID!');
		const patient = Factory.createPatient(patientID, fullname, email);
		await ctx.stub.putState(patientID, this.marshallObject(patient));
		console.log('Patient Created');
		console.log(patient);
		return patient;
	}

	/**
	 * Create a new record to be added to list of records for a given patient
	 *
	 * @param {Context} ctx the transaction context
	 * @param {String} The Id of the patient
	 */
	@Transaction()
	public async createRecord(ctx: Context, data: string): Promise<Record> {
		// if (!this.checkValid(patientID)) throw new Error('Invalid patient ID!');
		// TODO: CHECK TO ENSURE ONLY PATIENTS CAN CALL THIS FUNCTION
		console.log('Record');
		console.log(data);
		const dataAsObject = JSON.parse(data);
		const record: Record = Factory.createRecord(dataAsObject);
		await ctx.stub.putState(dataAsObject.recordID, this.marshallObject(record));
		console.log('Record Saved');
		console.log(record);
		return record;
	}

	@Transaction()
	public async createHospital(
		ctx: Context,
		hospitalID: string,
		hospitalName: string
	): Promise<Hospital> {
		const hospital = Factory.createHospital(hospitalID, hospitalName);
		console.log(hospital);
		await ctx.stub.putState(hospitalID, this.marshallObject(hospital));
		return hospital;
	}

	@Transaction()
	public async createParamedic(
		ctx: Context,
		paramedicID: string,
		paramedicName: string
	): Promise<Paramedic> {
		const paramedic = Factory.createParamedic(paramedicID, paramedicName);
		console.log(paramedic);
		await ctx.stub.putState(paramedicID, this.marshallObject(paramedic));
		return paramedic;
	}

	/**
	 * Create a new record to be added to list of records for a given patient
	 *
	 * @param {Context} ctx the transaction context
	 * @param {String} The Id of the patient
	 */
	@Transaction()
	public async createParamedicNote(ctx: Context, data: string) {
		console.log(data);
		const dataAsObject = JSON.parse(data);
		// if (!this.checkValid(dataAsObject.patientID)) throw new Error('Invalid patient ID!');
		// TODO: CHECK TO ENSURE ONLY PATIENTS CAN CALL THIS FUNCTION
		const note: ParamedicNote = Factory.createParamedicNote(dataAsObject);
		await ctx.stub.putState(dataAsObject.noteID, this.marshallObject(note));
		console.log('Note Saved');
		console.log(note);
		return note;
	}

	/**
	 * Suspend access to the patient's records for a given hospital
	 *
	 * @param {Context} ctx the transaction context
	 * @param {String} The Id of the hospital
	 */
	@Transaction()
	public async suspendAccess(
		ctx: Context,
		patientID: string,
		hospitalID: string
	) {
		const hospitalAsBytes = await ctx.stub.getState(hospitalID);
		console.log('Hospital as bytes');
		console.log(hospitalAsBytes);
		if (hospitalAsBytes) {
			const patientAsBytes = await ctx.stub.getState(patientID);
			if (patientAsBytes) {
				const patient: Patient = JSON.parse(patientAsBytes.toString());
				const hospital: Hospital = JSON.parse(hospitalAsBytes.toString());
				patient.permissions.grantAll = false;
				patient.permissions.denied.push(hospital.hospitalID);
				console.log('Patient Object');
				console.log(patient);
				await ctx.stub.putState(patientID, this.marshallObject(patient));
				console.log(`Access Suspended for ${hospital.hospitalName}`);
				return `Access Suspended for ${hospital.hospitalName}`;
			}
		}
	}

	/**
	 * Grant access to the patient's records for a given hospital
	 *
	 * @param {Context} ctx the transaction context
	 * @param {String} The Id of the hospital
	 */
	@Transaction()
	public async grantAccess(
		ctx: Context,
		patientID: string,
		hospitalID: string
	) {
		const hospitalAsBytes = await ctx.stub.getState(hospitalID);
		if (hospitalAsBytes) {
			const patientAsBytes = await ctx.stub.getState(patientID);
			if (patientAsBytes) {
				const patient: Patient = JSON.parse(patientAsBytes.toString());
				const hospital: Hospital = JSON.parse(hospitalAsBytes.toString());
				const index = patient.permissions.denied.indexOf(hospitalID);
				if (index > -1) {
					patient.permissions.denied.splice(index, 1);
					if (patient.permissions.denied.length < 1) {
						patient.permissions.grantAll = true;
					}
					await ctx.stub.putState(
						patient.patientID,
						this.marshallObject(patient)
					);
					console.log(`Access Granted for ${hospital.hospitalName}`);
					return `Access Granted for ${hospital.hospitalName}`;
				}
			}
		}
	}

	/**
	 * Get client(Invoker) details given the context
	 *
	 * @param {Context} ctx the transaction context
	 */
	@Transaction(false)
	public async getClient(ctx: Context) {
		console.log(ctx.stub.getCreator());
		const { idBytes } = ctx.stub.getCreator();
		return String.fromCharCode(...idBytes);
	}
	// QUERIES

	// This is an example of a parameterized query where the query logic is baked into the chaincode,
	// and accepting a single query parameter (owner).
	// Only available on state databases that support rich query (e.g. CouchDB)
	// Example: Parameterized rich query
	@Transaction(false)
	async QueryRecordsByPatient(ctx: Context, patientID: string) {
		let queryString: any = {};
		queryString.selector = {};
		queryString.selector.docType = 'record';
		queryString.selector.patientID = patientID;
		return await this.GetQueryResultForQueryString(
			ctx,
			JSON.stringify(queryString)
		); //shim.success(queryResults);
	}

	@Transaction(false)
	async QueryNotesByPatient(ctx: Context, patientID: string) {
		let queryString: any = {};
		queryString.selector = {};
		queryString.selector.docType = 'note';
		queryString.selector.patientID = patientID;
		return await this.GetQueryResultForQueryString(
			ctx,
			JSON.stringify(queryString)
		); //shim.success(queryResults);
	}

	@Transaction(false)
	async GetNoteByID(ctx: Context, noteID: string) {
		let queryString: any = {};
		queryString.selector = {};
		queryString.selector.docType = 'note';
		queryString.selector.noteID = noteID;
		return await this.GetQueryResultForQueryString(
			ctx,
			JSON.stringify(queryString)
		); //shim.success(queryResults);
	}

	@Transaction(false)
	async QueryNotesByHospital(ctx: Context, patientID: string) {
		let queryString: any = {};
		queryString.selector = {};
		queryString.selector.docType = 'note';
		queryString.selector.patientID = patientID;
		return await this.GetQueryResultForQueryString(
			ctx,
			JSON.stringify(queryString)
		); //shim.success(queryResults);
	}
	@Transaction(false)
	async QueryNotesByParamedic(ctx: Context, paramedicID: string) {
		let queryString: any = {};
		queryString.selector = {};
		queryString.selector.docType = 'note';
		queryString.selector.paramedicID = paramedicID;
		return await this.GetQueryResultForQueryString(
			ctx,
			JSON.stringify(queryString)
		); //shim.success(queryResults);
	}
	/***
	 * This function is only intended to be called by the hospital client
	 */
	@Transaction(false)
	async getRecordsForPatient(
		ctx: Context,
		patientID: string,
		hospitalID: string
	) {
		const patient = await this.getPatient(ctx, patientID);
		if (patient) {
			const { permissions } = patient;
			const records = await this.QueryRecordsByPatient(ctx, patientID);
			if (!permissions.grantAll) {
				if (permissions.denied.includes(hospitalID)) {
					return {
						status: 'denied',
						message: `Access Denied!`,
					};
				}
			}
			return records;
		}
	}

	@Transaction(false)
	async getPatient(ctx: Context, patientID: string): Promise<Patient> {
		const patientAsBytes = await ctx.stub.getState(patientID);
		if (!patientAsBytes || patientAsBytes.length === 0) {
			throw new Error(`Patient with ID ${patientID} does not exist`);
		}
		return JSON.parse(patientAsBytes.toString());
	}

	@Transaction(false)
	async getHospital(ctx: Context, hospitalID: string) {
		const hospitalAsBytes = await ctx.stub.getState(hospitalID);
		if (!hospitalAsBytes || hospitalAsBytes.length === 0) {
			throw new Error(`Hospital with ID ${hospitalID} does not exist`);
		}
		return JSON.parse(hospitalAsBytes.toString());
	}

	@Transaction(false)
	async getParamedic(ctx: Context, paramedicID: string) {
		const paramedicAsBytes = await ctx.stub.getState(paramedicID);
		if (!paramedicAsBytes || paramedicAsBytes.length === 0) {
			throw new Error(`Paramedic with ID ${paramedicID} does not exist`);
		}
		return JSON.parse(paramedicAsBytes.toString());
	}

	@Transaction(false)
	async getAllHospitals(ctx: Context) {
		let queryString: any = {};
		queryString.selector = {};
		queryString.selector.docType = 'hospital';
		return await this.GetQueryResultForQueryString(
			ctx,
			JSON.stringify(queryString)
		);
	}
	// Query string matching state database syntax is passed in and executed as is.
	// Supports ad hoc queries that can be defined at runtime by the client.
	@Transaction(false)
	async QueryRecords(ctx: Context, queryString: string) {
		return await this.GetQueryResultForQueryString(ctx, queryString);
	}

	// GetQueryResultForQueryString executes the passed in query string.
	// Result set is built and returned as a byte array containing the JSON results.
	@Transaction(false)
	async GetQueryResultForQueryString(ctx: Context, queryString: string) {
		let allResults = [];
		let resultsIterator = ctx.stub.getQueryResult(queryString);
		console.log('iterator');
		console.log(resultsIterator);
		for await (const res of resultsIterator) {
			console.log(res);
			allResults.push(res.value.toString());
		}
		// let results = await this.GetAllResults(resultsIterator);

		return JSON.stringify(allResults);
	}

	marshallObject(data: any) {
		return Buffer.from(JSON.stringify(data));
	}

	checkValid(value: string) {
		return value && typeof value === 'string';
	}
}
