import React from 'react';
import { WiDaySunny } from 'react-icons/wi';
function WeatherCard({ weather, unit, setUnit}) 

{

  return (
    <div className="weather">
      <h2>{weather.name}, {weather.sys.country}</h2>
      <p>{weather.weather[0].description}</p>
      <p>{weather.main.temp.toFixed(1)}°{unit === 'imperial' ? 'F' : 'C'}</p>
      <button
      className="unit-toggle"
      onClick={() => setUnit(unit === 'imperial' ? 'metric' : 'imperial')}
>
      Switch to {unit === 'imperial' ? '°C' : '°F'}
      </button>
      <p>Feels like: {weather.main.feels_like.toFixed(1)}°{unit === 'imperial' ? 'F' : 'C'}</p>
      <p>Humidity: {weather.main.humidity.toFixed(1)}%</p>
      <p>Wind: {weather.wind.speed} {unit === 'imperial' ? 'mph' : 'm/s'}</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
    </div>
  );
}

export default WeatherCard;
