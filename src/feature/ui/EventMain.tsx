import { Box, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';

import { MainAlertView } from './alert/mainAlertView.tsx';
import { Notifications } from './alert/notifications.tsx';
import { EventScheduleForm } from './EventScheduleForm.tsx';
import { useFetchEvents } from '../hooks/useFetchEvents.ts';
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
          {/* 로딩 상태가 true일 때 로딩 UI를 표시 */}
          {isLoading ? (
            <Box>Loading...</Box> // 로딩 스피너나 다른 UI를 사용할 수 있음
          ) : (
            <>
              <MainCalendarView />
              <MainSearchView />
            </>
          )}
        </Flex>
        {error && <Box color="red">{error}</Box>} {/* 에러 메시지 표시 */}
        <MainAlertView />
        <Notifications />
      </Box>
    </RecoilRoot>
  );
};
