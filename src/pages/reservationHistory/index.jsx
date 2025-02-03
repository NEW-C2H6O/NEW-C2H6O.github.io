import styles from "./style/index.module.css";

import { ReactComponent as CalenderIcon } from "shared/assets/icons/calendar.svg";
import { DatePickerBottomSheet } from "./componets/datePickerBottomSheet.jsx";
import { FilterBottomSheet } from "./componets/filterBottomSheet";
import { SearchFilter } from "./componets/searchFilter";
import { ReservationItem } from "./componets/reservationItem";
import { useReservationHistoryDatePickerStore, useReservationHistoryStore } from "features";
import { SORT_OPTIONS } from "shared";

import axios from "axios";
import { useEffect, useState, useRef } from "react";

function ReservationHistoryPage() {
  const { init: initDatePicker, openDatePicker } = useReservationHistoryDatePickerStore();
  const { filter, date } = useReservationHistoryStore();
  
  const [ isLoading, setLoading ] = useState(false);
  const [ reservations, setReservations ] = useState([]);
  const [ sliceInfo, setSliceInfo ] = useState(null);

  const containerRef = useRef(null); 

  const getSortParam = (idx) => {
    const sortOption = SORT_OPTIONS[idx];
    if (sortOption === "시간순") {
      return "startTime,asc";
    } else if (sortOption === "이름순") {
      return "member,asc";
    } else if (sortOption === "플랫폼순") {
      return "ottName,asc";
    }
    return "reservationId,asc";
  }
  
  const getOttParam = (filter) => {
    if (filter.ottPlatforms.length === 0) {
      return null;
    }
    const otts = filter.ottPlatforms.map(value => value + 1);
    const profiles = filter.ottProfiles.map(value => value + 1);
    if (otts.length >= 2) {
      return otts.join(",");
    }
    return `${otts[0]}_${profiles.join("-")}`;
  }

  const getDateParam = (date) => {
    const year = date.year
    const month = String(date.month).padStart(2, '0')
    const day = String(date.date).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const fetchReservations = async (prev) => {
    if (isLoading) return;
    setLoading(true);
    const API_URL = process.env.REACT_APP_API_URL;
    try {
      const url = `${API_URL}/reservations`;
      const sortParam = getSortParam(filter.sortOption);
      const ottParam = getOttParam(filter);
      const cursor = prev.length === 0 ? null : sliceInfo?.cursor;
      const params = new URLSearchParams({
        mine: filter.myOnly,
        upcoming: false,
        date: getDateParam(date),
        ...(sortParam && { sort: sortParam }),
        ...(ottParam && { ott: ottParam }),
        ...(cursor && { cursor: cursor })
      });
      const result = await axios.get(`${url}?${params.toString()}`, { withCredentials: true });
      setReservations([ ...prev, ...result.data?.data.content ]);
      setSliceInfo(result.data?.data.sliceInfo);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleScroll = (event) => {
    const { scrollHeight, scrollTop, clientHeight } = event.target;
    const bottom = Math.abs(scrollHeight - (scrollTop + clientHeight)) < 1;
    if (bottom && !isLoading && !sliceInfo.last) {
      fetchReservations(reservations);
    }
  };
  
  useEffect(() => {
    fetchReservations([]);
    if (containerRef?.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [filter, date]);

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
