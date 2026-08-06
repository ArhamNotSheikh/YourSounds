import { Link } from "react-router-dom";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";
import { GlassCard } from "../components/GlassCard";
import styles from "./MySounds.module.css";

export default function MySounds() {
  const { user, loading } = useSupabaseAuth();

  return (
    <div className={`${styles.soundsContainer} animate-fade-in`}>
      <h1 className={styles.titleFixed}>YourSounds</h1>

      <div className={styles.wrapper}>
        <GlassCard className={styles.card} variant={user ? "primary" : "secondary"}>
          {loading ? (
            <div className={styles.loadingWrapper}>
              <span className={styles.spinner}></span>
              <p>Checking authentication...</p>
            </div>
          ) : user ? (
            <div className={styles.content}>
              <h2 className={styles.header}>No recordings yet</h2>
              <p className={styles.description}>Click below to begin your first voice pitch recording.</p>
              <Link to="/">
                <button className={styles.actionBtn}>Start Recording</button>
              </Link>
            </div>
          ) : (
            <div className={styles.content}>
              <h2 className={`${styles.header} ${styles.alertHeader}`}>Please log in first</h2>
              <p className={styles.description}>You must be signed in to view your saved recordings.</p>
              <Link to="/login">
                <button className={`${styles.actionBtn} ${styles.loginActionBtn}`}>Log In</button>
              </Link>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
