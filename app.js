import { shuffle } from "./shuffle.js";
import { createCountryObject } from "./countryDOM.js";

async function getCountriesApi() {
	const response = await fetch("https://restcountries.com/v3.1/all");
	return await response.json();
}

getCountriesApi()
	.then((data) => {
		randomlyPickCountries(data);
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
