class WeatherDisplay {
	#parentEl = document.querySelector(".info-input");

	getCity() {
		const location = this.#parentEl.querySelector(".input-text-search").value;
		this.#clear();
		return location;
	}

	addHandlerSearch(handler) {
		// Add to parent element so that event occurs when enter is pressed or button is clicked
		this.#parentEl.addEventListener("submit", function (e) {
			e.preventDefault();
			handler();
		});
	}

	#clear() {
		this.#parentEl.querySelector(".input-text-search").value = "";
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
}

export default new WeatherDisplay();
