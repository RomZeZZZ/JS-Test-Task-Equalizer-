'use strict'
let input = document.getElementById('input')
let audioContainer = document.getElementById('audio-container');
let column = 1;
let animationId;
function colorizeColumns(height, column) {
    if (height === 0) {
        return;
    }
    for (let i = height; i >= 1; i--) {
        const cellId = `cell-${i}-${column}`;
        const cell = document.getElementById(cellId);
        cell.style.backgroundColor = 'lightgreen';
    }
    setTimeout(() => {
        for (let i = 1; i <= height; i++) {
            const cellId = `cell-${i}-${column}`;
            const cell = document.getElementById(cellId);
            cell.style.backgroundColor = '';
        }
    }, 10);
}
input.addEventListener('change', (e) => {
    document.querySelector('.custom-input').innerText = e.target.files[0].name || 'Choose an audio file';
    let audioPlayer = document.createElement('audio');
    audioPlayer.controls = true;
    let source = document.createElement('source');
    source.src = URL.createObjectURL(input.files[0]);
    source.type = input.files[0].type;
    audioPlayer.appendChild(source);
    audioContainer.innerHTML = '';
    audioContainer.appendChild(audioPlayer);
    const audioContext = new (window.AudioContext)();
    const analyser = audioContext.createAnalyser();
    const sourceNode = audioContext.createMediaElementSource(audioPlayer);
    sourceNode.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 32;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    audioPlayer.addEventListener('play', () => {
        updateVisualizer();
    });
    audioPlayer.addEventListener('pause', () => {
        cancelAnimationFrame(animationId);
    });
    function updateVisualizer() {
        animationId = requestAnimationFrame(updateVisualizer);
        analyser.getByteFrequencyData(dataArray);
        dataArray.forEach((value) => {
            const scale = value / 255;
            const height = Math.round(scale * 6);
            if (column === 6) column = 1;
            else column++;
            colorizeColumns(height, column);
        });
    }
})