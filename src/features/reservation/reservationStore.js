import { getReservationList } from "entities/index";
import { getDateParam, OTT_ID, OTT_PROFILE_ID, timeToReservationIdx } from "shared";
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

  isReservedTime: Array.from({ length: 24 * 6 }, () => false),
  selectedTime: {
    stTimeIdx: null,
    edTimeIdx: null,
  },
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

  initSelectedTime: async ({ ott = get().selectedOTT, profile = get().selectedProfile }) => {
    if (ott === null || profile === null) return;

    const newIsReservedTime = Array.from({ length: 24 * 6 }, () => false);

    const reservationList = await getReservationList({
      ottId: OTT_ID[ott],
      profileId: OTT_PROFILE_ID[ott][profile],
      date: getDateParam(get().selectedDate),
    });

    reservationList.forEach(({ start, end }) => {
      const stIdx = timeToReservationIdx(new Date(start));
      const edIdx = timeToReservationIdx(new Date(end));

      for (let timeIdx = stIdx; timeIdx <= edIdx; timeIdx++) newIsReservedTime[timeIdx] = true;
    });

    set({ isReservedTime: newIsReservedTime });
  },

  setSelectedTime: (timeIdx) => {
    //이미 예약된 곳은 불가
    if (get().isReservedTime[timeIdx]) return;

    //선택된 시간이 없는 경우
    if (get().selectedTime.stTimeIdx === null) {
      set({
        selectedTime: {
          stTimeIdx: timeIdx,
          edTimeIdx: timeIdx,
        },
      });
      return;
    }

    //선택된 하나만 없애는 경우
    if (
      get().selectedTime.stTimeIdx === get().selectedTime.edTimeIdx &&
      get().selectedTime.stTimeIdx === timeIdx
    ) {
      return set({
        selectedTime: {
          stTimeIdx: null,
          edTimeIdx: null,
        },
      });
    }

    //시작 쪽에서 늘리는 경우
    if (get().selectedTime.stTimeIdx - 1 === timeIdx || get().selectedTime.stTimeIdx === timeIdx) {
      return set({
        selectedTime: {
          ...get().selectedTime,
          stTimeIdx: get().selectedTime.stTimeIdx === timeIdx ? timeIdx + 1 : timeIdx,
        },
      });
    }

    //끝 쪽에서 시간을 줄이거나, 늘리는 경우
    if (get().selectedTime.edTimeIdx + 1 === timeIdx || get().selectedTime.edTimeIdx === timeIdx) {
      return set({
        selectedTime: {
          ...get().selectedTime,
          edTimeIdx: get().selectedTime.edTimeIdx === timeIdx ? timeIdx - 1 : timeIdx,
        },
      });
    }

    //선택된 가운데 부분을 삭제하는 경우
    //짧은 쪽을 당기기
    if (get().selectedTime.stTimeIdx <= timeIdx && timeIdx <= get().selectedTime.edTimeIdx) {
      if (
        Math.abs(get().selectedTime.stTimeIdx - timeIdx) <
        Math.abs(get().selectedTime.edTimeIdx - timeIdx)
      )
        return set({
          selectedTime: {
            ...get().selectedTime,
            stTimeIdx: timeIdx + 1,
          },
        });
      else
        return set({
          selectedTime: {
            ...get().selectedTime,
            edTimeIdx: timeIdx - 1,
          },
        });
    }

    //전혀 새로운 곳을 선택하는 경우
    return set({
      selectedTime: {
        stTimeIdx: timeIdx,
        edTimeIdx: timeIdx,
      },
    });
  },
}));

export { useReservationStore };
