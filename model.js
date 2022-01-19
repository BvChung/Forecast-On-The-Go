// Stores Data from API
export const state = {
	coord: {},
	forecast: [],
};

export const getCoordinates = async function (cityName, unitType = "metric") {
	try {
		const res = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unitType}&appid=7b5dd67340ea04d52831fd0aa8f18630`
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

export const weather = async function () {
	try {
	} catch (err) {
		console.error(err);
	}
};
