import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { NotesService } from '../../src/services/NotesService';
import { CreateNoteProps } from '../../src/domain/useCases/types';
import { ParamedicNote } from '../../src/domain/entities/ParamedicNote';

jest.mock('axios');

describe('NotesService', () => {
	let notesService: NotesService;

	beforeEach(() => {
		notesService = new NotesService();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe('createNote', () => {
		it('should create a new paramedic note successfully', async () => {
			const noteID = uuidv4();
			const payload: CreateNoteProps = {
				patientName: 'John Smith',
				paramedicID: 'abc123',
				paramedicEmail: 'john.smith@example.com',
				noteData: {
					noteID,
					patientID: '123-ba3',
					patientName: 'John Smith',
					paramedicID: 'abc123',
					paramedicName: 'Frank Ed',
					paramedicEmail: 'john.smith@example.com',
					incidentDetails: {
						servicecode: '123',
						servicetype: 'emergency',
						dateofincident: '2023-03-24',
						timeofincident: '15:00',
						street: '123 Main St',
						province: 'ON',
						postalcode: 'A1B 2C3',
						destinationstreet: '456 Secondary St',
						destinationprovince: 'ON',
						destinationpostalcode: 'D4E 5F6',
						responsibility: 'paramedic',
						number: '456',
						factors: 'unknown',
						disposition: 'transport',
					},
					assessmentDetails: {
						neuroResponse: {
							normal: 'Yes',
							confused: '',
							combative: '',
							dysphasia: '',
							hallucinations: '',
							seizures: '',
							lethargic: '',
							tremors: '',
							others: '',
						},
						bodyAssessment: {
							cardiovascular: '',
							endocrine: '',
							centralNervousSystem: '',
							gI: '',
							musculoskeletal: '',
							integumentary: '',
							reproductive: '',
							respiratory: '',
							renal: '',
						},
						generalAssessment: {
							gI: '',
							musculoskeletal: '',
							integumentary: '',
							reproductive: '',
							respiratory: '',
							renal: '',
							asthma: '',
							cHF: '',
							diabetes: '',
							hypertension: '',
							seizureDisorder: '',
							stroke: '',
							cancer: '',
							cOPD: '',
							angina: '',
							myocardialInfraction: '',
							renalDisease: '',
							psychiatricIllness: '',
							dNROrder: '',
							other: '',
						},
					},
					treatmentDetails: {
						procedureStartTime: '',
						procedureType: '',
						procedureEndTime: '',
						deviceType: '',
						treatmentType: '',
					},
				},
			};

			const data = {
				response: {
					...payload.noteData,
				},
			};
			(
				axios.post as jest.MockedFunction<typeof axios.post>
			).mockResolvedValueOnce({ data });

			const result = await notesService.createNote(payload);

			expect(axios.post).toHaveBeenCalledTimes(1);
			expect(axios.post).toHaveBeenCalledWith('/api/notes/create', {
				...payload.noteData,
			});
			expect(result).toEqual(data.response);
			expect(result.noteID).toBeDefined();
			expect(result.incidentDetails).toEqual(payload.noteData.incidentDetails);
		});

		// it('should log an error if creating a new paramedic note fails', async () => {
		//   const createNoteProps: CreateNoteProps = {
		//     patientName: 'John Doe',
		//     noteData: {
		//       title: 'Sample Note',
		//       body: 'This is a sample note',
		//     },
		//     paramedicID: '123',
		//     paramedicEmail: 'test@example.com',
		//   };

		//   const error = new Error('Failed to create note');
		//   (axios.post as jest.MockedFunction<typeof axios.post>).mockRejectedValueOnce(error);

		//   const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

		//   const result = await notesService.createNote(createNoteProps);

		//   expect(axios.post).toHaveBeenCalledTimes(1);
		//   expect(axios.post).toHaveBeenCalledWith('/api/notes/create', {
		//     ...createNoteProps.noteData,
		//     noteID: expect.any(String),
		//     paramedicID: createNoteProps.paramedicID,
		//     paramedicEmail: createNoteProps.paramedicEmail,
		//     patientName: createNoteProps.patientName,
		//   });
		//   expect(result).toBeNull();
		//   expect(consoleSpy).toHaveBeenCalledWith(error);
		// });
	});
});
