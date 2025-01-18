import styles from "./style/index.module.css";
import { Link } from "react-router-dom";

import { ReactComponent as RightIcon } from "shared/assets/icons/navigate/right.svg";

function MyPage() {
  return (
    <div className={styles.container}>
      <section className={styles.profileSection}>
        <div className={styles.profileIcon} />
        <div style={{ width: "12px" }} />
        <div className={styles.profileText}>
          <div className={styles.userName}>홍길동</div>
          <div className={styles.userId}>홍길동#12</div>
        </div>
      </section>

      <div style={{ height: "6px" }} />

      <section className={styles.menuSection}>
        <Link to="/reservation-history" className={styles.menuItem}>
          내 예약 내역
          <RightIcon />
        </Link>
        <Link to="/my/code-input" className={styles.menuItem}>
          이번 학기 코드 입력
          <RightIcon />
        </Link>
        <div to="/logout" className={styles.menuItem}>
          로그아웃
        </div>
        <div to="/withdraw" className={styles.menuItem}>
          회원탈퇴
        </div>
      </section>

      <footer className={styles.footer}>
        <p>Copyright 어쩌구</p>
      </footer>
    </div>
  );
}

export { MyPage };
