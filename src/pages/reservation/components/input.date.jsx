import { useReservationStore } from "features";
import styles from "../style/input.module.css";

function InputDate() {
  const {
    selectedDate: { year, month, date },
    openDatePicker,
  } = useReservationStore();
  return (
    <div
      className={styles.dateSelectBox}
      onClick={openDatePicker}
    >{`${year}년 ${month}월 ${date}일`}</div>
  );
}

export { InputDate };
