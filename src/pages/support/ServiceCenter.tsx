import { useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const ServiceCenter = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Note: Replace with your Mapbox token
    mapboxgl.accessToken = "YOUR_MAPBOX_TOKEN";

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [106.8456, -6.2088], // Jakarta coordinates
      zoom: 5,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Example service center data
    const serviceCenters = [
      {
        location: [106.8456, -6.2088],
        name: "Jakarta Service Center",
        address: "Jl. Example No. 123, Jakarta",
      },
      // Add more service centers here
    ];

    // Add markers for each service center
    serviceCenters.forEach((center) => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<h3 class="font-bold">${center.name}</h3>
         <p>${center.address}</p>`
      );

      new mapboxgl.Marker()
        .setLngLat(center.location as [number, number])
        .setPopup(popup)
        .addTo(map.current!);
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Service Centers</h1>
          <div className="h-[600px] rounded-lg overflow-hidden shadow-lg">
            <div ref={mapContainer} className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCenter;