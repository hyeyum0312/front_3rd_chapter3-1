import { Event } from '../../types';
import {
  convertEventToDateRange,
  findOverlappingEvents,
  isOverlapping,
  parseDateTime,
} from '../../entities/utils/eventOverlap';

describe('parseDateTime', () => {
  it('2024-07-01 14:30을 정확한 Date 객체로 변환한다', () => {
    const dateTime = parseDateTime('2024-07-01', '14:30');
    expect(dateTime).toEqual(new Date('2024-07-01T14:30:00'));
  });

  it('잘못된 날짜 형식에 대해 Invalid Date를 반환한다', () => {
    const dateTime = parseDateTime('2024.07.01', '14:30');
    expect(isNaN(dateTime.getTime())).toBe(true);
  });

  it('잘못된 시간 형식에 대해 Invalid Date를 반환한다', () => {
    const dateTime = parseDateTime('2024-07-01', '01:60');
    expect(isNaN(dateTime.getTime())).toBe(true);
  });

  it('날짜 문자열이 비어있을 때 Invalid Date를 반환한다', () => {
    const dateTime = parseDateTime('', '01:60');
    expect(isNaN(dateTime.getTime())).toBe(true);
  });
});

describe('convertEventToDateRange', () => {
  it('일반적인 이벤트를 올바른 시작 및 종료 시간을 가진 객체로 변환한다', () => {
    const event: Event = {
      id: '1',
      title: '제목1',
      date: '2024-11-01',
      startTime: '10:46',
      endTime: '12:50',
      description: '샬라샬라',
      location: '서울',
      category: '',
      repeat: { type: 'daily', interval: 0 },
      notificationTime: 30, // 분 단위로 저장
    };

    const convert = convertEventToDateRange(event);
    expect(convert.start).toEqual(new Date('2024-11-01T10:46:00'));
    expect(convert.end).toEqual(new Date('2024-11-01T12:50:00'));
  });

  it('잘못된 날짜 형식의 이벤트에 대해 Invalid Date를 반환한다', () => {
    const event: Event = {
      id: '2',
      title: '제목 2',
      date: '2024/11/06',
      startTime: '10:00',
      endTime: '19:00',
      description: '',
      location: '',
      category: '',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 0,
    };

    const convert = convertEventToDateRange(event);
    expect(isNaN(convert.start.getTime())).toBe(true);
    expect(isNaN(convert.end.getTime())).toBe(true);
  });

  it('잘못된 시간 형식의 이벤트에 대해 Invalid Date를 반환한다', () => {
    const event: Event = {
      id: '3',
      title: '제목 3',
      date: '2024-11-07',
      startTime: '25:00',
      endTime: '26:00',
      description: '',
      location: '',
      category: '',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 0,
    };

    const convert = convertEventToDateRange(event);
    expect(isNaN(convert.start.getTime())).toBe(true);
    expect(isNaN(convert.end.getTime())).toBe(true);
  });
});

describe('isOverlapping', () => {
  it('두 이벤트가 겹치는 경우 true를 반환한다', () => {
    const event1: Event = {
      id: '1',
      title: '제목1',
      date: '2024-11-01',
      startTime: '10:46',
      endTime: '12:50',
      description: '샬라샬라',
      location: '서울',
      category: '',
      repeat: { type: 'daily', interval: 0 },
      notificationTime: 30, // 분 단위로 저장
    };

    const event2: Event = {
      id: '1',
      title: '제목1',
      date: '2024-11-01',
      startTime: '10:46',
      endTime: '12:50',
      description: '샬라샬라',
      location: '서울',
      category: '',
      repeat: { type: 'daily', interval: 0 },
      notificationTime: 30, // 분 단위로 저장
    };

    expect(isOverlapping(event1, event2)).toBe(true);
  });

  it('두 이벤트가 겹치지 않는 경우 false를 반환한다', () => {
    const event1: Event = {
      id: '1',
      title: '제목1',
      date: '2024-11-01',
      startTime: '10:46',
      endTime: '12:50',
      description: '샬라샬라',
      location: '서울',
      category: '',
      repeat: { type: 'daily', interval: 0 },
      notificationTime: 30, // 분 단위로 저장
    };

    const event2: Event = {
      id: '2',
      title: '제목2',
      date: '2024-11-02',
      startTime: '11:46',
      endTime: '13:50',
      description: '샬라샬라',
      location: '서울',
      category: '',
      repeat: { type: 'daily', interval: 0 },
      notificationTime: 30, // 분 단위로 저장
    };

    expect(isOverlapping(event1, event2)).toBe(false);
  });
});

describe('findOverlappingEvents', () => {
  const events: Event[] = [
    {
      id: '1',
      title: '제목1',
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
      title: '제목 2',
      date: '2024-11-07',
      startTime: '10:00',
      endTime: '19:00',
      description: '',
      location: '',
      category: '',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 0,
    },
    {
      id: '2',
      title: '제목 2',
      date: '2024-11-07',
      startTime: '11:00',
      endTime: '19:00',
      description: '',
      location: '',
      category: '',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 0,
    },
  ];

  it('새 이벤트와 겹치는 모든 이벤트를 반환한다', () => {
    const newEvent: Event = {
      id: '3',
      title: '제목 3',
      date: '2024-11-07',
      startTime: '10:30',
      endTime: '19:00',
      description: '',
      location: '',
      category: '',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 0,
    };

    const find = findOverlappingEvents(newEvent, events);
    expect(find).toEqual([events[0], events[1], events[2]]);
  });

  it('겹치는 이벤트가 없으면 빈 배열을 반환한다', () => {
    const newEvent: Event = {
      id: '3',
      title: '제목 3',
      date: '2024-11-08',
      startTime: '10:30',
      endTime: '19:00',
      description: '',
      location: '',
      category: '',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 0,
    };
    const find = findOverlappingEvents(newEvent, events);
    expect(find).toEqual([]);
  });
});
