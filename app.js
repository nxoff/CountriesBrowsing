import { shuffle } from "./shuffle.js";
import { createCountryObject } from "./countryDOM.js";
import { refreshCountries } from "./countryDOM.js";

const searchFilterText = document.querySelector(
	".searching-filter-box__filter"
);

async function getCountriesApi() {
	const response = await fetch("https://restcountries.com/v3.1/all");
	return await response.json();
}

getCountriesApi()
	.then((data) => {
		randomlyPickCountries(data);
		searchFilterText.addEventListener("input", (e) => {
			countriesBySearchingFilter(data);
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

	for (let i = 0; i < 12; i++) {
		createCountryObject(data, random[i]);
	}
}

function countriesBySearchingFilter(data) {
	const mapped = data;
	const filtered = mapped.filter((item) =>
		item.name.common
			.toLowerCase()
			.includes(searchFilterText.value.toLowerCase())
	);

	refreshCountries();
	for (let i = 0; i < filtered.length; i++) {
		createCountryObject(filtered, i);
	}
}
