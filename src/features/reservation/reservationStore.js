import { getReservationList } from "entities/index";
import { getDateParam, OTT_ID, OTT_PROFILE_ID } from "shared";
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

  setSelectedDate: (year, month, date) => {
    get().initSelectedTime({});
    return set({ selectedDate: { year, month, date } });
  },

  setSelectedOTT: (ott) => {
    get().initSelectedTime({ ott });
    const newSelectedProfile = ott ? null : get().selectedProfile;
    set({ selectedOTT: ott, selectedProfile: newSelectedProfile });
  },
  setSelectedProfile: (profile) => {
    get().initSelectedTime({ profile });
    set({ selectedProfile: profile });
  },

  initSelectedTime: ({ ott = get().selectedOTT, profile = get().selectedProfile }) => {
    console.log(ott, profile);
    if (ott === null || profile === null) return;
    getReservationList({
      ottId: OTT_ID[ott],
      profileId: OTT_PROFILE_ID[ott][profile],
      date: getDateParam(get().selectedDate),
    });
    // set({ isSelectedTime: Array.from({ length: 24 * 6 }, () => false) });
  },
  setSelectedTime: (timeIdx, isSelected) => {
    const isSelectedTime = get().isSelectedTime;
    isSelectedTime[timeIdx] = isSelected;
    set({ isSelectedTime });
  },
}));

export { useReservationStore };
