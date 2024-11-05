import { Event } from '../../types';
import { createNotificationMessage, getUpcomingEvents } from '../../utils/notificationUtils';

describe('getUpcomingEvents', () => {
  const events: Event[] = [
    {
      id: '1',
      title: 'Event 1',
      date: '2024-10-30',
      startTime: '10:00',
      endTime: '19:00',
      description: '',
      location: '',
      category: '',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    },
    {
      id: '2',
      title: 'Event 2',
      date: '2024-12-01',
      startTime: '10:00',
      endTime: '19:00',
      description: '',
      location: '',
      category: '',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    },
  ];

  it('알림 시간이 정확히 도래한 이벤트를 반환한다', () => {
    const now = new Date('2024-12-01T09:50:00');
    const notifiedEvents: string[] = [];
    const upcomingEvents = getUpcomingEvents(events, now, notifiedEvents);
    expect(upcomingEvents).toHaveLength(1);
    expect(upcomingEvents[0].title).toBe('Event 2');
  });

  it('이미 알림이 간 이벤트는 제외한다', () => {
    const now = new Date('2023-10-30T09:01:00');
    const notifiedEvents: string[] = [];
    const upcomingEvents = getUpcomingEvents(events, now, notifiedEvents);
    expect(upcomingEvents).toHaveLength(0);
  });

  it('알림 시간이 아직 도래하지 않은 이벤트는 반환하지 않는다', () => {
    const now = new Date('2023-10-30T08:01:00');
    const notifiedEvents: string[] = [];
    const upcomingEvents = getUpcomingEvents(events, now, notifiedEvents);
    expect(upcomingEvents).toHaveLength(0);
  });

  it('알림 시간이 지난 이벤트는 반환하지 않는다', () => {
    const now = new Date('2023-10-30T11:01:00');
    const notifiedEvents: string[] = [];
    const upcomingEvents = getUpcomingEvents(events, now, notifiedEvents);
    expect(upcomingEvents).toHaveLength(0);
  });
});

describe('createNotificationMessage', () => {
  it('올바른 알림 메시지를 생성해야 한다', () => {
    const event: Event = {
      id: '1',
      title: '저녁 엽떡 시키기',
      date: '2023-11-08',
      startTime: '19:00',
      endTime: '20:00',
      description: '',
      location: '',
      category: '',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    };

    const createMessage = createNotificationMessage(event);
    expect(createMessage).toBe('10분 후 저녁 엽떡 시키기 일정이 시작됩니다.');
  });
});
