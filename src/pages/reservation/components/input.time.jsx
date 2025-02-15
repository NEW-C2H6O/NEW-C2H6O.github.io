import { useEffect, useState } from "react";
import styles from "../style/input.module.css";
import { useReservationStore } from "features";

function InputTime() {
  const {
    isReservedTime,
    selectedTime: { stTimeIdx, edTimeIdx },
    setSelectedTime,
  } = useReservationStore();

  return (
    <div className={styles.timeSelectBox}>
      <div className={styles.timeLegend}>
        {Array.from({ length: 24 }, (_, i) => {
          return (
            <div key={i} className={styles.text}>
              {i.toString().padStart(2, "0")}
            </div>
          );
        })}
      </div>
      <div className={styles.inputBox}>
        <div className={styles.minuteLegend}>
          <div className={styles.text}>00</div>
          <div className={styles.text}>30</div>
          <div className={styles.text}>60</div>
        </div>
        {Array.from({ length: 24 }, (_, i) => {
          return (
            <div key={i} className={styles.itemRow}>
              {Array.from({ length: 6 }, (_, j) => {
                const backgroundColor = isReservedTime[i * 6 + j]
                  ? "#D9D9D9"
                  : stTimeIdx && stTimeIdx <= i * 6 + j && i * 6 + j <= edTimeIdx
                  ? "#017050"
                  : "#ffffff";
                return (
                  <div
                    key={i * 6 + j}
                    className={styles.item}
                    style={{ backgroundColor }}
                    onClick={() => setSelectedTime(i * 6 + j)}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { InputTime };
