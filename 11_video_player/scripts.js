const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]'); //orice elem poate avea atribut data-skip, asa se selecteaza toate
const ranges = player.querySelectorAll('.player__slider');


function togglePlay() {
    const method = video.paused ? 'play' : 'pause'; //paused e proprietate a elem video, nu are prop playing
    video[method]();//echivalent video.play sau video.pause, daca variabila e string, se poate apela asa
}

function updateButon() {
    const icoana = this.paused ? '►' : '❚ ❚'; //schimba icoana butonului play
    toggle.textContent = icoana; //se putea si cu terenary
}

function skip() {
    //console.log(this.dataset);
    video.currentTime += parseFloat(this.dataset.skip); //data-skip e string
}

function rangeUpdate() {
    // console.log(this.name);
    // console.log(this.value);
    video[this.name] = this.value;
}

function progressUpdate() {
    const procent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${procent}%`;
}

function scrub(e) {
    //console.log(e);
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    //console.log(scrubTime);
}

video.addEventListener('click', togglePlay); //click pe fereastra
video.addEventListener('play', updateButon);
video.addEventListener('pause', updateButon);
video.addEventListener('timeupdate', progressUpdate); //in loc de timeupdate se poate folosi si progress, e tot proprietate a elem video
toggle.addEventListener('click', togglePlay); //click pe butonul play
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', rangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', rangeUpdate));

let clickMouse = false;
progress.addEventListener('click', scrub);
// progress.addEventListener('mousemove', (e) => {
//     if(clickMouse) {scrub(e)}
// });
progress.addEventListener('mousemove', (e) => clickMouse && scrub(e));
progress.addEventListener('mousedown', () => clickMouse = true);
progress.addEventListener('mouseup', () => clickMouse = false);