import React, { Component } from 'react';
import * as classes from './Forecast.module.css';
import { connect } from 'react-redux';

import WeatherCard from '../../Components/WeatherCard/WeatherCard';

class Forecast extends Component {
	render () {
		const weekDays = Object.values(
			this.props.weeklyData
			// eslint-disable-next-line array-callback-return
		).map(({ weekDay, low, high, weather }) => {
			//filters days if no data exists
			if (weekDay != null) {
				return (
					<WeatherCard
						key={`${weekDay}wthrcrd`}
						Key={weekDay}
						Day={weekDay}
						High={high}
						Low={low}
						Weather={weather}
					/>
				);
			}
		});

		return (
			<div>
				This Weeks Forecast
				<div className={classes.Forecast}>{weekDays}</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		weeklyData : state.weatherData.week
	};
};

export default connect(mapStateToProps)(Forecast);
