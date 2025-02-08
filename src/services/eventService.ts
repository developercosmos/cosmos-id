import { Event } from '../types/event';
import { SERVER_URL } from '../config/serverConfig';

export const getEvents = async (): Promise<Event[]> => {
  const response = await fetch(`${SERVER_URL}/src/server/events.php`);
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  return response.json();
};

export const createEvent = async (event: Omit<Event, 'id'>): Promise<Event> => {
  const response = await fetch(`${SERVER_URL}/src/server/events.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });

  if (!response.ok) {
    throw new Error('Failed to create event');
  }
  return response.json();
};

export const deleteEvent = async (id: number): Promise<void> => {
  const response = await fetch(`${SERVER_URL}/src/server/events.php?id=${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete event');
  }
};