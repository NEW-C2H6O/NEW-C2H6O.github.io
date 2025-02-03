import { create } from "zustand";

const defaultState = {
  isOpen: false,
};

const useReservationHistoryDatePickerStore = create((set, get) => ({
  ...defaultState,

  //actions
  openDatePicker: () => set({ isOpen: true }),
  closeDatePicker: () => set({ isOpen: false }),
}));

export { useReservationHistoryDatePickerStore };
