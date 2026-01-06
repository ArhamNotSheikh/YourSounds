 
 const data=JSON.parse(localStorage.getItem("data"))

// let speed=document.getElementById("speed");
      let topaly = [];
      toplay = data.notes;
      const tempo=(data.tempo);
      console.log(toplay);
      console.log("at temp"+ tempo);
  
      
      

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
   