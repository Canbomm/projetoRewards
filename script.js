let database = [];
let seconds = 0; // Starts paused
let timerInterval = null;
let isRunning = false;

// Loads database
async function loadData() {
  const response = await fetch('data.json');
  database = await response.json();
  console.log("Database loaded!");
}

// Get random search from data.json and copy it to the clipboard
function randomSearch(resultDisplay) {
  const randomIndex = Math.floor(Math.random() * database.length);
  const randomItem = database[randomIndex];
  resultDisplay.innerText = randomItem.search;
  userClipboard(randomItem.search);
}

// Copy to user's clipboard
function userClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    console.log("Successfully copied to clipboard!");
  }).catch(err => {
    console.error("Failed to copy: ", err);
  });
}

// Changes the suggestion after 8 seconds
function startTimer() {
  const timerDisplay = document.getElementById('timer');
  const resultDisplay = document.getElementById('result');
  const btn = document.getElementById('toggleBtn');

  const runLogic = () => {
    seconds--;
    if (seconds < 1 && database.length > 0) {
      seconds = 8;
      randomSearch(resultDisplay);
      
      resultDisplay.classList.add('animate-pop-out');
      setTimeout(() => {
        resultDisplay.classList.remove('animate-pop-out');
      }, 500);
    }
    timerDisplay.innerText = "Timer: " + seconds;
  };

  // Pause/continue button
  btn.addEventListener('click', () => {
    if (isRunning) {
      clearInterval(timerInterval);
      btn.innerText = "Iniciar"; // Start
    } else {
      timerInterval = setInterval(runLogic, 1000);
      btn.innerText = "Pausar"; // Pause
    }
    isRunning = !isRunning;
  });
}

// Start everything when the page opens
loadData().then(startTimer);
