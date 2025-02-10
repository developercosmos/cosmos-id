
import { useQuery } from "@tanstack/react-query";
import { Event } from "../types/event";
import { SERVER_URL } from "../config/serverConfig";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { isPast } from "date-fns";
import EventsTabContent from "@/components/events/EventsTabContent";

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

  const pastEvents = events?.filter(event => isPast(new Date(event.date))) || [];
  const upcomingEvents = events?.filter(event => !isPast(new Date(event.date))) || [];

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto pt-24 px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600">Error</h2>
            <p className="text-gray-600">Failed to load events. Please try again later.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto pt-24 px-4 pb-12">
        <h1 className="text-4xl font-bold text-center mb-2">Events</h1>
        <p className="text-gray-600 text-center mb-8">
          Stay updated with our latest events and activities
        </p>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-[400px] mx-auto mb-8">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>

          <EventsTabContent 
            type="upcoming"
            events={upcomingEvents}
            isLoading={isLoading}
            getImageUrl={getImageUrl}
          />

          <EventsTabContent 
            type="past"
            events={pastEvents}
            isLoading={isLoading}
            getImageUrl={getImageUrl}
          />
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Events;
