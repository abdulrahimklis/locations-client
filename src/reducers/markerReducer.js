const initalState = {
	request: { pending: false, error: false, fulfilled: false },
	markersData: [
	],
	showMarkers: true
};

export default function reducer (state = initalState, action) {
	switch (action.type) {
		case 'GET_MARKERS':
		break;
		case 'GET_MARKERS_PENDING':
			return {
				...state,
				request: { ...state.request, pending: true, error: false, fulfilled: false }
			};
		case 'GET_MARKERS_REJECTED':
			return {
				...state,
				request: { ...state.request, pending: false, error: true, fulfilled: false }
			};
		case 'GET_MARKERS_FULFILLED':
			return {
				...state,
				request: { ...state.request, pending: false, error: false, fulfilled: true },
				markersData: action.payload
			}
		case 'TOGGLE_MARKERS':
			return {
				...state,
				showMarkers: !state.showMarkers
			}
		default:
			return state;
	}
}

