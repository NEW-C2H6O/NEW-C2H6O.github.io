import { getOtts } from 'entities/ott/api/getOtts';
import { create } from 'zustand';

const defaultState = {
  ottOptions: [],
};

const useOttOptionStore = create((set, get) => ({
  ...defaultState,

  init: () => set({ ...defaultState }),

  fetchOtts: async () => {
    // 정보가 없을 때만 요청
    if (get().otts.length === 0) {
      const response = await getOtts();

      if (response.status !== 200) {
        // TODO: 예외 처리
        return;
      }

      const options = response.data.map((ott) => ({
        label: ott.name,
        options: ott.profiles
          .map((profile) => ({
            label: profile.name,
            value: profile.profileId,
            ott: ott.ottId,
            ottName: ott.name,
          }))
          .concat({
            label: 'ALL',
            value: 0,
            ott: ott.ottId,
            ottName: ott.name,
          }),
      }));

      set({ ottOptions: options });
    }
  },
}));

export { useOttOptionStore };
