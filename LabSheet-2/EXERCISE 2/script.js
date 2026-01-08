const audio = document.getElementById('audioPlayer');
const video = document.getElementById('videoPlayer');

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

audio.addEventListener('timeupdate', () => {
    document.getElementById('audioTime').innerText = formatTime(audio.currentTime);
});

video.addEventListener('timeupdate', () => {
    document.getElementById('videoTime').innerText = formatTime(video.currentTime);
});