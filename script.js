// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
import * as model from "./model.js";
import applicationDisplay from "./view.js";

//unitType = metric or imperial (c/f)

const getLocation = async function (units = "metric") {
	try {
		// 1) Get city from text input
		const location = applicationDisplay.getLocation();
		console.log(location);
		console.log(applicationDisplay.city);

		if (!location) return;

		// 2) Fetch API with location to get latitude and longitude of current city
		await model.getCoordinates(location, units);

		// 3. Get lat and lon from stored data from API
		const { latitude, longitude } = model.state.coord;
		console.log(latitude, longitude);

		if (!latitude || !longitude) return;

		// 4. Fetch API to get day/night temperatures and sunrise UNIX time of each day
		await model.weeklyForecast(latitude, longitude, units);
		console.log(model.state.dailyForecast);
		console.log(model.state.currentDayDetails);
	} catch (err) {
		console.error(err);
	}
};

const init = function () {
	applicationDisplay.displayDate();
	applicationDisplay.addHandlerSearch(getLocation);
};
init();

const displayChangeOfUnits = async function (units) {
	try {
		await model.getCoordinates(applicationDisplay.city, units);

		// 3. Get lat and lon from stored data from API
		const { latitude, longitude } = model.state.coord;
		console.log(latitude, longitude);

		if (!latitude || !longitude) return;

		// 4. Fetch API to get day/night temperatures and sunrise UNIX time of each day
		await model.weeklyForecast(latitude, longitude, units);
		console.log(model.state.dailyForecast);
		console.log(model.state.currentDayDetails);
	} catch (err) {
		console.error(err);
	}
};

const celcius = document.querySelector(".btn--cel");
const farenheit = document.querySelector(".btn--faren");
let currentUnits = true; //true = celcius and false = farenheit

celcius.addEventListener("click", function () {
	currentUnits = true;
	celcius.classList.toggle("btn--active");
	farenheit.classList.remove("btn--active");
	displayChangeOfUnits("metric");
});
farenheit.addEventListener("click", function () {
	currentUnits = false;
	farenheit.classList.toggle("btn--active");
	celcius.classList.remove("btn--active");
	displayChangeOfUnits("imperial");
});

// ----------------------

// Unix converter will get unix sunset time to determine what day it is sunday 0 -> forward
const unixConverter = function (unix) {
	// Create a new JavaScript Date object based on the timestamp
	// multiplied by 1000 so that the argument is in milliseconds, not seconds.
	let date = new Date(unix * 1000);

	// sunday is 0 -> sat
	const day = date.getDay();
	console.log(day);
};
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
