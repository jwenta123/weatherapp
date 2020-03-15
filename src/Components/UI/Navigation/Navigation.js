import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

import * as classes from './Navigation.module.css';

class Navigation extends Component {
	state = {
		optionsState : this.props.unit,
		cityInput    : this.props.city,
		stateInput   : this.props.state
	};

	onCityChangeHandler = (event) => {
		const input = event.target.value;

		this.setState({ cityInput: input });
	};

	onStateChangeHandler = (event) => {
		this.setState({ stateInput: event.target.value });
	};

	handleUnitChange = (event) => {
		this.setState({ optionsState: event.target.value });
	};

	onSubmitHandler = (city, state, unit) => {
		this.props.onChangeRegion(city, state, unit);
	};

	render () {
		const {
			state                : { optionsState, cityInput, stateInput },
			props                : { currentWeekDays },
			onCityChangeHandler,
			onStateChangeHandler,
			handleUnitChange,
			onSubmitHandler
		} = this;

		//gets week days with data
		const weekDays = currentWeekDays;
		//creates links for each day
		const navLink = weekDays.map((weekDay) => {
			return (
				<NavLink
					key={`${weekDay}nvlnk`}
					to={`/${weekDay}`}
					exact
					className={classes.Home}
					activeClassName={classes.active}
				>
					{weekDay}
				</NavLink>
			);
		});
		return (
			<div>
				<div className={classes.Navigation}>
					<NavLink
						to="/"
						exact
						className={classes.Home}
						activeClassName={classes.active}
					>
						Home
					</NavLink>
					<div className={classes.Week}>{navLink}</div>
				</div>
				<div className={classes.Region}>
					<div className={classes.RegionForm}>
						<input
							placeholder="Enter your city"
							type="text"
							required
							value={cityInput}
							onChange={onCityChangeHandler}
						/>
						<input
							placeholder="Enter your state"
							type="text"
							required
							value={stateInput}
							onChange={onStateChangeHandler}
						/>
						<select
							required
							defaultValue=""
							onChange={handleUnitChange}
						>
							<option name="" value="" disabled hidden>
								Select your option
							</option>
							<option value="metric">Metric</option>
							<option value="imperial">Imperial</option>
						</select>
						<button
							type="submit"
							value="submit"
							onClick={() =>
								onSubmitHandler(
									cityInput,
									stateInput,
									optionsState
								)}
						>
							Submit
						</button>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		city            : state.weatherData.City,
		state           : state.weatherData.State,
		unit            : state.weatherData.Unit,
		currentWeekDays : state.weatherData.currentWeekDays
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onChangeRegion : (city, state, unit) =>
			dispatch(actions.regionSelected(city, state, unit))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
