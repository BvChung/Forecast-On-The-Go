import WeatherApp from "./view.js";

class WeatherSearch extends WeatherApp {
	_parentElement = document.querySelector(".weather-info-container");
	_inputParentEl = document.querySelector(".info-input");
	_cityName = document.querySelector(".city-header");
	_date = document.querySelector(".city-date");
	city;

	getLocation() {
		const city = this._inputParentEl.querySelector(".input-text-search").value;
		this.city = city;
		this._displayLocation(city);
		this._clear();
		return city;
	}

	_displayLocation(city) {
		this._cityName.textContent = city;
	}

	addHandlerSearch(handler) {
		// Add to parent element so that event occurs when enter is pressed or button is clicked
		this._inputParentEl.addEventListener("submit", function (e) {
			e.preventDefault();
			handler();
		});
	}

	_clear() {
		this._inputParentEl.querySelector(".input-text-search").value = "";
	}

	_clearHTML() {
		this._parentElement.textContent = "";
	}

	generateMarkup(rainInfo, otherInfo) {
		return `
        <div class="weather-info--details">
						<div class="info-title">'
							<div class="info-header">
								<h1 class="header-primary">${rainInfo[0].typeOfWeather}</h1>
							</div>

							<div class="info-temp">
								<p>${otherInfo.currentTemp} °C</p>
							</div>
							<div class="info-logo">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="icon icon-tabler icon-tabler-sun"
									width="55"
									height="55"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="#2c3e50"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<circle cx="12" cy="12" r="4" />
									<path
										d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"
									/>
								</svg>
							</div>

							<div class="info-details">
								<div class="info-current">
									<p class="info--title">Feels Like</p>
									<div class="attribute">
										<ion-icon
											name="thermometer-outline"
											class="info-icon"
										></ion-icon
										>
										<span>
										${otherInfo.feels_like} °C</span>
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
											<span>
											${otherInfo.humidity} %</span>
										</div>
									
								</div>
								<div class="info-current">
									<p class="info--title">Chance of Rain</p>
									<div class="attribute">
										<ion-icon
											name="rainy-outline"
											class="info-icon"
										></ion-icon
										>
										<span>
										${rainInfo[0].chanceOfRain * 100} %</span>
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
										${otherInfo.wind_speed} km/h</span>
									</div>
									
								</div>
							</div>
						</div>

					</div>
        `;
	}

	displayDate() {
		const currentDate = new Date();
		const dateOptions = {
			day: "numeric",
			month: "long",
			year: "numeric",
			weekday: "long",
		};
		const locale = navigator.language;
		this._date.textContent = new Intl.DateTimeFormat(
			locale,
			dateOptions
		).format(currentDate);
	}
}

export default new WeatherSearch();
