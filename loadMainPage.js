import { shuffle } from "./shuffle.js";
import { createCountryObject } from "./countryDOM.js";
import { refreshCountries } from "./countryDOM.js";

const filters = document.querySelector(".section--filters");
const detailPageSection = document.querySelector(".section--detail-page");

const searchFilterText = document.querySelector(
	".searching-filter-box__filter"
);

const selectFilter = document.querySelector(".by-region-filter-box__select");

export const loadMainContent = () => {
	async function getCountriesApi() {
		const response = await fetch("https://restcountries.com/v3.1/all");
		return await response.json();
	}

	mainPageElements();

	getCountriesApi()
		.then((data) => {
			randomlyPickCountries(data);

			searchFilterText.addEventListener("input", (e) => {
				countriesBySearchingFilter(data);
			});

			selectFilter.addEventListener("change", (e) => {
				let selectedOption =
					selectFilter.options[selectFilter.selectedIndex].text;

				if (selectedOption === "All") showAllCountries(data);
				else if (selectedOption === "Random") randomlyPickCountries(data);
				else showCountriesByRegion(data, selectedOption);
			});
		})
		.catch((err) => {
			console.log(err);
		});

	function randomlyPickCountries(data) {
		const randomNumbers = [];
		for (let i = 0; i < 100; i++) {
			randomNumbers.push(i);
		}

		let random = shuffle(randomNumbers);

		refreshCountries();

		for (let i = 0; i < 12; i++) {
			createCountryObject(data, random[i]);
		}
	}

	function countriesBySearchingFilter(data) {
		const filtered = data.filter((item) =>
			item.name.common
				.toLowerCase()
				.includes(searchFilterText.value.toLowerCase().trim())
		);

		refreshCountries();

		for (let i = 0; i < filtered.length; i++) {
			createCountryObject(filtered, i);
		}
	}

	function showAllCountries(data) {
		refreshCountries();

		for (let i = 0; i < data.length; i++) {
			createCountryObject(data, i);
		}
	}

	function showCountriesByRegion(data, region) {
		const filtered = data.filter((item) =>
			item.region.toLowerCase().includes(region.toLowerCase())
		);

		refreshCountries();

		for (let i = 0; i < filtered.length; i++) {
			createCountryObject(filtered, i);
		}
	}
};

function mainPageElements() {
	filters.style.display = "flex";
	detailPageSection.style.display = "none";
}
