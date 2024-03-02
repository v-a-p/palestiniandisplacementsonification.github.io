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
    element.classList.toggle('clicked');
  }

// Play a sound
function playSound(value) {
    var sound;

    if (document.getElementById('internal').checked) {
        sound = new Howl({
            src: ['internal_' + value + '.mp3']
        });
    } else if (document.getElementById('syria').checked) {
        sound = new Howl({
            src: ['syria_' + value + '.mp3']
        });
    } else if (document.getElementById('lebanon').checked) {
        sound = new Howl({
            src: ['lebanon_' + value + '.mp3']
        });
    } else if (document.getElementById('jordan').checked) {
        sound = new Howl({
            src: ['jordan_' + value + '.mp3']
        });
    }

    if (sound) {
        sound.play();
    }
}