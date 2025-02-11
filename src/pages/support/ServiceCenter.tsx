
import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { SERVER_URL } from "@/config/serverConfig";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Locate } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const { data: serviceCenters } = useQuery({
    queryKey: ['serviceCenters'],
    queryFn: async () => {
      const response = await fetch(`${SERVER_URL}/src/server/serviceCenter.php`);
      if (!response.ok) throw new Error('Failed to fetch service centers');
      return response.json() as Promise<ServiceCenter[]>;
    },
  });

  const filteredCenters = serviceCenters?.filter(center => 
    center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    center.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const detectUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.current?.flyTo({
            center: [longitude, latitude],
            zoom: 12,
            essential: true
          });

          // Add user location marker
          new mapboxgl.Marker({ color: "#FF0000" })
            .setLngLat([longitude, latitude])
            .setPopup(new mapboxgl.Popup().setHTML("<h3>Your Location</h3>"))
            .addTo(map.current!);

          toast({
            title: "Location detected",
            description: "Map has been centered to your location",
          });
        },
        (error) => {
          toast({
            title: "Error",
            description: "Unable to get your location. Please allow location access.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Error",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    // Initialize map centered on Indonesia
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [120.9842, -2.5489],
      zoom: 4,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Clear existing markers and add new ones based on filtered centers
    const addMarkers = () => {
      // Remove existing markers
      const markers = document.getElementsByClassName('mapboxgl-marker');
      while(markers[0]) {
        markers[0].remove();
      }

      // Add markers for filtered service centers
      filteredCenters?.forEach((center) => {
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
    };

    addMarkers();

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, filteredCenters]);

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
            <div className="md:col-span-2 space-y-4">
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  onClick={detectUserLocation}
                  className="flex items-center gap-2"
                >
                  <Locate className="w-4 h-4" />
                  Detect Location
                </Button>
              </div>
              <div className="h-[600px] rounded-lg overflow-hidden shadow-lg">
                <div ref={mapContainer} className="w-full h-full" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search service centers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="space-y-4 max-h-[540px] overflow-y-auto">
                {filteredCenters?.map((center) => (
                  <div
                    key={center.id}
                    className="p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer"
                    onClick={() => {
                      map.current?.flyTo({
                        center: [center.longitude, center.latitude],
                        zoom: 15,
                        essential: true
                      });
                    }}
                  >
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold">{center.name}</h3>
                        <p className="text-sm text-gray-600">{center.address}</p>
                        <p className="text-sm text-gray-600">{center.phone}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCenter;
