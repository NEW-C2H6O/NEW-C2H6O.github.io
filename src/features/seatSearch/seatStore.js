import { getSeats } from 'entities/ott/api/getSeats';
import { create } from 'zustand';

const defaultState = {
  seats: [],
};

const useSeatStore = create((set, get) => ({
  ...defaultState,

  //actions
  init: () => set({ ...defaultState }),
  fetchSeats: async ({ otts, start, end }) => {
    const data = (await getSeats(otts, start, end)).data
    set({ seats: data })
  },
}));

export { useSeatStore };
