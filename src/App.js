import React, { useState } from 'react';
import WeatherCard from './WeatherCard';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState('imperial');

  const API_KEY = 'f8c7d6fa03ca66bd830326eed356ea8e';

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="App">
    <h1>Weather by City</h1>

    <p className="welcome">
      Welcome to my page!<br />
      You can search for weather details on any city around the world — give it a try! 🌤️
    </p>

    <input
      type="text"
      placeholder="Enter city name"
      value={city}
      onChange={(e) => setCity(e.target.value)}
    />
    <br />
    <button onClick={fetchWeather}>Get Weather</button>

    {loading && <p>Loading...</p>}
    {error && <p style={{ color: 'red' }}>{error}</p>}

    {weather && <WeatherCard weather={weather} unit={unit} setUnit={setUnit}/>}

      
      <div className="footer">
        Made by Kaushal Kafle © 2025 — All rights reserved
        </div>
        </div>
        );
}
export default App;