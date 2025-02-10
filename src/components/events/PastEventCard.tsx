
import { Event } from "@/types/event";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { ArrowRightCircle, BookOpen, Calendar, Image } from "lucide-react";
import EventContentRenderer from "./EventContentRenderer";

interface PastEventCardProps {
  event: Event;
  getImageUrl: (imagePath: string) => string;
}

const PastEventCard = ({ event, getImageUrl }: PastEventCardProps) => {
  return (
    <Link to={`/events/${event.id}`} className="block">
      <Card className="hover:shadow-lg transition-shadow">
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
            <EventContentRenderer content={event.content} />
            <Button className="w-full">
              View Event Details
              <ArrowRightCircle className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PastEventCard;
