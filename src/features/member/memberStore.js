import { create } from "zustand";
import { getMe } from "entities/member/getMe";

const defaultState = {
  member: null,
};

const useMemberStore = create((set, get) => ({
  ...defaultState,

  init: () => set({ ...defaultState }),

  fetchMember: async () => {
    const member = await getMe();
    if (!member) return false;
    set({ member });
    return true;
  },

  clear: () => set({ undefined }),
}));

export { useMemberStore };
