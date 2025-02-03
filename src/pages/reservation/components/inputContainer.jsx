import styles from "../style/inputContainer.module.css";

function InputContainer({ title, InputField }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <InputField />
    </div>
  );
}

export { InputContainer };
