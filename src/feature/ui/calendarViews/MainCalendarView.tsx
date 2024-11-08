import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Heading, HStack, IconButton, Select, VStack } from '@chakra-ui/react';

import React from 'react';

import { MonthlyCalendar } from './MonthlyCalendar';
import { WeeklyCalender } from './WeeklyCalendar';
import { useCalendarView } from '../../hooks/useCalendarView';
import { useNotifications } from '../../hooks/useNotifications';
import { useSearch } from '../../hooks/useSearch';

export const MainCalendarView = React.memo(({ events }) => {
  const { view, setView, navigate, currentDate, holidays } = useCalendarView();
  const { filteredEvents } = useSearch(events, currentDate, view);
  const { notifiedEvents } = useNotifications(events);

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
    </VStack>
  );
});
