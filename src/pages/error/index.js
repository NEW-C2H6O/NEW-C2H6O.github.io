import './index.css';
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="background">
      <div id="container">
        <div id="label-container">
          <img src="images/pictogram/outlet.png" width="32%"></img>
          <label id="bold-label">서버와의 통신이 원활하지 않습니다.</label>
          <div>
            <label>서비스 이용에 불편을 끼쳐드려 죄송합니다.</label>
            <label>잠시 후 다시 시도해주세요.</label>
          </div>
        </div>
        <button id="back-button" onClick={() => navigate("/")}>
          BACK HOME
        </button>
      </div>
    </div>
  );
}

export { ErrorPage };
