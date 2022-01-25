import WeatherApp from "./view.js";

class WeatherSearch extends WeatherApp {
	_parentElement = document.querySelector(".weather-info-container");
	_inputParentEl = document.querySelector(".info-input");
	_cityName = document.querySelector(".city-header");
	_date = document.querySelector(".city-date");
	city;

	getLocation() {
		let city = this._inputParentEl.querySelector(".input-text-search").value;
		if (!city) city = "Houston";
		this.city = city;
		this._displayLocation(city);
		this._clear();
		return city;
	}

	_displayLocation(city) {
		this._cityName.textContent = city;
	}

	_clear() {
		this._inputParentEl.querySelector(".input-text-search").value = "";
	}

	_clearHTML() {
		this._parentElement.innerHTML = "";
	}

	generateMarkup(weeklyForecast, dailyForecast, units) {
		if (units === "metric") {
			return `
			<div class="weather-info--details">
							<div class="info-title">
								<div class="info-header">
								<h1 class="header-primary">${weeklyForecast[0].weather}</h1>
								</div>
	
								<div class="info-temp">
									<p>${dailyForecast.currentTemp} °C</p>
								</div>
								<div class="info-logo">
									<ion-icon class="weather-icon" name="sunny-outline"></ion-icon>
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
											${dailyForecast.feels_like} °C</span>
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
												${dailyForecast.humidity} %</span>
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
											${(weeklyForecast[0].chanceOfRain * 100).toFixed(0)} %</span>
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
											${dailyForecast.wind_speed} km/h</span>
										</div>
										
									</div>
								</div>
							</div>
							
	
						</div>
			`;
		}

		if (units === "imperial") {
			return `
			<div class="weather-info--details">
							<div class="info-title">
								<div class="info-header">
								<h1 class="header-primary">${weeklyForecast[0].weather}</h1>
								</div>
	
								<div class="info-temp">
									<p>${dailyForecast.currentTemp} °F</p>
								</div>
								<div class="info-logo">
									<ion-icon class="weather-icon" name="sunny-outline"></ion-icon>
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
											${dailyForecast.feels_like} °F</span>
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
												${dailyForecast.humidity} %</span>
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
											${(weeklyForecast[0].chanceOfRain * 100).toFixed(0)} %</span>
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
											${dailyForecast.wind_speed} mph</span>
										</div>
										
									</div>
								</div>
							</div>
							
	
						</div>
			`;
		}
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
