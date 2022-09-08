const COUNTRIES_BOX = document.querySelector(".country-box");
const COUNTRY_FLAG = document.querySelector(".country-box__flag");

async function getCountriesApi() {
	const response = await fetch("https://restcountries.com/v3.1/all");
	return await response.json();
}

getCountriesApi()
	.then((data) => {
		COUNTRY_FLAG.src = data[0].flags.png;
	})
	.catch((err) => {
		console.log(err);
	});
