import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	week            : [],
	currentWeekDays : [],
	City            : 'Stamford',
	State           : 'CT',
	Unit            : 'imperial'
};

const regionSelectStart = (state, action) => {
	return updateObject(state);
};

const regionSelectSuccess = (state, action) => {
	return updateObject(state, {
		City  : action.city,
		State : action.state,
		Unit  : action.unit
	});
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
		case actionTypes.REGION_SELECT_START:
			return regionSelectStart(state, action);
		case actionTypes.REGION_SELECT_SUCCESS:
			return regionSelectSuccess(state, action);
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
