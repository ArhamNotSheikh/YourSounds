import { useState, useEffect } from "react";
import { useAudioPlayback } from "../hooks/useAudioPlayback";
import { GlassCard } from "../components/GlassCard";
import styles from "./Play.module.css";

export default function Play() {
  const { loading, isPlaying, playSequence } = useAudioPlayback();
  
  const [notes, setNotes] = useState([]);
  const [initialTempo, setInitialTempo] = useState(0);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [speedInputValue, setSpeedInputValue] = useState("1");
  const [instrument, setInstrument] = useState("synth");
  
  // Track which note index is currently playing (-1 means nothing is playing)
  const [activeNoteIndex, setActiveNoteIndex] = useState(-1);

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("data"));
      if (data && data.notes) {
        setNotes(data.notes);
        setInitialTempo(data.tempo || 0);
      } else {
        console.warn("No voice notes data found in localStorage.");
      }
    } catch (err) {
      console.error("Error reading pitch notes from local storage:", err);
    }
  }, []);

  const handleApplySpeed = () => {
    try {
      if (speedInputValue.trim() === "") {
        setSpeedMultiplier(1);
        console.log("No value entered → using default 1x");
        return;
      }

      const v = Number(speedInputValue);
      if (isNaN(v) || v <= 0) {
        alert("Speed should be a positive number!");
        return;
      }

      setSpeedMultiplier(v);
      console.log("Speed set to:", v, "x");
    } catch (err) {
      console.error("Error setting playback speed:", err);
    }
  };

  const handlePlayNotes = () => {
    if (notes.length === 0) {
      alert("No notes recorded to play! Please go back to the Home page and record something first.");
      return;
    }
    
    // Play sequence, providing a callback to highlight notes visually
    playSequence(notes, initialTempo, speedMultiplier, instrument, (idx) => {
      setActiveNoteIndex(idx);
    });
  };

  return (
    <div className={`${styles.playContainer} animate-fade-in`}>
      <h1 className={styles.pageHeader}>Play Your Recorded Voice Notes</h1>

      <div className={styles.wrapper}>
        <GlassCard className={styles.playCard}>
          <div className={styles.statusSection}>
            {loading ? (
              <p className={styles.loadingText}>Loading soundfont instruments...</p>
            ) : (
              <p className={styles.readyText}>Instruments ready to play</p>
            )}
          </div>

          <div className={styles.controlsGrid}>
            <div className={styles.controlGroup}>
              <label htmlFor="instrumentSelect" className={styles.label}>Choose Instrument:</label>
              <select
                id="instrumentSelect"
                value={instrument}
                onChange={(e) => setInstrument(e.target.value)}
                className={styles.selectInput}
                disabled={isPlaying}
              >
                <option value="synth">Synth (Tone.js)</option>
                <option value="piano">Piano</option>
                <option value="guitar">Guitar</option>
                <option value="Bass">Bass</option>
                <option value="Violin">Violin</option>
                <option value="flute">Flute</option>
              </select>
            </div>

            <div className={styles.controlGroup}>
              <label htmlFor="speedInput" className={styles.label}>Playback Speed:</label>
              <div className={styles.speedInputWrapper}>
                <input
                  id="speedInput"
                  type="number"
                  placeholder="1.0"
                  step="0.1"
                  value={speedInputValue}
                  onChange={(e) => setSpeedInputValue(e.target.value)}
                  className={styles.numInput}
                  disabled={isPlaying}
                />
                <button
                  onClick={handleApplySpeed}
                  className={styles.speedBtn}
                  disabled={isPlaying}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          <div className={styles.actionSection}>
            <button
              onClick={handlePlayNotes}
              className={`${styles.playBtn} ${isPlaying ? styles.btnActive : ""}`}
              disabled={loading || isPlaying || notes.length === 0}
            >
              {isPlaying ? "Playing Notes..." : "Play Notes"}
            </button>
          </div>

          {/* Notes visualizer */}
          <div className={styles.visualizerSection}>
            <h3 className={styles.visualizerTitle}>Notes Sequence</h3>
            {notes.length === 0 ? (
              <p className={styles.emptyText}>No notes loaded. Try recording your voice on the Home page.</p>
            ) : (
              <div className={styles.notesGrid}>
                {notes.map((note, index) => {
                  const isActive = index === activeNoteIndex;
                  return (
                    <div
                      key={index}
                      className={`${styles.noteBadge} ${isActive ? styles.noteBadgeActive : ""}`}
                    >
                      {note || "-"}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
