export function isStudentWithinDistance(
    studentLocation: { latitude: number; longitude: number },
    teacherLocation: { latitude: number; longitude: number },
    maxDistanceMeters = 1000
  ): boolean {
    
    const R = 6371e3; // Earth's radius in meters
  
    const lat1 = studentLocation.latitude * (Math.PI / 180);
    const lat2 = teacherLocation.latitude * (Math.PI / 180);
    const deltaLat = (teacherLocation.latitude - studentLocation.latitude) * (Math.PI / 180);
    const deltaLon = (teacherLocation.longitude - studentLocation.longitude) * (Math.PI / 180);
  
    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = R * c; // Distance in meters
    
    return distance <= maxDistanceMeters;
  }
  
  export const GetMyLocation = (setLoadingLocation: Function, setLocation: Function) => {
    if (navigator.geolocation) {
      setLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
  
          setLoadingLocation(false);
          setLocation({ latitude, longitude }); // ✅ Set location here
        },
        (error) => {
          console.error(error);
          setLoadingLocation(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  