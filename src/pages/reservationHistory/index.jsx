import styles from "./style/index.module.css";
import { Navbar } from "../../widgets/index.js";
import { DatePickerBottomSheet } from "./componets/datePickerBottomSheet.jsx";

import { ReactComponent as CalenderIcon } from "shared/assets/icons/calendar.svg";
import { useReservationHistoryDatePickerStore, useReservationHistoryStore } from "features";
import { FilterBottomSheet } from "./componets/filterBottomSheet";
import { SearchFilter } from "./componets/searchFilter";
import { ReservationItem } from "./componets/reservationItem";

function ReservationHistoryPage() {
  const { init: initDatePicker, openDatePicker } = useReservationHistoryDatePickerStore();

  const { date } = useReservationHistoryStore();

  return (
    <div className={styles.container}>
      <DatePickerBottomSheet />
      <FilterBottomSheet />
      <Navbar pageName="장부 조회" />
      <div style={{ height: "1.71svh" }} />
      <div
        className={styles.searchDate}
        onClick={() => {
          initDatePicker({
            year: date.year,
            month: date.month,
            date: date.date,
          });
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
