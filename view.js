export default class WeatherApp {
	render(weeklyForecast, dailyForecast, units) {
		//   Want to check if there is no data or if the data is an empty array
		// if (!data || (Array.isArray(data) && data.length === 0))
		//   return this.renderError();

		// this._data is equal to the recipe data from the api
		// console.log(this.city);

		const markup = this.generateMarkup(weeklyForecast, dailyForecast, units);
		this._clearHTML();
		this._parentElement.insertAdjacentHTML("afterbegin", markup);
		this.insertWeatherIcon(weeklyForecast[0].weatherIcon);
	}

	addHandlerSearch(handler) {
		// Add to parent element so that event occurs when enter is pressed or button is clicked
		this._inputParentEl.addEventListener("submit", function (e) {
			e.preventDefault();
			handler();
		});
	}

	insertWeatherIcon(icon) {
		if (icon === "01d" || icon === "01n") {
			document.querySelector(
				".info-logo"
			).innerHTML = `<ion-icon class="weather-icon" name="sunny-outline"></ion-icon>`;
		}
		if (icon === "02d") {
			document.querySelector(
				".info-logo"
			).innerHTML = `<ion-icon class="weather-icon" name="partly-sunny-outline"></ion-icon>`;
		}
		if (icon === "02n") {
			document.querySelector(
				".info-logo"
			).innerHTML = `<ion-icon class="weather-icon" name="cloudy-night-outline"></ion-icon>`;
		}
		if (icon === "03d" || icon === "03n" || icon === "04d" || icon === "04n") {
			document.querySelector(
				".info-logo"
			).innerHTML = `<ion-icon class="weather-icon" name="cloud-outline"></ion-icon>`;
		}
		if (icon === "09d" || icon === "09n" || icon === "10d" || icon === "10n") {
			document.querySelector(
				".info-logo"
			).innerHTML = `<ion-icon class="weather-icon" name="rainy-outline"></ion-icon>`;
		}
		if (icon === "11d" || icon === "11n") {
			document.querySelector(
				".info-logo"
			).innerHTML = `<ion-icon class="weather-icon" name="thunderstorm-outline"></ion-icon>`;
		}
		if (icon === "13d" || icon === "13n") {
			document.querySelector(
				".info-logo"
			).innerHTML = `<ion-icon class="weather-icon" name="snow-outline"></ion-icon>`;
		}
		if (icon === "50d" || icon === "50n") {
			document.querySelector(
				".info-logo"
			).innerHTML = `<ion-icon class="weather-icon" name="barcode-outline"></ion-icon>`;
		}
	}
}
