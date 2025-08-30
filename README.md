# Weather Now

A beautiful and responsive weather application that provides instant weather updates for any city worldwide.

## What does this app do?

Weather Now helps you quickly check the current weather conditions for any city around the globe. Simply search for a city, and you'll get:

- Current temperature and weather conditions
- Humidity levels
- Wind speed and direction
- 8-hour weather forecast
- Beautiful photos of the searched city

## How to use

1. **Search for a city**: Type any city name in the search box
2. **Select your location**: If multiple cities have the same name, choose the right one from the dropdown
3. **View weather details**: See current conditions and hourly forecast
4. **Explore different cities**: Search for as many locations as you want

## Features

- **Real-time weather data** - Always up-to-date information
- **Global coverage** - Search for cities anywhere in the world
- **Beautiful city photos** - See stunning images of your searched locations
- **Mobile-friendly** - Works perfectly on phones, tablets, and computers
- **Smart search** - Handles cities with the same name by showing all options
- **Detailed information** - Temperature, humidity, wind speed, and direction
- **Hourly forecast** - See what's coming in the next 8 hours

## Getting Started

### Running the Application

1. Install the required packages:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Open your browser and go to the local address shown in your terminal

### Building for Production

To create a production build:
```
npm run build
```

## Technologies Used

- **React** - For building the user interface
- **TypeScript** - For type safety and better development experience
- **Tailwind CSS** - For styling and responsive design
- **Open-Meteo API** - For weather data (free, no registration required)
- **Vite** - For fast development and building

## How it works

The app uses the Open-Meteo API to fetch weather data. When you search for a city:

1. The app first finds all locations matching your search term
2. If multiple cities have the same name, you can choose the specific one you want
3. The app then fetches current weather data and hourly forecasts
4. Beautiful city photos are displayed alongside the weather information

## Error Handling

The app handles various error scenarios gracefully:

- Network connection issues
- Invalid city names
- API service unavailability
- Missing data

If something goes wrong, you'll see a clear error message with an option to try again.

## Browser Support

This application works on all modern web browsers including:
- Chrome
- Firefox
- Safari
- Edge

## Contributing

This is a simple weather application built as a demonstration project. Feel free to explore the code and make improvements!

## License

This project is open source and available under the MIT License.

