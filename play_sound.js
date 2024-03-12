async function playSound(element, isClicked, country) {
    // Create the sound if the element is clicked
    if (isClicked) {
        if (country == 'PSE') { element.fmInternal = await playInternal(element); }
        else if (country == 'SYR'){ element.fmSyria = await playSyria(element); }
        else if (country == 'LBN'){ element.footsteps = playLebanon(element); }
        else { element.oscillator = playJordan(element); }
    } 
    else {
        // Stop the oscillator if the element is not clicked
        if (element.oscillator) element.oscillator.stop();
        if (element.fmInternal) {
            fmInternal.dispose();
            clearInterval(melodyInternal);
        }
        if (element.fmSyria) {
            fmSyria.dispose();
            clearInterval(melodySyria);
        }
        if (element.footsteps) element.footsteps.stop();
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
        let note = melody[i];
        fmInternal.triggerAttackRelease(note, Tone.Time(duration).toSeconds(), Tone.now());
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
    const footsteps = new Tone.Player("footstep.mp3").toDestination();
    // play as soon as the buffer is loaded
    footsteps.loop = true;
    footsteps.autostart = true;
    return footsteps;
}

function playJordan(element){
    const oscillator = new Tone.Oscillator(440, "sawtooth").toDestination();
    oscillator.start();
    return oscillator;
}

function setVolume(country, synth) {
    // Assuming yearValue is a number between 1952 and 2022
    // We convert it to a volume between -60 and 0 decibels
    const volumeRange = 60;
    const datarange = data[2022][country] - data[1952][country];
    const volume = -40 + volumeRange*((data["" + yearValue.textContent][country]- data[1952][country])/datarange);
    if (synth && synth.volume) {
        synth.volume.value = volume;
    }
}