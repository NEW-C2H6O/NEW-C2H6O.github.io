import { create } from "zustand";

const defaultState = {
  date: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
  },
};

const useReservationHistoryStore = create((set, get) => ({
  ...defaultState,

  //actions
  init: () => set({ ...defaultState }),
  setDate: ({ year, month, date }) => set({ date: { year, month, date } }),
}));

export { useReservationHistoryStore };
