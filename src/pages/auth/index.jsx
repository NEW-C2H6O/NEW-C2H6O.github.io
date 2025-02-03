import styles from "./style/index.module.css";
import { loginAPI } from "entities/index";

function AuthPage() {
  return (
    <div className={styles.container}>
      <div className={styles.logoSection}>
        <img className={styles.logo} src="/images/auth/logo.png" />
        <img className={styles.logoText} src="/images/auth/logoText.png" />
      </div>
      <img className={styles.cameraImage} src="/images/auth/movieCamera.png" />
      <a
        className={styles.loginButton}
        href={`https://api.kkomo.site/v1/auth/login?redirect=${window.location.origin}`}
      >
        <img className={styles.logo} src="/images/auth/kakaoLogo.png" />
        <div style={{ width: "16px" }} />
        <div className={styles.text}>카카오로 시작하기</div>
      </a>
    </div>
  );
}

export { AuthPage };
