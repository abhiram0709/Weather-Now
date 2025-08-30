import React from 'react';
import { Thermometer, Droplets, Wind, Compass, Clock, MapPin } from 'lucide-react';
import { WeatherData } from '../types';
import { getWeatherDescription } from '../utils/weatherCodes';
import { getCityPhoto } from '../utils/cityPhotos';

interface WeatherCardProps {
  weatherData: WeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  const { description, icon } = getWeatherDescription(weatherData.current.weatherCode);
  const cityPhoto = getCityPhoto(weatherData.location.name);
  
  const getWindDirection = (degrees: number): string => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  const formatTime = (timeString: string): string => {
    return new Date(timeString).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      hour12: true 
    });
  };

  const currentHour = new Date().getHours();
  const hourlyForecast = weatherData.hourly.time
    .slice(currentHour, currentHour + 8)
    .map((time, index) => ({
      time: formatTime(time),
      temperature: weatherData.hourly.temperature[currentHour + index],
      weatherCode: weatherData.hourly.weatherCode[currentHour + index]
    }));

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden">
      {/* Header with city photo */}
      <div className="relative h-48 overflow-hidden">
        {cityPhoto ? (
          <img 
            src={cityPhoto.url}
            alt={`${weatherData.location.name} cityscape`}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        <div className="absolute bottom-4 left-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-5 w-5" />
            <span className="text-lg font-semibold">
              {weatherData.location.name}, {weatherData.location.country}
            </span>
          </div>
          {cityPhoto && (
            <div className="text-xs text-gray-200">
              Photo by {cityPhoto.photographer}
            </div>
          )}
        </div>
      </div>

      {/* Main weather info */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current weather */}
          <div className="text-center lg:text-left">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
              <div className="text-6xl">{icon}</div>
              <div>
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  {weatherData.current.temperature}°C
                </div>
                <div className="text-xl text-gray-600 capitalize mb-2">
                  {description}
                </div>
                <div className="text-sm text-gray-500">
                  {weatherData.current.isDay ? 'Daytime' : 'Nighttime'}
                </div>
              </div>
            </div>
          </div>

          {/* Weather details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Humidity</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {weatherData.current.humidity}%
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Wind className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Wind Speed</span>
              </div>
              <div className="text-2xl font-bold text-green-600">
                {weatherData.current.windSpeed} km/h
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Compass className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">Wind Direction</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">
                {getWindDirection(weatherData.current.windDirection)}
              </div>
            </div>

            <div className="bg-orange-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Thermometer className="h-5 w-5 text-orange-600" />
                <span className="text-sm font-medium text-gray-700">Feels Like</span>
              </div>
              <div className="text-2xl font-bold text-orange-600">
                {weatherData.current.temperature}°C
              </div>
            </div>
          </div>
        </div>

        {/* Hourly forecast */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">8-Hour Forecast</h3>
          </div>
          
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {hourlyForecast.map((hour, index) => {
              const { icon: hourIcon } = getWeatherDescription(hour.weatherCode);
              return (
                <div key={index} className="bg-gray-50 rounded-xl p-3 text-center hover:bg-gray-100 transition-colors duration-200">
                  <div className="text-xs font-medium text-gray-600 mb-2">
                    {hour.time}
                  </div>
                  <div className="text-2xl mb-2">{hourIcon}</div>
                  <div className="text-sm font-semibold text-gray-900">
                    {hour.temperature}°C
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};