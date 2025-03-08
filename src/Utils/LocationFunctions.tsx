export function isStudentWithinDistance(
    studentLocation: { latitude: number; longitude: number },
    teacherLocation: { latitude: number; longitude: number },
    maxDistanceMeters = 1500
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
    console.log(distance);
    
    return distance <= maxDistanceMeters;
  }
  
  export const GetMyLocation = (setLoadingLocation: Function, setLocation: Function) => {
    if (navigator.geolocation) {
      setLoadingLocation(true);
  
      // Start watching position
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Updated Location:", latitude, longitude);
          setLoadingLocation(false);
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Geolocation Error:", error);
          setLoadingLocation(false);
        },
        {
          enableHighAccuracy: true, // ✅ Get precise location
          timeout: 10000, // ⏳ Max wait time for update
          maximumAge: 0, // 🚀 No caching (forces fresh data)
        }
      );
  
      return watchId; // Return watchId to clear it later
    } else {
      alert("Geolocation is not supported by this browser.");
      return null;
    }
  };
  
  
  
  
  
  