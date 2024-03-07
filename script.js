// Initialize the slider
var slider = document.getElementById('slider');
var yearValue = document.getElementById('year-value');

// Handle slider events
slider.oninput = function() {
    yearValue.textContent = this.value; // Update the year value
    fillSlider(this.value); // Fill the slider with color
    playSound(this.value); // Play a sound
}

// Fill the slider with color
function fillSlider(value) {
    var percent = (value - 1952) / (2022 - 1952) * 100;
    slider.style.background = 'linear-gradient(to right, #4CAF50 ' + percent + '%, #d3d3d3 ' + percent + '%';
}

// Color the box when clicked
function toggleBox(element) {
    const isClicked = element.classList.toggle('clicked');

    // Create the oscillator if the element is clicked
    if (isClicked) {
        const oscillator = new Tone.Oscillator(440, "sine").toDestination();
        oscillator.start();
        element.oscillator = oscillator; // Store oscillator reference in element
    } else {
        // Stop the oscillator if the element is not clicked
        if (element.oscillator) {
            element.oscillator.stop();
        }
    }

  }