import styles from "./GlassCard.module.css";

export function GlassCard({ children, className = "", variant = "primary" }) {
  const cardClass = variant === "secondary" 
    ? `${styles.card} ${styles.secondary} ${className}` 
    : `${styles.card} ${className}`;
    
  return (
    <div className={cardClass}>
      {children}
    </div>
  );
}
