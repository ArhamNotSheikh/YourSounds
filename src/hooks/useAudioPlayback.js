import { useEffect, useRef, useState } from "react";
import Soundfont from "soundfont-player";
import * as Tone from "tone";

export function useAudioPlayback() {
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  
  // Cache references to the loaded Soundfont instrument instances
  const instrumentsRef = useRef({
    piano: null,
    guitar: null,
    bass: null,
    violin: null,
    flute: null,
  });

  useEffect(() => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();
    audioCtxRef.current = audioCtx;

    let active = true;

    async function loadAll() {
      try {
        const [bassInst, guitarInst, pianoInst, violinInst, fluteInst] = await Promise.all([
          Soundfont.instrument(audioCtx, "acoustic_bass", { gain: 1 }),
          Soundfont.instrument(audioCtx, "acoustic_guitar_nylon", { gain: 1 }),
          Soundfont.instrument(audioCtx, "bright_acoustic_piano", { gain: 1 }),
          Soundfont.instrument(audioCtx, "violin", { gain: 1 }),
          Soundfont.instrument(audioCtx, "flute", { gain: 1 }),
        ]);

        if (active) {
          instrumentsRef.current = {
            bass: bassInst,
            guitar: guitarInst,
            piano: pianoInst,
            violin: violinInst,
            flute: fluteInst,
          };
          setLoading(false);
          console.log("Soundfont instruments loaded successfully");
        }
      } catch (err) {
        console.error("Failed to load soundfont instruments", err);
      }
    }

    loadAll();

    return () => {
      active = false;
      if (audioCtx && audioCtx.state !== "closed") {
        audioCtx.close();
      }
    };
  }, []);

  const playSequence = async (notes, initialTempo, speedMultiplier, instrumentChoice, onNotePlay) => {
    if (loading) {
      alert("Instruments are still loading. Please wait.");
      return;
    }

    if (isPlaying) {
      console.log("Already playing notes sequence");
      return;
    }

    setIsPlaying(true);
    
    // Adjust tempo based on selected speed multiplier (matches original play.js calculation)
    const tempo = initialTempo * (1 / speedMultiplier);
    const audioCtx = audioCtxRef.current;

    try {
      if (instrumentChoice === "synth") {
        console.log("Synth selected");
        await Tone.start();
        const synth = new Tone.Synth().toDestination();

        let idx = 0;
        for (let note of notes) {
          if (onNotePlay) onNotePlay(idx);
          idx++;
          if (
            note === null ||
            note === undefined ||
            note === "" ||
            note === "NaN" ||
            typeof note !== "string" ||
            note.length < 2
          ) {
            console.log("Rest");
            await new Promise((r) => setTimeout(r, tempo * 1000));
            continue;
          } else {
            synth.triggerAttackRelease(note, tempo);
            console.log(note + " played");
            await new Promise((r) => setTimeout(r, tempo * 1000));
          }
        }
        synth.triggerAttackRelease("C4", 0.5);
      } else {
        // Resolve instrument key matches for piano, guitar, Bass, Violin, flute
        const key = instrumentChoice.toLowerCase() === "bass" ? "bass" : instrumentChoice.toLowerCase();
        const inst = instrumentsRef.current[key];
        
        if (!inst) {
          console.error("Selected instrument instance is not loaded:", instrumentChoice);
          setIsPlaying(false);
          return;
        }

        console.log(`${instrumentChoice} selected`);
        let idx = 0;
        for (let note of notes) {
          if (onNotePlay) onNotePlay(idx);
          idx++;
          if (!note || note === "NaN") {
            console.log("Rest");
          } else {
            const config = {
              duration: 0.25,
              release: 0.05,
            };
            if (key === "piano") {
              config.attack = 0.01;
            }

            inst.play(note, audioCtx.currentTime, config);
            console.log(note + " played");
          }
          // Sleep for duration of tempo in seconds
          await new Promise((r) => setTimeout(r, tempo * 1000));
        }

        // Final C4 play chord trigger
        inst.play("C4", 1);
      }
    } catch (err) {
      console.error("Playback error:", err);
    } finally {
      setIsPlaying(false);
      if (onNotePlay) onNotePlay(-1);
    }
  };

  return {
    loading,
    isPlaying,
    playSequence,
  };
}
