export const API = `7b5dd67340ea04d52831fd0aa8f18630`;

export const removePreload = function () {
	document.querySelector(".preload").classList.add("preload-off");
};

export const forecastIcon = function (icon) {
	if (icon === "01d" || icon === "01n") {
		return `<ion-icon class="weather-icon-forecast" name="sunny-outline"></ion-icon>`;
	}
	if (icon === "02d") {
		return `<ion-icon class="weather-icon-forecast" name="partly-sunny-outline"></ion-icon>`;
	}
	if (icon === "02n") {
		return `<ion-icon class="weather-icon-forecast" name="cloudy-night-outline"></ion-icon>`;
	}
	if (icon === "03d" || icon === "03n" || icon === "04d" || icon === "04n") {
		return `<ion-icon class="weather-icon-forecast
		" name="cloud-outline"></ion-icon>`;
	}
	if (icon === "09d" || icon === "09n" || icon === "10d" || icon === "10n") {
		return `<ion-icon class="weather-icon-forecast" name="rainy-outline"></ion-icon>`;
	}
	if (icon === "11d" || icon === "11n") {
		return `<ion-icon class="weather-icon-forecast" name="thunderstorm-outline"></ion-icon>`;
	}
	if (icon === "13d" || icon === "13n") {
		return `<ion-icon class="weather-icon-forecast" name="snow-outline"></ion-icon>`;
	}
	if (icon === "50d" || icon === "50n") {
		return `<ion-icon class="weather-icon-forecast" name="barcode-outline"></ion-icon>`;
	}
};

export const weatherInfoIcon = function (icon) {
	if (icon === "01d" || icon === "01n") {
		return `<ion-icon class="weather-icon-current" name="sunny-outline"></ion-icon>`;
	}
	if (icon === "02d") {
		return `<ion-icon class="weather-icon-current" name="partly-sunny-outline"></ion-icon>`;
	}
	if (icon === "02n") {
		return `<ion-icon class="weather-icon-current" name="cloudy-night-outline"></ion-icon>`;
	}
	if (icon === "03d" || icon === "03n" || icon === "04d" || icon === "04n") {
		return `<ion-icon class="weather-icon-current
		" name="cloud-outline"></ion-icon>`;
	}
	if (icon === "09d" || icon === "09n" || icon === "10d" || icon === "10n") {
		return `<ion-icon class="weather-icon-current" name="rainy-outline"></ion-icon>`;
	}
	if (icon === "11d" || icon === "11n") {
		return `<ion-icon class="weather-icon-current" name="thunderstorm-outline"></ion-icon>`;
	}
	if (icon === "13d" || icon === "13n") {
		return `<ion-icon class="weather-icon-current" name="snow-outline"></ion-icon>`;
	}
	if (icon === "50d" || icon === "50n") {
		return `<ion-icon class="weather-icon-current" name="barcode-outline"></ion-icon>`;
	}
};
