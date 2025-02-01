import styles from "./style/index.module.css";

import { ReactComponent as CalenderIcon } from "shared/assets/icons/calendar.svg";
import { DatePickerBottomSheet } from "./componets/datePickerBottomSheet.jsx";
import { FilterBottomSheet } from "./componets/filterBottomSheet";
import { SearchFilter } from "./componets/searchFilter";
import { ReservationItem } from "./componets/reservationItem";
import { useReservationHistoryDatePickerStore, useReservationHistoryStore, useReservationHistoryFilterStore } from "features";
import { SORT_OPTIONS } from "shared";

import axios from "axios";
import { useEffect, useState } from "react";

function ReservationHistoryPage() {
  const { init: initDatePicker, openDatePicker } = useReservationHistoryDatePickerStore();
  const { filter, date } = useReservationHistoryStore();
  const { isOpen } = useReservationHistoryFilterStore();
  const [ reservations, setReservations ] = useState([]);

  const getSortParam = (idx) => {
    const sortOption = SORT_OPTIONS[idx];
    if (sortOption === "최신순") {
      return "createdAt,desc";
    } else if (sortOption === "이름순") {
      return "member,asc";
    } else if (sortOption === "플랫폼순") {
      return "ottName,asc";
    }
    return "reservationId,desc";
  }
  
  const getOttParam = (filter) => {
    const otts = filter.ottPlatforms.map(value => value + 1);
    const profiles = filter.ottProfiles.map(value => value + 1);
    if (otts.length >= 2) {
      return otts.join(",");
    }
    return `${otts[0]}_${profiles.join("-")}`;
  }

  const fetchReservations = async () => {
    const API_URL = process.env.REACT_APP_API_URL;
    try {
      const url = `${API_URL}/reservations`;
      const params = new URLSearchParams({
        mine: filter.isMyReservationIncluded,
        upcoming: !filter.isPreviousIncluded,
        sort: getSortParam(filter.sortOption),
        ott: getOttParam(filter),
      });
      const result = await axios.get(`${url}?${params.toString()}`, { withCredentials: true });
      const reservations = result.data?.data.content;
      // TODO: 스크롤 이벤트를 통해 무한 스크롤 추가 구현 필요. 이를 위해 sliceInfo를 저장하고 관리해야함
      const sliceInfo = result.data?.data.sliceInfo;
      setReservations(reservations);
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    if (!isOpen) {
      fetchReservations();
    }
  }, [isOpen]);

  return (
    <div className={styles.container}>
      <DatePickerBottomSheet />
      <FilterBottomSheet />
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
