import styles from "./style/index.module.css";
import { DatePickerBottomSheet } from "widgets";

import { InputContainer } from "./components/inputContainer";
import { InputOTT } from "./components/input.ott";
import { InputProfile } from "./components/input.profile";
import { InputDate } from "./components/input.date";
import { InputTime } from "./components/input.time";
import { useReservationStore } from "features";

function ReservationPage() {
  const {
    setSelectedDate,
    isDatePickerOpen: isOpen,
    closeDatePicker,
    tryReservation,
  } = useReservationStore();

  async function reserve() {
    tryReservation().then((result) => {
      switch (result) {
        case 0:
          alert("예약이 완료되었습니다.");
          window.location.href = "/reservation-history";
          return;
        case 1:
          alert("예약이 이미 존재합니다.");
          return;
        case 2:
          alert("OTT 플랫폼을 선택해주세요.");
          return;
        case 3:
          alert("프로필을 선택해주세요.");
          return;
        case 4:
          alert("시간을 선택해주세요.");
          return;
      }
    });
  }

  return (
    <div className={styles.container}>
      <DatePickerBottomSheet
        isOpen={isOpen}
        closeDatePicker={closeDatePicker}
        onConfirm={setSelectedDate}
      />
      <div className={styles.inputFormList}>
        <InputContainer title={"날짜 선택"} InputField={InputDate} />
      </div>
      <div className={styles.inputFormList}>
        <InputContainer title={"OTT 플랫폼"} InputField={InputOTT} />
      </div>
      <div className={styles.inputFormList}>
        <InputContainer title={"프로필"} InputField={InputProfile} />
      </div>
      <div className={styles.inputFormList}>
        <InputContainer title={"시간 선택"} InputField={InputTime} />
      </div>
      <div className={styles.submitButton} onClick={reserve}>
        예약하기
      </div>
    </div>
  );
}

export { ReservationPage };
