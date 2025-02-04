import styles from "./style/index.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import { ReactComponent as RightIcon } from 'shared/assets/icons/navigate/right.svg';
import { useActiveStore } from 'features';

function MyPage() {
  const [member, setMember] = useState({ name: "", nameAndTag: "" });
  const navigate = useNavigate();

  const fetchMyInfo = async () => {
    const API_URL = process.env.REACT_APP_API_URL;
    try {
      const result = await axios.get(`${API_URL}/members/me`, { withCredentials: true });
      const member = result.data.data;
      console.log(member);
      setMember(member);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchLogout = async () => {
    const API_URL = process.env.REACT_APP_API_URL;
    try {
      await axios.get(`${API_URL}/auth/logout`, { withCredentials: true });
    } catch (error) {
      console.error(error);
    }
    alert("로그아웃 되었습니다.");
    navigate("/");
  }

  useEffect(() => {
    fetchMyInfo();
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.profileSection}>
        <div className={styles.profileIcon}>
          { member.profileImage ? <img src={member.profileImage} alt="프로필" className={styles.profileImage} /> : null }
        </div>
        <div style={{ width: "12px" }} />
        <div className={styles.profileText}>
          <div className={styles.userName}>{member.name}</div>
          <div className={styles.userId}>{member.nameAndTag}</div>
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
          {!isActive ? <RightIcon /> : <span>인증완료</span>}
        </Link>
        <div onClick={fetchLogout} className={styles.menuItem}>
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
