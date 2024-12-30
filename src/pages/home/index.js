import './style/index.css';
import { Navbar } from '../../widgets/index.js';

function HomePage() {
  return (
    <div className={'home-page'}>
      <Navbar pageName='HOME' />
    </div>
  );
}

export { HomePage };
