import { getSeats } from 'entities/ott/api/getSeats';
import { create } from 'zustand';

const defaultState = {
  seats: [],
};

const useSeatStore = create((set, get) => ({
  ...defaultState,

  //actions
  init: () => set({ ...defaultState }),
  setSeats: ({ ott, start, end }) => set({ seats: getSeats(ott, start, end) }),
}));

export { useSeatStore };
