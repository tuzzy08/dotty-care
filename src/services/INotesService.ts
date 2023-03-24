import { ParamedicNote } from '../domain/entities/ParamedicNote';
import { CreateNoteProps } from '../domain/useCases/types';

export interface INotesService {
	createNote(note: CreateNoteProps): Promise<ParamedicNote>;
	// getNote(noteID: string): Promise<ParamedicNote>;
	// getNotesByPatient(patientID: string): Promise<ParamedicNote[]>;
}
