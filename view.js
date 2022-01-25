export default class WeatherView {
	_dataCurrent;
	_dataWeekly;
	_units;
	_currentIconContainer = document.querySelector(".info-logo");

	render(dataCurrent, dataWeekly, units) {
		//   Want to check if there is no data or if the data is an empty array
		// if (!data || (Array.isArray(data) && data.length === 0))
		//   return this.renderError();

		// this._data is equal to the recipe data from the api
		this._dataCurrent = dataCurrent;
		this._dataWeekly = dataWeekly;
		this._units = units;
		console.log(this._dataCurrent, this._dataWeekly, this._units);

		const markup = this.generateMarkup();
		this._clearHTML();
		this._parentElement.insertAdjacentHTML("afterbegin", markup);
		// this._currentIconContainer.innerHTML = this._dataWeekly[0].icon;
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
		this._parentElement.innerHTML = "";
	}
}
