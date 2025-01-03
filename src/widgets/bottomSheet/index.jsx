import { motion, AnimatePresence } from "framer-motion";
import styles from "./index.module.css";

function BottomSheet({ isOpen, closeBottomSheet, Content }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.container}>
          <motion.div
            className={styles.background}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBottomSheet}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{
              y: "0%",
              transition: { type: "spring", damping: 30, stiffness: 300 },
            }}
            exit={{ y: "100%", transition: { type: "spring", damping: 30, stiffness: 300 } }}
            className={styles.bottomSheetContainer}
          >
            <div className={styles.handle} />
            <Content />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export { BottomSheet };
