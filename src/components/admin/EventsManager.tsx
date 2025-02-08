import { useState, useEffect } from "react";
import { useToast } from "../ui/use-toast";
import { SERVER_URL } from "../../config/serverConfig";
import { Event } from "../../types/event";
import EventForm from "./events/EventForm";
import EventList from "./events/EventList";
import { Button } from "../ui/button";

const EventsManager = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/src/server/events.php`, {
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to fetch events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: "Error",
        description: "Failed to load events",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSave = () => {
    fetchEvents();
    setEditingEvent(null);
    setIsAdding(false);
  };

  const handleDelete = (id: number) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  return (
    <div className="space-y-8">
      {!isAdding && !editingEvent && (
        <Button onClick={() => setIsAdding(true)}>Add New Event</Button>
      )}

      {isAdding && (
        <EventForm
          onSave={handleSave}
          onCancel={() => setIsAdding(false)}
        />
      )}

      {editingEvent && (
        <EventForm
          event={editingEvent}
          onSave={handleSave}
          onCancel={() => setEditingEvent(null)}
        />
      )}

      {!isAdding && !editingEvent && (
        <EventList
          events={events}
          onEdit={setEditingEvent}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default EventsManager;