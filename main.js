const timerElement = document.getElementById("timer"),
  startBtn = document.getElementById("start"),
  stopBtn = document.getElementById("stop"),
  timerInput = document.getElementById("timerInput"),
  resetBtn = document.getElementById("reset"),
  timerAudio = document.getElementById("timer-audio");

let interval;

let timerStartMinutes = 5;
let time = timerStartMinutes * 60;

let newMinutes; // initialize newMinutes for update Timer when the user enter new time

// initialize timerAudio to alert the user when the time is up
timerAudio.src = "http://soundbible.com/grab.php?id=1252&type=mp3";
timerAudio.load();

// initialize time to (decrease and show) in timerElement when the user enter time
function timer() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  timerElement.innerHTML = `${minutes < 10 ? minutes : minutes}m
    ${seconds < 10 ? "0" + seconds : seconds}s`;

  time--;

  if (minutes == -1) {
    timerElement.innerHTML = "0m 00s";
    timerInput.value = "";
    timerAudio.play();
  }
}

document.body.addEventListener("load", start);

startBtn.addEventListener("click", start);

stopBtn.addEventListener("click", stop);

resetBtn.addEventListener("click", reset);

timerInput.addEventListener("change", updateTimer);

// function for start timer
function start(event) {
  timerElement.innerHTML = "";
  interval = setInterval(timer, 1000);

  stopBtn.style.display = "block";
  startBtn.style.display = "none";
  timerElement.style.display = "block";
  event.preventDefault();
}

// function for stop timer
function stop() {
  clearInterval(interval);
  stopBtn.style.display = "none";
  startBtn.style.display = "block";
}

// function for reset timer
function reset() {
  clearInterval(interval);
  timerStartMinutes = 5;
  time = timerStartMinutes * 60;
  start();

  newMinutes = parseInt(timerInput.value);
}

// function for updateTimer timer
function updateTimer() {
  stopBtn.style.display = "block";

  newMinutes = parseInt(timerInput.value);

  timerStartMinutes = newMinutes;
  time = timerStartMinutes * 60;
  stop();
  start();
  reset();
}
