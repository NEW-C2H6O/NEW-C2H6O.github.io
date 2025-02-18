import { OTT_PLATFORMS_IMAGE_SRC } from "shared";
import { useMemberStore, useReservationHistoryStore } from "features";

import { deleteReservation } from "entities/reservation/api/deleteReservation";

import styles from "../style/reservationItem.module.css";
import { ReactComponent as DeleteIcon } from "shared/assets/icons/trash.svg";

const formatTime = (dateString) => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

function ReservationItem({ reservation }) {
  const { member } = useMemberStore();
  const { removeReservation } = useReservationHistoryStore();

  // TODO: 현재 예약이 삭제되었을 때 해당 예약을 렌더링 하지 않기 위해 후처리 로직 구현에 대한 고민이 있음
  // 1. 예약 삭제 요청을 보내면, 예약 목록에서 해당 예약을 삭제 (즉, 다시 API 요청을 보내지 않음)
  // 2. 예약 삭제 요청을 보내면, 다시 예약 목록을 불러옴 (새로운 API 요청을 보냄)
  // 2번 방법에선 새로운 API 요청을 보내고 스크롤을 맨 위로 올릴지 아니면 그대로 둘지에 대한 고민이 있음
  // 스크롤을 맨 위로 올린다면 예약 목록 첫 페이지만 불러오면 됨
  // 그대로 둔다면 첫 페이지부터 삭제된 예약이 속한 페이지까지 모두 불러오고, 스크롤을 다시 계산해야 함
  // 그래서 일단 1번 방법으로 구현함
  const handleDelete = (reservationId) => {
    const result = window.confirm("예약을 삭제하시겠습니까?");
    if (result) {
      const reservationId = reservation.reservationId;
      deleteReservation(reservationId);
      alert("예약이 삭제되었습니다.");
      removeReservation(reservationId);
    }
  }
  
  const memberId = reservation.member.memberId;
  const memberName = reservation.member.name;
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
      { member?.memberId === memberId ? <DeleteIcon className={styles.deleteIcon} onClick={handleDelete} /> : null }
    </div>
  );
}

export { ReservationItem };
