import { useToast } from '@chakra-ui/react';
import { useState } from 'react';

import { useFetchEvents } from './useFetchEvents';
import { deleteEventApi } from '../../entities/apis/deleteEventApi';
import { saveEventApi } from '../../entities/apis/saveEventApi';
import { Event, EventForm } from '../../types';

export const useEventOperations = (editing: boolean, onSave?: () => void) => {
  const toast = useToast();
  const { fetchEvents } = useFetchEvents();

  // 이벤트 저장 함수
  const saveEvent = async (eventData: Event | EventForm) => {
    try {
      await saveEventApi(eventData, editing); // API 호출

      // 이벤트 목록 업데이트
      await fetchEvents();
      onSave?.();
      toast({
        title: editing ? '일정이 수정되었습니다.' : '일정이 추가되었습니다.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error saving event:', error);
      toast({
        title: '일정 저장 실패',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // 이벤트 삭제 함수
  const deleteEvent = async (id: string) => {
    try {
      await deleteEventApi(id); // API 호출

      // 이벤트 목록 업데이트
      await fetchEvents();

      toast({
        title: '일정이 삭제되었습니다.',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        title: '일정 삭제 실패',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return { saveEvent, deleteEvent };
};
