import styles from "../style/datePickerBottomSheet.module.css";
import { useState } from "react";

import { BottomSheet } from "widgets";
import { CalendarCell } from "./calenderCell";

import { ReactComponent as LeftIcon } from "shared/assets/icons/navigate/left.svg";
import { ReactComponent as RightIcon } from "shared/assets/icons/navigate/right.svg";
import { useReservationHistoryDatePickerStore, useReservationHistoryStore } from "features";

function getDays(year, month) {
  const weeks = Math.ceil(
    (new Date(year, month, 0).getDate() - 1 + new Date(year, month - 1, 1).getDay() + 1) / 7
  );

  const days = Array.from(
    { length: weeks * 7 },
    (_, i) => i - new Date(year, month - 1, 1).getDay()
  );
  const result = [];
  for (let i = 0; i < weeks; i++) {
    result.push(days.slice(i * 7, (i + 1) * 7));
  }
  return result;
}

function DatePickerBottomSheet() {
  const {
    isOpen,
    year,
    month,
    date: selectedDate,

    closeDatePicker,
    increaseMonth,
    decreaseMonth,
    setDate: setSelectedDate,
  } = useReservationHistoryDatePickerStore();
  const { setDate } = useReservationHistoryStore();

  return (
    <BottomSheet
      isOpen={isOpen}
      closeBottomSheet={closeDatePicker}
      Content={() => (
        <div className={styles.container}>
          <div className={styles.yearMonthContainer}>
            <LeftIcon onClick={decreaseMonth} />
            {`${year}년 ${month}월`}
            <RightIcon onClick={increaseMonth} />
          </div>
          <div className={styles.calendar}>
            {getDays(year, month).map((week, idx) => (
              <div className={styles.calendarRow} key={idx}>
                {week.map((date) =>
                  date < 0 ? (
                    <CalendarCell
                      key={date}
                      date={date + new Date(year, month - 1, 0).getDate() + 1}
                      isSelected={false}
                      isDisabled={true}
                      onClick={() => setSelectedDate(date + 1)}
                    />
                  ) : date >= new Date(year, month, 0).getDate() ? (
                    <CalendarCell
                      key={date}
                      date={date - new Date(year, month, 0).getDate() + 1}
                      isSelected={false}
                      isDisabled={true}
                      onClick={() => setSelectedDate(date + 1)}
                    />
                  ) : (
                    <CalendarCell
                      key={date}
                      date={date + 1}
                      isSelected={selectedDate === date + 1}
                      isDisabled={false}
                      onClick={() => setSelectedDate(date + 1)}
                    />
                  )
                )}
              </div>
            ))}
          </div>
          <div
            className={styles.submitButton}
            onClick={() => {
              setDate({
                year,
                month,
                date: selectedDate,
              });
              closeDatePicker();
            }}
          >{`${year}년 ${month}월 ${selectedDate}일 선택`}</div>
        </div>
      )}
    />
  );
}

export { DatePickerBottomSheet };
