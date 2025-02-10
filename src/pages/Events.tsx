import { useQuery } from "@tanstack/react-query";
import { Event } from "../types/event";
import { SERVER_URL } from "../config/serverConfig";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format, isPast } from "date-fns";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRightCircle, BookOpen, Calendar, Flag, Image } from "lucide-react";
import { Canvas } from 'fabric';

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

  const renderEventContent = (content: string) => {
    try {
      if (!content) return null;
      const contentObj = JSON.parse(content);
      
      // If it's a Fabric.js canvas JSON
      if (contentObj.version && contentObj.objects) {
        return (
          <div className="mt-4">
            {contentObj.objects.map((obj: any, index: number) => {
              if (obj.type === 'text' || obj.type === 'i-text') {
                return (
                  <p
                    key={index}
                    style={{
                      fontFamily: obj.fontFamily,
                      fontSize: obj.fontSize,
                      color: obj.fill,
                      textAlign: obj.textAlign as any,
                    }}
                  >
                    {obj.text}
                  </p>
                );
              }
              return null;
            })}
          </div>
        );
      }
      
      // If it's regular HTML content
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    } catch (e) {
      // If parsing fails, treat it as regular HTML content
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }
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

          <TabsContent value="upcoming">
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
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <Link to={`/events/${event.id}`} key={event.id}>
                    <Card className="hover:shadow-lg transition-shadow h-full">
                      <div className="h-64 overflow-hidden">
                        <img
                          src={getImageUrl(event.images?.[0] || '')}
                          alt={event.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder.svg';
                          }}
                        />
                      </div>
                      <CardContent className="p-6">
                        <CardTitle className="mb-2 flex items-center gap-2">
                          <Flag className="h-5 w-5" />
                          {event.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {event.date && format(new Date(event.date), 'MMMM dd, yyyy')}
                        </CardDescription>
                        <p className="text-gray-600 line-clamp-3 mb-4">{event.description}</p>
                        {renderEventContent(event.content)}
                        <Button className="w-full mt-4">
                          Register Now
                          <ArrowRightCircle className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="past">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pastEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      {event.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(event.date), 'MMMM dd, yyyy')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {event.images?.map((image, index) => (
                          <div key={index} className="relative flex-shrink-0">
                            <Image className="h-4 w-4 absolute top-2 left-2 text-white" />
                            <img
                              src={getImageUrl(image)}
                              alt={`${event.title} - ${index + 1}`}
                              className="w-32 h-32 object-cover rounded"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/placeholder.svg';
                              }}
                            />
                          </div>
                        ))}
                      </div>
                      {renderEventContent(event.content)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Events;
