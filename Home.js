

    const model_url =
  "https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/";

 

      let recorder;
      let audio = [];
      let isrecording = false;
      let recordedAudio;
      let pitch;
      let recordedBlob;
      let final=[];
      let Synth;  
      let start; 
      let end; 
      let timeofrec;
      


      const button = document.getElementById("record");
      const playInstru = document.getElementById("playInstru");

     


      button.onclick = async () => {
        isrecording = !isrecording;
        //Recording hasnt started yet here recording starts now
        if (isrecording) {
          start=Date.now();
          final=[];
          audio=[];
          console.log("recording started");
          const stream = await navigator.mediaDevices.getUserMedia({audio: true,});//Taking permission to use mic
            startPitchDetection(stream);
          recorder = new MediaRecorder(stream);
          recorder.ondataavailable = (event) => {
            audio.push(event.data);
          };
          recorder.start();
          button.innerText = "Stop recording";
        }
        //if recording was going on and we have clicked so recoring stops here
        else if (!isrecording) {
          let end=Date.now();
          timeofrec=(end-start)/1000;
          recorder.stop();
          console.log("recording stopped");
          console.log("Recorded for"+ timeofrec+"seconds");
          button.innerText = "Start recording";
          recorder.onstop = () => {
            const audioblob = new Blob(audio, { type: "audio/webm" });
            const audiourl = URL.createObjectURL(audioblob);
            recordedAudio = new Audio(audiourl);
            recordedBlob=audioblob;
            console.log("Recording ready to play");
            console.log("Final Pitch Array: ",final); 
          };
          
        }
      };

      //Function to play the recoding saved in audio[]
      const play = document.getElementById("play");
      play.addEventListener("click", () => {
        if (recordedAudio) {
          recordedAudio.play();
        } else {
          alert("No recording found!");
        }
      });

      //Function for pitch detection
      function startPitchDetection(stream){
        const audiocontext=new AudioContext();

        pitch=ml5.pitchDetection(
            model_url,
            audiocontext,
            stream,
            ()=>{
                console.log("Model loaded pitch detection started")
                getPitch();
            }

        );
      }

      function getPitch(){
        pitch.getPitch((err,frequency)=>{
            if(err){
                console.error(err);
            }
            else if(!isrecording){
                console.log("Pitch detection stopped");
                return;
            }
            else{
                //console.log("Frequency: "+frequency);
                 const A4 = 440;
                 const noteNumber = Math.round(12 * Math.log2(frequency/ A4) + 69);
                const notes = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];

                const note = notes[noteNumber % 12];
                const octave = Math.floor(noteNumber / 12) - 1;
                final.push(note + octave);
                getPitch();
            }
        })
      }

      function tosend(){
        if(final.length===0){
          alert("Please record something first!");
          return;
        }
        else{
        const data={
          notes:final,
          tempo:timeofrec/final.length,

        }
         localStorage.setItem("data",JSON.stringify(data));
        window.location.href='play.html';}

      }

      
const aboutBg = document.getElementById("about-bg");
const impCntrl = document.getElementById("impcntrl");

window.addEventListener("scroll", () => {
  const cardTop = impCntrl.getBoundingClientRect().top;

  if (cardTop < 500) {
    aboutBg.style.opacity = "0";
  } else {
    aboutBg.style.opacity = "1";
  }
});

window.addEventListener("load", () => {
  document.body.style.opacity = "1";
});



     



