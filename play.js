 
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
        await Tone.start(); // unlock audio

        
        
        const synth = new Tone.Synth().toDestination();
        const notesarray = toplay;

        for (let note of notesarray) {
          if (note === null || note === undefined || note === "" || note==="NaN"||typeof note !== "string" || note.length < 2) {
            console.log("Rest");
            await new Promise((r) => setTimeout(r, tempo*1000));
            continue;}
           else {
            synth.triggerAttackRelease(note, tempo); // 0.5 sec
            console.log(note + " played");
            await new Promise((r) => setTimeout(r,tempo*1000));
          }
        }
        synth.triggerAttackRelease("C4", 0.5);
      }
   