import React from 'react';
import { Cloud } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <Cloud className="h-16 w-16 text-blue-500 animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
      <div className="mt-4 text-lg font-medium text-gray-700">
        Fetching weather data...
      </div>
      <div className="text-sm text-gray-500">
        This may take a few moments
      </div>
    </div>
  );
};