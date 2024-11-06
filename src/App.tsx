import { Box, Flex } from '@chakra-ui/react';

import { MainAlertView } from './components/alert/mainAlertView.tsx';
import { Notifications } from './components/alert/notifications.tsx';
import { MainCalendarView } from './components/calendarViews/MainCalendarView.tsx';
import { MainSearchView } from './components/eventCalendarViews/MainSearchView.tsx';
import { EventScheduleForm } from './components/EventScheduleForm.tsx';

function App() {
  return (
    <Box w="full" h="100vh" m="auto" p={5}>
      <Flex gap={6} h="full">
        <EventScheduleForm />

        <MainCalendarView />

        <MainSearchView />
      </Flex>

      <MainAlertView />
      <Notifications />
    </Box>
  );
}

export default App;
