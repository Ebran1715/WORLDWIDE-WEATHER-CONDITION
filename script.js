
// Weather App logic
document.getElementById('getWeatherBtn').addEventListener('click', getWeather);

function getWeatherIcon(desc) {
  desc = desc.toLowerCase();
  if (desc.includes('sun') || desc.includes('clear')) return '☀️';
  if (desc.includes('cloud')) return '☁️';
  if (desc.includes('rain')) return '🌧️';
  if (desc.includes('thunder')) return '⛈️';
  if (desc.includes('snow')) return '❄️';
  if (desc.includes('fog') || desc.includes('mist')) return '🌫️';
  return '🌡️'; // default
}

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

// Navbar link click handling
const pageContent = document.getElementById('pageContent');

const pages = {
  home: "<h2>Welcome Home!</h2><p>This is the main page of WeatherNow where you can search for weather updates worldwide.</p>",
  forecast: "<h2>Forecast</h2><p>Check the upcoming weather forecasts for your favorite cities here.</p>",
  favorites: "<h2>Favorites</h2><p>Manage and view your favorite locations for quick weather info.</p>",
  about: "<h2>About WeatherNow</h2><p>WeatherNow is your go-to source for reliable and up-to-date weather information globally.</p>",
  contact: "<h2>Contact Us</h2><p>If you have questions or feedback, reach out to us at support@weathernow.com.</p>"
};

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const page = link.getAttribute('data-page');
    pageContent.innerHTML = pages[page] || "<p>Content not available.</p>";
  });
});
// Footer links click handling
const footerPages = {
  home: pages.home,
  forecast: pages.forecast,
  favorites: pages.favorites,
  about: pages.about,
  contact: pages.contact
};

document.querySelectorAll('.footer-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.id.replace('footer-', '');
    pageContent.innerHTML = footerPages[id] || "<p>Content not available.</p>";
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
});

// Scroll to the weather app container when "WeatherNow" is clicked
// document.getElementById('nav-brand')?.addEventListener('click', e => {
//   e.preventDefault();
//   document.getElementById('weatherApp')?.scrollIntoView({ behavior: 'smooth' });
// });

document.getElementById('footer-brand')?.addEventListener('click', e => {
  e.preventDefault();
  document.getElementById('weatherApp')?.scrollIntoView({ behavior: 'smooth' });
});
let lastScrollTop = 0;
const banner = document.querySelector('.scrolling-banner');
const navbarHeight = 60;  // px
// Attach click handler to all nav links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const pageKey = this.dataset.page; // Get data-page="home" etc.

    // Rotate animation
    pageContent.classList.remove('animate-rotate');
    void pageContent.offsetWidth; // trigger reflow to restart animation
    pageContent.classList.add('animate-rotate');

    // Update content after short delay
    setTimeout(() => {
      pageContent.innerHTML = contentMap[pageKey] || `<p>Content not found.</p>`;
    }, 300); // Halfway through animation
  });
});







