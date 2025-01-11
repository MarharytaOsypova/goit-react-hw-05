import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

export default function Navigation() {
 return (
    <nav>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        Movies
      </NavLink>
    </nav>
  );
}