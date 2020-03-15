function importAll (r) {
	let images = {};
	// eslint-disable-next-line array-callback-return
	r.keys().map((item) => {
		images[item.replace('./', '')] = r(item);
	});
	return images;
}

const images = importAll(require.context('./', false, /\.(png|jpe?g|svg)$/));

export const cloudy1 = images['cloudy-day-1.svg'];
export const cloudy2 = images['cloudy-day-2.svg'];
export const cloudy3 = images['cloudy-day-3.svg'];
export const cloudyNight1 = images['cloudy-night-1.svg'];
export const cloudyNight2 = images['cloudy-night-2.svg'];
export const cloudyNight3 = images['cloudy-night-3.svg'];
export const cloudy = images['cloudy.svg'];
export const day = images['day.svg'];
export const night = images['night.svg'];
export const rainy1 = images['rainy-1.svg'];
export const rainy2 = images['rainy-2.svg'];
export const rainy3 = images['rainy-3.svg'];
export const rainy4 = images['rainy-4.svg'];
export const rainy5 = images['rainy-5.svg'];
export const rainy6 = images['rainy-6.svg'];
export const rainy7 = images['rainy-7.svg'];
export const snowy1 = images['snowy-1.svg'];
export const snowy2 = images['snowy-2.svg'];
export const snowy3 = images['snowy-3.svg'];
export const snowy4 = images['snowy-4.svg'];
export const snowy5 = images['snowy-5.svg'];
export const snowy6 = images['snowy-6.svg'];
export const thunder = images['thunder.svg'];
export const sagittarius = images['weatherSagittarius.svg'];
export const sunset = images['weatherSunset.svg'];
export const sprite = images['weatherSprite.svg'];
export const weather = images['weather.svg'];
