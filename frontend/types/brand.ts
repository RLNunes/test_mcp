export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface Brand {
  id: string;
  name: string;
  description: string;
  category: string;
  founded: number;
  headquarters: string;
  location: Location;
  image: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
