import styles from "./style/index.module.css";

import { ReactComponent as CalenderIcon } from "shared/assets/icons/calendar.svg";
import { useReservationHistoryDatePickerStore, useReservationHistoryStore } from "features";
import { FilterBottomSheet } from "./componets/filterBottomSheet";
import { SearchFilter } from "./componets/searchFilter";
import { ReservationItem } from "./componets/reservationItem";
import { DatePickerBottomSheet } from "widgets";

function ReservationHistoryPage() {
  const { isOpen, openDatePicker, closeDatePicker } = useReservationHistoryDatePickerStore();

  const { date, setDate } = useReservationHistoryStore();

  return (
    <div className={styles.container}>
      <DatePickerBottomSheet
        isOpen={isOpen}
        closeDatePicker={closeDatePicker}
        onConfirm={setDate}
      />
      <FilterBottomSheet />
      <div style={{ height: "1.71svh" }} />
      <div
        className={styles.searchDate}
        onClick={() => {
          openDatePicker();
        }}
      >
        <CalenderIcon className={styles.icon} />
        <div className={styles.text}>{`${date.year}년 ${date.month}월 ${date.date}일`}</div>
      </div>
      <div style={{ height: "2.05svh" }} />
      <SearchFilter />
      <div style={{ height: "2.53svh" }} />
      <div className={styles.divider} />

      <div className={styles.listContainer}>
        <ReservationItem />
        <ReservationItem />
        <ReservationItem />
        <ReservationItem />
        <ReservationItem />
      </div>
    </div>
  );
}

export { ReservationHistoryPage };
