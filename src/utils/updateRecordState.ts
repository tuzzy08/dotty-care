import { GlobalState } from 'little-state-machine';
import { RecordState } from 'state-machine';

export function updateState(state: GlobalState, payload: any) {
	return {
		...state,
		recordState: {
			...state.recordState,
			...payload,
		},
	};
}
