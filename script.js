'use strict';

///////////////////////////////////////
// ⛅️ Weather Today

//select DOM elements
const form = document.querySelector('.top-banner form');
const input = document.querySelector('.top-banner input');
const msg = document.querySelector('.top-banner .msg');
const list = document.querySelector('.ajax-section .cities');

//import API key
const API_KEY = 'ca0ff2138a864e1fb2090905242402'; //will be expired on 9th March

const renderError = function (errMsg) {
  msg.textContent = errMsg;
  msg.style.color = '#a61e4d';
};

const resetPage = () => {
  form.reset();
  input.focus();
};

const renderCountry = function (data) {
  const { name, country } = data.location;
  const { temp_c, condition, precip_mm, humidity, wind_kph } = data.current;

  const htmlWidget = `<li>
  <div class="weather-wrapper">
    <div class="weather-card">
      <div class="flex">
        <p>${name}</p>
        <span class="country" style="margin-left: 0.5rem">${country}</span>
      </div>

      <div class="flex mt-1">
        <h1>${temp_c}</h1>
        <h2>°C</h2>
        <ul style="margin-left: 1.2rem">
          <li>Precip: ${precip_mm} mm</li>
          <li>Humidity: ${humidity} %</li>
          <li>Wind: ${wind_kph} kph</li>
        </ul>
      </div>

      <img class="mt-1" src="${
        condition.icon
      }" alt="weather today" width="100px" />
      <p class="condition">${condition.text.toUpperCase()}</p>
    </div>
  </div>
</li>`;

  list.insertAdjacentHTML('beforeend', htmlWidget);
};

/**
 *
 * @param {String} city - city name
 * @param {String} APIKey
 */
const searchWeather = function (city, APIKey) {
  const endpointUrlByCityName = `https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}`;

  fetch(endpointUrlByCityName)
    .then(response => {
      console.log(response);
      if (!response.ok)
        throw new Error(`Problem with Weather API ! 🤷 (${response.status})`);

      return response.json();
    })
    .then(data => {
      console.log(data);

      renderCountry(data);
    })
    .catch(err => {
      console.error(err);
      renderError(`[${err.message}]. Please try to search for a valid city!`);
    })
    .finally(resetPage);
};

form.addEventListener('submit', function (e) {
  e.preventDefault();

  msg.textContent = '';
  const cityInput = input.value.trim().toLowerCase();

  //make AJAX Calls
  searchWeather(cityInput, API_KEY);
});
