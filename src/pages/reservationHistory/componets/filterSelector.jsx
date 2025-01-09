import styles from "../style/filterSelector.module.css";
import { animate, motion } from "framer-motion";

const buttonVariants = {
  selected: {
    backgroundColor: "#017050",
  },
  notSelected: {
    backgroundColor: "#FFF",
  },
};

const textVariants = {
  selected: {
    color: "#FFF",
  },
  notSelected: {
    color: "#000",
  },
};

function FilterSelector({ title, items, selectedItems, toggleSelectedItem, iconSrc }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.itemRow}>
        {items.map((item, index) => (
          <motion.div
            key={item}
            className={styles.button}
            style={selectedItems[index] ? buttonVariants.selected : buttonVariants.notSelected}
            onClick={() => toggleSelectedItem(index)}
            whileTap={{ scale: 0.95 }}
          >
            {iconSrc === null ? null : (
              <img className={styles.icon} src={iconSrc[item]} alt={item} />
            )}
            <div
              className={styles.text}
              style={selectedItems[index] ? textVariants.selected : textVariants.notSelected}
            >
              {item}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export { FilterSelector };
