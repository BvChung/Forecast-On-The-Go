"use strict";

import * as model from "./model.js";
import applicationDisplay from "./locationView.js";
import forecastDisplay from "./forecastView.js";

//unitType = metric or imperial (c/f)
const celcius = document.querySelector(".btn--cel");
const farenheit = document.querySelector(".btn--faren");
const error = document.querySelector(".error");
const exitError = document.querySelector(".error-exit");
let currentUnits;

function init() {
	applicationDisplay.displayDate();
	// getLocation();
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
	});

	farenheit.addEventListener("click", function () {
		currentUnits = "imperial";
		farenheit.classList.add("btn--active");
		celcius.classList.remove("btn--active");
		displayChangeOfUnits("imperial");
	});

	exitError.addEventListener("click", function () {
		error.classList.add("hidden");
	});
}

async function getLocation(units = "metric") {
	try {
		// 1) Get city from text input
		const location = applicationDisplay.getLocation();

		if (!location) return;

		// 2) Fetch API with location to get latitude and longitude of current city
		await model.getCoordinates(location, units);

		// 3. Get lat and lon from stored data from API
		const { latitude, longitude } = model.state.coord;

		if (!latitude || !longitude) return;

		// 4. Fetch API to get day/night temperatures and sunrise UNIX time of each day
		await model.weeklyForecast(latitude, longitude, units);

		// 5. Render name, current weather details and changes weather icon
		applicationDisplay.displayLocation(location);
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

async function displayChangeOfUnits(units) {
	try {
		if (!applicationDisplay.city) return;

		// Stored city from location class
		await model.getCoordinates(applicationDisplay.city, units);

		// 3. Get lat and lon from stored data from API
		const { latitude, longitude } = model.state.coord;

		if (!latitude || !longitude) return;

		// 4. Fetch API to get day/night temperatures and sunrise UNIX time of each day
		await model.weeklyForecast(latitude, longitude, units);

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

document.querySelector(".input-btn").addEventListener("click", function () {
	let input = document.querySelector(".input-text-search").value;
	let lower = input.toLowerCase();
	let output = lower[0].toUpperCase() + lower.slice(1);
	console.log(output);
});

// document.querySelector(".error").classList.remove("hidden");
