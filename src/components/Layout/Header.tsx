import styles from './Header.module.scss';

const Header = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.brand}><h1>TaskHandler</h1></div>
      <div className={styles.profile}>Login</div>
    </nav>
  );
};

export default Header;
