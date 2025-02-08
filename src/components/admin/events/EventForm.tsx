import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { ImageUpload } from "../products/ImageUpload";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Event } from "../../../types/event";
import { useToast } from "../../ui/use-toast";
import { SERVER_URL } from "../../../config/serverConfig";
import { EventContentEditor } from "./EventContentEditor";

interface EventFormProps {
  event?: Event;
  onSave: () => void;
  onCancel?: () => void;
}

const EventForm = ({ event, onSave, onCancel }: EventFormProps) => {
  const [form, setForm] = useState<Partial<Event>>(event || {
    title: "",
    description: "",
    date: "",
    content: "",
    images: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (imageUrl: string) => {
    // Remove any path prefixes and keep only the filename
    const cleanImageUrl = imageUrl.split('/').pop() || '';
    setForm(prev => ({
      ...prev,
      images: [...(prev.images || []), cleanImageUrl]
    }));
  };

  const handleImageDelete = (imageUrl: string) => {
    setForm(prev => ({
      ...prev,
      images: (prev.images || []).filter(img => img !== imageUrl)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log("Submitting event data:", form);
      
      const response = await fetch(`${SERVER_URL}/src/server/events.php`, {
        method: event ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          id: event?.id
        }),
        credentials: 'include'
      });

      const data = await response.json();
      console.log("Server response:", data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to save event');
      }

      toast({
        title: "Success",
        description: `Event ${event ? 'updated' : 'created'} successfully`,
      });
      onSave();
    } catch (error) {
      console.error('Error saving event:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save event",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{event ? 'Edit Event' : 'Add New Event'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Short Description</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Event Date</Label>
            <Input
              id="date"
              type="date"
              value={form.date}
              onChange={(e) => setForm(prev => ({ ...prev, date: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Event Images</Label>
            <ImageUpload
              onUpload={handleImageUpload}
              existingImages={form.images || []}
              onDelete={handleImageDelete}
            />
          </div>

          <div className="space-y-2">
            <Label>Event Content</Label>
            <EventContentEditor
              initialContent={form.content}
              onChange={(content) => setForm(prev => ({ ...prev, content: content }))}
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : event ? 'Update Event' : 'Create Event'}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EventForm;
