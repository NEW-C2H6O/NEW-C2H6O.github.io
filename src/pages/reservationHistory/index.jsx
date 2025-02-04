import styles from "./style/index.module.css";

import { ReactComponent as CalenderIcon } from "shared/assets/icons/calendar.svg";
import { FilterBottomSheet } from "./componets/filterBottomSheet";
import { SearchFilter } from "./componets/searchFilter";
import { ReservationItem } from "./componets/reservationItem";

import { useReservationHistoryDatePickerStore, useReservationHistoryStore, useMemberStore } from "features";
import { useEffect, useRef } from "react";
import { DatePickerBottomSheet } from "widgets";

function ReservationHistoryPage() {
  const { fetchMember } = useMemberStore();
  const { isOpen, openDatePicker, closeDatePicker } = useReservationHistoryDatePickerStore();
  const { 
    date, 
    setDate, 
    filter, 
    reservations, 
    fetchReservations, 
    isLoading, 
    sliceInfo,
    setSliceInfo
  } = useReservationHistoryStore();
  
  const containerRef = useRef(null); 

  const handleScroll = (event) => {
    const { scrollHeight, scrollTop, clientHeight } = event.target;
    const bottom = Math.abs(scrollHeight - (scrollTop + clientHeight)) < 1;
    if (bottom && !isLoading && !sliceInfo.last) {
      fetchReservations();
    }
  };
  
  useEffect(() => {
    setSliceInfo(null);
    fetchReservations();
    if (containerRef?.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [filter, date, fetchReservations]);

  useEffect(() => {
    fetchMember();
  }, [fetchMember]);

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

      <div className={styles.listContainer} onScroll={handleScroll} ref={containerRef}>
      {
        reservations?.map((reservation) => {
          return <ReservationItem
            key={reservation.reservationId}
            reservation={reservation}
          />
        })
      }
      </div>
    </div>
  );
}

export { ReservationHistoryPage };
