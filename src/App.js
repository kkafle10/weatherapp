import React, { useState, useEffect } from 'react'; 
import WeatherCard from './WeatherCard'; // Component to display weather info
import './App.css'; // CSS for styling

function App() {
  const [city, setCity] = useState('');          // Stores city name input
  const [weather, setWeather] = useState(null);  // Stores weather data from API
  const [error, setError] = useState('');        // Stores any error message
  const [loading, setLoading] = useState(false); // Indicates loading status
  const [unit, setUnit] = useState('imperial');  // Tracks selected unit (F/C)

  const API_KEY = 'f8c7d6fa03ca66bd830326eed356ea8e';  // OpenWeather API Key

  // Function to fetch weather from OpenWeather API
  const fetchWeather = async () => {
    if (!city) return; // Don't proceed if input is empty

    setLoading(true); // Start loading
    setError('');     // Reset error
    setWeather(null); // Clear old weather

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeather(data);  // Store weather data
    } catch (err) {
      setError(err.message);  // Show error if fetch fails
    } finally {
      setLoading(false);   // Stop loading
    }
  };

// Re-fetch weather data when the unit (°F/°C) changes
useEffect(() => {
  if (city) {
    // Define an async function to fetch updated weather data
    const fetchWeatherOnUnitChange = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
        );
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    // Call the function immediately
    fetchWeatherOnUnitChange();
  }
}, [unit]);// Dependency: runs this effect only when the unit changes


  return (
  <div className="App">
    <h1>Weather by City</h1>

    <p className="welcome">
      Welcome to my page!<br />
      You can search for weather details on any city around the world — give it a try! 🌤️
    </p>

    {/* Input for city name */}
    <input
      type="text"
      placeholder="Enter city name"
      value={city}
      onChange={(e) => setCity(e.target.value)}
    />
    <br />
    {/* Button to fetch weather data */}
    <button onClick={fetchWeather}>Get Weather</button>
    {/* Show loading message */}
    {loading && <p>Loading...</p>}
    {/* Show error message */}
    {error && <p style={{ color: 'red' }}>{error}</p>}

    {/* Show WeatherCard if data is available */}
    {weather && <WeatherCard weather={weather} unit={unit} setUnit={setUnit}/>}

    {/* Footer */}  
      <div className="footer">
        Made by Kaushal Kafle © 2025 — All rights reserved
        </div>
        </div>
        );
}
export default App;