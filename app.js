import { Country } from "./country.js";

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

function createCountryProperties(data) {
	let newCountry = new Country(
		data[0].name.common,
		data[0].population,
		data[0].region,
		data[0].capital
	);

	currentCountries.push(newCountry);
}

function createCountryObject(data, index) {
	const countryBox = document.createElement("div");
	const countryFlag = document.createElement("img");

	countryFlag.src = data[index].flags.png;
	countryFlag.classList.add("country-box__flag");
	countryBox.appendChild(countryFlag);
	countryBox.classList.add("country-box");

	SECTION_COUNTRIES.appendChild(countryBox);
}

function randomlyPickCountries(data) {
	const randomNumbers = [];
	for (let i = 0; i < 10; i++) {
		randomNumbers.push(i);
	}
	console.log(randomNumbers);

	const desiredNumbers = [];
	for (let i = 0; i < 5; i++) {
		let rand = Math.floor(Math.random() * randomNumbers.length);
		randomNumbers.splice(rand, 1);
		console.log(rand);
		console.log(randomNumbers);
		createCountryObject(data, rand);
		rand = 0;
	}
}
