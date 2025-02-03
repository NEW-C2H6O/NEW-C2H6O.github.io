import { getOtts } from 'entities/ott/api/getOtts';
import { create } from 'zustand';

const defaultState = {
  ottInfo: [],
  ottOptions: [],
};

const useOttOptionStore = create((set, get) => ({
  ...defaultState,

  init: () => set({ ...defaultState }),

  fetchOtts: async () => {
    // 정보가 없을 때만 요청
    if (get().ottOptions.length === 0) {
      const data = (await getOtts()).data;

      const options = [
        {
          label: '모든 프로필',
          options: data.map((ott) => ({
            label: ott.name,
            value: `${ott.ottId}_0`,
            group: 0,
            ott: ott.ottId,
            isDisabled: false,
          })),
        },
      ].concat(
        data.map((ott) => ({
          label: ott.name,
          options: ott.profiles.map((profile) => ({
            label: profile.name,
            value: `${ott.ottId}_${profile.profileId}`,
            group: ott.ottId,
            ott: ott.ottId,
            isDisabled: false,
          })),
        })),
      );

      set({ ottInfo: data, ottOptions: options });
    }
  },
}));

export { useOttOptionStore };
