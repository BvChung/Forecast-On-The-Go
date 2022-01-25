import { API_KEY } from "./config.js";
import { forecastIcon, weatherInfoIcon } from "./config.js";

// Stores Data from API
export const state = {
	// Store the coordinates of the city
	coord: {},

	// Store the sunrise unix time to determine current day through conversion
	currentDayUnixTime: [],

	// Store day/night temperatures of each day
	weeklyForecast: [],

	// Stores information about the current day (humidity/rain/windspeed/feelslike)
	dailyForecast: [],

	weatherInfo: [],
};

export const getCoordinates = async function (cityName, unitType = "metric") {
	try {
		const res = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unitType}&appid=${API_KEY}`
		);
		// console.log(res);

		const data = await res.json();
		// console.log(data);

		let { coord } = data;
		state.coord = {
			latitude: coord.lat,
			longitude: coord.lon,
		};
	} catch (err) {
		console.error(err);
	}
};

export const weeklyForecast = async function (lat, lon, unitType = "metric") {
	try {
		const res = await fetch(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unitType}&exclude={part}&appid=${API_KEY}`
		);
		const data = await res.json();
		console.log(data);

		let { current } = data;
		state.dailyForecast = {
			currentTemp: Math.round(current.temp),
			feels_like: Math.round(current.feels_like),
			humidity: current.humidity,
			wind_speed: current.wind_speed,
		};

		state.weatherInfo = data.daily.map((day) => {
			return {
				dayTemperature: Math.round(day.temp.day),
				nightTemperature: Math.round(day.temp.night),
				chanceOfRain: day.pop.toFixed(2), //in two decimal places
				weather: day.weather[0].main,
				weatherIcon: day.weather[0].icon,
				sunriseUnixTime: day.sunrise,
			};
		});

		// API gives 8 days want only 7
		state.weatherInfo.pop();

		// Convert sunriseUnixTime to day of week
		state.weatherInfo.forEach((el) => {
			const dayConverted = new Date(el.sunriseUnixTime * 1000);
			const dateOptions = {
				weekday: "long",
			};
			const locale = navigator.language;
			return (el.weekday = new Intl.DateTimeFormat(locale, dateOptions).format(
				dayConverted
			));
		});

		state.weatherInfo.forEach((el, i) => {
			if (i === 0) {
				return (el.infoIcon = weatherInfoIcon(el.weatherIcon));
			}
		});

		// Convert icon id from API to svg html respectively
		state.weatherInfo.forEach((el) => {
			return (el.forecastIcon = forecastIcon(el.weatherIcon));
		});
		console.log(state.weatherInfo);
	} catch (err) {
		console.error(err);
	}
};
