import { create } from "zustand";

const defaultState = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  date: new Date().getDate(),
  isOpen: false,
};

const useDatePickerStore = create((set, get) => ({
  ...defaultState,

  //actions
  init: ({ year, month, date }) => set({ year, month, date }),
  openDatePicker: () => set({ isOpen: true }),
  closeDatePicker: () => set({ isOpen: false }),
  increaseMonth: () => {
    const nxtYear = get().month === 12 ? get().year + 1 : get().year;
    const nxtMonth = get().month === 12 ? 1 : get().month + 1;
    set({ year: nxtYear, month: nxtMonth });
  },
  decreaseMonth: () => {
    const nxtYear = get().month === 1 ? get().year - 1 : get().year;
    const nxtMonth = get().month === 1 ? 12 : get().month - 1;
    set({ year: nxtYear, month: nxtMonth });
  },
  setDate: (date) => set({ date }),
}));

export { useDatePickerStore };
