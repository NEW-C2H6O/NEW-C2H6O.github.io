import { create } from "zustand";

const defaultState = {
  date: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
  },

  filter: {
    ottPlatforms: [0],
    ottProfiles: [1],
    sortOption: null,
    isPreviousIncluded: false,
    isMyReservationIncluded: true,
  },

  // list
};

const useReservationHistoryStore = create((set, get) => ({
  ...defaultState,

  //actions
  init: () => set({ ...defaultState }),
  setDate: (year, month, date) => set({ date: { year, month, date } }),
  setFilter: ({
    ottPlatforms,
    ottProfiles,
    sortOption,
    isPreviousIncluded,
    isMyReservationIncluded,
  }) => {
    console.log(sortOption);
    set({
      filter: {
        ottPlatforms,
        ottProfiles,
        sortOption,
        isPreviousIncluded,
        isMyReservationIncluded,
      },
    });
  },

  getList: () => {},
}));

export { useReservationHistoryStore };
