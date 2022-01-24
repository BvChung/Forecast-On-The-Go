class WeatherAppDisplay {
	_parentEl = document.querySelector(".info-input");
	_date = document.querySelector(".city-date");
	city;

	getLocation() {
		const city = this._parentEl.querySelector(".input-text-search").value;
		this._clear();
		this.city = city;
		return city;
	}

	addHandlerSearch(handler) {
		// Add to parent element so that event occurs when enter is pressed or button is clicked
		this._parentEl.addEventListener("submit", function (e) {
			e.preventDefault();
			handler();
		});
	}

	_clear() {
		this._parentEl.querySelector(".input-text-search").value = "";
	}

	displayWeatherCity() {
		const markup = `
        <div class="info-title">Scattered Clouds</div>

					<div class="info-city">
						<p>Austin</p>
					</div>

					<div class="info-date">
						<p>Tuesday, 18th Jan '22</p>
						<p>4:12 pm</p>
					</div>
					<div class="info-temp">
						<p>25 C</p>
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

export default new WeatherAppDisplay();
