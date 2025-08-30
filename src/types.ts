export interface WeatherData {
  location: {
    name: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  current: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    windDirection: number;
    weatherCode: number;
    isDay: boolean;
  };
  hourly: {
    time: string[];
    temperature: number[];
    weatherCode: number[];
  };
}

export interface LocationOption {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
  admin2?: string;
}

export interface LocationPhoto {
  city: string;
  url: string;
  photographer: string;
}