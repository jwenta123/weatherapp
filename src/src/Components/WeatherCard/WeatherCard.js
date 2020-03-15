import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as classes from './WeatherCard.module.css';
import { iconSwitch } from '../../Assets/iconUtility';

class WeatherCard extends Component {
	onClickHandler () {
		this.props.history.push(`${this.props.Key}`);
	}

	render () {
		const { Day, High, Low, Weather } = this.props;
		return (
			<div
				className={classes.WeatherCard}
				onClick={this.onClickHandler.bind(this)}
			>
				<div className={classes.Day}>{Day}</div>
				<div className={classes.Icon}>
					<img
						className={classes.Img}
						src={iconSwitch[Weather[0]]}
						alt={Weather[0]}
					/>
				</div>
				<div className={classes.Temperature}>
					<div className={classes.High}>{`${Math.round(High)}°`}</div>
					<div className={classes.Low}>{`${Math.round(Low)}°`}</div>
				</div>
			</div>
		);
	}
}

export default withRouter(WeatherCard);
