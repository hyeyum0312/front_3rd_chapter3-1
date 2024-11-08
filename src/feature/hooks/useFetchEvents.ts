import { useCallback, useState } from 'react';

export const useFetchEvents = () => {
  const [, setEvents] = useState<Event[]>([]);

  const fetchEvents = useCallback(async (): Promise<Event[]> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch('/api/events');
      if (!response.ok) {
        throw new Error(`Failed to fetch events. Status: ${response.status}`);
      }
      const { events } = await response.json();
      setEvents(events);
      return events;
    } catch (error) {
      throw error; // 에러를 던져 호출하는 쪽에서 처리
    }
  }, []);

  return { fetchEvents };
};
