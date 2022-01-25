"use strict";

import * as model from "./model.js";
import applicationDisplay from "./locationView.js";
import forecastDisplay from "./forecastView.js";

//unitType = metric or imperial (c/f)
const celcius = document.querySelector(".btn--cel");
const farenheit = document.querySelector(".btn--faren");
let currentUnits; //true = celcius and false = farenheit

function init() {
	applicationDisplay.displayDate();
	getLocation();
	applicationDisplay.addHandlerSearch(getLocation);
	changeUnits();
}
init();

function changeUnits() {
	celcius.addEventListener("click", function () {
		currentUnits = "metric";
		celcius.classList.add("btn--active");
		farenheit.classList.remove("btn--active");
		displayChangeOfUnits("metric");
		console.log(currentUnits);
	});

	farenheit.addEventListener("click", function () {
		currentUnits = "imperial";
		farenheit.classList.add("btn--active");
		celcius.classList.remove("btn--active");
		displayChangeOfUnits("imperial");
		console.log(currentUnits);
	});
}

async function getLocation(units = "metric") {
	try {
		// 1) Get city from text input
		const location = applicationDisplay.getLocation();
		// console.log(location);
		// console.log(applicationDisplay.city);

		if (!location) return;

		// 2) Fetch API with location to get latitude and longitude of current city
		await model.getCoordinates(location, units);

		// 3. Get lat and lon from stored data from API
		const { latitude, longitude } = model.state.coord;
		console.log(latitude, longitude);

		if (!latitude || !longitude) return;

		// 4. Fetch API to get day/night temperatures and sunrise UNIX time of each day
		await model.weeklyForecast(latitude, longitude, units);

		// console.log(model.state.dailyForecast);
		console.log(model.state.weatherInfo);
		console.log(model.state.weatherInfo[0].weatherIcon);

		// 5. Render current weather details and changes weather icon
		applicationDisplay.render(
			model.state.dailyForecast,
			model.state.weatherInfo,
			units
		);

		// 6. Render weekly forecast with weekday/temp/icons
		forecastDisplay.renderWeekly(model.state.weatherInfo, units);

		// const ex = model.state.weatherInfo.forEach((res, i) => {
		// 	forecastDisplay.insertForecastIcon(res.weatherIcon);
		// });
		// console.log(ex);
	} catch (err) {
		console.error(err);
	}
}

async function displayChangeOfUnits(units) {
	try {
		if (!applicationDisplay.city) return;

		// Stored city from location class
		await model.getCoordinates(applicationDisplay.city, units);

		// 3. Get lat and lon from stored data from API
		const { latitude, longitude } = model.state.coord;
		console.log(latitude, longitude);

		if (!latitude || !longitude) return;

		// 4. Fetch API to get day/night temperatures and sunrise UNIX time of each day
		await model.weeklyForecast(latitude, longitude, units);

		// console.log(model.state.dailyForecast);
		console.log(model.state.weatherInfo);
		console.log(model.state.weatherInfo[0].weatherIcon);

		// 5. Render current weather details and changes weather icon
		applicationDisplay.render(
			model.state.dailyForecast,
			model.state.weatherInfo,
			units
		);

		// 6. Render weekly forecast with weekday/temp/icons
		forecastDisplay.renderWeekly(model.state.weatherInfo, units);
	} catch (err) {
		console.error(err);
	}
}

// ----------------------

// Unix converter will get unix sunset time to determine what day it is sunday 0 -> forward
function unixConverter(unix) {
	// Create a new JavaScript Date object based on the timestamp
	// multiplied by 1000 so that the argument is in milliseconds, not seconds.
	let date = new Date(unix * 1000);

	// sunday is 0 -> sat
	// const day = date.getDay();
	// console.log(day);
}
unixConverter(1642425426);
// unixConverter(1642598200);
// unixConverter(1642511814);

// Adding date
const date = document.querySelector(".city-date");
const time = document.querySelector(".city-time");

// const getWeekday = function (date) {
// 	const weekday = date.getUTCDay();
// 	console.log(weekday);
// };
// getWeekday(currentDate);

// date.textContent = currentDate;

const timeUpdate = function (locale, timeOptions) {
	setInterval(function () {
		let currentTime = new Date();

		time.textContent = new Intl.DateTimeFormat(locale, timeOptions).format(
			currentTime
		);
	}, 1000);
};
// timeUpdate(locale, timeOptions);

// time.textContent = new Intl.DateTimeFormat(locale, timeOptions).format(
// 	currentDate
// );

// const iconEx = forecastIcon("04d");
// document.querySelector(".forecast-icon").innerHTML = iconEx;
