import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import Button from '../UI/Button';

import styles from './Header.module.scss';

const Header = () => {
  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();

  const logoutHandler = () => {
    authCtx.logout();

    navigate('/login');
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>
        <h1>
          <NavLink to="/">TaskHandler</NavLink>
        </h1>
      </div>
      <div className={styles.profile}>
        {authCtx.isAuthenticated ? (
          <div className={styles["logged-in-profile"]}>
            <p>{authCtx.email.substring(0, authCtx.email.indexOf('@'))}</p>
            <Button onClick={logoutHandler}><p>Logout</p></Button>
          </div>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </nav>
  );
};

export default Header;
