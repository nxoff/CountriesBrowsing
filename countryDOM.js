const SECTION_COUNTRIES = document.querySelector(".section--countries");

export function refreshCountries() {
	SECTION_COUNTRIES.innerHTML = "";
}

export function createCountryObject(data, index) {
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
