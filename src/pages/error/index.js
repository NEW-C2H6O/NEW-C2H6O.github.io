import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="background">
      <div className="components">
        <img src="images/pictogram/outlet.png" width='28%'></img>
        <label>서버와의 통신이 원활하지 않습니다.</label>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0",
          }}
        >
          <label>서비스 이용에 불편을 끼쳐드려 죄송합니다.</label>
          <label>잠시 후 다시 시도해주세요.</label>
        </div>
        <button className="back-button" onClick={() => navigate("/")}>
          BACK HOME
        </button>
      </div>
    </div>
  );
}

export { ErrorPage };
