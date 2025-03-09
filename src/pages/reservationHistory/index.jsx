import styles from "./style/index.module.css";

import { ReactComponent as CalenderIcon } from "shared/assets/icons/calendar.svg";
import { FilterBottomSheet } from "./componets/filterBottomSheet";
import { SearchFilter } from "./componets/searchFilter";
import { ReservationItem } from "./componets/reservationItem";

import { useReservationHistoryDatePickerStore, useReservationHistoryStore } from "features";

import { useEffect, useRef } from "react";

import { DatePickerBottomSheet } from "widgets";

function ReservationHistoryPage() {
  const { isOpen, openDatePicker, closeDatePicker } = useReservationHistoryDatePickerStore();

  const {
    filter,
    date,
    setDate,
    fetchFirstReservations,
    fetchNextReservations,
    reservations,
    isLoading,
    sliceInfo,
  } = useReservationHistoryStore();

  useEffect(() => {
    fetchFirstReservations();
  }, [filter, date]);

  const containerRef = useRef(null);

  const handleScroll = (event) => {
    const { scrollHeight, scrollTop, clientHeight } = event.target;
    const bottom = Math.abs(scrollHeight - (scrollTop + clientHeight)) < 1;
    if (bottom && !isLoading && !sliceInfo.last) {
      fetchNextReservations();
    }
  };

  return (
    <div className={styles.container}>
      <DatePickerBottomSheet
        isOpen={isOpen}
        closeDatePicker={closeDatePicker}
        onConfirm={setDate}
      />
      <FilterBottomSheet />

      <div
        className={styles.searchDate}
        onClick={() => {
          openDatePicker();
        }}
      >
        <CalenderIcon className={styles.icon} />
        <div className={styles.text}>{`${date.year}년 ${date.month}월 ${date.date}일`}</div>
      </div>
      <SearchFilter />
      <div className={styles.divider} />

      <div className={styles.listContainer} onScroll={handleScroll} ref={containerRef}>
        {reservations?.map((reservation) => {
          return <ReservationItem key={reservation.reservationId} reservation={reservation} />;
        })}
      </div>
    </div>
  );
}

export { ReservationHistoryPage };
