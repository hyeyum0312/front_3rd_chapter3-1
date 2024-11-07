import { Box, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { Notifications } from './components/alert/notifications.tsx';
import { MainAlertView } from './components/alert/mainAlertView.tsx';
import { MainCalendarView } from './components/calendarViews/MainCalendarView.tsx';
import { MainSearchView } from './components/eventCalendarViews/MainSearchView.tsx';
import { EventScheduleForm } from './components/EventScheduleForm.tsx';
import { useFetchEvents } from './hooks/useFetchEvents.ts';

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // 에러 상태 추가
  const { fetchEvents } = useFetchEvents();

  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const events = await fetchEvents();
        console.log('events', events);

        setEvents(events); // 데이터를 받아온 후 상태 업데이트
      } catch (err) {
        setError('이벤트를 가져오는 데 실패했습니다.'); // 에러 상태 설정
        console.error('Error fetching events:', err);
      } finally {
        setIsLoading(false); // 로딩 상태 종료
      }
    };

    loadEvents(); // 컴포넌트가 로드될 때 한 번만 호출
  }, [fetchEvents]);

  return (
    <Box w="full" h="100vh" m="auto" p={5}>
      <Flex gap={6} h="full">
        <EventScheduleForm events={events} />

        {/* 로딩 상태가 true일 때 로딩 UI를 표시 */}
        {isLoading ? (
          <Box>Loading...</Box> // 로딩 스피너나 다른 UI를 사용할 수 있음
        ) : (
          <>
            <MainCalendarView events={events} />
            <MainSearchView events={events} />
          </>
        )}
      </Flex>
      {error && <Box color="red">{error}</Box>} {/* 에러 메시지 표시 */}
      <MainAlertView />
      <Notifications events={events} />
    </Box>
  );
}

export default App;
