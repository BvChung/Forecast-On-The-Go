// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

//unitType = metric or imperial (c/f)

let longitude, latitude;

const weather = async function (cityName, unitType = "metric") {
	const res = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unitType}&appid=7b5dd67340ea04d52831fd0aa8f18630`
	);
	console.log(res);

	const data = await res.json();
	console.log(data);

	const { lat, lon } = data.coord;
	return lat, lon;
	// const { temp: currentTemp, temp_max: maxTemp, temp_min: minTemp } = data.main;
	// const { feels_like, humidity, pressure } = data.main;
	// const { description } = data.weather[0];
	// const { speed: windSpeed } = data.wind;

	// console.log(
	// 	lat,
	// 	lon,
	// 	currentTemp,
	// 	currentTemp,
	// 	maxTemp,
	// 	minTemp,
	// 	feels_like,
	// 	humidity,
	// 	pressure,
	// 	description,
	// 	windSpeed
	// );
};

// weather("houston", `imperial`);

// Unix converter will get unix sunset time to determine what day it is sunday 0 -> forward
const unixConverter = async function (unix) {
	// Create a new JavaScript Date object based on the timestamp
	// multiplied by 1000 so that the argument is in milliseconds, not seconds.
	let date = new Date(unix * 1000);

	// sunday is 0 -> sat
	const day = date.getDay();
	console.log(day);
};
unixConverter(1642425426);
unixConverter(1642598200);
unixConverter(1642511814);

const sat = new Date(`January 22, 2022`);
console.log(sat.getDay());
