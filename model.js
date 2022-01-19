import { API_KEY } from "./config.js";

// Stores Data from API
export const state = {
	// Store the coordinates of the city
	coord: {},

	// Store the sunrise unix time to determine current day through conversion
	currentDayUnixTime: [],

	// Store day/night temperatures of each day
	dailyForecast: [],
};

export const getCoordinates = async function (cityName, unitType = "metric") {
	try {
		const res = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unitType}&appid=${API_KEY}`
		);
		console.log(res);

		const data = await res.json();
		console.log(data);

		const { coord } = data;
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

		state.dailyForecast = data.daily.map((day) => {
			return {
				dayTemperature: day.temp.day,
				nightTemperature: day.temp.night,
			};
		});

		state.currentDayUnixTime = data.daily.map((day) => {
			return {
				sunriseUnixTime: day.sunrise,
			};
		});
	} catch (err) {
		console.error(err);
	}
};
