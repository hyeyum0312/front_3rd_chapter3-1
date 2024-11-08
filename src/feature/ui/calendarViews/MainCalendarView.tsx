import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Heading, HStack, IconButton, Select, VStack, Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';

import { MonthlyCalendar } from './MonthlyCalendar';
import { WeeklyCalender } from './WeeklyCalendar';
import { useCalendarView } from '../../hooks/useCalendarView';
import { useFetchEvents } from '../../hooks/useFetchEvents';
import { useNotifications } from '../../hooks/useNotifications';
import { useSearch } from '../../hooks/useSearch';

export const MainCalendarView = React.memo(() => {
  const { events, isLoading, error, fetchEvents } = useFetchEvents(); // 상태와 함수는 훅에서 관리
  const { view, setView, navigate, currentDate, holidays } = useCalendarView();
  const { filteredEvents } = useSearch(events, currentDate, view);
  const { notifiedEvents } = useNotifications(events);

  useEffect(() => {
    if (!events.length) {
      // 이벤트가 없을 때만 데이터를 불러옵니다
      fetchEvents();
    }
  }, [fetchEvents, events.length]);

  return (
    <VStack flex={1} spacing={5} align="stretch">
      <Heading>일정 보기</Heading>

      <HStack mx="auto" justifyContent="space-between">
        <IconButton
          aria-label="Previous"
          icon={<ChevronLeftIcon />}
          onClick={() => navigate('prev')}
        />

        <Select
          aria-label="view"
          value={view}
          onChange={(e) => setView(e.target.value as 'week' | 'month')}
        >
          <option value="week">Week</option>
          <option value="month">Month</option>
        </Select>

        <IconButton
          aria-label="Next"
          icon={<ChevronRightIcon />}
          onClick={() => navigate('next')}
        />
      </HStack>

      {isLoading ? (
        <Box>Loading...</Box> // 로딩 중 UI 추가
      ) : error ? (
        <Box color="red">Error: {error}</Box> // 에러 처리 UI 추가
      ) : (
        <>
          {view === 'week' && (
            <WeeklyCalender
              filteredEvents={filteredEvents}
              currentDate={currentDate}
              notifiedEvents={notifiedEvents}
            />
          )}
          {view === 'month' && (
            <MonthlyCalendar
              currentDate={currentDate}
              filteredEvents={filteredEvents}
              notifiedEvents={notifiedEvents}
              holidays={holidays}
            />
          )}
        </>
      )}
    </VStack>
  );
});
