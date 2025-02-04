import { create } from 'zustand';

const defaultState = {
  date: new Date(Date.now()),
  start: null,
  end: null,
  selectedOttOptions: [],
  selectedOttInfo: [],
};

const formatSearchTime = (date, time) => {
  let result;
  if (date != null) result = new Date(date);
  else result = new Date(time);

  result.setHours(time.getHours());
  result.setMinutes(time.getMinutes());
  result.setSeconds(0);
  result.setMilliseconds(0);

  return result;
};

const useFilterStore = create((set, get) => ({
  ...defaultState,

  //actions
  init: () => set({ ...defaultState }),
  setDate: (date) => set({ date: date }),
  setStart: (start) => set({ start: formatSearchTime(get().date, start) }),
  setEnd: (end) => set({ end: formatSearchTime(get().date, end) }),
  setOttOptionAndInfo: (options, otts) => {
    if (options == null) {
      set({ selectedOttOptions: [], selectedOttInfo: [] });
      return;
    }

    let formattedOtts = otts.map((ott) => ({
      id: ott.ottId,
      name: ott.name,
      profiles: [],
    }));

    for (const option of options) {
      const ottId = Number(option.value.charAt(0));
      const profileId = Number(option.value.charAt(2));

      formattedOtts = formattedOtts.map((formattedOtt) => {
        if (formattedOtt.id === ottId) {
          return {
            ...formattedOtt,
            profiles:
              profileId === 0
                ? otts
                    .find((ott) => ott.ottId === ottId)
                    .profiles.map((profile) => profile.profileId)
                : [...formattedOtt.profiles, profileId],
          };
        }
        return formattedOtt;
      });
    }

    const result = formattedOtts.filter((item) => item.profiles.length != 0);

    set({ selectedOttOptions: options, selectedOttInfo: result });
  },
}));

export { useFilterStore };
