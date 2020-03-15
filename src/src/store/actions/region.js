import * as actionTypes from './actionTypes';

export const regionSelectStart = () => {
	return {
		type : actionTypes.REGION_SELECT_START
	};
};

export const regionSelectSuccess = (week, newWeekData) => {
	return {
		type : actionTypes.REGION_SELECT_SUCCESS
	};
};

export const regionSelected = (city, state, country, zipcode, unit) => {
	return (dispatch) => {
		dispatch(regionSelectStart());
		dispatch(regionSelectSuccess(city, state, country, zipcode, unit));
	};
};
