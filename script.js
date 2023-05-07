const playBtn = document.querySelector('.ctrl .play');
const nextBtn = document.querySelector('.ctrl .next');
const prevBtn = document.querySelector('.ctrl .prev');
const barContainer = document.querySelector('.bar-container');
const popUp = document.querySelector('.info');
const titlePopUp = document.querySelector('.pop-up h4');
const progressPopUp = document.querySelector('.pop-up .movable');
const progressPopUpContainer = document.querySelector('.progress-bar');
const audio = document.querySelector('.container audio');
const cover = barContainer.querySelector('.image img');
// surahs titles
const surahs = ['Al-Fatiha', 'Al-Ekhlas', 'Al-Nas', 'Al-Falak'];

let surahIndex = 0;

// load surah details into dom
function loadSurah(surah) {
  titlePopUp.innerText = surah;
  audio.src = `quran/${surah}.mp3`;
  cover.src = `images/${surah}.jpg`;
}
function playSurah() {
  barContainer.classList.add('play');
  playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;

  audio.play();
}
function pauseSurah() {
  barContainer.classList.remove('play');
  playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;

  audio.pause();
}
// function toggle() {
//   loadSurah(surahs[surahIndex]);
//   console.log(surahs[surahIndex]);
//   popUp.classList.toggle('play');
//   barContainer.classList.toggle('play'); //rotate the cover
// }

playBtn.addEventListener('click', () => {
  const isPlaying = barContainer.classList.contains('play');
  if (isPlaying) {
    pauseSurah();
    playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    popUp.classList.remove('play');
    
    audio.pause();
  } else {
    // toggle();
    playSurah()
    playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    popUp.classList.add('play');
    audio.play();
  }
});
function next() {
  audio.currentTime = 0;

  surahIndex++;
  if (surahIndex === surahs.length - 1) surahIndex = 0;
  loadSurah(surahs[surahIndex]);

  playSurah();

  audio.play();
  playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  popUp.classList.add('play');
}
nextBtn.addEventListener('click', next);

function prev() {
  if (surahIndex === 0) surahIndex = surahs.length - 1;
  surahIndex--;
  audio.currentTime = 0;
  loadSurah(surahs[surahIndex]);

  // toggle();
  playSurah();
  audio.play();
  playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  popUp.classList.add('play');
}
prevBtn.addEventListener('click', prev);

function updateProgress(e) {
  // console.log(e.srcElement);
  const { duration, currentTime } = e.srcElement;
  // console.log(duration,currentTime);
  const progressPercent = (currentTime / duration) * 100;
  progressPopUp.style.width = `${progressPercent}%`;
}
//time progress
audio.addEventListener('timeupdate', updateProgress)
function setProgress(e) {
  const width = this.clientWidth;//the width of the bar
  console.log(width);
  //the loaction of cursor on the bar
  const clickX = e.offsetX;
  console.log(clickX);
  audio.currentTime = clickX/width*audio.duration;

}
//chnge the time progress bar
progressPopUpContainer.addEventListener('click',setProgress)


// Song ends
audio.addEventListener('ended', next);