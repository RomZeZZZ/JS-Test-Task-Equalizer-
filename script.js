'use strict'
let input = document.getElementById('input')
let audioContainer = document.getElementById('audio-container');

// function colorizeColumns(value) {
//     const gridCells = document.querySelectorAll('.grid-cell');
//     const columns = 6;
//     for (let col = 0; col < columns; col++) {
//         const height = Math.floor(value / 255 * 6); 
//         for (let row = 0; row < 6; row++) {
//             const cellIndex = row * columns + col;
//             const cell = gridCells[cellIndex];
//             const backgroundColor = row < height ? `rgba(0, 0, 255, ${value / 255})` : '';
//             cell.style.backgroundColor = backgroundColor;
//         }
//     }
// }
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
        // const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        // const analyser = audioContext.createAnalyser();
        // const sourceNode = audioContext.createMediaElementSource(audioPlayer);
        // sourceNode.connect(analyser);
        // analyser.connect(audioContext.destination);
        // analyser.fftSize = 32;
        // const bufferLength = analyser.frequencyBinCount;
        // const dataArray = new Uint8Array(bufferLength);
        // function updateVisualizer() {
        //     analyser.getByteFrequencyData(dataArray);
        //     dataArray.forEach((value, index) => {
        //         const scale = value / 255; 
        //         const minScale = 0.2; 
        //         const maxScale = 1.0; 
        //         const height = Math.floor(minScale + scale * (maxScale - minScale) * 6);
        //         colorizeColumns(value)
        //         requestAnimationFrame(updateVisualizer);
        //     });
        //     requestAnimationFrame(updateVisualizer);
        // }
        // updateVisualizer();
    } else {
        alert('Its not audio file')
    }
})