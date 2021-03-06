import React, { Component } from 'react';
import * as classes from './HourlyForecast.css';

import HourlyCard from '../../Components/HourlyCard/HourlyCard';

class HourlyForecast extends Component {
	state = {
		time    : [],
		temp    : [],
		weather : []
	};
	componentDidMount () {
		this.handleUpdate();
	}

	componentDidUpdate (prevProps) {
		if (this.props !== prevProps) {
			this.handleUpdate();
		}
	}

	handleUpdate = () => {
		const { time, temp, weather } = this.props.data;
		this.setState({ time: time, temp: temp, weather: weather });
	};

	render () {
		const { state: { time, temp, weather } } = this;
		let hourlyItems = [];
		for (let i = 0; i < time.length; i++) {
			hourlyItems.push(
				<HourlyCard
					key={`${time[i]}hrlycrd`}
					hour={time[i]}
					temp={`${Math.round(temp[i])}°`}
					weather={weather[i]}
				/>
			);
		}
		return (
			<div>
				{this.props.day}'s Forecast
				<div className={classes.Forecast}>{hourlyItems}</div>
			</div>
		);
	}
}

export default HourlyForecast;
