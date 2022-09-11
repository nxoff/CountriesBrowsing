import { shuffle } from "./shuffle.js";

const SECTION_COUNTRIES = document.querySelector(".section--countries");
const currentCountries = [];

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

function createCountryObject(data, index) {
	const countryBox = document.createElement("div");
	const countryFlag = document.createElement("img");
	const countryName = document.createElement("h2");
	const countryPopulation = document.createElement("span");
	const countryRegion = document.createElement("span");
	const countryCapital = document.createElement("span");
	countryBox.classList.add("country-box");
	countryFlag.classList.add("country-box__flag");
	countryName.classList.add("country-box__name");
	countryPopulation.classList.add("country-box__information");
	countryRegion.classList.add("country-box__information");
	countryCapital.classList.add("country-box__information");

	countryFlag.src = data[index].flags.png;
	countryName.textContent = data[index].name.common;
	countryPopulation.textContent = "Population: " + data[index].population;
	countryRegion.textContent = "Region: " + data[index].region;
	countryCapital.textContent = "Capital: " + data[index].capital;
	countryBox.appendChild(countryFlag);
	countryBox.appendChild(countryName);
	countryBox.appendChild(countryPopulation);
	countryBox.appendChild(countryRegion);
	countryBox.appendChild(countryCapital);

	SECTION_COUNTRIES.appendChild(countryBox);
}

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
