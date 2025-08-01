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
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');


    hamburger.addEventListener('click', () => {

      navLinks.classList.toggle('active');
      
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

