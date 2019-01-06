import { combineReducers } from 'redux';

import markers from './markerReducer';
// We would add more reducers here if needed, we do not need combine reducers at this point as we only have 1 reducer, but I will use it just from demo..

export default combineReducers({
	markers
});