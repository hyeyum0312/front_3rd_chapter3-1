import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { fetchEventsApi } from '../../entities/apis/fetchEventsApi';
import { errorState, eventsState, isLoadingState } from '../stores/eventsState';

export const useFetchEvents = () => {
  const [events, setEvents] = useRecoilState(eventsState);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const [error, setError] = useRecoilState(errorState);

  const fetchEvents = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const fetchedEvents = await fetchEventsApi(); // 데이터를 받아옵니다.
      setEvents(fetchedEvents); // 상태 업데이트
    } catch (err) {
      setError('이벤트를 가져오는 데 실패했습니다.'); // 에러 상태 설정
      console.error('Error fetching events:', err);
    } finally {
      setIsLoading(false); // 로딩 상태 종료
    }
  }, [setEvents, setIsLoading, setError]);

  return { events, isLoading, error, fetchEvents };
};
