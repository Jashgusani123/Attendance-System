import { useEffect, useState } from 'react';

interface LocationState {
  latitude: number;
  longitude: number;
}

function LocationComponent() {
  const [location, setLocation] = useState<LocationState | null>(null);
  const collegeLocation = { latitude: 21.73, longitude: 70.44 }; // Example college coordinates
  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          
          // Calculate distance from college location
          const dist = calculateDistance(latitude, longitude, collegeLocation.latitude, collegeLocation.longitude);
          setDistance(dist);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, []);

  function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);  // Difference in latitudes in radians
    const dLon = (lon2 - lon1) * (Math.PI / 180);  // Difference in longitudes in radians
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    //   console.log(dLat);
      
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));  // Angle in radians
    const distance = R * c; // Distance in km
    return distance;
  }

  return (
    <div>
      {location ? (
        <div>
          <p>Location: {location.latitude}, {location.longitude}</p>
          {distance !== null && (
            <p>Distance from College: {distance.toFixed(2)} km</p>
          )}
        </div>
      ) : (
        <p>Getting location...</p>
      )}
    </div>
  );
}

export default LocationComponent;