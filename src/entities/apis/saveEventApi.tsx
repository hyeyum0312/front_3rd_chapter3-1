import { EventForm } from '../../types';

export const saveEventApi = async (eventData: Event | EventForm, editing: boolean) => {
  const method = editing ? 'PUT' : 'POST';
  const url = editing ? `/api/events/${(eventData as Event).id}` : '/api/events';

  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    throw new Error('Failed to save event');
  }

  return response;
};
