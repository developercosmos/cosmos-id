
import { Event } from "@/types/event";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { ArrowRightCircle, Calendar, Flag } from "lucide-react";
import EventContentRenderer from "./EventContentRenderer";

interface UpcomingEventCardProps {
  event: Event;
  getImageUrl: (imagePath: string) => string;
}

const UpcomingEventCard = ({ event, getImageUrl }: UpcomingEventCardProps) => {
  return (
    <Link to={`/events/${event.id}`} className="block">
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
          <EventContentRenderer content={event.content} />
          <Button className="w-full mt-4">
            View Details & Register
            <ArrowRightCircle className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};

export default UpcomingEventCard;
