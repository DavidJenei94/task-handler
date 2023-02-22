import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>
        <h1>
          <NavLink to="/">TaskHandler</NavLink>
        </h1>
      </div>
      <div className={styles.profile}>
        <NavLink to="/login">Login</NavLink>
      </div>
    </nav>
  );
};

export default Header;
