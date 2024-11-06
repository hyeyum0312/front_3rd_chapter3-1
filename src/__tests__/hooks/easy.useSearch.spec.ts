import { act, renderHook } from '@testing-library/react';

import { useSearch } from '../../hooks/useSearch.ts';
import { Event } from '../../types.ts';

const mockEvents: Event[] = [
  {
    id: '1',
    title: '엽떡 먹는날',
    date: '2024-11-01',
    startTime: '12:00',
    endTime: '13:00',
    description: '동대문 엽기떡볶이',
    location: '집',
    category: '개인',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 10,
  },
  {
    id: '2',
    title: '회의',
    date: '2024-11-02',
    startTime: '12:00',
    endTime: '13:00',
    description: '거래처 회의',
    location: '회사',
    category: '업무',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 10,
  },
];

it('검색어가 비어있을 때 모든 이벤트를 반환해야 한다', () => {
  const currentDate = new Date('2024-11-01');
  const view = 'month';
  const { result } = renderHook(() => useSearch(mockEvents, currentDate, view));

  expect(result.current.filteredEvents).toEqual(mockEvents);
});

it('검색어에 맞는 이벤트만 필터링해야 한다', () => {
  const currentDate = new Date('2024-11-02');
  const view = 'month';
  const { result } = renderHook(() => useSearch(mockEvents, currentDate, view));

  act(() => {
    result.current.setSearchTerm('엽떡 먹는날');
  });

  expect(result.current.filteredEvents).toEqual([
    {
      id: '1',
      title: '엽떡 먹는날',
      date: '2024-11-01',
      startTime: '12:00',
      endTime: '13:00',
      description: '동대문 엽기떡볶이',
      location: '집',
      category: '개인',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    },
  ]);
});

it('검색어가 제목, 설명, 위치 중 하나라도 일치하면 해당 이벤트를 반환해야 한다', () => {
  const currentDate = new Date('2024-11-02');
  const view = 'month';
  const { result } = renderHook(() => useSearch(mockEvents, currentDate, view));

  act(() => {
    result.current.setSearchTerm('회의');
  });

  expect(result.current.filteredEvents).toHaveLength(1);
  expect(result.current.filteredEvents[0].title).toBe('회의');

  act(() => {
    result.current.setSearchTerm('거래처 회의');
  });

  expect(result.current.filteredEvents).toHaveLength(1);
  expect(result.current.filteredEvents[0].description).toBe('거래처 회의');

  act(() => {
    result.current.setSearchTerm('회사');
  });

  expect(result.current.filteredEvents).toHaveLength(1);
  expect(result.current.filteredEvents[0].location).toBe('회사');
});

it('현재 뷰(주간/월간)에 해당하는 이벤트만 반환해야 한다', () => {
  const currentDate = new Date('2024-11-01');
  const { result: month } = renderHook(() => useSearch(mockEvents, currentDate, 'month'));

  expect(month.current.filteredEvents).toHaveLength(2);

  const { result: week } = renderHook(() => useSearch(mockEvents, currentDate, 'week'));
  expect(week.current.filteredEvents).toHaveLength(2);
});

it("검색어를 '회의'에서 '점심'으로 변경하면 필터링된 결과가 즉시 업데이트되어야 한다", () => {
  const { result } = renderHook(() => useSearch(mockEvents, new Date('2024-11-02'), 'month'));

  act(() => {
    result.current.setSearchTerm('회의');
  });

  expect(result.current.filteredEvents).toHaveLength(1);
  expect(result.current.filteredEvents[0].title).toBe('회의');

  act(() => {
    result.current.setSearchTerm('점심');
  });

  expect(result.current.filteredEvents).toHaveLength(0);
});
