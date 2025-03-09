import './styles/index.css';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="background">
      <div className="nf-container">
        <div className="nf-label-container">
          <img src="images/pictogram/notFoundLabel.png" width="100%"></img>
          <label className="nf-bold-label">요청하신 페이지를 찾을 수 없습니다.</label>
          <div>
            <label>주소를 잘못 입력하셨거나</label>
            <label>요청하신 주소가 변경 · 삭제되었을 수 있습니다.</label>
          </div>
        </div>
        <button className="nf-back-button" onClick={() => navigate("/")}>
          BACK HOME
        </button>
      </div>
    </div>
  );
}

export { NotFoundPage };
