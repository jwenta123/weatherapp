import { KEY, BASE_URL, UNIT_QUERY } from '../../api';
import axios from 'axios';
import * as actionTypes from './actionTypes';
import { format } from 'date-fns';

let CITY = 'Stamford';
let STATE = 'Connecticut';
let UNIT = 'imperial';

export const regionSelectStart = () => {
	return {
		type : actionTypes.REGION_SELECT_START
	};
};

export const regionSelectSuccess = (city, state, unit) => {
	CITY = city.trim().replace(/  +/g, '');
	STATE = state.trim().replace(/  +/g, '');
	UNIT = unit;
	return (dispatch) => {
		dispatch(fetchData());
		return {
			type  : actionTypes.REGION_SELECT_SUCCESS,
			city  : city,
			state : state,
			unit  : unit
		};
	};
};

export const regionSelected = (city, state, unit) => {
	return (dispatch) => {
		dispatch(regionSelectStart());
		dispatch(regionSelectSuccess(city, state, unit));
	};
};

export const fetchDataStart = () => {
	return {
		type : actionTypes.FETCH_DATA_START
	};
};

export const fetchDataSuccess = (week, newWeekData) => {
	return {
		type            : actionTypes.FETCH_DATA_SUCCESS,
		week            : week,
		currentWeekDays : newWeekData
	};
};

export const fetchDataFail = (error) => {
	return {
		type          : actionTypes.FETCH_DATA_FAIL,
		requestHeader : 'Failed to retrieve data',
		error         : error
	};
};

export const fetchData = () => {
	return (dispatch) => {
		dispatch(fetchDataStart());
		axios
			.get(`${BASE_URL}${CITY},${STATE},us${KEY}${UNIT_QUERY}${UNIT}`)
			.then((response) => {
				//start of data
				const { list } = response.data;
				//sets up week
				let firstDay = [];
				let secondDay = [];
				let thirdDay = [];
				let fourthDay = [];
				let fifthDay = [];
				let sixthDay = [];
				let seventhDay = [];
				//allows for mapping easily
				const days = [
					firstDay,
					secondDay,
					thirdDay,
					fourthDay,
					fifthDay,
					sixthDay,
					seventhDay
				];
				//seperates data into each weekday that has its data
				let d = 0;
				for (let i = 0; i < list.length; i++) {
					const currentDay = (arr) => {
						//returns weekday name
						return format(
							parseInt(Object.values(list[arr])[0]) * 1000,
							'EEEE'
						);
					};
					//use to compare days to seperate into different arrays
					let previousDay = currentDay(i);
					if (i > 0) {
						previousDay = currentDay(i - 1);
					}

					if (previousDay !== currentDay(i)) {
						d++;
					}
					//start of array
					if (i === 0) {
						days[0].push(Object.values(list[i]));
						//pushes data to 'd' day
					} else {
						days[d].push(Object.values(list[i]));
					}
				}
				//empty objects for use later
				let updatedFirstDay = {};
				let updatedSecondDay = {};
				let updatedThirdDay = {};
				let updatedFourthDay = {};
				let updatedFifthDay = {};
				let updatedSixthDay = {};
				let updatedSeventhDay = {};
				//function to destruct data for easy use
				function dataFilter (dayNum, dayName) {
					let time = [];
					let weekDay = [];
					let low = [];
					let high = [];
					let temp = [];
					let weather = [];
					//data comes in 3 hour increments
					//pushes all data into proper days
					days[dayNum].forEach(
						(everyThreeHours) =>
							time.push(
								format(parseInt(everyThreeHours[0]) * 1000, 'p')
							) &&
							weekDay.push(
								format(
									parseInt(everyThreeHours[0]) * 1000,
									'EEEE'
								)
							) &&
							low.push(everyThreeHours[1].temp_min) &&
							high.push(everyThreeHours[1].temp_min) &&
							temp.push(everyThreeHours[1].temp) &&
							weather.push(everyThreeHours[2][0].id)
					);
					//returns data for the day running function
					return (dayName = {
						time    : time,
						weekDay : weekDay[0],
						low     : Math.min(...low),
						high    : Math.max(...high),
						temp    : temp,
						weather : weather
					});
				}
				//added seven days for precaution
				const week = [
					dataFilter(0, updatedFirstDay),
					dataFilter(1, updatedSecondDay),
					dataFilter(2, updatedThirdDay),
					dataFilter(3, updatedFourthDay),
					dataFilter(4, updatedFifthDay),
					dataFilter(5, updatedSixthDay),
					dataFilter(6, updatedSeventhDay)
				];
				//gives array of days with data only
				const weekData = week;
				let newWeekData = weekData
					.map(({ weekDay }) => {
						return weekDay;
					})
					.filter((element) => {
						return element != null;
					});

				dispatch(fetchDataSuccess(week, newWeekData));
			})
			.catch((error) => fetchDataFail(error));
	};
};
