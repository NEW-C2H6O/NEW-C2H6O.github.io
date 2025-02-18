import styles from "./style/index.module.css";
import { loginAPI } from "entities/index";

function AuthPage() {
  console.log(window.location.origin);
  const loginUrl = `${process.env.REACT_APP_API_URL}/auth/login?redirect=${window.location.origin}`;

  return (
    <div className={styles.container}>
      <div className={styles.logoSection}>
        <img className={styles.logo} src="/images/auth/logo.png" />
        <img className={styles.logoText} src="/images/auth/logoText.png" />
      </div>
      <img className={styles.cameraImage} src="/images/auth/movieCamera.png" />
      <a className={styles.loginButton} href={loginUrl}>
        <img className={styles.logo} src="/images/auth/kakaoLogo.png" />
        <div style={{ width: "16px" }} />
        <div className={styles.text}>카카오로 시작하기</div>
      </a>
    </div>
  );
}

export { AuthPage };
