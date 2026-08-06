import { Link } from "react-router-dom";
import { GlassCard } from "../components/GlassCard";
import styles from "./Instruments.module.css";

const INSTRUMENTS_DATA = [
  {
    id: "piano",
    title: "Piano",
    image: "/Images/piano.jpg",
    description: "The piano produces warm, expressive tones that can shift from gentle and emotional to powerful and dramatic. Its wide range and ability to play melody and harmony together make it one of the most versatile instruments in music."
  },
  {
    id: "guitar",
    title: "Guitar",
    image: "/Images/Kaspar-40-inch-guitar-k307sce.webp",
    description: "The guitar blends rhythm and melody effortlessly, offering bright strums, soft fingerpicking, and energetic riffs. Its sound adapts to almost any genre, giving it a unique emotional quality shaped entirely by a player's touch."
  },
  {
    id: "violin",
    title: "Violin",
    image: "/Images/violin.jpg",
    description: "The violin's voice-like tone gives it an emotional, singing quality that stands out in both classical and modern music. Its ability to move smoothly between soft, delicate notes and intense, dramatic highs makes it deeply expressive."
  },
  {
    id: "flute",
    title: "Flute",
    image: "/Images/Flute.jpg",
    description: "The flute creates light, airy tones that feel smooth, calm, and breath-like. Its clean sound floats above other instruments, bringing a sense of clarity and peacefulness to melodies."
  },
  {
    id: "synth",
    title: "Synth",
    image: "/Images/synth.jpg",
    description: "The synthesizer shapes sound electronically, allowing it to create anything from warm pads to futuristic textures. Its flexibility makes it essential in electronic, pop, ambient, and modern cinematic music."
  }
];

export default function Instruments() {
  return (
    <div className={`${styles.instrumentsContainer} animate-fade-in`}>
      <h1 className={styles.titleFixed}>YourSounds</h1>
      
      <h1 className={styles.mainTitle}>Explore Instruments</h1>
      <p className={styles.subTitle}>Select a digital voice-playback instrument to begin shaping your sounds</p>

      <div className={styles.grid}>
        {INSTRUMENTS_DATA.map((inst) => (
          <GlassCard key={inst.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img src={inst.image} alt={inst.title} className={styles.image} />
            </div>
            <h2 className={styles.cardTitle}>{inst.title}</h2>
            <p className={styles.cardText}>{inst.description}</p>
            <div className={styles.btnWrapper}>
              <Link to="/play">
                <button className={styles.playBtn}>Play</button>
              </Link>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
