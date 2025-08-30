import React from 'react';
import { Cloud, Sun, Umbrella } from 'lucide-react';

export const WelcomeMessage: React.FC = () => {
  return (
    <div className="text-center py-12 px-4">
      <div className="flex justify-center gap-4 mb-6">
        <Cloud className="h-12 w-12 text-blue-500 animate-bounce" style={{ animationDelay: '0s' }} />
        <Sun className="h-12 w-12 text-yellow-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
        <Umbrella className="h-12 w-12 text-indigo-500 animate-bounce" style={{ animationDelay: '0.4s' }} />
      </div>
      
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Welcome to Weather Now
      </h2>
      
      <p className="text-lg text-gray-600 mb-6 max-w-md mx-auto">
        Get instant weather updates for any city around the world. 
        Start by searching for your location above.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto text-sm">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="font-semibold text-blue-900 mb-1">Real-time Data</div>
          <div className="text-blue-700">Current conditions and hourly forecasts</div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <div className="font-semibold text-green-900 mb-1">Global Coverage</div>
          <div className="text-green-700">Weather for cities worldwide</div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="font-semibold text-purple-900 mb-1">Detailed Info</div>
          <div className="text-purple-700">Temperature, humidity, wind & more</div>
        </div>
      </div>
    </div>
  );
};