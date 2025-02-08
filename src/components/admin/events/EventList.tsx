
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Event } from "../../../types/event";
import { Pencil, Trash2 } from "lucide-react";
import { useToast } from "../../ui/use-toast";
import { SERVER_URL } from "../../../config/serverConfig";

interface EventListProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (id: number) => void;
}

const EventList = ({ events, onEdit, onDelete }: EventListProps) => {
  const { toast } = useToast();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deletingImage, setDeletingImage] = useState<string | null>(null);

  const handleDelete = async (id: number) => {
    try {
      setDeletingId(id);
      const response = await fetch(`${SERVER_URL}/src/server/events.php?id=${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      const data = await response.json();

      if (data.success) {
        onDelete(id);
        toast({
          title: "Success",
          description: "Event deleted successfully",
        });
      } else {
        throw new Error(data.error || 'Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete event",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const handleImageDelete = async (eventId: number, imageToRemove: string) => {
    try {
      setDeletingImage(imageToRemove);
      const response = await fetch(`${SERVER_URL}/src/server/events.php`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId,
          imageToRemove
        }),
        credentials: 'include'
      });

      const data = await response.json();

      if (data.success) {
        // Update the UI by filtering out the deleted image
        events = events.map(event => {
          if (event.id === eventId) {
            return {
              ...event,
              images: event.images?.filter(img => img !== imageToRemove) || []
            };
          }
          return event;
        });
        
        toast({
          title: "Success",
          description: "Image deleted successfully",
        });
      } else {
        throw new Error(data.error || 'Failed to delete image');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete image",
        variant: "destructive",
      });
    } finally {
      setDeletingImage(null);
    }
  };

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '/placeholder.svg';
    if (imagePath.startsWith('http')) return imagePath;
    return `${SERVER_URL}/public/uploads/${imagePath}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <Card key={event.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4 items-start">
                    <div className="flex gap-2">
                      {event.images?.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={getImageUrl(image)}
                            alt={`${event.title} - ${index + 1}`}
                            className="w-24 h-24 object-cover rounded"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/placeholder.svg';
                            }}
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleImageDelete(event.id, image)}
                            disabled={deletingImage === image}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div>
                      <h3 className="font-semibold">{event.title}</h3>
                      <p className="text-sm text-gray-600">{event.description}</p>
                      <p className="text-sm text-gray-500">{event.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onEdit(event)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(event.id)}
                      disabled={deletingId === event.id}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventList;
