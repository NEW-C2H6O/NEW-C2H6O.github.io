import React from 'react';
import './style/index.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { Navbar } from '../../widgets/index';

function MyPage() {
  return (
    <div className='my-page'>
      <Navbar pageName='마이페이지' />

      <section className='profile-section'>
        <div className='profile-info'>
          <div className='profile-icon'>
            <FontAwesomeIcon icon={faUserCircle} size='3x' />
          </div>
          <div className='profile-text'>
            <p className='user-name'>홍길동</p>
            <p className='user-id'>홍길동#12</p>
          </div>
        </div>
      </section>

      <section className='menu-section'>
        <Link to='/reservation-history' className='menu-item'>
          <span>내 예약 내역</span>
          <FontAwesomeIcon icon={faChevronRight} />
        </Link>
        <Link to='/logout' className='menu-item'>
          <span>로그아웃</span>
        </Link>
        <Link to='/withdraw' className='menu-item'>
          <span>회원탈퇴</span>
        </Link>
      </section>

      <footer className='footer'>
        <p>Copyright 어쩌구</p>
      </footer>
    </div>
  );
}

export { MyPage };
