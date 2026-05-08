'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet icon issue in Next.js
const customIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13, { animate: true });
  }, [center, map]);
  return null;
}

interface MapComponentProps {
  center: [number, number];
}

export default function MapComponent({ center }: MapComponentProps) {
  return (
    <div className="w-full h-full relative group">
      <MapContainer 
        center={center} 
        zoom={13} 
        scrollWheelZoom={false}
        zoomControl={false}
        className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeView center={center} />
        <Marker position={center} icon={customIcon} />
        <ZoomControl position="bottomright" />
      </MapContainer>
      
      {/* Editorial Overlay */}
      <div className="absolute inset-0 pointer-events-none border-[20px] border-white/10 z-20" />
    </div>
  );
}
