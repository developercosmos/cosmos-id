import { useQuery } from "@tanstack/react-query";
import { Event } from "../types/event";
import { SERVER_URL } from "../config/serverConfig";
import Navbar from "../components/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const Events = () => {
  const { data: events, isLoading, error } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      console.log('Fetching events from server...');
      const response = await fetch(`${SERVER_URL}/src/server/events.php`);
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      console.log('Fetched events:', data);
      return data as Event[];
    },
  });

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '/placeholder.svg';
    if (imagePath.startsWith('http')) return imagePath;
    return `${SERVER_URL}/public/uploads/${imagePath}`;
  };

  if (error) {
    console.error("Error loading events:", error);
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto pt-24 px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600">Error</h2>
            <p className="text-gray-600">Failed to load events. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto pt-24 px-4">
        <h1 className="text-4xl font-bold text-center mb-2">Events</h1>
        <p className="text-gray-600 text-center mb-8">
          Stay updated with our latest events and activities
        </p>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <Card key={n}>
                <Skeleton className="h-64 rounded-t-lg" />
                <CardHeader>
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : !events || events.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600">No events available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Link to={`/events/${event.id}`} key={event.id}>
                <Card className="hover:shadow-lg transition-shadow border border-gray-200">
                  <CardHeader className="p-0">
                    <img
                      src={getImageUrl(event.images?.[0] || '')}
                      alt={event.title}
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.svg';
                      }}
                    />
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="mb-2">{event.title}</CardTitle>
                    <CardDescription className="text-sm text-gray-500 mb-4">
                      {event.date && format(new Date(event.date), 'MMMM dd, yyyy')}
                    </CardDescription>
                    <p className="text-gray-600 line-clamp-3">{event.description}</p>
                    <Button className="mt-4">Learn More</Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
