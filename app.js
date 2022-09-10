const SECTION_COUNTRIES = document.querySelector(".section--countries");
const POPULATION_TEXT = "Population: ";
const REGION_TEXT = "Region: ";
const CAPITAL_TEXT = "Capital: ";

async function getCountriesApi() {
	const response = await fetch("https://restcountries.com/v3.1/all");
	return await response.json();
}

getCountriesApi()
	.then((data) => {
		console.log(data);
		createArrayWithNumbers(data, 100);
	})
	.catch((err) => {
		console.log(err);
	});

function createNewCountryObject(data, path) {
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
	countryFlag.src = path;
	countryName.textContent = data.name.common;
	countryPopulation.textContent = `${POPULATION_TEXT}${data.population}`;
	countryRegion.textContent = `${REGION_TEXT}${data.region}`;
	countryCapital.textContent = `${CAPITAL_TEXT}${data.capital}`;

	countryBox.append(countryFlag);
	countryBox.append(countryName);
	countryBox.append(countryPopulation);
	countryBox.append(countryRegion);
	countryBox.append(countryCapital);
	SECTION_COUNTRIES.appendChild(countryBox);
}

function createArrayWithNumbers(data, max) {
	var max = 100;
	var random = [];
	for (var i = 1; i < max; i++) {
		var temp = Math.floor(Math.random() * max);
		if (random.indexOf(temp) == -1) {
			random.push(temp);
		} else i--;
	}
	randomlyPickCountries(data, random);
}

function randomlyPickCountries(data, array) {
	for (let i = 0; i < 12; i++) {
		let path = data[array[i]].flags.png;
		createNewCountryObject(data[array[i]], path);
	}
}
