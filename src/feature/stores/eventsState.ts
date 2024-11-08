import { atom } from 'recoil';

import { Event } from '../../types';

export const eventsState = atom<Event[]>({
  key: 'eventsState',
  default: [],
});

// 로딩 상태를 관리하는 atom
export const isLoadingState = atom<boolean>({
  key: 'isLoadingState', // 유니크한 key
  default: false, // 초기값
});

// 에러 메시지를 관리하는 atom
export const errorState = atom<string | null>({
  key: 'errorState', // 유니크한 key
  default: null, // 초기값
});
