async function playSound(element, isClicked, country) {
    // Create the sound if the element is clicked
    if (isClicked) {
        if (country == 'PSE') { element.fmInternal = await playInternal(element); }
        else if (country == 'SYR'){ element.fmSyria = await playSyria(element); }
        else if (country == 'LBN'){ element.fmLebanon = await playLebanon(element); }
        else { element.fmJordan = await playJordan(element); }
    } 
    else {
        // Stop the Audio if the element is unclicked
        if (element.fmInternal) {
            fmInternal.dispose();
            clearInterval(melodyInternal);
        }
        if (element.fmSyria) {
            fmSyria.dispose();
            clearInterval(melodySyria);
        }
        if (element.fmLebanon) element.fmLebanon.stop();
        if (element.fmJordan) element.fmJordan.stop();
    }
}

async function playInternal(element) {
    let melody = ['C5', 'E5', 'G5', 'E5', 'C5', 'D5', 'E5', 'D5'];
    let duration = '8n';
    let bpm = 120;
    fmInternal = new Tone.FMSynth().toDestination();

    // Loop the melody
    let i = 0;
    melodyInternal = setInterval(() => {
        fmInternal.triggerAttackRelease(melody[i], Tone.Time(duration).toSeconds(), Tone.now());
        i = (i + 1) % melody.length;
    }, Tone.Time(duration).toSeconds() * 60 / bpm * 2000);

    setVolume("PSE", fmInternal);
    return fmInternal;
}

async function playSyria(element) {
    let newMelody = ['A4', 'C5', 'E5', 'C5', 'A4', 'B4', 'C5', 'B4'];
    let duration = '4n';
    let bpm = 120;
    fmSyria = new Tone.FMSynth().toDestination();

    // Loop the melody
    let i = 0;
    melodySyria = setInterval(() => {
        let note = newMelody[i];
        fmSyria.triggerAttackRelease(note, Tone.Time(duration).toSeconds(), Tone.now());
        i = (i + 1) % newMelody.length;
    }, Tone.Time(duration).toSeconds() * 60 / bpm * 2000);

    setVolume("SYR", fmSyria)
    return fmSyria;
}

function playLebanon(element){
    fmLebanon = new Tone.Player({
        url : "soundeffects/footstep.mp3",
        onload: () => console.log("footstep.mp3 loaded successfully!"),
        onerror: (e) => console.log("Error loading footstep.mp3:", e)
    }).toDestination();

    // play as soon as the buffer is loaded
    fmLebanon.loop = true;
    fmLebanon.autostart = true;
    setVolume("LBN", fmLebanon);
    console.log("LebanonPlayer started.");
    return fmLebanon;
}

function playJordan(element) {
    fmJordan = new Tone.GrainPlayer({
        url: "soundeffects/crowd.mp3",
        loop: true,
        grainSize: 0.2, // Adjust to taste, in seconds
        overlap: 0.1, // Adjust for smoothness, in seconds
        playbackRate: 1.5,
        detune: -100,
        loopStart: 7.0,
        loopEnd: 8.0,
        reverse: true, // Play audio backward
        onload: () => console.log("crowd.mp3 loaded successfully!"),
        onerror: (e) => console.log("Error loading crowd.mp3:", e)
    }).toDestination();

    // Ensure audio is loaded before starting playback
    Tone.loaded().then(() => {
        fmJordan.start();
        console.log("GrainPlayer started.");
    });

    setVolume("JOR", fmJordan);

    return fmJordan;
}

function setVolume(country, synth) {
    const volumeRange = 60;
    const datarange = data[2022][country] - data[1952][country];
    const volume = -40 + volumeRange*((data["" + yearValue.textContent][country]- data[1952][country])/datarange);
    console.log("track volume : " + volume);
    if (synth && synth.volume) {
        synth.volume.value = volume;
    }
}