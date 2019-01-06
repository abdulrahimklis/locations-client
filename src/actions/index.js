import { markers } from '../api';

export function getMarkers() {
	const res = markers.list();
	return {
		type: 'GET_MARKERS',
		payload: res
	}
}
export function toggleMarkers() {
	return {
		type: 'TOGGLE_MARKERS',
		payload: undefined
	}
}

