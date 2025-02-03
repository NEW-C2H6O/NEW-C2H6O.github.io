import Select from "react-select";
import styles from "../style/input.module.css";
import { useReservationStore } from "features";
import { OTT_PROFILES } from "shared";

function InputProfile() {
  const { selectedOTT, selectedProfile, setSelectedProfile } = useReservationStore();

  return (
    <Select
      options={selectedOTT ? OTT_PROFILES[selectedOTT].map((v) => ({ value: v, label: v })) : []}
      placeholder="선택"
      className={styles.selectBox}
      onChange={(e) => setSelectedProfile(e.value)}
      value={selectedProfile ? { value: selectedProfile, label: selectedProfile } : null}
    />
  );
}

export { InputProfile };
