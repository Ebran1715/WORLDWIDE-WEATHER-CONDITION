document.getElementById('getWeatherBtn').addEventListener('click', getWeather);

async function getWeather() {
  const location = document.getElementById('location').value.trim();
  const weatherDiv = document.getElementById('weather');

  if (!location) {
    weatherDiv.textContent = 'Please enter a city name.';
    return;
  }

  weatherDiv.textContent = 'Please wait for a moment...';

  try {
    const response = await fetch(`https://wttr.in/${location}?format=j1`);
    if (!response.ok) throw new Error('Failed to fetch weather data');

    const data = await response.json();
    const current = data.current_condition[0];
    const tempC = current.temp_C;
    const weatherDesc = current.weatherDesc[0].value;
    const humidity = current.humidity;
    const windKmph = current.windspeedKmph;

    weatherDiv.innerHTML = `
      <strong>Weather in ${location}:</strong><br />
      Temperature: ${tempC}°C<br />
      Condition: ${weatherDesc}<br />
      Humidity: ${humidity}%<br />
      Wind Speed: ${windKmph} km/h
    `;

  } catch (error) {
    weatherDiv.textContent = 'Could not get weather data. Try another city.';
    console.error(error);
  }
}
