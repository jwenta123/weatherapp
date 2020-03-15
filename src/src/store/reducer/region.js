import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
const initialState = {
	City    : 'Stamford',
	State   : 'CT',
	Country : 'US',
	Zipcode : '06902',
	Unit    : 'imperial'
};

const regionSelectStart = (state, action) => {
	return updateObject(state);
};

const regionSelectSuccess = (state, action) => {
	return updateObject(state, {
		City    : action.city,
		State   : action.state,
		Country : action.country,
		Zipcode : action.zipcode,
		Unit    : action.unit
	});
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.REGION_SELECT_START:
			return regionSelectStart(state, action);
		case actionTypes.REGION_SELECT_SUCCESS:
			return regionSelectSuccess(state, action);
		default:
			return state;
	}
};

export default reducer;
