import { ParamedicNote } from '../entities/ParamedicNote';
import { NoteState } from '../entities/types';

export interface INotesManager {
	createNote(note: CreateNoteProps): Promise<ParamedicNote>;
	// getNote(noteID: string): Promise<ParamedicNote>;
	// getNotesByPatient(patientID: string): Promise<ParamedicNote[]>;
}

export type CreateNoteProps = {
	paramedicID: string;
	paramedicEmail: string;
	patientName: string;
	noteData: NoteState;
};
