//Global Variables
const countriesList = document.getElementById("countries");

const countryListList = document.getElementById("countryListList");
const searchBar = document.getElementById("searchBar");

let theCountries = [];

console.log(searchBar);
searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredCountries = theCountries.filter((country) => {
    return country.name.toLowerCase().includes(searchString);
  });
  console.log(filteredCountries);
  displayCountryCountry(filteredCountries);
});

const loadCountryCountry = async () => {
  try {
    const res = await fetch("https://restcountries.eu/rest/v2/all");
    theCountries = await res.json();
    displayCountryCountry(theCountries);
    initialize(theCountries);
  } catch (err) {
    console.error(err);
  }
};

const displayCountryCountry = (c) => {
  const htmlString = c
    .map((c) => {
      return `
          <li class="character">
              <h2>${c.name}</h2>
              <p>Code: ${c.alpha3Code}</p>
            
          </li>
      `;
      // <img src="${c.flag}"></img>
    })
    .join("");
  countryListList.innerHTML = htmlString;
};

loadCountryCountry();

let countries; //will contain fetched data

//Event Listenners
//countriesList.addEventListener("change", (event) =>displayCountryInfo(event.target.value));

countriesList.addEventListener("change", newCountrySelection);

function newCountrySelection(event) {
  displayCountryInfo(event.target.value);
}

// fetch("https://restcountries.eu/rest/v2/all")
//   .then(function (res) {
//     //console.log(res);
//     return res.json();
//   })
//   .then(function (data) {
//     //console.log(data);
//     initialize(data);
//   })
//   .catch(function (err) {
//     console.log("Error:", err);
//   });

//Disabled for testing of new fetch
//
//fetch("https://restcountries.eu/rest/v2/all")
//  .then((res) => res.json())
//  .then((data) => initialize(data))
//  .catch((err) => console.log("Error:", err));
//
//End of disabling for testing of new fetch

function initialize(countriesData) {
  countries = countriesData;
  let options = "";

  //disabled for testing
  //let optionNames = "";

  // for (let i = 0; i < countries.length; i++) {
  //   options += `<option value="${countries[i].alpha3Code}">${countries[i].name}</option>`;
  //   //options += `<option value="${countries[i].alpha3Code}">${countries[i].name} (+${countries[i].callingCodes[0]})</option>`;
  // }
  countries.forEach(
    (country) =>
      (options += `<option value="${country.alpha3Code}">${country.name}</option>`)
  );

  //disabled for testing
  //countries.forEach((country) => {
  //  optionNames += `<option value="${country.alpha3Code}">${country.alpha3Code} ${country.name} </option>`;
  //

  //licountries.classList.add(optionNames);
  //  ulcountries.innerHTML = optionNames;
  // });

  //document.getElementById("countries").innerHTML = options;
  //document.querySelector("#countries").innerHTML = options;
  countriesList.innerHTML = options;

  displayCountryInfo("AFG");
}

function displayCountryInfo(countryByAlpha3Code) {
  const countryData = countries.find(
    (country) => country.alpha3Code === countryByAlpha3Code
  );

  //console.log(countryData);
  document.querySelector("#flag-container img").src = countryData.flag;
  document.querySelector(
    "#flag-container img"
  ).alt = `Flag of ${countryData.name}`;
  document.getElementById("capital").innerHTML = countryData.capital;
  document.getElementById(
    "dialing-code"
  ).innerHTML = `+${countryData.callingCodes[0]}`;
  document.getElementById(
    "population"
  ).innerHTML = countryData.population.toLocaleString("en-US");
  document.getElementById("currencies").innerHTML = countryData.currencies
    .filter((c) => c.name)
    .map((c) => `${c.name} (${c.code}) `)
    .join(", ");
  document.getElementById("region").innerHTML = countryData.region;
  document.getElementById("subregion").innerHTML = countryData.subregion;
}
