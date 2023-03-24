import { v4 as uuidv4 } from 'uuid';
import { NoteState } from '../entities/types';
import { ParamedicNote } from '../entities/ParamedicNote';
import { NotesManager } from './notesManager';
import { NotesService } from '../../services/NotesService';
import { CreateNoteProps } from './types';

type ReturnType = {};

export function useNote() {
	const notesManager = new NotesManager(new NotesService());

	async function createParamedicNote(
		data: CreateNoteProps
	): Promise<ParamedicNote> {
		return notesManager.createNote(data);
	}

	async function getParamedicNotebyPatient() {}

	async function getParamedicNotebyId() {}

	return {
		createParamedicNote,
		getParamedicNotebyPatient,
		getParamedicNotebyId,
	};
}
