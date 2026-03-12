import React, { Component } from 'react';
import * as classes from './HourlyCard.module.css';
import { iconSwitch } from '../../Assets/iconUtility';

class HourlyCard extends Component {
	render () {
		const { hour, temp, weather } = this.props;

		return (
			<div>
				<div className={classes.HourlyCard}>
					<div className={classes.Hour}>{hour}</div>
					<div className={classes.Icon}>
						<img
							className={classes.Img}
							src={iconSwitch[weather]}
							alt={weather}
						/>
					</div>
					<div className={classes.Temperature}>
						<div className={classes.Temp}>{temp}</div>
					</div>
				</div>
			</div>
		);
	}
}

export default HourlyCard;
