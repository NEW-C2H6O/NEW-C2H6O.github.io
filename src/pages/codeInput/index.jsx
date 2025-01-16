import styles from "./style/index.module.css";
import { useRef, useState } from "react";

function CodeInputPage() {
  const [code, setCode] = useState("");
  const inputRef = useRef(null);
  const inputOnChange = (e) => {
    const value = e.target.value;
    setCode(value);
    if (value.length === 4) {
      blurInput();
    }
  };
  const focusInput = () => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  };
  const blurInput = () => {
    if (!inputRef.current) return;
    inputRef.current.blur();
  };

  return (
    <div className={styles.container}>
      <div style={{ height: "32px" }} />
      <img className={styles.logo} src="/green_logo.png" />
      <div style={{ height: "22px" }} />
      <div className={styles.title}>인증 코드 입력</div>
      <div style={{ height: "20px" }} />
      <div className={styles.subText}>
        이번 학기 부원 인증 코드를 입력해주세요.
        <br />
        인증 코드는 KOMO 운영진에게 문의해주세요
      </div>
      <div style={{ height: "33px" }} />
      <div className={styles.inputRow} onClick={focusInput}>
        <div className={styles.field}>{code[0] ?? ""}</div>
        <div className={styles.field}>{code[1] ?? ""}</div>
        <div className={styles.field}>{code[2] ?? ""}</div>
        <div className={styles.field}>{code[3] ?? ""}</div>
      </div>

      <input ref={inputRef} style={{ opacity: 0, height: 0 }} onChange={inputOnChange} />
    </div>
  );
}

export { CodeInputPage };
