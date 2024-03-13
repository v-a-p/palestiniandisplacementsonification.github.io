    let total2022 = data[2022]["JOR"] + data[2022]["SYR"] + data[2022]["LBN"] + data[2022]["PSE"];
    
    async function playSound(element, isClicked, country) {
        // Create the sound if the element is clicked
        if (isClicked) {
            if (country == 'PSE') { element.fmInternal = await playInternal(element); }
            else if (country == 'SYR'){ element.fmSyria = await playSyria(element); }
            else if (country == 'LBN'){ element.fmLebanon = await playLebanon(element); }
            else if (country == 'JOR'){ element.fmJordan = await playJordan(element); }
        } 
        else {
            // Stop the Audio if the element is unclicked
            if (element.fmInternal) {
                fmInternal.dispose();
                //clearInterval(melodyInternal);
            }
            if (element.fmSyria) {
                fmSyria.dispose();
                //clearInterval(melodySyria);
            }
            if (element.fmLebanon) element.fmLebanon.stop();
            if (element.fmJordan) element.fmJordan.stop();
        }
    }
    
    async function playInternal(element) {
        fmInternal = new Tone.Player({
            url : "soundeffects/one_shot_Scanner_C3.wav",
            onload: () => console.log("soundeffects/one_shot_Scanner_C3.wav loaded successfully!"),
            onerror: (e) => console.log("Error loading soundeffects/one_shot_Scanner_C3.wav:", e)
        }).toDestination();
        // Set the playback rate to adjust pitch
        setFrequency("PSE", fmInternal);
    
         // Play as soon as the buffer is loaded
         fmInternal.loop = true;
         fmInternal.autostart = true;
         //console.log(`Internal started at MIDI note ${targetFrequency} (playbackRate: ${playbackRate}).`);
        return fmInternal;
    }
    
    
    
    async function playSyria(element) {
        fmSyria = new Tone.Player({
            url : "soundeffects/one_shot_zany_C3.wav",
            onload: () => console.log("soundeffects/one_shot_zany_C3.wav loaded successfully!"),
            onerror: (e) => console.log("Error loading soundeffects/one_shot_zany_C3.wav:", e)
        }).toDestination();
        // Set the playback rate to adjust pitch
        setFrequency("SYR", fmSyria);
    
         // Play as soon as the buffer is loaded
         fmSyria.loop = true;
         fmSyria.autostart = true;
         //console.log(`Internal started at MIDI note ${targetFrequency} (playbackRate: ${playbackRate}).`);
        return fmSyria;
    
    }
    
    
    
    async function playLebanon(element){
        fmLebanon = new Tone.Player({
            url : "soundeffects/soundscape_c3.wav",
            onload: () => console.log("soundeffects/soundscape_c3.wav loaded successfully!"),
            onerror: (e) => console.log("Error loading soundeffects/soundscape_c3.wav:", e)
        }).toDestination();
    
        // Set the playback rate to adjust pitch
        setFrequency("LBN", fmLebanon);
    
        // Play as soon as the buffer is loaded
        fmLebanon.loop = true;
        fmLebanon.autostart = true;
        //console.log(`LebanonPlayer started at MIDI note ${targetFrequency} (playbackRate: ${playbackRate}).`);
    
        return fmLebanon;
    }
    
    async function playJordan(element) {
        fmJordan = new Tone.Player({
            url : "soundeffects/Jagged_zany_C3.wav",
            onload: () => console.log("soundeffects/Jagged_zany_c3.wav loaded successfully!"),
            onerror: (e) => console.log("Error loading soundeffects/Jagged_zany_c3.wav:", e)
        }).toDestination();

        // Set the playback rate to adjust pitch
        setFrequency("JOR", fmJordan);
    
         // Play as soon as the buffer is loaded
         fmJordan.loop = true;
         fmJordan.autostart = true;
         //console.log(`Internal started at MIDI note ${targetFrequency} (playbackRate: ${playbackRate}).`);
        return fmJordan;
    }

    // function setVolume(country, synth) {
    //     const volumeRange = 60;
    //     const datarange = data[2022][country] - data[1952][country];
    //     const volume = -40 + volumeRange*((data["" + yearValue.textContent][country]- data[1952][country])/datarange);
    //     console.log("track volume : " + volume);
    //     if (synth && synth.volume) {
    //         synth.volume.value = volume;
    //     }
    // }

    function setFrequency(country, synth) {
        let coefficient = data[""+yearValue.textContent][country] / data[1952][country];
        
        const ranges = [
            { min: 0.69686, max: 0.99999, midi: 47 }, 
            { min: 1, max: 1.30313, midi: 48 }, 
            { min: 1.30314, max: 1.60627, midi: 49 }, 
            { min: 1.60628, max: 1.90941, midi: 50 },
            { min: 1.90942, max: 2.21255, midi: 51 }, 
            { min: 2.21256, max: 2.5156, midi: 52 }, 
            { min: 2.5157, max: 2.81883, midi: 53 }, 
            { min: 2.81884, max: 3.12197, midi: 54 }, 
            { min: 3.12198, max: 3.42511, midi: 55 }, 
            { min: 3.42512, max: 3.72825, midi: 56 }, 
            { min: 3.72826, max: 4.0313, midi: 57 }, 
            { min: 4.0314, max: 4.33453, midi: 58 }, 
            { min: 4.33454, max: 4.63767, midi: 59 }, 
            { min: 4.63768, max: 4.94081, midi: 60 }, 
            { min: 4.94082, max: 5.24395, midi: 61 }, 
            { min: 5.24396, max: 5.5470, midi: 62 }, 
            { min: 5.5471, max: 5.85023, midi: 63 }, 
            { min: 5.85024, max: 6.15337, midi: 64 }, 
            { min: 6.15338, max: 6.45651, midi: 65 }, 
            { min: 6.45652, max: 6.75965, midi: 66 }, 
            { min: 6.75966, max: 7.0627, midi: 67 }, 
            { min: 7.0628, max: 7.36593, midi: 68 }, 
            { min: 7.36594, max: 7.66907, midi: 69 }, 
            { min: 7.66908, max: 7.97221, midi: 70 }, 
            { min: 7.97222, max: 8.27535, midi: 71 }, 
            { min: 8.27536, max: 8.5784, midi: 72 }, 
            { min: 8.5785, max: 8.88163, midi: 73 }, 
            { min: 8.88164, max: 9.18477, midi: 74 }, 
            { min: 9.18478, max: 9.48791, midi: 75 }, 
            { min: 9.48792, max: 9.79105, midi: 76 }, 
            { min: 9.79106, max: 10.0941, midi: 77 }, 
            { min: 10.0942, max: 10.39733, midi: 78 },
            { min: 10.39734, max: 10.70047, midi: 79 }, 
            { min: 10.70048, max: 11.00361, midi: 80 }, 
            { min: 11.00362, max: 11.30675, midi: 81 }, 
            { min: 11.30676, max: 11.6098, midi: 82 }, 
            { min: 11.6099, max: 11.91303, midi: 83 }, 
            { min: 11.91304, max: 12, midi: 84 },   
        ];
    
        // Iterate through the ranges to find where the input number fits
        for (const range of ranges) {
            if (coefficient >= range.min && coefficient <= range.max) {
                coefficient = midiToNote(range.midi); //the corresponding MIDI number
            }
        }

        const originalNoteName = 'C3'; // C3, the original pitch of your sound file
        const originalFrequency = Tone.Frequency(originalNoteName).toFrequency();
        
        // Calculate the frequency of the target MIDI note
        const targetFrequency = Tone.Frequency(coefficient).toFrequency();
        
        // Calculate the playback rate to simulate the target note
        const playbackRate = targetFrequency / originalFrequency;

        if (synth && synth.playbackRate) {
            console.log("haha");
            synth.playbackRate = playbackRate;
        }

    }

    function midiToNote(midiNr){
        const myMap = new Map([
            [47, "B2"],
            [48, "C3"],
            [49, "C#3"],
            [50, "D3"],
            [51, "D#3"],
            [52, "E3"],
            [53, "F3"],
            [54, "F#3"],
            [55, "G3"],
            [56, "G#3"],
            [57, "A3"],
            [58, "A#3"],
            [59, "B3"],
            [60, "C4"],
            [61, "C#4"],
            [62, "D4"],
            [63, "D#4"],
            [64, "E4"],
            [65, "F4"],
            [66, "F#4"],
            [67, "G4"],
            [68, "G#4"],
            [69, "A4"],
            [70, "A#4"],
            [71, "B4"],
            [72, "C5"],
            [73, "C#5"],
            [74, "D5"],
            [75, "D#5"],
            [76, "E5"],
            [77, "F5"],
            [78, "F#5"],
            [79, "G5"],
            [80, "G#5"],
            [81, "A5"],
            [82, "A#5"],
            [83, "B5"],
            [84, "C6"]
          ]);
          if(myMap.has(midiNr)) {
            return myMap.get(midiNr); // Return the note name if found
          } else {
            return "Note not found"; // Return a message if the note is not in the map
          }
        }
