document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
  
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
      });
    
  
    }
  });
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
  
//   async function getWeather() {
//     const location = document.getElementById('location').value.trim();
//     const weatherDiv = document.getElementById('weather');
  
//     if (!location) {
//       weatherDiv.textContent = 'Please enter a city name.';
//       return;
//     }
  
//     weatherDiv.textContent = 'Please wait for a moment...';
  
//     try {
//       const response = await fetch(`https://wttr.in/${location}?format=j1`);
  
//       // Check if the response is OK and JSON
//       const contentType = response.headers.get("content-type");
//       if (!response.ok || !contentType || !contentType.includes("application/json")) {
//         throw new Error("Invalid or non-JSON response from wttr.in");
//       }
  
//       const data = await response.json();
//       console.log("Weather API response:", data); // Debug
  
//       // Ensure required fields exist
//       if (!data.current_condition || !data.weather) {
//         throw new Error("Missing expected weather data fields");
//       }
  
//       const current = data.current_condition[0];
//       const tempC = current.temp_C;
//       const weatherDesc = current.weatherDesc[0].value;
//       const humidity = current.humidity;
//       const windKmph = current.windspeedKmph;
//       const icon = getWeatherIcon(weatherDesc);
  
//       let html = `
//         <strong>Weather in ${location}:</strong><br />
//         Temperature: ${tempC}°C<br />
//         Condition: ${weatherDesc}<br />
//         Humidity: ${humidity}%<br />
//         Wind Speed: ${windKmph} km/h
//         <hr />
//         <h3>3-Day Forecast:</h3>
//       `;
  
//  // Get today's date in "YYYY-MM-DD" format (local time)
// const todayStr = new Date().toISOString().split("T")[0];

// // Filter out today's forecast
// const forecastDays = data.weather.filter(day => day.date !== todayStr).slice(0, 3);

// if (forecastDays.length === 0) {
//   html += `<p>Forecast data not available beyond today.</p>`;
// } else {
//   forecastDays.forEach(day => {
//     const date = new Date(day.date).toLocaleDateString(undefined, {
//       weekday: 'short',
//       month: 'short',
//       day: 'numeric'
//     });

//     const avgTemp = day.avgtempC;
//     const desc = day.hourly[4].weatherDesc[0].value;
//     const dayIcon = getWeatherIcon(desc);

//     html += `
//       <div class="forecast-day" style="margin-bottom:10px;">
//         <strong>${date}:</strong> ${dayIcon} ${desc}, Avg Temp: ${avgTemp}°C
//       </div>
//     `;
//   });
// }


  
//       weatherDiv.innerHTML = html;
//     } catch (error) {
//       weatherDiv.textContent = 'Could not get weather data. Try another city.';
//       console.error(error);
//     }
//   }

function getWeatherIcon(desc) {
    desc = desc.toLowerCase();
    if (desc.includes('sun') || desc.includes('clear')) return '☀️';
    if (desc.includes('cloud')) return '☁️';
    if (desc.includes('rain')) return '🌧️';
    if (desc.includes('thunder')) return '⛈️';
    if (desc.includes('snow')) return '❄️';
    if (desc.includes('fog') || desc.includes('mist')) return '🌫️';
    return '🌡️';
  }
  
  
function getTodayDateLocal() {
    const now = new Date();
    return now.toLocaleDateString('en-CA'); // Format: YYYY-MM-DD
  }
  
  async function getWeather() {
    const location = document.getElementById('location').value.trim();
    const weatherDiv = document.getElementById('weather');
  
    if (!location) {
      weatherDiv.textContent = 'Please enter a city name.';
      return;
    }
  
    weatherDiv.textContent = 'Please wait for a moment';
  
    try {
      const res = await fetch(`https://wttr.in/${location}?format=j1`);
      const data = await res.json();
      const today = getTodayDateLocal();
  
      // Filter out today and past dates
      const forecastDays = data.weather.filter(day => day.date > today).slice(0, 2);
  
      if (forecastDays.length === 0) {
        weatherDiv.innerHTML = `<p>No forecast available for future dates.</p>`;
        return;
      }
  
      let html = `<h3>Next-Two Days Forecast for ${location}</h3>`;
  
      forecastDays.forEach(day => {
        const date = new Date(day.date).toLocaleDateString(undefined, {
          weekday: 'short', month: 'short', day: 'numeric'
        });
        const avg = day.avgtempC;
        const desc = day.hourly[4].weatherDesc[0].value;
        const icon = getWeatherIcon(desc);
  
        html += `
          <div style="margin-bottom:10px;">
            <strong>${date}</strong>: ${icon} ${desc}, Avg Temp: ${avg}°C
          </div>
        `;
      });
  
      weatherDiv.innerHTML = html;
  
    } catch (err) {
      console.error(err);
      weatherDiv.textContent = 'Could not get weather data. Try again.';
    }
  }
  



  
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
  
