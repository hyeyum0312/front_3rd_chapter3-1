import { Box, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';

import { EventScheduleForm } from './EventScheduleForm.tsx';
import { useFetchEvents } from '../hooks/useFetchEvents.ts';
import { MainAlertView } from './alert/MainAlertView.tsx';
import { Notifications } from './alert/Notifications.tsx';
import { MainCalendarView } from './calendarViews/MainCalendarView.tsx';
import { MainSearchView } from './eventCalendarViews/MainSearchView.tsx';

export const EventMain = () => {
  const { events, isLoading, error, fetchEvents } = useFetchEvents(); // 상태와 함수는 훅에서 관리

  useEffect(() => {
    console.log('Fetching events...');
    fetchEvents(); // 이벤트 로딩을 useEffect에서 처리
  }, [fetchEvents]);

  return (
    <RecoilRoot>
      <Box w="full" h="100vh" m="auto" p={5}>
        <Flex gap={6} h="full">
          <EventScheduleForm />

          {isLoading ? (
            <Box>Loading...</Box>
          ) : (
            <>
              <MainCalendarView />
              <MainSearchView />
            </>
          )}
        </Flex>
        {error && <Box color="red">{error}</Box>}
        <MainAlertView />
        <Notifications />
      </Box>
    </RecoilRoot>
  );
};
