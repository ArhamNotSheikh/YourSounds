import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useHomeAudio } from "../hooks/useHomeAudio";
import { GlassCard } from "../components/GlassCard";
import styles from "./Home.module.css";

export default function Home() {
  const navigate = useNavigate();
  const {
    isRecording,
    detectedNotes,
    tempo,
    hasRecording,
    modelLoading,
    startRecording,
    stopRecording,
    playRecording,
  } = useHomeAudio();

  const [aboutOpacity, setAboutOpacity] = useState(1);
  const impcntrlRef = useRef(null);

  // Scroll effect to fade out background info card
  useEffect(() => {
    const handleScroll = () => {
      if (impcntrlRef.current) {
        const rect = impcntrlRef.current.getBoundingClientRect();
        if (rect.top < 500) {
          setAboutOpacity(0);
        } else {
          setAboutOpacity(1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRecordToggle = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handlePlayInstrument = () => {
    if (detectedNotes.length === 0) {
      alert("Please record something first!");
      return;
    }

    const data = {
      notes: detectedNotes,
      tempo: tempo,
    };
    
    localStorage.setItem("data", JSON.stringify(data));
    navigate("/play");
  };

  return (
    <div className={`${styles.homeContainer} animate-fade-in`}>
      <h1 className={styles.titleFixed}>YourSounds</h1>

      {/* Backdrop Info Section */}
      <div className={styles.aboutBg} style={{ opacity: aboutOpacity, pointerEvents: aboutOpacity === 0 ? "none" : "auto" }}>
        <p className={styles.aboutText}>
          YourSounds captures the sound of your voice, analyzes its pitch in real time,
          and translates it into musical notes. These notes are then replayed using
          a digital instrument of your choice — turning your voice into music.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator} style={{ opacity: aboutOpacity }}>
        <span>Scroll down to record</span>
        <div className={styles.arrowDown}></div>
      </div>

      {/* Main Control Card Area */}
      <div className={styles.controlWrapper}>
        <GlassCard className={styles.controlCard} impcntrlRef={impcntrlRef}>
          <div ref={impcntrlRef} className={styles.impcntrl}>
            {/* Pulsing ring during recording */}
            <div className={`${styles.recordButtonWrapper} ${isRecording ? styles.recording : ""}`}>
              <button 
                onClick={handleRecordToggle} 
                className={`${styles.btn} ${isRecording ? styles.btnRecording : styles.btnRecord}`}
                disabled={modelLoading}
              >
                {modelLoading ? (
                  <span className={styles.spinner}></span>
                ) : isRecording ? (
                  "Stop Recording"
                ) : (
                  "Start Recording"
                )}
              </button>
            </div>

            <button 
              onClick={playRecording} 
              className={`${styles.btn} ${styles.btnPlay}`}
              disabled={isRecording || !hasRecording}
            >
              Play Recording
            </button>

            <button 
              onClick={handlePlayInstrument} 
              className={`${styles.btn} ${styles.btnInstrument}`}
              disabled={isRecording || detectedNotes.length === 0}
            >
              Play Instrument
            </button>
          </div>

          {/* Real-time sound debugger window */}
          {detectedNotes.length > 0 && (
            <div className={styles.notesConsole}>
              <h3 className={styles.consoleTitle}>Captured Notes ({detectedNotes.length})</h3>
              <div className={styles.notesWrapper}>
                {detectedNotes.map((note, index) => (
                  <span key={index} className={styles.noteItem}>
                    {note}
                  </span>
                ))}
              </div>
            </div>
          )}

          {isRecording && (
            <div className={styles.recordingWaves}>
              <div className={styles.waveBar}></div>
              <div className={styles.waveBar}></div>
              <div className={styles.waveBar}></div>
              <div className={styles.waveBar}></div>
              <div className={styles.waveBar}></div>
              <div className={styles.waveBar}></div>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
