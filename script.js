'use strict'
let input = document.getElementById('input')
let audioContainer = document.getElementById('audio-container');
input.addEventListener('change', () => {
    if (input.files[0].type.startsWith('audio/')) {
        let audioPlayer = document.createElement('audio');
        audioPlayer.controls = true;
        let source = document.createElement('source');
        source.src = URL.createObjectURL(input.files[0]);
        source.type = input.files[0].type;
        audioPlayer.appendChild(source);
        audioContainer.innerHTML = '';
        audioContainer.appendChild(audioPlayer);
    } else {
        alert('Its not audio file')
    }
})