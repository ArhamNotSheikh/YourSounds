import { useState, useRef, useEffect } from "react";

const MODEL_URL = "https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/";
const ML5_CDN = "https://unpkg.com/ml5@0.6.0/dist/ml5.min.js";

export function useHomeAudio() {
  const [isRecording, setIsRecording] = useState(false);
  const [detectedNotes, setDetectedNotes] = useState([]);
  const [tempo, setTempo] = useState(0);
  const [libLoaded, setLibLoaded] = useState(false);
  const [modelLoading, setModelLoading] = useState(false);

  const recorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioCtxRef = useRef(null);
  const streamRef = useRef(null);
  const pitchDetectorRef = useRef(null);
  const startTimeRef = useRef(null);
  
  // Keep instance of recorded HTML5 Audio object
  const recordedAudioRef = useRef(null);

  // Load ml5.js script dynamically
  useEffect(() => {
    if (window.ml5) {
      setLibLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = ML5_CDN;
    script.async = true;
    script.onload = () => {
      console.log("ml5.js script loaded successfully");
      setLibLoaded(true);
    };
    script.onerror = (err) => {
      console.error("Failed to load ml5.js", err);
    };
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  const getPitchLoop = () => {
    if (!pitchDetectorRef.current || !isRecording) return;

    pitchDetectorRef.current.getPitch((err, frequency) => {
      if (err) {
        console.error(err);
      } else if (frequency) {
        // Map frequency to musical note name
        const A4 = 440;
        const noteNumber = Math.round(12 * Math.log2(frequency / A4) + 69);
        const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        
        if (noteNumber >= 0) {
          const noteName = notes[noteNumber % 12];
          const octave = Math.floor(noteNumber / 12) - 1;
          const fullNote = noteName + octave;
          
          setDetectedNotes((prev) => [...prev, fullNote]);
        }
      }
      
      // Continue the loop if recording is active
      if (recorderRef.current && recorderRef.current.state === "recording") {
        requestAnimationFrame(getPitchLoop);
      }
    });
  };

  // Start getPitchLoop when pitchDetector is ready
  useEffect(() => {
    if (isRecording && pitchDetectorRef.current) {
      getPitchLoop();
    }
  }, [isRecording]);

  const startRecording = async () => {
    if (!libLoaded) {
      alert("Audio analysis library is still loading. Please wait a moment.");
      return;
    }

    try {
      setDetectedNotes([]);
      audioChunksRef.current = [];
      setTempo(0);
      recordedAudioRef.current = null;
      setModelLoading(true);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Initialize browser AudioContext
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioContext();

      // Initialize ml5 pitch detection Crepe model
      pitchDetectorRef.current = window.ml5.pitchDetection(
        MODEL_URL,
        audioCtxRef.current,
        stream,
        () => {
          console.log("Crepe pitch model loaded successfully");
          setModelLoading(false);
          
          // Setup MediaRecorder
          recorderRef.current = new MediaRecorder(stream);
          recorderRef.current.ondataavailable = (event) => {
            if (event.data && event.data.size > 0) {
              audioChunksRef.current.push(event.data);
            }
          };

          recorderRef.current.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
            const audioUrl = URL.createObjectURL(audioBlob);
            recordedAudioRef.current = new Audio(audioUrl);

            const endTime = Date.now();
            const durationSec = (endTime - startTimeRef.current) / 1000;
            
            setDetectedNotes((notesArray) => {
              if (notesArray.length > 0) {
                const calculatedTempo = durationSec / notesArray.length;
                setTempo(calculatedTempo);
              }
              return notesArray;
            });
          };

          startTimeRef.current = Date.now();
          recorderRef.current.start();
          setIsRecording(true);
        }
      );
    } catch (err) {
      console.error("Failed to start pitch detection recording:", err);
      setModelLoading(false);
      alert("Failed to access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (recorderRef.current && recorderRef.current.state === "recording") {
      recorderRef.current.stop();
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
      audioCtxRef.current.close();
    }

    setIsRecording(false);
  };

  const playRecording = () => {
    if (recordedAudioRef.current) {
      recordedAudioRef.current.play().catch((err) => {
        console.error("Playback failed:", err);
      });
    } else {
      alert("No recording found!");
    }
  };

  const hasRecording = !!recordedAudioRef.current;

  return {
    isRecording,
    detectedNotes,
    tempo,
    hasRecording,
    libLoaded,
    modelLoading,
    startRecording,
    stopRecording,
    playRecording,
  };
}
