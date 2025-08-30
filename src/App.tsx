import React, { useState } from 'react';
import { LocationSearch } from './components/LocationSearch';
import { WeatherCard } from './components/WeatherCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { WelcomeMessage } from './components/WelcomeMessage';
import { WeatherData, LocationOption } from './types';
import { getWeatherData } from './services/api';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLocationSelect = async (location: LocationOption) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await getWeatherData(
        location.latitude,
        location.longitude,
        location.name,
        location.country
      );
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (weatherData) {
      handleLocationSelect({
        id: 0,
        name: weatherData.location.name,
        latitude: weatherData.location.latitude,
        longitude: weatherData.location.longitude,
        country: weatherData.location.country
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Weather Now
          </h1>
          <p className="text-blue-100 text-lg">
            Get instant weather updates for any city worldwide
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <LocationSearch
            onLocationSelect={handleLocationSelect}
            isLoading={isLoading}
          />
        </div>

        {/* Content */}
        <div className="flex justify-center">
          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="w-full max-w-md">
              <ErrorMessage message={error} onRetry={handleRetry} />
            </div>
          ) : weatherData ? (
            <WeatherCard weatherData={weatherData} />
          ) : (
            <WelcomeMessage />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-blue-100 text-sm">
          <p>Weather data provided by Open-Meteo</p>
        </div>
      </div>
    </div>
  );
}

export default App;