import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { LocationOption } from '../types';
import { searchLocations } from '../services/api';

interface LocationSearchProps {
  onLocationSelect: (location: LocationOption) => void;
  isLoading: boolean;
}

export const LocationSearch: React.FC<LocationSearchProps> = ({ onLocationSelect, isLoading }) => {
  const [query, setQuery] = useState('');
  const [locations, setLocations] = useState<LocationOption[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query.length >= 2) {
        setIsSearching(true);
        setError(null);
        try {
          const results = await searchLocations(query);
          setLocations(results);
          setShowDropdown(results.length > 0);
        } catch (err) {
          setError('Failed to search locations');
          setLocations([]);
          setShowDropdown(false);
        } finally {
          setIsSearching(false);
        }
      } else {
        setLocations([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  const handleLocationSelect = (location: LocationOption) => {
    setQuery(`${location.name}, ${location.country}`);
    setShowDropdown(false);
    onLocationSelect(location);
  };

  const formatLocationDisplay = (location: LocationOption) => {
    const parts = [location.name];
    if (location.admin1) parts.push(location.admin1);
    if (location.admin2) parts.push(location.admin2);
    parts.push(location.country);
    return parts.join(', ');
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          disabled={isLoading}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/90 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 placeholder-gray-500"
        />
        {isSearching && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
          {error}
        </div>
      )}

      {showDropdown && locations.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {locations.map((location) => (
            <button
              key={`${location.latitude}-${location.longitude}`}
              onClick={() => handleLocationSelect(location)}
              className="w-full px-4 py-3 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none transition-colors duration-150 flex items-center gap-3 first:rounded-t-xl last:rounded-b-xl"
            >
              <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-gray-900 font-medium truncate">
                  {location.name}
                </div>
                <div className="text-sm text-gray-500 truncate">
                  {[location.admin1, location.admin2, location.country].filter(Boolean).join(', ')}
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400 rotate-[-90deg]" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};