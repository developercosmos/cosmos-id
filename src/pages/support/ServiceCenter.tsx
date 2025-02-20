
import { useEffect, useState, useCallback } from "react";
import Navbar from "../../components/Navbar";
import { GoogleMap, useLoadScript, MarkerF as MarkerAdvanced, InfoWindowF } from "@react-google-maps/api";
import { SERVER_URL, fetchConfigurations } from "@/config/serverConfig";
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

const DEFAULT_ZOOM = 5;
const FOCUSED_ZOOM = 15;

// Define libraries as a static constant
const libraries: ("places")[] = ["places"];

const ServiceCenter = () => {
  const [selectedCenter, setSelectedCenter] = useState<ServiceCenter | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>({ lat: -2.5489, lng: 120.9842 });
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const { toast } = useToast();

  const { data: configs, isError: isConfigError } = useQuery({
    queryKey: ['configurations'],
    queryFn: fetchConfigurations,
    retry: 2,
  });

  useEffect(() => {
    if (isConfigError) {
      toast({
        title: "Error",
        description: "Failed to load configuration",
        variant: "destructive",
      });
    }
  }, [isConfigError, toast]);

  const googleMapsApiKey = configs?.GOOGLE_MAPS_API_KEY || "";

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey,
    libraries,
    id: 'google-map-script',
  });

  const { data: serviceCenters } = useQuery({
    queryKey: ['serviceCenters'],
    queryFn: async () => {
      const response = await fetch(`${SERVER_URL}/src/server/serviceCenter.php`);
      if (!response.ok) throw new Error('Failed to fetch service centers');
      const data = await response.json();
      return data.map((center: any) => ({
        ...center,
        latitude: Number(center.latitude),
        longitude: Number(center.longitude)
      })) as ServiceCenter[];
    },
    enabled: !!googleMapsApiKey,
  });

  const filteredCenters = serviceCenters?.filter(center => 
    center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    center.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
  };

  const findNearestCenter = useCallback((location: google.maps.LatLngLiteral) => {
    if (!serviceCenters?.length) return null;

    let nearest = serviceCenters[0];
    let minDistance = calculateDistance(
      location.lat,
      location.lng,
      nearest.latitude,
      nearest.longitude
    );

    serviceCenters.forEach(center => {
      const distance = calculateDistance(
        location.lat,
        location.lng,
        center.latitude,
        center.longitude
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearest = center;
      }
    });

    return { center: nearest, distance: minDistance };
  }, [serviceCenters]);

  const detectUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          
          const nearest = findNearestCenter(location);
          if (nearest) {
            setSelectedCenter(nearest.center);
            setMapCenter({ lat: nearest.center.latitude, lng: nearest.center.longitude });
            setZoom(FOCUSED_ZOOM);
            toast({
              title: "Location detected",
              description: `Found nearest service center: ${nearest.center.name} (${nearest.distance.toFixed(1)} km away)`,
            });
          } else {
            setMapCenter(location);
            toast({
              title: "Location detected",
              description: "No service centers found nearby",
              variant: "destructive",
            });
          }
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

  const handleCenterSelect = (center: ServiceCenter) => {
    setSelectedCenter(center);
    setMapCenter({ lat: center.latitude, lng: center.longitude });
    setZoom(FOCUSED_ZOOM);
  };

  if (!googleMapsApiKey) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="p-4 border rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Loading Configuration...</h2>
              <p className="text-sm text-gray-600">
                Please wait while we load the map configuration.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="p-4 border rounded-lg bg-red-50">
              <h2 className="text-lg font-semibold mb-2 text-red-600">Error Loading Maps</h2>
              <p className="text-sm text-red-600">
                There was an error loading Google Maps. Please try again later.
              </p>
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
                {isLoaded ? (
                  <GoogleMap
                    zoom={zoom}
                    center={mapCenter}
                    mapContainerClassName="w-full h-full"
                    options={{
                      streetViewControl: false,
                      mapTypeControl: false,
                      styles: [
                        {
                          featureType: "all",
                          elementType: "geometry",
                          stylers: [{ visibility: "simplified" }]
                        }
                      ]
                    }}
                  >
                    {userLocation && (
                      <MarkerAdvanced
                        position={userLocation}
                        icon={{
                          url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FF0000' width='24' height='24'%3E%3Ccircle cx='12' cy='12' r='8'/%3E%3C/svg%3E",
                          scaledSize: new google.maps.Size(16, 16),
                        }}
                      />
                    )}
                    
                    {filteredCenters?.map((center) => (
                      <MarkerAdvanced
                        key={center.id}
                        position={{ lat: center.latitude, lng: center.longitude }}
                        onClick={() => handleCenterSelect(center)}
                      >
                        {selectedCenter?.id === center.id && (
                          <InfoWindowF
                            position={{ lat: center.latitude, lng: center.longitude }}
                            onCloseClick={() => setSelectedCenter(null)}
                          >
                            <div>
                              <h3 className="font-bold">{center.name}</h3>
                              <p className="text-sm">{center.address}</p>
                              <p className="text-sm">Phone: {center.phone}</p>
                            </div>
                          </InfoWindowF>
                        )}
                      </MarkerAdvanced>
                    ))}
                  </GoogleMap>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <p>Loading Google Maps...</p>
                  </div>
                )}
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
                    className={`p-4 border rounded-lg hover:border-primary transition-colors cursor-pointer ${
                      selectedCenter?.id === center.id ? 'border-primary' : ''
                    }`}
                    onClick={() => handleCenterSelect(center)}
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
