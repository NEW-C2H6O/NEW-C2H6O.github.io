import { BottomSheet } from "widgets";
import styles from "../style/filterBottomSheet.module.css";
import { FilterSelector } from "./filterSelector";
import {
  INCLUSION_OPTIONS,
  OTT_PLATFORMS,
  OTT_PLATFORMS_IMAGE_SRC,
  OTT_PROFILES,
  SORT_OPTIONS,
} from "shared";
import { useReservationHistoryFilterStore, useReservationHistoryStore } from "features";

function FilterBottomSheet() {
  const {
    isOpen,
    selectedOttPlatforms,
    selectedOttPlatform,
    selectedOttProfiles,
    selectedSortOptions,
    selectedMyOnly,

    closeFilter,
    toggleSelectedOttPlatform,
    toggleSelectedOttProfile,
    toggleSelectedSortOption,
    toggleSelectedMyOnly,
  } = useReservationHistoryFilterStore();

  const { setFilter } = useReservationHistoryStore();

  return (
    <BottomSheet
      isOpen={isOpen}
      closeBottomSheet={closeFilter}
      Content={() => (
        <div className={styles.container}>
          <FilterSelector
            title={`OTT 플랫폼`}
            items={OTT_PLATFORMS}
            selectedItems={selectedOttPlatforms}
            toggleSelectedItem={toggleSelectedOttPlatform}
            iconSrc={OTT_PLATFORMS_IMAGE_SRC}
          />
          {selectedOttPlatform ? (
            <FilterSelector
              title={`프로필`}
              items={selectedOttPlatform ? OTT_PROFILES[selectedOttPlatform] : []}
              selectedItems={selectedOttProfiles}
              toggleSelectedItem={toggleSelectedOttProfile}
              iconSrc={null}
            />
          ) : null}
          <FilterSelector
            title={`정렬`}
            items={SORT_OPTIONS}
            selectedItems={selectedSortOptions}
            toggleSelectedItem={toggleSelectedSortOption}
            iconSrc={null}
          />
          <FilterSelector
            title={`내 예약`}
            items={INCLUSION_OPTIONS}
            selectedItems={selectedMyOnly}
            toggleSelectedItem={toggleSelectedMyOnly}
            iconSrc={null}
          />
          <div
            className={styles.submitButton}
            onClick={() => {
              setFilter({
                ottPlatforms: Array.from({ length: OTT_PLATFORMS.length }, (v, i) => i).filter(
                  (v, i) => selectedOttPlatforms[i]
                ),
                ottProfiles: selectedOttPlatform
                  ? Array.from(
                      { length: OTT_PROFILES[selectedOttPlatform].length },
                      (v, i) => i
                    ).filter((v, i) => selectedOttProfiles[i])
                  : [],
                sortOption:
                  SORT_OPTIONS.findIndex((v, i) => selectedSortOptions[i]) === -1
                    ? null
                    : SORT_OPTIONS.findIndex((v, i) => selectedSortOptions[i]),
                myOnly: selectedMyOnly[0] === true,
              });
              closeFilter();
            }}
          >{`적용하기`}</div>
        </div>
      )}
    />
  );
}

export { FilterBottomSheet };
