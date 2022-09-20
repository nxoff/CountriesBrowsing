import { createCountryObject } from "./countryDOM.js";

const filters = document.querySelector(".section--filters");
const detailPageSection = document.querySelector(".section--detail-page");

const goBackButton = document.querySelector(".detail-page__go-back-button");

const INDEX_URL = "index.html";
const API_URL = "https://restcountries.com/v3.1/all";

const TEXT_TO_SUB = 6;

export const loadDetailContent = () => {
	async function getCountriesApi() {
		const res = await fetch(API_URL);
		const data = await res.json();

		return data;
	}

	detailPageElements();

	getCountriesApi()
		.then((data) => {
			createCountryObject(
				data,
				getCurrentCountry(data, window.location.search)
			);
		})
		.catch((err) => console.log(err.name));
};

function getCurrentCountry(data, searchTab) {
	let name = searchTab.substring(TEXT_TO_SUB);
	name = name.replaceAll("%20", "");
	name = name.replaceAll(/\s/g, "");

	for (let i = 0; i < data.length; i++) {
		if (data[i].name.common.replaceAll(/\s/g, "") === name) {
			return i;
		}
	}
}

function detailPageElements() {
	filters.style.display = "none";
	detailPageSection.style.display = "block";
}

goBackButton.addEventListener("click", (e) => {
	document.location.href = INDEX_URL;
});
