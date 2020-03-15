import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Forecast from './Container/Forecast/Forecast';
import HourlyForecast from './Container/Hourly/HourlyForecast';
import Navigation from './Components/UI/Navigation/Navigation';
import * as actions from './store/actions/index';
import { connect } from 'react-redux';

class App extends Component {
	componentDidMount () {
		this.props.onFetchData();
	}

	render () {
		let routes = null;
		//creates routes only for available days
		if (this.props.currentWeekDays !== []) {
			const weekDays = this.props.currentWeekDays;
			routes = weekDays.map((dayOfWeek) => (
				<Route path={`/${dayOfWeek}`} key={`${dayOfWeek}route`}>
					<HourlyForecast
						key={`${dayOfWeek}hrlyfrcst`}
						day={`${dayOfWeek} `}
						//return data for only the selected day
						data={this.props.week.find(
							(x) => x.weekDay === dayOfWeek
						)}
					/>
				</Route>
			));
		}

		return (
			<div className="App">
				<Navigation />
				<Switch>
					<Route path="/" exact>
						<Forecast />
					</Route>
					{routes}
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		week            : state.weatherData.week,
		currentWeekDays : state.weatherData.currentWeekDays
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchData : () => dispatch(actions.fetchData())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
