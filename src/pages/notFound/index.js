import './index.css';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className='background'>
      <div className='components'>
        <img src='images/pictogram/notFoundLabel.png' width={400}></img>
        <label>죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</label>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0',
          }}>
          <label>주소를 잘못 입력하셨거나</label>
          <label>요청하신 주소가 변경 · 삭제되었을 수 있습니다.</label>
        </div>
        <button className='back-button' onClick={() => navigate('/')}>
          BACK HOME
        </button>
      </div>
    </div>
  );
}

export { NotFoundPage };
