
 
 


 const audio = new (window.AudioContext || window.webkitAudioContext)();


  const lp = audio.createBiquadFilter();
lp.type = "lowpass";
lp.frequency.value = 4000; // soften highs (sweetness)
lp.Q.value = 0.7;



lp.connect(audio.destination);

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






//  lp.connect(audio.destination);

async function playNote() {
    
    }


    
  
      
      

//       async function playNote() {
//   await Tone.start();

//   const notesarray = toplay;

//   for (let note of notesarray) {
//     const now = Tone.now();

//     if (!note || note === "NaN") {
//       await new Promise(r => setTimeout(r, tempo * 1000));
//        console.log("Rest");
//       continue;
//     }

//     // env.triggerAttack(now);
//     Instrument.triggerAttackRelease(note, now);
   

//     await new Promise(r => setTimeout(r, tempo * 1000));

//     // env.triggerRelease(now + tempo);
//     Instrument.triggerRelease();

//     console.log(note, "played");
//   }
//     piano.triggerAttackRelease("C4", 0.5);
// }
