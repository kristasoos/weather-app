let now = new Date();
function currentDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hour = String(now.getHours()).padStart(2, "0");
  let minutes = String(now.getMinutes()).padStart(2, "0");

  let currentDate = `${day} ${hour}:${minutes}`;
  return currentDate;
}
let dateTime = document.querySelector("#date-time");
dateTime.innerHTML = currentDate();

//Week 5 homework: Show temperature by city

function currentWeatherData(response) {
  console.log(response.data);
  let currentTemp = Math.round(response.data.main.temp);
  let tempCity = document.querySelector("#temperature");
  tempCity.innerHTML = `${currentTemp}`;

  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weatherDescription").innerHTML =
    response.data.weather[0].main;

  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "7c66fd2eccd6dd57aa4d32051c6fbb9f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(currentWeatherData);
}

function showCurrentTemperature(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchCity(city);
}

let formTemperature = document.querySelector(".form-search");
formTemperature.addEventListener("submit", showCurrentTemperature);

searchCity("Tallinn");

//Week 5 Bonus: current location button

let currentLocationButton = document.querySelector("#button-current");
currentLocationButton.addEventListener("click", getCurrentLocation);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "7c66fd2eccd6dd57aa4d32051c6fbb9f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentWeatherData);
}
