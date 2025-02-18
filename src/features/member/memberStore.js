import { create } from 'zustand';
import { getMe } from 'entities/member/getMe';

const defaultState = {
  member: null
};

const useMemberStore = create((set, get) => ({
  ...defaultState,

  init: () => set({ ...defaultState }),

  fetchMember: async () => {
    set({ member: (await getMe()).data });
  }
}))

export { useMemberStore };