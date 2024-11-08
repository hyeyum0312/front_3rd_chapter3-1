import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
  useEditable,
  VStack,
} from '@chakra-ui/react';

import { useFetchEvents } from '../../hooks/useFetchEvents';
import { useNotifications } from '../../hooks/useNotifications';
import { useEffect } from 'react';

export const Notifications = () => {
  const { events, isLoading, error, fetchEvents } = useFetchEvents(); // 상태와 함수는 훅에서 관리
  const { notifications, setNotifications } = useNotifications(events);

  return (
    <>
      {notifications.length > 0 && (
        <VStack position="fixed" top={4} right={4} spacing={2} align="flex-end">
          {notifications.map((notification, index) => (
            <Alert key={index} status="info" variant="solid" width="auto">
              <AlertIcon />
              <Box flex="1">
                <AlertTitle fontSize="sm">{notification.message}</AlertTitle>
              </Box>
              <CloseButton
                onClick={() => setNotifications((prev) => prev.filter((_, i) => i !== index))}
              />
            </Alert>
          ))}
        </VStack>
      )}
    </>
  );
};
