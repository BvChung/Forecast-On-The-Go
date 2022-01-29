import { API } from "./config.js";
import { forecastIcon, weatherInfoIcon } from "./config.js";
import applicationDisplay from "./locationView.js";

// Stores Data from API
export const state = {
	// Stores information about the current day (humidity/rain/windspeed/feelslike)
	dailyForecast: [],

	// Stores forecast information
	weatherInfo: [],
};

export const getCoordinates = async function (cityName, unitType = "metric") {
	try {
		const res = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unitType}&appid=${API}`
		);

		if (!res) return;

		const data = await res.json();

		if (!data) return;

		let { lat, lon } = data.coord;

		return { lat, lon };
	} catch (err) {
		applicationDisplay.renderError();
		console.error(err);
	}
};

export const weeklyForecast = async function (lat, lon, unitType = "metric") {
	try {
		const res = await fetch(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unitType}&exclude={part}&appid=${API}`
		);
		if (!res) return;

		const data = await res.json();

		if (!data) return;
		// console.log(data);

		state.dailyForecast = {
			timezone: data.timezone,
			currentTime: data.current.dt,
			currentTemp: Math.round(data.current.temp),
			feels_like: Math.round(data.current.feels_like),
			humidity: data.current.humidity,
			wind_speed: data.current.wind_speed,
		};
		// console.log(state.dailyForecast);

		state.weatherInfo = data.daily.map((day) => {
			return {
				dayTemperature: Math.round(day.temp.day),
				nightTemperature: Math.round(day.temp.night),
				chanceOfRain: day.pop.toFixed(2), //in two decimal places
				weather: day.weather[0].description,
				weatherIcon: day.weather[0].icon,
				unixTime: day.dt,
				wind: day.wind_speed,
			};
		});

		// API gives 8 days want only 7
		state.weatherInfo.pop();

		// Convert unixtime to day of week
		state.weatherInfo.forEach((el) => {
			const dayConverted = new Date(el.unixTime * 1000);
			const convertedWeekday = dayConverted.toLocaleString("en-US", {
				weekday: "long",
				timeZone: `${state.dailyForecast.timezone}`,
			});
			return (el.weekday = convertedWeekday);
		});

		// Convert icon id from API to current svg icon
		state.weatherInfo.forEach((el, i) => {
			if (i === 0) {
				return (el.infoIcon = weatherInfoIcon(el.weatherIcon));
			}
		});

		// Convert icon id from API to forecast svg icons html respectively
		state.weatherInfo.forEach((el) => {
			return (el.forecastIcon = forecastIcon(el.weatherIcon));
		});
		// console.log(state.dailyForecast);
		// console.log(state.weatherInfo);
	} catch (err) {
		console.error(err);
	}
};
