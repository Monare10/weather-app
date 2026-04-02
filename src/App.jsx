import { useState } from 'react';
import './App.css';

const API_KEY = '7146fbfdd236615086bb6b296486d80d';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) throw new Error('City not found');
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') getWeather();
  };

  return (
    <div className="app">

      <div className="app-header">
        <h1>Weather <span>App</span></h1>
        <p>Search any city for live weather updates</p>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter a city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={getWeather}>Search</button>
      </div>

      {loading && <p className="status">Loading...</p>}
      {error && <p className="status error">{error}</p>}

      {weather && (
        <div className="card">
          <h2>{weather.name}, <span>{weather.sys.country}</span></h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p className="temp">{Math.round(weather.main.temp)}°C</p>
          <p className="desc">{weather.weather[0].description}</p>
          <div className="details">
            <span>Humidity: {weather.main.humidity}%</span>
            <span>Wind: {weather.wind.speed} m/s</span>
            <span>Feels like: {Math.round(weather.main.feels_like)}°C</span>
          </div>
        </div>
      )}

      <footer>
        <div className="footer-badge">
          Crafted by <span>Nare Rammutla</span>
        </div>
        <p className="footer-sub">Built with React & OpenWeatherMap API</p>
      </footer>

    </div>
  );
}

export default App;