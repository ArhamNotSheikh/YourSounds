import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";
import { GlassCard } from "../components/GlassCard";
import styles from "./Auth.module.css";
import { useToast } from "../components/ToastProvider";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login } = useSupabaseAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    
    if (!(trimmedEmail && password)) {
      addToast("Fill all fields", "error");
      return;
    }

    setSubmitting(true);
    try {
      await login(trimmedEmail, password);
      addToast("Logged in!", "success");
      navigate("/");
    } catch (err) {
      console.error("Login error:", err.message);
      addToast(err.message || "Wrong email or password", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`${styles.authContainer} animate-fade-in`}>
      <h1 className={styles.titleFixed}>YourSounds</h1>

      <div className={styles.wrapper}>
        <GlassCard className={styles.card}>
          <h2 className={styles.title}>LOGIN</h2>
          
          <form onSubmit={handleLogin} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>Email:</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>Password:</label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
              />
            </div>

            <button type="submit" className={styles.submitBtn} disabled={submitting}>
              {submitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className={styles.toggleText}>
            Don't have an account?{" "}
            <Link to="/signup" className={styles.link}>
              Sign Up
            </Link>
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
