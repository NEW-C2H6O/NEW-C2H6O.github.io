import { OTT_PLATFORMS_IMAGE_SRC } from "shared";
import styles from "../style/reservationItem.module.css";

import { ReactComponent as EditIcon } from "shared/assets/icons/pen.svg";

function ReservationItem() {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.name}>홍길동</div>
        <div className={styles.infoRow}>
          <img className={styles.icon} src={OTT_PLATFORMS_IMAGE_SRC["왓챠"]} />
          <div className={styles.infoText}>WAVE 1번 · HH:MM - HH:MM </div>
        </div>
      </div>
      <EditIcon className={styles.editIcon} />
    </div>
  );
}

export { ReservationItem };
