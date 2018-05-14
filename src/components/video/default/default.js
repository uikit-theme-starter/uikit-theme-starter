export function
init() {
    let videoContainers = document.querySelectorAll("[video-container]");
    videoContainers.forEach((e) => {
        let video = e.getElementsByTagName("video");
        let playButton = e.querySelector("[video-play-button]");
        let pauseButton = e.querySelector("[video-pause-button]");
        if (playButton) {
            playButton.addEventListener('click', function () {
                video[0].play();
            });
        }
        if (pauseButton) {
            pauseButton.addEventListener('click', function () {
                video[0].pause();
            });
        }
    });
}