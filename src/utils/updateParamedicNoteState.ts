import { GlobalState } from 'little-state-machine';
import { ParamedicNoteState } from 'state-machine';

export function updateState(state: GlobalState, payload: any) {
	return {
		...state,
		paramedicNoteState: {
			...state.paramedicNoteState,
			...payload,
		},
	};
}
