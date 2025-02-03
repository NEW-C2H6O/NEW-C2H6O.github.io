import styles from "./style/index.module.css";
import { DatePickerBottomSheet } from "widgets";

import { InputContainer } from "./components/inputContainer";
import { InputOTT } from "./components/input.ott";
import { InputProfile } from "./components/input.profile";
import { InputDate } from "./components/input.date";
import { InputTime } from "./components/input.time";
import { useReservationStore } from "features";

function ReservationPage() {
  const { setSelectedDate, isDatePickerOpen: isOpen, closeDatePicker } = useReservationStore();

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
      <div className={styles.submitButton}>예약하기</div>
    </div>
  );
}

export { ReservationPage };
