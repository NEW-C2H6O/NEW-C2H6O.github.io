import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const defaultState = {
  date: new Date(Date.now()).toISOString(),
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

const formatOptions = (options, otts) => {
  /*
  options: [
    {
      group: 0,
      isDisabled: false,
      label: "웨이브",
      ott: 2,
      value: 2_0    // 2번 OTT 모든 Profile
    }, {
      group: 3,
      isDisabled: false,
      label: "2번",
      ott: 3,
      value: 3_10   // 3번 OTT의 ID 10 Profile
    }
  ]
  
  otts: {
    name: "웨이브",
    ottId: 2,
    profiles: [
      {
        name: "1번",
        profileId: 6,
      }
    ]
  }
  */
  
  if (options == null) {
    return [];
  }

  let formattedOtts = otts.map((ott) => ({
    id: ott.ottId,
    name: ott.name,
    profiles: [],
  }));

  for (const option of options) {
    let parts = option.value.split('_');
    const ottId = Number(parts[0]);
    const profileId = Number(parts[1]);

    formattedOtts = formattedOtts.map((formattedOtt) => {
      // 대상 OTT가 아니면 다음으로 넘어 감
      if (formattedOtt.id !== ottId) {
        return formattedOtt;
      }

      // 대상 OTT 정보
      const ott = otts.find((ott) => ott.ottId === ottId);

      let profiles;

      // 모든 프로필 추가
      if (profileId === 0) {
        profiles = ott.profiles.map(({ profileId, name }) => ({
            id: profileId,
            number: Number(name.slice(0, -1)),
          }));
      }

      // 특정 프로필 추가
      else {
        const profile = ott.profiles.find((p) => p.profileId === profileId);
        profiles = profile
          ? [
              ...formattedOtt.profiles,
              {
                id: profile.profileId,
                number: Number(profile.name.slice(0, -1)),
              },
            ]
          : formattedOtt.profiles;
      }

      return { ...formattedOtt, profiles };
    });
  }

  const result = formattedOtts.filter((item) => item.profiles.length != 0);

  return result;
}

const useFilterStore = create(
  persist(
    (set, get) => ({
      ...defaultState,

      //actions
      init: () => set({ ...defaultState }),
      setDate: (date) => set({ date: date == null ? new Date(Date.now()).toISOString() : date.toISOString() }),
      setStart: (start) => set({ start: formatSearchTime(new Date(get().date), start) }),
      setEnd: (end) => set({ end: formatSearchTime(new Date(get().date), end) }),
      setOttOptionAndInfo: (options, otts) => set({ selectedOttOptions: options == null ? [] : options, selectedOttInfo: formatOptions(options, otts) }),
      getDate: () => new Date(get().date),
      getStart: () => new Date(get().start),
      getEnd: () => new Date(get().end),
    }),
    {
      name: "seat-search-filer",
      storage: createJSONStorage(() => sessionStorage),
    }
  ),

);

export { useFilterStore };
