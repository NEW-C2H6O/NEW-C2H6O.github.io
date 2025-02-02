import { getSeats } from 'entities/ott/api/getSeats';
import { create } from 'zustand';

const defaultState = {
  seats: [],
};

const useSeatStore = create((set, get) => ({
  ...defaultState,

  //actions
  init: () => set({ ...defaultState }),
  fetchSeats: async ({ ott, start, end }) => {
    const data = (await getSeats(ott, start, end)).data
    set({ seats: data })
  },
}));

export { useSeatStore };
