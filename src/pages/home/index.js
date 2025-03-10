import './style/index.css';

function HomePage() {
  return (
    <div className={'home-page'}>
      <div className={'home-top'}> </div>
      <div className='content-container'>
        <img src='/green_logo.png' width={'100px'}></img>
        <div className='labels'>
          <label>나만의 영화관 1열을</label>
          <label>KOMO와 함께</label>
        </div>
      </div>
      <div className='home-bottom'> </div>
    </div>
  );
}

export { HomePage };
