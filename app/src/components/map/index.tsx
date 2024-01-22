"use client";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "./styles.css";

import icon2x from "leaflet/dist/images/marker-icon-2x.png";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: icon2x.src,
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
});

export type MapProps = {
  markers: {
    lat: number;
    lng: number;
    name: string;
    order: number;
  }[];
};

export default function Map({ markers }: MapProps) {
  return (
    <MapContainer
      center={{ lat: 49.246029, lng: -123.017582 }}
      style={{ width: "100%", height: "100%" }}
      zoom={12}
      zoomControl={false}
    >
      <ZoomControl position="bottomright" />
      {markers.map((m) => (
        <Marker key={m.name} position={{ lat: m.lat, lng: m.lng }}>
          <Tooltip direction="top" offset={[-15, -15]} opacity={1} permanent>
            <div className="font-medium text-lg px-4 pl-6 relative">
              {m.name}
              <div className="absolute -top-1.5 -left-1.5 bg-white text-black px-2 text-xs font-semibold">
                {m.order}
              </div>
            </div>
          </Tooltip>
        </Marker>
      ))}
      <TileLayer
        url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
      />
    </MapContainer>
  );
}
