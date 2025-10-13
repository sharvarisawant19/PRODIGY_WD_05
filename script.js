const apiKey = "bf9572899325e51f90ded5aeff8d6f26";

async function getWeatherByCity() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) return alert("Please enter a city name!");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  fetchWeather(url);
}


function getWeatherByLocation() {
  if (navigator.geolocation) {
    document.getElementById('loading').textContent = "Fetching location...";
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
      },
      error => {
        alert("Unable to access location.");
      }
    );
  } else {
    alert("Geolocation not supported by your browser.");
  }
}

async function fetchWeather(url) {
  document.getElementById('loading').textContent = "Loading weather data...";
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      document.getElementById('loading').textContent = "";
      return alert("City not found!");
    }

    const weatherHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <img class="icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon">
      <div class="temp">${Math.round(data.main.temp)}°C</div>
      <p>${data.weather[0].description}</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind: ${data.wind.speed} m/s</p>
    `;
    document.getElementById('weather').innerHTML = weatherHTML;
    document.getElementById('loading').textContent = "";
  } catch (error) {
    console.error(error);
    document.getElementById('loading').textContent = "Error fetching data.";
  }
}
