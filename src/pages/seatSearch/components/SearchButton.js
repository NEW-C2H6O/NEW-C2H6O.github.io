import '../style/searchButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SearchButton({ date, time, ott, onClickButton }) {
  return (
    <button className='search-button' onClick={onClickButton}>
      <div className='filter-list'>
        <span>{date}</span>
        <span>{time}</span>
        <span>{ott}</span>
      </div>
      <FontAwesomeIcon icon='search' />
    </button>
  );
}

export { SearchButton };
