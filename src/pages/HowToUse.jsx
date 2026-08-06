import { Link } from "react-router-dom";
import { GlassCard } from "../components/GlassCard";
import styles from "./HowToUse.module.css";

export default function HowToUse() {
  return (
    <div className={`${styles.useContainer} animate-fade-in`}>
      <h1 className={styles.titleFixed}>YourSounds</h1>

      <div className={styles.wrapper}>
        <GlassCard className={styles.card}>
          <h1 className={styles.header}>How to Use YourSounds</h1>

          <div className={styles.stepsGrid}>
            <div className={styles.stepItem}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h2 className={styles.stepTitle}>Record Your Voice</h2>
                <p className={styles.stepText}>
                  To begin, speak, hum, or sing into the microphone. Make sure you are in a quiet room with minimal background noise so your mic doesn't pick up unwanted sounds. Using an external microphone is recommended for cleaner pitch detection.
                </p>
              </div>
            </div>

            <div className={styles.stepItem}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h2 className={styles.stepTitle}>Listen to Your Recorded Audio</h2>
                <p className={styles.stepText}>
                  Playback your recorded audio to review it. Again, ensure your environment stays quiet — background sounds can interfere with the accuracy of pitch extraction.
                </p>
              </div>
            </div>

            <div className={styles.stepItem}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h2 className={styles.stepTitle}>Select an Instrument</h2>
                <p className={styles.stepText}>
                  Choose an instrument from the list of available options. The pitch of your voice will be matched to the selected instrument. This allows you to hear how your voice sounds when played through different instruments.
                </p>
              </div>
            </div>

            <div className={styles.stepItem}>
              <div className={styles.stepNumber}>4</div>
              <div className={styles.stepContent}>
                <h2 className={styles.stepTitle}>Play Your Voice as an Instrument</h2>
                <p className={styles.stepText}>
                  Play your transformed melody! Hear how your voice-driven tune sounds on the chosen instrument.
                </p>
              </div>
            </div>
          </div>

          <h2 className={styles.subHeader}>Additional Controls</h2>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <strong>Adjust Speed:</strong> Slow down or speed up the playback to match the tempo you prefer.
            </li>
            <li className={styles.listItem}>
              <strong>Adjust Pitch:</strong> Shift the pitch of the generated notes to explore new musical variations.
            </li>
          </ul>

          <div className={styles.buttonWrapper}>
            <Link to="/">
              <button className={styles.playNowBtn}>Play Your Sound Now</button>
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
