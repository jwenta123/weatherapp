import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	week            : [],
	currentWeekDays : []
};

const fetchDataStart = (state) => {
	return updateObject(state);
};

const fetchDataSuccess = (state, action) => {
	return updateObject(state, {
		week            : action.week,
		currentWeekDays : action.currentWeekDays
	});
};

const fetchDataFail = (state, action) => {
	return updateObject(state);
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_DATA_SUCCESS:
			return fetchDataSuccess(state, action);
		case actionTypes.FETCH_DATA_START:
			return fetchDataStart(state, action);
		case actionTypes.FETCH_DATA_FAIL:
			return fetchDataFail(state, action);
		default:
			return state;
	}
};

export default reducer;
