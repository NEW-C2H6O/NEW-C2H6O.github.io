import { create } from "zustand";
import { getReservations } from "entities/index";
import { getDateParam } from "shared";

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
    myOnly: false,
  },

  reservations: [],
  sliceInfo: null,
  isLoading: false,
};

const useReservationHistoryStore = create((set, get) => ({
  ...defaultState,

  //actions
  init: () => set({ ...defaultState }),

  setDate: (year, month, date) => set({ date: { year, month, date } }),

  setFilter: ({ ottPlatforms, ottProfiles, sortOption, myOnly }) => {
    set({
      filter: {
        ottPlatforms,
        ottProfiles,
        sortOption,
        myOnly,
      },
    });
  },

  setMyOnly: (myOnly) => {
    set({
      filter: {
        ...get().filter,
        myOnly,
      },
    });
  },

  fetchFirstReservations: async () => {
    set({ isLoading: true });
    const { filter, date } = get();
    const result = await getReservations(filter, date, null);
    set({
      reservations: result.content,
      sliceInfo: result.sliceInfo,
      isLoading: false,
    });
  },

  fetchNextReservations: async () => {
    set({ isLoading: true });
    const { filter, date, reservations, sliceInfo } = get();
    const cursor = reservations.length === 0 ? null : sliceInfo?.cursor;
    const result = await getReservations(filter, date, cursor);
    set({
      reservations: [...reservations, ...result.content],
      sliceInfo: result.sliceInfo,
      isLoading: false,
    });
  },

  removeReservation: (reservationId) => {
    const { reservations } = get();
    set({
      reservations: reservations.filter(
        (reservation) => reservation.reservationId !== reservationId
      ),
    });
  },
}));

export { useReservationHistoryStore };
