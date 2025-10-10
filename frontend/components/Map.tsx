'use client';

import React, { useEffect, useRef } from 'react';
import { Location } from '@/types/brand';

interface MapProps {
  location: Location;
  brandName: string;
}

export const Map: React.FC<MapProps> = ({ location, brandName }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const initMap = async () => {
      const L = await import('leaflet');
      
      // Fix for default marker icon issue with webpack
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      if (mapRef.current && !mapInstanceRef.current) {
        // Create map
        mapInstanceRef.current = L.map(mapRef.current).setView(
          [location.lat, location.lng],
          13
        );

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(mapInstanceRef.current);

        // Add marker
        const marker = L.marker([location.lat, location.lng]).addTo(mapInstanceRef.current);
        marker.bindPopup(`<b>${brandName}</b><br>${location.address}`).openPopup();
      }
    };

    initMap();

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [location, brandName]);

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};
