import { Link, NavLink } from "react-router-dom";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";
import styles from "./Navbar.module.css";

export function Navbar() {
  const { user, logout } = useSupabaseAuth();

  const handleLogout = async () => {
    try {
      await logout();
      alert("Logged out successfully!");
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLinks}>
        <NavLink to="/" className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}>
          Home
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}>
          About
        </NavLink>
        <NavLink to="/mysounds" className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}>
          My-Sounds
        </NavLink>
        <NavLink to="/instruments" className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}>
          Instruments
        </NavLink>
        <NavLink to="/how-to-use" className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}>
          How to use
        </NavLink>
      </div>

      <div className={styles.authButtons}>
        {user ? (
          <>
            <span className={styles.welcomeText}>Hi, {user.user_metadata?.username || user.email}</span>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className={styles.loginBtn}>Log in</button>
            </Link>
            <Link to="/signup">
              <button className={styles.signupBtn}>Sign up</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
