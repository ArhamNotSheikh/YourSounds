import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";
import { GlassCard } from "../components/GlassCard";
import styles from "./Auth.module.css";
import { useToast } from "../components/ToastProvider";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { signup } = useSupabaseAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleSignup = async (e) => {
    e.preventDefault();
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();

    if (!(trimmedUsername && trimmedEmail && password)) {
      addToast("Please fill in all fields.", "error");
      return;
    }

    setSubmitting(true);
    try {
      await signup(trimmedEmail, password, trimmedUsername);
      addToast("Signup successful! Check your email.", "success");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      addToast(err.message || "Signup failed", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`${styles.authContainer} animate-fade-in`}>
      <h1 className={styles.titleFixed}>YourSounds</h1>

      <div className={styles.wrapper}>
        <GlassCard className={styles.card}>
          <h2 className={styles.title}>SIGN UP</h2>
          
          <form onSubmit={handleSignup} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="username" className={styles.label}>Username:</label>
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.input}
              />
            </div>

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
              {submitting ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <p className={styles.toggleText}>
            Already have an account?{" "}
            <Link to="/login" className={styles.link}>
              Login
            </Link>
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
