// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
import * as model from "./model.js";
import locationSearch from "./view.js";

//unitType = metric or imperial (c/f)

const getLocation = async function () {
	try {
		// 1) Get city from text input
		const location = locationSearch.getCity();
		console.log(location);

		if (!location) return;

		// 2) Fetch API with location to get latitude and longitude of current city
		await model.getCoordinates(location, "metric");

		// 3. Get lat and lon from stored data from API
		const { latitude, longitude } = model.state.coord;
		console.log(latitude, longitude);

		if (!latitude || !longitude) return;

		// 4. Fetch API to get day/night temperatures and sunrise UNIX time of each day
		await model.weeklyForecast(latitude, longitude, "metric");
		console.log(model.state.dailyForecast);
		console.log(model.state.currentDayUnixTime);
		console.log(model.state.currentDayDetails);
	} catch (err) {
		console.error(err);
	}
};

const init = function () {
	locationSearch.addHandlerSearch(getLocation);
};
init();

const celcius = document.querySelector(".btn--cel");
const farenheit = document.querySelector(".btn--faren");
let currentUnits = true; //true = celcius and false = farenheit

celcius.addEventListener("click", function () {
	currentUnits = true;
	celcius.classList.toggle("btn--active");
	farenheit.classList.remove("btn--active");
	if (currentUnits) {
		console.log("celcius");
	} else {
		console.log("farenheit");
	}
});
farenheit.addEventListener("click", function () {
	currentUnits = false;
	farenheit.classList.toggle("btn--active");
	celcius.classList.remove("btn--active");
	if (currentUnits) {
		console.log("celcius");
	} else {
		console.log("farenheit");
	}
});

// Unix converter will get unix sunset time to determine what day it is sunday 0 -> forward
const unixConverter = async function (unix) {
	// Create a new JavaScript Date object based on the timestamp
	// multiplied by 1000 so that the argument is in milliseconds, not seconds.
	let date = new Date(unix * 1000);

	// sunday is 0 -> sat
	const day = date.getDay();
	console.log(day);
};
// unixConverter(1642425426);
// unixConverter(1642598200);
// unixConverter(1642511814);

const sat = new Date(`January 22, 2022`);
console.log(sat.getDay());

// Adding date
const date = document.querySelector(".city-date");
const time = document.querySelector(".city-time");

const currentDate = new Date();
const getWeekday = function (date) {
	const weekday = date.getUTCDay();
	console.log(weekday);
};
getWeekday(currentDate);

const dateOptions = {
	day: "numeric",
	month: "long",
	year: "numeric",
	weekday: "long",
};
const timeOptions = {
	hour: "numeric",
	minute: "numeric",
};

const locale = navigator.language;
console.log(locale);
console.log(dateOptions.weekday);

// date.textContent = currentDate;
date.textContent = new Intl.DateTimeFormat(locale, dateOptions).format(
	currentDate
);
time.textContent = new Intl.DateTimeFormat(locale, timeOptions).format(
	currentDate
);
