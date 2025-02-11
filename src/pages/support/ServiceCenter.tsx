
import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { SERVER_URL } from "@/config/serverConfig";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";

interface ServiceCenter {
  id: number;
  name: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
}

const ServiceCenter = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState("");

  const { data: serviceCenters } = useQuery({
    queryKey: ['serviceCenters'],
    queryFn: async () => {
      const response = await fetch(`${SERVER_URL}/src/server/serviceCenter.php`);
      if (!response.ok) throw new Error('Failed to fetch service centers');
      return response.json() as Promise<ServiceCenter[]>;
    },
  });

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    // Initialize map centered on Indonesia
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [120.9842, -2.5489], // Indonesia coordinates
      zoom: 4,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Add markers for each service center
    serviceCenters?.forEach((center) => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<h3 class="font-bold">${center.name}</h3>
         <p>${center.address}</p>
         <p>Phone: ${center.phone}</p>`
      );

      new mapboxgl.Marker()
        .setLngLat([center.longitude, center.latitude])
        .setPopup(popup)
        .addTo(map.current!);
    });

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, serviceCenters]);

  if (!mapboxToken) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="p-4 border rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Enter Mapbox Token</h2>
              <p className="text-sm text-gray-600 mb-4">
                Please enter your Mapbox public token to view the service center locations.
                You can find your token at{" "}
                <a
                  href="https://account.mapbox.com/access-tokens/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Mapbox Access Tokens
                </a>
              </p>
              <Input
                type="text"
                placeholder="Enter your Mapbox public token"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Service Centers</h1>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 h-[600px] rounded-lg overflow-hidden shadow-lg">
              <div ref={mapContainer} className="w-full h-full" />
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">All Locations</h2>
              {serviceCenters?.map((center) => (
                <div
                  key={center.id}
                  className="p-4 border rounded-lg hover:border-primary transition-colors"
                >
                  <h3 className="font-semibold">{center.name}</h3>
                  <p className="text-sm text-gray-600">{center.address}</p>
                  <p className="text-sm text-gray-600">{center.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCenter;
