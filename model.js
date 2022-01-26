import { API_KEY } from "./config.js";
import { forecastIcon, weatherInfoIcon } from "./config.js";
import applicationDisplay from "./locationView.js";

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

		if (!res) return;

		const data = await res.json();

		if (!data) return;

		let { coord } = data;
		state.coord = {
			latitude: coord.lat,
			longitude: coord.lon,
		};
	} catch (err) {
		applicationDisplay.renderError();
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

		state.dailyForecast = {
			timezone: data.timezone,
			currentTime: data.current.dt,
			currentTemp: Math.round(data.current.temp),
			feels_like: Math.round(data.current.feels_like),
			humidity: data.current.humidity,
			wind_speed: data.current.wind_speed,
		};
		console.log(state.dailyForecast);

		const timeNow = new Date(state.dailyForecast.currentTime * 1000);
		console.log(timeNow);
		const convertedTime = timeNow.toLocaleString("en-US", {
			hour: "numeric",
			minute: "numeric",
			timeZone: state.dailyForecast.timezone,
		});

		state.weatherInfo = data.daily.map((day) => {
			return {
				dayTemperature: Math.round(day.temp.day),
				nightTemperature: Math.round(day.temp.night),
				chanceOfRain: day.pop.toFixed(2), //in two decimal places
				weather: day.weather[0].description,
				weatherIcon: day.weather[0].icon,
				sunriseUnixTime: day.sunrise,
				wind: day.wind_speed,
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
		console.log(state.dailyForecast);
		console.log(state.weatherInfo);
	} catch (err) {
		console.error(err);
	}
};
