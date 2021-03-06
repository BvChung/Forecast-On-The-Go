import WeatherView from "./view.js";

class WeatherSearch extends WeatherView {
	_parentElement = document.querySelector(".weather-info-container");
	_inputParentEl = document.querySelector(".info-input");
	_errParentEl = document.querySelector(".weather-search-container");
	_cityName = document.querySelector(".city-header");
	_date = document.querySelector(".city-date");
	city;
	_errorMessage = `No results found`;

	getLocation() {
		let input = this._inputParentEl
			.querySelector(".input-text-search")
			.value.toLowerCase();

		// Allows async function to run with default city as Austin
		if (!input) input = "Austin";
		// console.log(input);

		let output = input[0].toUpperCase() + input.slice(1);
		let city = output;

		this.city = city;
		this._clear();
		return city;
	}

	displayLocation(city) {
		this._cityName.textContent = city;
	}

	generateMarkup() {
		return `
		<div class="weather-info--details">
			<div class="info-title">
				<div class="info-temp">
					<p class="temp">${this._dataCurrent.currentTemp} ${
			this._units === "metric" ? "°C" : "°F"
		}</p>
				</div>

				<div class="info--weather">
					
					<h1 class="info-header header-primary">${
						this._dataWeekly[0].weather[0].toUpperCase() +
						this._dataWeekly[0].weather.slice(1)
					}</h1>
					
					<div class="info-logo">
					${this._dataWeekly[0].infoIcon}
					</div>
					
				</div>
	
			</div>

		<div class="info-details">
			<div class="info-current">
					<p class="info--title">Precipitation</p>
				<div class="attribute">
					<ion-icon
					name="rainy-outline"
					class="info-icon"
					></ion-icon
					>
				<span>${(this._dataWeekly[0].chanceOfRain * 100).toFixed(0)} %</span>
			</div>
		</div>

		<div class="info-current">
			<p class="info--title">Humidity</span>
			<div class="attribute">
				<ion-icon
				name="water-outline"
				class="info-icon"
				></ion-icon
				>
			<span>${this._dataCurrent.humidity} %</span>
		</div>

		</div>
			<div class="info-current">
				<p class="info--title">Wind Speed</p>
			<div class="attribute">
				<ion-icon
				name="shuffle-outline"
				class="info-icon"
				></ion-icon
				>
			<span>
				${
					this._units === "metric"
						? `${Math.round(this._dataWeekly[0].wind * 3.6)} km/h`
						: `${Math.round(this._dataWeekly[0].wind)} mph`
				}</span>
						</div>

			</div>
		<div class="info-current">
			<p class="info--title">Feels Like</p>
			<div class="attribute">
				<ion-icon
					name="thermometer-outline"
					class="info-icon"
				></ion-icon
				>
				<span>
				${this._dataCurrent.feels_like} ${this._units === "metric" ? "°C" : "°F"}</span>
			</div>
		</div>
			</div>

		</div>`;
	}

	displayDate() {
		const timeNow = new Date(this._dataCurrent.currentTime * 1000);

		const convertedTime = timeNow.toLocaleString("en-US", {
			day: "numeric",
			month: "long",
			year: "numeric",
			weekday: "long",
			timeZone: `${this._dataCurrent.timezone}`,
		});

		document.querySelector(".city-date").textContent = convertedTime;
	}

	displayTime() {
		const timeNow = new Date(this._dataCurrent.currentTime * 1000);

		const convertedTime = timeNow.toLocaleString("en-US", {
			hour: "numeric",
			minute: "numeric",
			timeZone: `${this._dataCurrent.timezone}`,
		});

		document.querySelector(".city-time--current").textContent = convertedTime;
	}
}

export default new WeatherSearch();
