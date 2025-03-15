
  export function haversineDistance(
    location1: { latitude: number; longitude: number },
    location2: { latitude: number; longitude: number }
  ): boolean {
    const R = 6371e3; // Earth's radius in meters
    const lat1 = location1.latitude * (Math.PI / 180);
    const lat2 = location2.latitude * (Math.PI / 180);
    const deltaLat = lat2 - lat1;
    const deltaLon = (location2.longitude - location1.longitude) * (Math.PI / 180);
  
    const a =
      Math.sin(deltaLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) ** 2;
      
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    
    const distance =  R * c; // Distance in meters
    
    if (distance < 1000) {
      return true
    }else{
      return false
    }
  }

  