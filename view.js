export default class WeatherApp {
	_celcius = document.querySelector(".btn--cel");
	_farenheit = document.querySelector(".btn--faren");
	_currentUnits = true; //true = celcius and false = farenheit

	render(rainInfo, otherInfo) {
		//   Want to check if there is no data or if the data is an empty array
		// if (!data || (Array.isArray(data) && data.length === 0))
		//   return this.renderError();

		// this._data is equal to the recipe data from the api
		// console.log(this.city);

		const markup = this.generateMarkup(rainInfo, otherInfo);
		this._clearHTML();
		this._parentElement.insertAdjacentHTML("afterbegin", markup);
	}
}
