'use strict'
let input = document.getElementById('input')
let audioContainer = document.getElementById('audio-container');
let coloumn = 1;
let isAudioPlaying = false;
function colorizeColumns(height, coloumn) {
    if (height === 0) {
        return
    }
    console.log(height, coloumn)
    for (let i = 1; i <= height; i++) {
        const cellId = `cell-${i}-${coloumn}`;
        const cell = document.getElementById(cellId);
        cell.style.backgroundColor = 'red';
        setTimeout(() => {
            cell.style.backgroundColor = '';
        }, 50);
    }
}
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
        const audioContext = new (window.AudioContext || window.AudioContext)();
        const analyser = audioContext.createAnalyser();
        const sourceNode = audioContext.createMediaElementSource(audioPlayer);
        sourceNode.connect(analyser);
        analyser.connect(audioContext.destination);
        analyser.fftSize = 32;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        audioPlayer.addEventListener('play', () => {
            isAudioPlaying = true
            requestAnimationFrame(updateVisualizer);
        })
        audioPlayer.addEventListener('pause', () => {
            isAudioPlaying = false
            cancelAnimationFrame(updateVisualizer);
        })
        function updateVisualizer() {
            requestAnimationFrame(updateVisualizer);
            analyser.getByteFrequencyData(dataArray);
            dataArray.forEach((value) => {
                const scale = value / 255; 
                const minScale = 0.2; 
                const maxScale = 1.0; 
                const height = Math.floor(minScale + scale * (maxScale - minScale) * 6);
                if (coloumn === 6) {
                    coloumn = 1
                } else {
                    coloumn++
                } 
                colorizeColumns(height, coloumn)
            });
        }
    } else {
        alert('Its not audio file')
    }
})