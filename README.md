# 🎶 **YourSound**

**YourSound** is an interactive web application that transforms your **voice into music**.  
Hum, speak, sing, or beatbox — and hear it played back on an **instrument of your choice**.

Designed for experimentation, creativity, and fun, YourSound acts as a **vocal sampler, melody sketchpad, and musical playground**, turning raw human sound into structured musical output using modern web audio and machine learning tools.

---

## 🚀 What does YourSound do?

YourSound listens to the user's audio input and converts it into a **sequence of musical notes**, which are then replayed using realistic digital instruments — all within the browser.

It brings together:
- **Machine learning** for pitch and frequency analysis
- **Precise audio scheduling** for timing and tempo
- **Instrument synthesis** for expressive playback

---

## 🧠 How it works

1. The user provides audio input through a microphone.
2. The audio is temporarily captured and analysed using **ml5.js (CREPE pitch detection)**.
3. The model extracts **frequencies** corresponding to the sound at each moment in time.
4. These frequencies are:
   - Stored in an array
   - Converted into their **corresponding musical notes**
5. The resulting note array is passed to **Tone.js / SoundFont.js**, which:
   - Plays the notes sequentially
   - Accurately accounts for **tempo**, **note duration**, and **pauses**
6. The output is a musical performance generated entirely from the user’s voice.

---

## 🎹 Instruments & Sound

YourSound supports multiple instruments powered by **SoundFont.js**, allowing the same vocal input to be replayed with different tonal characteristics while preserving rhythm and timing.

---

## 🧪 Why YourSound?

- No instruments. No musical training.
- Turn your **voice into playable music**
- Built entirely with **modern web technologies**
- Experimental, creative, and surprisingly powerful

---

## 🛠️ Tech Stack

- **JavaScript**
- **ml5.js (CREPE pitch detection)**
- **Tone.js**
- **SoundFont.js**
- **Web Audio API**
