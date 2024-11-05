import { Event } from '../../types';
import { getFilteredEvents } from '../../utils/eventUtils';

describe('getFilteredEvents', () => {
  const events: Event[] = [
    {
      id: '1',
      title: '이벤트 1',
      date: '2024-11-07',
      startTime: '10:46',
      endTime: '12:50',
      description: '샬라샬라',
      location: '서울',
      category: '',
      repeat: { type: 'daily', interval: 0 },
      notificationTime: 30, // 분 단위로 저장
    },
    {
      id: '2',
      title: '이벤트 2',
      date: '2024-07-01',
      startTime: '10:00',
      endTime: '19:00',
      description: '',
      location: '',
      category: '',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 0,
    },
    {
      id: '3',
      title: 'Event 2',
      date: '2025-01-01',
      startTime: '10:00',
      endTime: '19:00',
      description: '',
      location: '',
      category: '',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 0,
    },
  ];

  it("검색어 '이벤트 2'에 맞는 이벤트만 반환한다", () => {
    const currentDate = new Date('2024-07-01');
    const filteredEvent = getFilteredEvents(events, '이벤트 2', currentDate, 'month');
    expect(filteredEvent).toHaveLength(1);
    expect(filteredEvent.map((item) => item.title)).toEqual(['이벤트 2']);
  });

  it('주간 뷰에서 2024-07-01 주의 이벤트만 반환한다', () => {
    const currentDate = new Date('2024-07-01');
    const filteredEvent = getFilteredEvents(events, '', currentDate, 'week');

    expect(filteredEvent).toHaveLength(1);
    expect(filteredEvent.map((item) => item.title)).toEqual(['이벤트 2']);
  });

  it('월간 뷰에서 2024년 7월의 모든 이벤트를 반환한다', () => {
    const currentDate = new Date('2024-07-01');
    const filteredEvent = getFilteredEvents(events, '', currentDate, 'month');
    expect(filteredEvent).toHaveLength(1);
    expect(filteredEvent.map((item) => item.title)).toEqual(['이벤트 2']);
  });

  it("검색어 '이벤트'와 주간 뷰 필터링을 동시에 적용한다", () => {
    const currentDate = new Date('2024-07-01');
    const filteredEvent = getFilteredEvents(events, '이벤트', currentDate, 'week');
    expect(filteredEvent).toHaveLength(1);
    expect(filteredEvent.map((item) => item.title)).toEqual(['이벤트 2']);
  });

  it('검색어가 없을 때 모든 이벤트를 반환한다', () => {
    const currentDate = new Date('2024-07-01');
    const filteredEvent = getFilteredEvents(events, '', currentDate, 'month');
    expect(filteredEvent).toHaveLength(1);
  });

  it('검색어가 대소문자를 구분하지 않고 작동한다', () => {
    const currentDate = new Date('2025-01-01');
    const filteredEvent = getFilteredEvents(events, 'event', currentDate, 'month');
    expect(filteredEvent).toHaveLength(1);
  });

  it('월의 경계에 있는 이벤트를 올바르게 필터링한다', () => {
    const events: Event[] = [
      {
        id: '4',
        title: 'Event 1',
        date: '2024-08-30',
        startTime: '10:00',
        endTime: '19:00',
        description: '',
        location: '',
        category: '',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 0,
      },
      {
        id: '5',
        title: 'Event 2',
        date: '2024-09-01',
        startTime: '10:00',
        endTime: '19:00',
        description: '',
        location: '',
        category: '',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 0,
      },
    ];
    const currentDate = new Date('2024-08-01');
    const filteredEvent = getFilteredEvents(events, '', currentDate, 'month');
    expect(filteredEvent).toHaveLength(1);
    expect(filteredEvent.map((item) => item.title)).toEqual(['Event 1']);
  });

  it('빈 이벤트 리스트에 대해 빈 배열을 반환한다', () => {
    const filteredEvent = getFilteredEvents([], '', new Date('2024-07-01'), 'month');
    expect(filteredEvent).toHaveLength(0);
  });
});
