import './style/index.css';
import { Navbar } from '../../widgets/index.js';

export default function SeatSearchPage() {
  return (
    <div className='seat-search-page'>
      <Navbar pageName='OTT 검색' />
    </div>
  );
}

export { SeatSearchPage };
