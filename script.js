"use strict";
import * as model from "./exportJS/model.js";
import applicationDisplay from "./exportJS/locationView.js";
import forecastDisplay from "./exportJS/forecastView.js";
import { removePreload } from "./exportJS/config.js";

const celcius = document.querySelector(".btn--cel");
const farenheit = document.querySelector(".btn--faren");
const error = document.querySelector(".error");
const exitError = document.querySelector(".error-exit");
let units = "metric";

function init() {
	getLocation();
	applicationDisplay.addHandlerSearch(getLocation);
	changeUnits();
}
init();

function changeUnits() {
	celcius.addEventListener("click", function () {
		units = "metric";
		celcius.classList.add("btn--active");
		farenheit.classList.remove("btn--active");
		displayChangeOfUnits("metric");
	});

	farenheit.addEventListener("click", function () {
		units = "imperial";
		farenheit.classList.add("btn--active");
		celcius.classList.remove("btn--active");
		displayChangeOfUnits("imperial");
	});

	exitError.addEventListener("click", function () {
		error.classList.add("hidden");
	});
}

async function getLocation() {
	try {
		// 1) Get city from text input
		const location = applicationDisplay.getLocation();

		if (!location) return;

		// 2) Fetch API with location to get latitude and longitude of current city
		let { lat, lon } = await model.getCoordinates(location, units);

		// 3. Get lat and lon from stored data from API
		if (!lat || !lon) return;

		// const { latitude, longitude } = model.state.coord;
		// console.log(latitude, longitude);

		// 4. Fetch API to get day/night temperatures and sunrise UNIX time of each day
		await model.weeklyForecast(lat, lon, units);

		// 5. Render name, current weather details and changes weather icon
		applicationDisplay.displayLocation(location);
		applicationDisplay.render(
			model.state.dailyForecast,
			model.state.weatherInfo,
			units
		);

		// 6. Render weekly forecast with weekday/temp/icons
		forecastDisplay.renderWeekly(model.state.weatherInfo, units);

		removePreload();
	} catch (err) {
		console.error(err);
	}
}

async function displayChangeOfUnits() {
	try {
		if (!applicationDisplay.city) return;

		// 2) Fetch API with location to get latitude and longitude from stored city from location class
		let { lat, lon } = await model.getCoordinates(
			applicationDisplay.city,
			units
		);

		// 3. Get lat and lon from stored data from API
		if (!lat || !lon) return;

		// const { latitude, longitude } = model.state.coord;
		// console.log(latitude, longitude);

		// 4. Fetch API to get day/night temperatures and sunrise UNIX time of each day
		await model.weeklyForecast(lat, lon, units);

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
