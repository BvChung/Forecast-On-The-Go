// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
import * as model from "./model.js";

//unitType = metric or imperial (c/f)

const displayWeather = async function () {
	await model.getCoordinates("Houston", "metric");
	console.log(model.state.coord);
};
displayWeather();

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
