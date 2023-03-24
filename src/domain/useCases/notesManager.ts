import { NotesService } from '../../services/NotesService';
import { ParamedicNote } from '../entities/ParamedicNote';
import { INotesManager, CreateNoteProps } from './types';

export class NotesManager implements INotesManager {
	constructor(private readonly notesService: NotesService) {}

	async createNote(note: CreateNoteProps): Promise<ParamedicNote> {
		return this.notesService.createNote(note);
	}

	// async getNote(noteID: string): Promise<ParamedicNote> {
	// 	return this.notesService.getNote(noteID);
	// }

	// async getNotesByPatient(patientID: string): Promise<ParamedicNote[]> {
	// 	return this.notesService.getNotesByPatient(patientID);
	// }
}

// export function useNote(notesService: NotesService) {
// 	return new NotesManager(notesService);
// }
