import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// Imports for marker icon workaround
import L from "leaflet";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// This is a workaround for Leaflet to find marker icon images
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl,
  iconUrl: iconUrl,
  shadowUrl: shadowUrl,
});
// End of marker icon workaround

// Your type for a marker
export type marker = {
  position: [number, number]; // Using a tuple for better precision
  text: string;
};

// Default values will be applied if the prop is NOT passed at all (i.e., it's undefined)
interface MapInterface {
  size?: { height: string; width: string }; // Make size optional for default value
  center?: [number, number]; // Make center optional
  zoom?: number; // Zoom was already optional
  markers?: marker[]; // Make markers optional
}

// Using the interface and adding default values during prop destructuring
export default function Map({
  size = { height: '500px', width: '100%' }, // <--- Default value for size
  center = [50.4501, 30.5234],             // <--- Default value for center (Kyiv)
  zoom = 13,                               // <--- Default value for zoom
  markers = [],                            // <--- Default value for markers (empty array)
}: MapInterface) {

  return (
    <MapContainer
      center={center} // <--- Use the center prop (now either passed value or default)
      zoom={zoom}     // <--- Use the zoom prop (passed or default)
      style={{ height: size.height, width: size.width }} // <--- Use the size prop (passed or default)
    >
      {/* TileLayer is responsible for displaying map "tiles" */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* <--- Loop through the markers array and render each marker */}
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position}>
          <Popup>
            {marker.text} {/* <--- Use the text from the marker object */}
          </Popup>
        </Marker>
      ))}
      {/* End of marker rendering */}

    </MapContainer>
  );
}