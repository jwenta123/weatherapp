import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

import * as classes from './Navigation.module.css';

class Navigation extends Component {
	render () {
		console.log(
			this.props.city,
			this.props.state,
			this.props.country,
			this.props.zipcode,
			this.props.unit
		);
		//gets week days with data
		const weekDays = this.props.currentWeekDays;
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
		);
	}
}

const mapStateToProps = (state) => {
	return {
		city            : state.regionData.City,
		state           : state.regionData.State,
		country         : state.regionData.Country,
		zipcode         : state.regionData.Zipcode,
		unit            : state.regionData.Unit,
		currentWeekDays : state.weekForecast.currentWeekDays
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onChangeRegion : (city, state, country, zipcode, unit) =>
			dispatch(
				actions.regionSelected(city, state, country, zipcode, unit)
			)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
