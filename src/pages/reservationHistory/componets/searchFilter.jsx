import { useReservationHistoryFilterStore, useReservationHistoryStore } from "features";
import styles from "../style/searchFilter.module.css";
import { motion } from "framer-motion";
import { OTT_PLATFORMS, OTT_PROFILES, SORT_OPTIONS } from "shared";

function SearchFilter() {
  const {
    filter: { ottPlatforms, ottProfiles, sortOption, myOnly },
  } = useReservationHistoryStore();

  const { init, openFilter } = useReservationHistoryFilterStore();
  function open() {
    init({
      ottPlatforms,
      ottProfiles,
      sortOption,
      myOnly,
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
      {myOnly ? (
        <div className={`${styles.item} ${styles.selected}`}>{`내 예약만 보기`}</div>
      ) : (
        <div className={`${styles.item} ${styles.notSelected}`}>{`모든 예약 보기`}</div>
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
