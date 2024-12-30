import './style/index.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Footer() {
  return (
    <nav className='wrapper'>
      <Link to='/' className='nav-link'>
        <FontAwesomeIcon icon='house' />
      </Link>
      <Link to='/reservation-history' className='nav-link'>
        <FontAwesomeIcon icon='file' />
      </Link>
      <Link to='/reservation' className='nav-link'>
        <FontAwesomeIcon icon='plus' />
      </Link>
      <Link to='/seat-search' className='nav-link'>
        <FontAwesomeIcon icon='magnifying-glass' />
      </Link>
      <Link to='/my' className='nav-link'>
        <FontAwesomeIcon icon='circle-user' />
      </Link>
    </nav>
  );
}

export { Footer };
