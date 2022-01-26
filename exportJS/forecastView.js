import WeatherView from "./view.js";

class ForecastDisplay extends WeatherView {
	_parentElement = document.querySelector(".weather-forecast-container");
	_forecastParent = document.querySelector(".day--container");
	_forecast;

	renderWeekly(dataWeekly, units) {
		this._forecast = dataWeekly;
		// console.log(this._forecast, units);

		const markup = this.generateForecastMarkup();
		this._clearHTML();
		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}

	generateForecastMarkup() {
		// Iterate through the weatherInfo array from model and create one long string of html with data
		return this._forecast.map(this.generateMarkupPreview).join("");
	}

	generateMarkupPreview(result) {
		return `<div class="day--container" id='color'>
        <div class="day--title">
            <p class="week-title">${result.weekday}</p>
        </div>

        <div class="forecast-icon">
            ${result.forecastIcon}
        </div>

        <div class="day--temp">
            <span class="week-temp-high">${result.dayTemperature}°</span>
            <span class="week-temp-low">${result.nightTemperature}°</span>
        </div>
    </div>`;
	}
}

export default new ForecastDisplay();
