import { LocationPhoto } from '../types';

export const cityPhotos: LocationPhoto[] = [
  { city: 'Paris', url: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', photographer: 'Pixabay' },
  { city: 'London', url: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', photographer: 'Pixabay' },
  { city: 'New York', url: 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', photographer: 'Pixabay' },
  { city: 'Tokyo', url: 'https://images.pexels.com/photos/248195/pexels-photo-248195.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', photographer: 'Pixabay' },
  { city: 'Sydney', url: 'https://images.pexels.com/photos/995765/pexels-photo-995765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', photographer: 'Pixabay' },
  { city: 'Rome', url: 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', photographer: 'Pixabay' },
  { city: 'Barcelona', url: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', photographer: 'Pixabay' },
  { city: 'Amsterdam', url: 'https://images.pexels.com/photos/2031706/pexels-photo-2031706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', photographer: 'Pixabay' },
  { city: 'Berlin', url: 'https://images.pexels.com/photos/109629/pexels-photo-109629.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', photographer: 'Pixabay' },
  { city: 'Dubai', url: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', photographer: 'Pixabay' },
  { city: 'Prague', url: 'https://images.pexels.com/photos/1506028/pexels-photo-1506028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', photographer: 'Pixabay' },
  { city: 'Vienna', url: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', photographer: 'Pixabay' },
  { city: 'Madrid', url: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', photographer: 'Pixabay' },
  { city: 'Moscow', url: 'https://images.pexels.com/photos/753339/pexels-photo-753339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', photographer: 'Pixabay' },
  { city: 'Mumbai', url: 'https://images.pexels.com/photos/1029302/pexels-photo-1029302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', photographer: 'Pixabay' },
  { city: 'Singapore', url: 'https://images.pexels.com/photos/1139556/pexels-photo-1139556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', photographer: 'Pixabay' },
  { city: 'Los Angeles', url: 'https://images.pexels.com/photos/161963/toyota-gt86-2017-161963.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', photographer: 'Pixabay' },
  { city: 'Chicago', url: 'https://images.pexels.com/photos/2087391/pexels-photo-2087391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', photographer: 'Pixabay' },
  { city: 'Toronto', url: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', photographer: 'Pixabay' },
  { city: 'Vancouver', url: 'https://images.pexels.com/photos/1448230/pexels-photo-1448230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', photographer: 'Pixabay' },
];

export const getCityPhoto = (cityName: string): LocationPhoto | null => {
  const photo = cityPhotos.find(photo => 
    photo.city.toLowerCase() === cityName.toLowerCase()
  );
  
  if (photo) return photo;
  
  // If no exact match, try partial match
  const partialMatch = cityPhotos.find(photo => 
    cityName.toLowerCase().includes(photo.city.toLowerCase()) ||
    photo.city.toLowerCase().includes(cityName.toLowerCase())
  );
  
  return partialMatch || null;
};