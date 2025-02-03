import { create } from "zustand";

const defaultState = {
  date: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
  },

  filter: {
    ottPlatforms: [0, 1, 2],
    ottProfiles: [],
    sortOption: 0,
    myOnly: true,
  },
};

const useReservationHistoryStore = create((set, get) => ({
  ...defaultState,

  //actions
  init: () => set({ ...defaultState }),
  setDate: ({ year, month, date }) => set({ date: { year, month, date } }),
  setFilter: ({
    ottPlatforms,
    ottProfiles,
    sortOption,
    myOnly,
  }) => {
    set({
      filter: {
        ottPlatforms,
        ottProfiles,
        sortOption,
        myOnly,
      },
    });
  },
}));

export { useReservationHistoryStore };
