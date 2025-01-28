import styles from "../style/datePickerBottomSheet.module.css";

import { BottomSheet } from "widgets";

import { ReactComponent as LeftIcon } from "shared/assets/icons/navigate/left.svg";
import { ReactComponent as RightIcon } from "shared/assets/icons/navigate/right.svg";
import { motion } from "framer-motion";
import { useState } from "react";

/**
 *
 * @param {number} year
 * @param {number} month
 * @returns
 * @description
 *  - getDays 함수는 year와 month를 입력받아 해당 월의 달력을 반환합니다.
 *  - 반환되는 달력은 2차원 배열로, 각 요일을 요소로 갖는 배열입니다.
 *  - 해당 월의 첫째 날이 0으로 시작하는 요일을 기준으로 달력을 만듭니다.
 *  - 일요일으로 시작하는 달력입니다.
 * @example
 * getDays(2024, 10)
 * returns [
 *   [ -2, -1, 0, 1, 2, 3, 4 ],
 *   [ 5, 6, 7, 8, 9, 10, 11 ],
 *   [ 12, 13, 14, 15, 16, 17, 18 ],
 *   [ 19, 20, 21, 22, 23, 24, 25 ],
 *   [ 26, 27, 28, 29, 30, 31, 32 ]
 * ]
 */
function getDays(year, month) {
  const weeks = Math.ceil(
    (new Date(year, month, 0).getDate() - 1 + new Date(year, month - 1, 1).getDay() + 1) / 7
  );

  const firstDay = new Date(year, month - 1, 1).getDay();
  const days = Array.from({ length: weeks * 7 }, (_, i) => i - firstDay);
  const result = [];
  for (let i = 0; i < weeks; i++) {
    result.push(days.slice(i * 7, (i + 1) * 7));
  }
  return result;
}

function DatePickerBottomSheet({ isOpen, closeDatePicker, onConfirm }) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());

  function increaseMonth() {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  }

  function decreaseMonth() {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  }

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
              onConfirm(year, month, selectedDate);
              closeDatePicker();
            }}
          >{`${year}년 ${month}월 ${selectedDate}일 선택`}</div>
        </div>
      )}
    />
  );
}

// CalendarCell Component
const variants = {
  selected: { backgroundColor: "#017050", color: "#FFFFFF", fontWeight: 700 },
  notSelected: { backgroundColor: "rgba(0, 0, 0, 0)", color: "#000000", fontWeight: 400 },
};

function CalendarCell({ date, isSelected, isDisabled, onClick }) {
  return isDisabled ? (
    <div className={[styles.CalendarCellContainer, styles.CalendarCellDisabled].join(" ")}>
      {date}
    </div>
  ) : (
    <motion.div
      className={styles.CalendarCellContainer}
      onClick={onClick}
      animate={isSelected ? "selected" : "notSelected"}
      variants={variants}
    >
      {date}
    </motion.div>
  );
}

export { DatePickerBottomSheet };
