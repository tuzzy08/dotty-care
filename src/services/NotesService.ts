import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { ParamedicNote } from '../domain/entities/ParamedicNote';
import { CreateNoteProps } from '../domain/useCases/types';
import { INotesService } from './INotesService';

export class NotesService implements INotesService {
	// Create a new paramedic note
	async createNote({
		patientName,
		noteData,
		paramedicID,
		paramedicEmail,
	}: CreateNoteProps): Promise<ParamedicNote> {
		let response = null;
		const noteID = `${uuidv4()}`;
		try {
			noteData.noteID = noteID;
			noteData.paramedicID = paramedicID;
			noteData.paramedicEmail = paramedicEmail;
			noteData.patientName = patientName;

			const { data } = await axios.post('/api/notes/create', noteData);
			response = data.response;
		} catch (error) {
			console.log(error);
		}
		return response;
	}

	// async getNote(noteID: string): Promise<ParamedicNote> {

	// }

	// async getNotesByPatient(patientID: string): Promise<ParamedicNote[]> {

	// }
}
