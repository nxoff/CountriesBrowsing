const SECTION_COUNTRIES = document.querySelector(".section--countries");

async function getCountriesApi() {
	const response = await fetch("https://restcountries.com/v3.1/all");
	return await response.json();
}

getCountriesApi()
	.then((data) => {
		createArrayWithNumbers(data, 100);
	})
	.catch((err) => {
		console.log(err);
	});

function createNewCountryObject(path) {
	const countryBox = document.createElement("div");
	const countryFlag = document.createElement("img");

	countryBox.classList.add("country-box");
	countryFlag.classList.add("country-box__flag");
	countryFlag.src = path;

	countryBox.append(countryFlag);
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
		createNewCountryObject(path);
	}
}
