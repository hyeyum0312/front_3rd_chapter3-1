export const fetchEventsApi = async () => {
  try {
    const response = await fetch('/api/events');
    if (!response.ok) {
      throw new Error(`Failed to fetch events. Status: ${response.status}`);
    }
    const { events } = await response.json();
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};
