import { INCLUSION_OPTIONS, OTT_PLATFORMS, OTT_PROFILES, SORT_OPTIONS } from "shared";
import { getOnlyItemIdx } from "shared/functions";
import { create } from "zustand";

const defaultState = {
  isOpen: false,
  selectedOttPlatforms: Array.from({ length: OTT_PLATFORMS.length }, () => true),
  selectedOttPlatform: null,
  selectedOttProfiles: Array.from({ length: 0 }, () => true),
  selectedSortOptions: Array.from({ length: SORT_OPTIONS.length }, () => false),
  selectedMyOnly: [true, false],
};

const useReservationHistoryFilterStore = create((set, get) => ({
  ...defaultState,

  //actions
  init: ({
    ottPlatforms,
    ottProfiles,
    sortOption,
    myOnly
  }) => {
    const selectedOttPlatforms = Array.from({ length: OTT_PLATFORMS.length }, () => false);
    ottPlatforms.forEach((v) => (selectedOttPlatforms[v] = true));

    const selectedOttPlatform = OTT_PLATFORMS[getOnlyItemIdx(selectedOttPlatforms)] ?? null;
    const selectedOttProfiles = selectedOttPlatform
      ? Array.from({ length: OTT_PROFILES[selectedOttPlatform].length }, () => false)
      : [];
    ottProfiles.forEach((v) => (selectedOttProfiles[v] = true));

    const selectedSortOptions = Array.from({ length: SORT_OPTIONS.length }, () => false);
    sortOption !== null && (selectedSortOptions[sortOption] = true);

    const selectedMyOnly = Array.from({ length: INCLUSION_OPTIONS.length }, () => false);
    selectedMyOnly[myOnly ? 0 : 1] = true;

    set({
      selectedOttPlatforms,
      selectedOttPlatform,
      selectedOttProfiles,
      selectedSortOptions,
      selectedMyOnly,
    });
  },

  openFilter: () => set({ isOpen: true }),
  closeFilter: () => set({ isOpen: false }),
  toggleSelectedOttPlatform: (index) => {
    const { selectedOttPlatforms } = get();
    const newSelectedOttPlatforms = [...selectedOttPlatforms];
    newSelectedOttPlatforms[index] = !newSelectedOttPlatforms[index];

    const newSelectedOttPlatform = OTT_PLATFORMS[getOnlyItemIdx(newSelectedOttPlatforms)] ?? null;
    const newSelectedOttProfiles = newSelectedOttPlatform
      ? Array.from({ length: OTT_PROFILES[newSelectedOttPlatform].length }, () => true)
      : [];

    set({
      selectedOttPlatforms: newSelectedOttPlatforms,
      selectedOttPlatform: newSelectedOttPlatform,
      selectedOttProfiles: newSelectedOttProfiles,
    });
  },
  toggleSelectedOttProfile: (index) => {
    const { selectedOttProfiles } = get();
    const newSelectedOttProfiles = [...selectedOttProfiles];
    newSelectedOttProfiles[index] = !newSelectedOttProfiles[index];
    set({ selectedOttProfiles: newSelectedOttProfiles });
  },
  toggleSelectedSortOption: (index) => {
    const { selectedSortOptions } = get();
    const newSelectedSortOptions = [...selectedSortOptions];
    if (newSelectedSortOptions[index] === true) {
      newSelectedSortOptions.fill(false);
    } else {
      newSelectedSortOptions.fill(false);
      newSelectedSortOptions[index] = true;
    }
    set({ selectedSortOptions: newSelectedSortOptions });
  },
  toggleSelectedMyOnly: (index) => {
    const newSelectedMyOnly = Array.from({ length: INCLUSION_OPTIONS.length }, () => false);
    newSelectedMyOnly[index] = true;
    set({ selectedMyOnly: newSelectedMyOnly });
  },
}));

export { useReservationHistoryFilterStore };
