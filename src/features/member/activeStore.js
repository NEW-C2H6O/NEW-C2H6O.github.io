import { create } from 'zustand';
import { getMe } from 'entities/member/getMe';

const defaultState = {
  isActive: false,
};

const useActiveStore = create((set, get) => ({
  ...defaultState,

  init: () => set({ ...defaultState }),

  fetchActive: async () => {
    const data = (await getMe()).data;

    set({ isActive: data.isActivated });
  },
}));

export { useActiveStore };
