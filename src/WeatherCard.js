import React from 'react';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm } from 'react-icons/wi';// 3rd party icon import 


// Function to choose icon based on description
const getWeatherIcon = (description) => {
  const desc = description.toLowerCase();
  if (desc.includes('cloud')) return <WiCloudy size={48} />;
  if (desc.includes('rain')) return <WiRain size={48} />;
  if (desc.includes('snow')) return <WiSnow size={48} />;
  if (desc.includes('thunder')) return <WiThunderstorm size={48} />;
  return <WiDaySunny size={48} />;
};


// WeatherCard component to display weather info and toggle unit
function WeatherCard({ weather, unit, setUnit}) {
  return (
  <div className="weather">
     {/* Display icon based on weather */}
     {getWeatherIcon(weather.weather[0].description)}
    
    {/* City name and country code */}
    <h2>{weather.name}, {weather.sys.country}</h2>

    {/* Weather condition description */}
    <p>{weather.weather[0].description}</p>

    {/*Temperature with one decimal place and unit */}
    <p>{weather.main.temp.toFixed(1)}°{unit === 'imperial' ? 'F' : 'C'}</p>
    
    {/* Unit toggle button */}
    <button
    className="unit-toggle"
    onClick={() => setUnit(unit === 'imperial' ? 'metric' : 'imperial')}
>
    Switch to {unit === 'imperial' ? '°C' : '°F'}
    </button>

     {/* Additional weather details */}
    <p>Feels like: {weather.main.feels_like.toFixed(1)}°{unit === 'imperial' ? 'F' : 'C'}</p>
    <p>Humidity: {weather.main.humidity.toFixed(1)}%</p>
    <p>Wind: {weather.wind.speed} {unit === 'imperial' ? 'mph' : 'm/s'}</p>
    
      </div>
      );
    }

export default WeatherCard;
