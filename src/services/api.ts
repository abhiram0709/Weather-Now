import { WeatherData, LocationOption } from '../types';

const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';

export const searchLocations = async (query: string): Promise<LocationOption[]> => {
  if (!query.trim()) return [];
  
  try {
    const response = await fetch(`${GEOCODING_API}?name=${encodeURIComponent(query)}&count=10&language=en&format=json`);
    if (!response.ok) throw new Error('Failed to fetch locations');
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error searching locations:', error);
    throw new Error('Failed to search locations. Please try again.');
  }
};

export const getWeatherData = async (latitude: number, longitude: number, locationName: string, country: string): Promise<WeatherData> => {
  try {
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      current: 'temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,weather_code,is_day',
      hourly: 'temperature_2m,weather_code',
      timezone: 'auto',
      forecast_days: '1'
    });

    const response = await fetch(`${WEATHER_API}?${params}`);
    if (!response.ok) throw new Error('Failed to fetch weather data');
    
    const data = await response.json();
    
    return {
      location: {
        name: locationName,
        country,
        latitude,
        longitude
      },
      current: {
        temperature: Math.round(data.current.temperature_2m),
        humidity: data.current.relative_humidity_2m,
        windSpeed: Math.round(data.current.wind_speed_10m),
        windDirection: data.current.wind_direction_10m,
        weatherCode: data.current.weather_code,
        isDay: data.current.is_day === 1
      },
      hourly: {
        time: data.hourly.time.slice(0, 24),
        temperature: data.hourly.temperature_2m.slice(0, 24).map((temp: number) => Math.round(temp)),
        weatherCode: data.hourly.weather_code.slice(0, 24)
      }
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data. Please try again.');
  }
};