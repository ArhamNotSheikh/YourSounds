
 let piano;
 let guitar;
 let bass;
 let violin;

 
 const audio = new (window.AudioContext || window.webkitAudioContext)();

      (async () => {
            bass = await Soundfont.instrument(audio, "acoustic_bass", { gain: 1 });
              })();

     (async () => {
            guitar = await Soundfont.instrument(audio, "acoustic_guitar_nylon", { gain: 1 });
              })();
      
     (async () => {
          piano = await Soundfont.instrument(audio, "bright_acoustic_piano", { gain: 1 });
            })();
     
     (async () => {
          violin = await Soundfont.instrument(audio, "violin", { gain: 1 });
            })();

      (async () => {
          flute = await Soundfont.instrument(audio, "flute", { gain: 1 });
            })();
     




const data=JSON.parse(localStorage.getItem("data"));
  let topaly = [];
      toplay = data.notes;
      let tempo=(data.tempo);
      console.log(toplay);
      
 let value = 1; 

document.getElementById("Speed").addEventListener("click", () => {
  let raw = document.getElementById("val").value;

  try {
    
    if (raw.trim() === "") {
      value = 1;
      console.log("No value entered → using default 1x");
      return;
    }

    const v = Number(raw);

  
    if (isNaN(v) || v <= 0) {
      throw new Error("Speed should be positive buddy");
    }

    value = v; 
    console.log("Speed to play at: " + value + "x");
  }

  catch (err) {
    console.log("Caught Error:", err.message);
    return;
  }

  tempo = data.tempo * (1/value);   
  console.log("Updated tempo:", tempo);
});


    async function playNote() {
      const choice = document.getElementById("instrument").value;
      if (choice === "synth") {
        console.log("Synth selected");
        await Tone.start(); // unlock audio
        const synth = new Tone.Synth().toDestination();
        const notesarray = toplay;

        for (let note of notesarray) {
          const now = Tone.now();
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
      } else if (choice === "piano") {
        

        console.log("Piano selected");
        for (let note of toplay) {
          if (!note || note === "NaN") {
            console.log("Rest");
          } else {
            piano.play(note, audio.currentTime, {
              duration: 0.25,
              release: 0.05,
              attack: 0.01,
            });
            console.log(note + " played");
          }
          await new Promise((r) => setTimeout(r, tempo * 1000));
        }
        piano.play("C4",1);
      } else if (choice === "guitar") {
        
              console.log("Guitar selected");
              for (let note of toplay) {
                if (!note || note === "NaN") {
                  console.log("Rest");
                } else {
                  guitar.play(note, audio.currentTime, {
                    duration: 0.25,
                    release: 0.05,
                    
                  });
                  console.log(note + " played");
                }
                await new Promise((r) => setTimeout(r, tempo * 1000));
              }
        guitar.play("C4",1);
      } else if (choice == "Bass") {

         
              console.log("Bass selected");
              for (let note of toplay) {
                if (!note || note === "NaN") {
                  console.log("Rest");
                } else {
                  bass.play(note, audio.currentTime, {
                    duration: 0.25,
                    release: 0.05,
                    
                  });
                  console.log(note + " played");
                }
                await new Promise((r) => setTimeout(r, tempo * 1000));
              }
        bass.play("C4",1);
       
      }
      else if (choice == "Violin") {

         
              console.log("Violin selected");
             
              for (let note of toplay) {
                if (!note || note === "NaN") {
                  console.log("Rest");
                } else {
                  violin.play(note, audio.currentTime, {
                    duration: 0.25,
                    release: 0.05,
                    
                  });
                  console.log(note + " played");
                }
                await new Promise((r) => setTimeout(r, tempo * 1000));
              }
        violin.play("C4",1);
    }
    else if (choice == "flute") {

         
              

              for (let note of toplay) {
                if (!note || note === "NaN") {
                  console.log("Rest");
                } else {
                  flute.play(note, audio.currentTime, {
                    duration: 0.25,
                    release: 0.05, }); 
                 
                  console.log(note + " played");
                }
                await new Promise((r) => setTimeout(r, tempo * 1000));
              }
        flute.play("C4",1);
    }
  }
      

        
      
   