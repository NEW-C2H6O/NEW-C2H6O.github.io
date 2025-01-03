import styles from "../style/calenderCell.module.css";
import { motion } from "framer-motion";

const variants = {
  selected: { backgroundColor: "#017050", color: "#FFFFFF", fontWeight: 700 },
  notSelected: { backgroundColor: "rgba(0, 0, 0, 0)", color: "#000000", fontWeight: 400 },
};

function CalendarCell({ date, isSelected, isDisabled, onClick }) {
  return isDisabled ? (
    <div className={[styles.container, styles.disabled].join(" ")}>{date}</div>
  ) : (
    <motion.div
      className={styles.container}
      onClick={onClick}
      animate={isSelected ? "selected" : "notSelected"}
      variants={variants}
    >
      {date}
    </motion.div>
  );
}

export { CalendarCell };
