import { fetchHolidays } from '../../apis/fetchHolidays';

describe('fetchHolidays', () => {
  it('주어진 월의 공휴일만 반환한다', () => {
    const date = new Date('2024-12-05');
    const holidays = fetchHolidays(date);
    expect(Object.keys(holidays)).toHaveLength(1);
    expect(holidays['2024-12-25']).toBe('크리스마스');
  });

  it('공휴일이 없는 월에 대해 빈 객체를 반환한다', () => {
    const date = new Date('2024-11-05');
    const holidays = fetchHolidays(date);
    expect(Object.keys(holidays)).toHaveLength(0);
  });

  it('여러 공휴일이 있는 월에 대해 모든 공휴일을 반환한다', () => {
    const date = new Date('2024-10-05');
    const holidays = fetchHolidays(date);
    const sortDate = Object.keys(holidays);
    expect(sortDate).toEqual(['2024-10-03', '2024-10-09']);
    expect(sortDate).toHaveLength(2);
    expect(holidays['2024-10-03']).toBe('개천절');
    expect(holidays['2024-10-09']).toBe('한글날');
  });
});
