import { Box, FormControl, FormLabel, Input, Spinner, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';

import { EventCard } from './EventCard';
import { useCalendarView } from '../../hooks/useCalendarView';
import { useEventForm } from '../../hooks/useEventForm';
import { useEventOperations } from '../../hooks/useEventOperations';
import { useFetchEvents } from '../../hooks/useFetchEvents';
import { useNotifications } from '../../hooks/useNotifications';
import { useSearch } from '../../hooks/useSearch';

export const MainSearchView = () => {
  const { events, isLoading, error, fetchEvents } = useFetchEvents(); // 상태와 함수는 훅에서 관리
  const { editingEvent, setEditingEvent, editEvent } = useEventForm();
  const { deleteEvent } = useEventOperations(Boolean(editingEvent), () => setEditingEvent(null));
  const { view, currentDate } = useCalendarView();
  const { searchTerm, filteredEvents, setSearchTerm } = useSearch(events, currentDate, view);
  const { notifiedEvents } = useNotifications(events);

  useEffect(() => {
    // 처음 렌더링 시 이벤트를 가져옵니다.
    fetchEvents();
  }, [fetchEvents]);

  if (isLoading) {
    return (
      <Box w="full" h="full" display="flex" justifyContent="center" alignItems="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box color="red" textAlign="center">
        <Text>이벤트를 가져오는 데 실패했습니다.</Text>
      </Box>
    );
  }

  return (
    <VStack data-testid="event-list" w="500px" h="full" overflowY="auto">
      <FormControl>
        <FormLabel>일정 검색</FormLabel>
        <Input
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </FormControl>

      {filteredEvents.length === 0 ? (
        <Text>검색 결과가 없습니다.</Text>
      ) : (
        filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            notifiedEvents={notifiedEvents}
            editEvent={editEvent}
            deleteEvent={deleteEvent}
          />
        ))
      )}
    </VStack>
  );
};
