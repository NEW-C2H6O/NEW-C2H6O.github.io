import { OTT_PLATFORMS_IMAGE_SRC } from "shared";
import styles from "../style/reservationItem.module.css";

import { ReactComponent as EditIcon } from "shared/assets/icons/pen.svg";

function ReservationItem({ reservation }) {
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const memberName = reservation.member;
  const ottName = reservation.ott.name;
  const profileName = reservation.ott.profile.name;
  const time = reservation.time;

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.name}>{memberName}</div>
        <div className={styles.infoRow}>
          <img className={styles.icon} src={OTT_PLATFORMS_IMAGE_SRC[ottName]} alt={ottName} />
          <div className={styles.infoText}>{ottName} {profileName} · {formatTime(time.start)} - {formatTime(time.end)}</div>
        </div>
      </div>
      <EditIcon className={styles.editIcon} />
    </div>
  );
}

export { ReservationItem };
