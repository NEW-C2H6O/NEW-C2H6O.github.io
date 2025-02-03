import { create } from "zustand";

const defaultState = {
  isDatePickerOpen: false,

  selectedDate: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
  },
  selectedOTT: null,
  selectedProfile: null,
  isSelectedTime: Array.from({ length: 24 * 6 }, () => false),
};

const useReservationStore = create((set, get) => ({
  ...defaultState,

  //actions
  openDatePicker: () => set({ isDatePickerOpen: true }),
  closeDatePicker: () => set({ isDatePickerOpen: false }),

  setSelectedDate: (year, month, date) => set({ selectedDate: { year, month, date } }),

  setSelectedOTT: (ott) => {
    const newSelectedProfile = ott ? null : get().selectedProfile;
    set({ selectedOTT: ott, selectedProfile: newSelectedProfile });
  },
  setSelectedProfile: (profile) => {
    set({ selectedProfile: profile });
  },
  setSelectedTime: (timeIdx, isSelected) => {
    const isSelectedTime = get().isSelectedTime;
    isSelectedTime[timeIdx] = isSelected;
    set({ isSelectedTime });
  },
}));

export { useReservationStore };
