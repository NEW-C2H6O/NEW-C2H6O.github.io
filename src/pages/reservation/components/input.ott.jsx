import Select from "react-select";
import styles from "../style/input.module.css";
import { OTT_PLATFORMS } from "shared";
import { useReservationStore } from "features";

function InputOTT() {
  const { selectedOTT, setSelectedOTT } = useReservationStore();

  return (
    <Select
      options={OTT_PLATFORMS.map((v) => ({ value: v, label: v }))}
      placeholder="선택"
      className={styles.selectBox}
      onChange={(e) => setSelectedOTT(e.value)}
      value={selectedOTT ? { value: selectedOTT, label: selectedOTT } : null}
    />
  );
}

export { InputOTT };
