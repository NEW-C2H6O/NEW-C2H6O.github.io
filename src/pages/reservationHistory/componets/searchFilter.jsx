import { useReservationHistoryFilterStore, useReservationHistoryStore } from "features";
import styles from "../style/searchFilter.module.css";
import { motion } from "framer-motion";
import { OTT_PLATFORMS, OTT_PROFILES, SORT_OPTIONS } from "shared";

function SearchFilter() {
  const {
    filter: { ottPlatforms, ottProfiles, sortOption, isPreviousIncluded, isMyReservationIncluded },
  } = useReservationHistoryStore();

  const { init, openFilter } = useReservationHistoryFilterStore();
  function open() {
    init({
      ottPlatforms,
      ottProfiles,
      sortOption,
      isPreviousIncluded,
      isMyReservationIncluded,
    });
    openFilter();
  }

  return (
    <div className={styles.container} onClick={open}>
      {ottPlatforms.length > 0 && (
        <div className={`${styles.item} ${styles.selected}`}>
          {ottPlatformsToText(ottPlatforms)}
        </div>
      )}
      {ottProfiles.length > 0 && (
        <div className={`${styles.item} ${styles.selected}`}>
          {ottProfilesToText(ottProfiles, OTT_PLATFORMS[ottPlatforms[0]])}
        </div>
      )}
      {sortOption !== null && (
        <div className={`${styles.item} ${styles.selected}`}>{`${SORT_OPTIONS[sortOption]}`}</div>
      )}
      {isPreviousIncluded ? (
        <div className={`${styles.item} ${styles.selected}`}>{`지난 예약 포함`}</div>
      ) : (
        <div className={`${styles.item} ${styles.notSelected}`}>{`지난 예약 제외`}</div>
      )}
      {isMyReservationIncluded ? (
        <div className={`${styles.item} ${styles.selected}`}>{`내 예약 포함`}</div>
      ) : (
        <div className={`${styles.item} ${styles.notSelected}`}>{`내 예약 제외`}</div>
      )}
    </div>
  );
}

function ottPlatformsToText(ottPlatforms) {
  return ottPlatforms.length > 1
    ? `${OTT_PLATFORMS[ottPlatforms[0]]} 외 ${ottPlatforms.length - 1}개`
    : OTT_PLATFORMS[ottPlatforms[0]];
}

function ottProfilesToText(ottProfiles, ottPlatform) {
  return ottProfiles.length > 1
    ? `${OTT_PROFILES[ottPlatform][ottProfiles[0]]} 외 ${ottProfiles.length - 1}개`
    : OTT_PROFILES[ottPlatform][ottProfiles[0]];
}

export { SearchFilter };
