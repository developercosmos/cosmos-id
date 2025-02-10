
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { Calendar, ArrowLeft, MapPin, Clock, Users, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SERVER_URL } from "../config/serverConfig";
import { Event } from "../types/event";
import { Skeleton } from "@/components/ui/skeleton";
import EventContentRenderer from "@/components/events/EventContentRenderer";

const EventDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: event, isLoading, error } = useQuery({
    queryKey: ['event', id],
    queryFn: async () => {
      console.log('Fetching event details for id:', id);
      const response = await fetch(`${SERVER_URL}/src/server/events.php?id=${id}`, {
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch event details');
      }
      const data = await response.json();
      console.log('Fetched event details:', data);
      return data as Event;
    },
  });

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="text-center text-red-600">
            Error loading event details. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81';
    if (imagePath.startsWith('http')) return imagePath;
    return `${SERVER_URL}${imagePath}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-20" />
              </div>
            ) : event ? (
              <>
                <div>
                  <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{format(new Date(event.date), 'MMMM dd, yyyy')}</span>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <p>{event.description}</p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Event Details</h2>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4" />
                      Location: Convention Center
                    </li>
                    <li className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      Time: 9:00 AM - 5:00 PM
                    </li>
                    <li className="flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      Capacity: 500 attendees
                    </li>
                    <li className="flex items-center">
                      <Monitor className="mr-2 h-4 w-4" />
                      Type: In-person
                    </li>
                  </ul>
                </div>
              </>
            ) : null}
          </div>

          <div className="space-y-6">
            {event?.content && (
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <EventContentRenderer content={event.content} />
              </div>
            )}

            {event?.images && event.images.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Event Images</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.images.map((image, index) => (
                    <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                      <img
                        src={getImageUrl(image)}
                        alt={`${event.title} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c';
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button className="w-full">
              Register Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
