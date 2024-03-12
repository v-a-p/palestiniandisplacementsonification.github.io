function playSound(element, isClicked, country) {
    // Create the oscillator if the element is clicked
    if (isClicked) {
        if (country == 'PSE') { element.fmSynth = playInternal(element); }
        else if (country == 'SYR'){ element.newFMSynth = playSyria(element); }
        else if (country == 'LBN'){ element.oscillator = playLebanon(element); }
        else { element.oscillator = playJordan(element); }
    } 
    else {
        // Stop the oscillator if the element is not clicked
        if (element.oscillator) element.oscillator.stop();
        if (element.fmSynth) {
            Tone.Transport.cancel();
            Tone.Transport.stop();
        }
        if (element.newFMSynth) {
            Tone.Transport.cancel();
            Tone.Transport.stop();
        }
    }
}

async function playInternal(element) {
    let melody = ['C5', 'E5', 'G5', 'E5', 'C5', 'D5', 'E5', 'D5'];
    let duration = '8n';

    fmSynth = new Tone.FMSynth().toDestination();
    Tone.Transport.bpm.value = 120;

    // Loop the melody
    Tone.Transport.scheduleRepeat((time) => {
        // Get the next note and add it back to the end of the melody
        let note = melody.shift();
        melody.push(note);
        fmSynth.triggerAttackRelease(note, duration, time);
    }, duration);
    
    setVolume("PSE", fmSynth)
    Tone.Transport.start();
    return fmSynth;
}

async function playSyria(element) {
    let newMelody = ['A4', 'C5', 'E5', 'C5', 'A4', 'B4', 'C5', 'B4'];
    let newDuration = '4n';

    newFMSynth = new Tone.FMSynth().toDestination();
    Tone.Transport.bpm.value = 150;

    // Loop the new melody
    Tone.Transport.scheduleRepeat((time) => {
        // Get the next note and add it back to the end of the melody
        let note = newMelody.shift();
        newMelody.push(note);
        newFMSynth.triggerAttackRelease(note, newDuration, time);
    }, newDuration);
    
    setVolume("SYR", newFMSynth)
    Tone.Transport.start();
    return newFMSynth;
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

function playLebanon(element){
    const oscillator = new Tone.Oscillator(440, "triangle").toDestination();
    oscillator.start();
    return oscillator;
}

function playJordan(element){
    const oscillator = new Tone.Oscillator(440, "sawtooth").toDestination();
    oscillator.start();
    return oscillator;
}