"use client";

import React from "react";
import type { LatLngTuple } from "leaflet";
import styles from "./MapSection.module.css";
import client1 from '@/assets/img/client1.png';
import client4 from '@/assets/img/client4.png';
import leafYellow from '@/assets/img/leaf-yellow.png';

// Melbourne, Australia coordinates
const DEFAULT_POSITION: LatLngTuple = [-37.613611, 144.963056];

// Sample job markers data
const jobMarkers = [
  {
    position: [-37.813611, 144.963056] as LatLngTuple,
    popup: (
      <div>
        <img className="logo" src={client4.src} alt="company" />
        <h6>Data Center Support Specialist Engineer</h6>
        <div className="vacancies-location">Melbourne, Australia</div>
        <button type="button" className="crumina-button button--red button--xxs button--uppercase-wide">
          Temporary
        </button>
      </div>
    ),
  },
  {
    position: [-37.713611, 144.863056] as LatLngTuple,
    popup: (
      <div>
        <img className="logo" src={client1.src} alt="company" />
        <h6>Data Center Support Specialist Engineer</h6>
        <div className="vacancies-location">Melbourne, Australia</div>
        <button type="button" className="crumina-button button--red button--xxs button--uppercase-wide">
          Temporary
        </button>
      </div>
    ),
  },
];

// Client-side only map component
const ClientMap: React.FC<{ L: typeof import("leaflet") }> = ({ L }) => {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const mapInstance = React.useRef<L.Map | null>(null);

  React.useLayoutEffect(() => {
    let isMounted = true;
    if (!mapRef.current) return;

    // Dynamically import markercluster plugin and CSS
    import("leaflet.markercluster").then(() => {
      import("leaflet.markercluster/dist/MarkerCluster.Default.css");
      import("leaflet.markercluster/dist/MarkerCluster.css");

      if (!isMounted || !mapRef.current) return;

      // Initialize map
      const newMap = L.map(mapRef.current, {
        center: DEFAULT_POSITION,
        zoom: 10,
        maxZoom: 18,
        scrollWheelZoom: false,
      });
      mapInstance.current = newMap;

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(newMap);

      // Add markers
      const markers = jobMarkers.map((marker) => {
        const icon = L.icon({
          iconUrl: leafYellow.src,
          iconSize: [24, 30],
          iconAnchor: [22, 94],
          popupAnchor: [-3, -76],
        });

        return L.marker(marker.position, { icon })
          .bindPopup(marker.popup as unknown as string);
      });

      // @ts-expect-error: markerClusterGroup is added by the plugin
      const clusterGroup = L.markerClusterGroup();
      markers.forEach(marker => clusterGroup.addLayer(marker));
      newMap.addLayer(clusterGroup);
    });

    return () => {
      isMounted = false;
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [L]);

  return <div ref={mapRef} className={styles.mapContainer} />;
};

const MapSection: React.FC = () => {
  const [L, setL] = React.useState<typeof import("leaflet") | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Dynamically import Leaflet only on client side
  React.useEffect(() => {
    const loadLeaflet = async () => {
      try {
        const leaflet = await import("leaflet");
        setL(leaflet);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to load Leaflet:", err);
        setError("Failed to load map");
        setIsLoading(false);
      }
    };

    loadLeaflet();
  }, []);

  if (isLoading) {
    return (
      <div className="crumina-module crumina-map crumina-map--700" id="map-employer">
        <div className="crumina-module crumina-map crumina-map--700" id="map-employer">
          <span>Loading map...</span>
        </div>
      </div>
    );
  }

  if (error || !L) {
    return (
      <div className="crumina-module crumina-map crumina-map--700" id="map-employer">
        <div className="crumina-module crumina-map crumina-map--700" id="map-employer">
          {error || "Failed to load map"}
        </div>
      </div>
    );
  }

  return (
    <section>
      <div className="header--spacer" style={{ height: "142.234px", backgroundColor: "rgb(18, 18, 20)" }}></div>
      <div className="crumina-module crumina-map crumina-map--700" id="map-employer" style={{ position: "relative" }}>
        <div className="block-location-info">
          <div className="h1">We have 69,368 job offers for you!</div>
        </div>
        <div className={styles.leafletContainer + " crumina-module crumina-map crumina-map--700"} id="map-employer">
          <ClientMap L={L} />
        </div>
      </div>
    </section>
  );
};

export default MapSection;