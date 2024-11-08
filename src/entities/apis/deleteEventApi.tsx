export const deleteEventApi = async (id: string) => {
  const response = await fetch(`/api/events/${id}`, { method: 'DELETE' });

  if (!response.ok) {
    throw new Error('Failed to delete event');
  }

  return response;
};
