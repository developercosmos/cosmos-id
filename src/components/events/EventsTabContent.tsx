
import { Event } from "@/types/event";
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import UpcomingEventCard from "./UpcomingEventCard";
import PastEventCard from "./PastEventCard";

interface EventsTabContentProps {
  type: "upcoming" | "past";
  events: Event[];
  isLoading: boolean;
  getImageUrl: (imagePath: string) => string;
}

const EventsTabContent = ({ type, events, isLoading, getImageUrl }: EventsTabContentProps) => {
  if (isLoading) {
    return (
      <TabsContent value={type}>
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
      </TabsContent>
    );
  }

  return (
    <TabsContent value={type}>
      <div className={`grid grid-cols-1 ${type === 'upcoming' ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'} gap-6`}>
        {events.map((event) => (
          type === 'upcoming' 
            ? <UpcomingEventCard key={event.id} event={event} getImageUrl={getImageUrl} />
            : <PastEventCard key={event.id} event={event} getImageUrl={getImageUrl} />
        ))}
      </div>
    </TabsContent>
  );
};

export default EventsTabContent;
