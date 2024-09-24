import React from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import { useTheme } from '../hooks/useTheme'
import L from 'leaflet';
import '../styles/ContainerMap.css'

// Create custom marker icon (if needed)
const defaultIcon = L.icon({
  iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1rem' height='1rem' viewBox='0 0 24 24'%3E%3Cg fill='none'%3E%3Cpath d='m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z'/%3E%3Cpath fill='%2300a76f' d='M12 2a9 9 0 0 1 9 9c0 3.074-1.676 5.59-3.442 7.395a20.4 20.4 0 0 1-2.876 2.416l-.426.29l-.2.133l-.377.24l-.336.205l-.416.242a1.87 1.87 0 0 1-1.854 0l-.416-.242l-.52-.32l-.192-.125l-.41-.273a20.6 20.6 0 0 1-3.093-2.566C4.676 16.589 3 14.074 3 11a9 9 0 0 1 9-9m0 6a3 3 0 1 0 0 6a3 3 0 0 0 0-6'/%3E%3C/g%3E%3C/svg%3E",
  iconSize: [35, 65],
  iconAnchor: [19, 48],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface RouteType {
  path: LatLngTuple[];
}

interface ContainerMapProps {
  route: RouteType[];
  firstCoordinateFacility?: string;
  lastCoordinateFacility?: string
}

const ContainerMap: React.FC<ContainerMapProps> = ({ route, firstCoordinateFacility, lastCoordinateFacility }) => {
  // Filter out any invalid coordinates (null, undefined, or incomplete lat/lng pairs)
  const validRoute: LatLngTuple[] = route.reduce((acc: LatLngTuple[], current: RouteType) => acc.concat(current.path), []);
  const firstCoordinate: LatLngTuple = route[0].path[0];
  const lastCoordinate: LatLngTuple | undefined = route.at(-1)?.path.at(-1);
  const {isDarkMode} = useTheme()

  // Check if the route contains valid points
  if (validRoute.length === 0) {
    return <p>No valid route data available.</p>;
  }

  const tileLayerURL = isDarkMode
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  return (
    <MapContainer
      center={firstCoordinate} // Center on the first valid coordinate
      zoom={5}
    >

    <TileLayer
        url={tileLayerURL} // Dynamically choose the tile layer based on dark mode
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        className='map-tiles'
    />

      <Polyline positions={validRoute} pathOptions={{ color: 'var(--primary-color)' }} />

      {/* Marker for the first coordinate */}
      <Marker position={firstCoordinate} icon={defaultIcon}>
        <Popup>
          <div>
            {firstCoordinateFacility ?
            <h3>Facility: {firstCoordinateFacility}</h3> : 
            <h3>Start Location</h3>
            }
            <p>Latitude: {firstCoordinate[0]}</p>
            <p>Longitude: {firstCoordinate[1]}</p>
          </div>
        </Popup>
      </Marker>

      {lastCoordinate && 
      <Marker position={lastCoordinate} icon={defaultIcon}>
        <Popup>
          <div>
            
            {lastCoordinateFacility ?
            <h3>Facility: {lastCoordinateFacility}</h3> :
            <h3>End Location</h3>
            }
            <p>Latitude: {lastCoordinate[0]}</p>
            <p>Longitude: {lastCoordinate[1]}</p>
          </div>
        </Popup>
      </Marker>}
    </MapContainer>
  );
};

export default ContainerMap;
