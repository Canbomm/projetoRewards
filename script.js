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
  return randomItem.search;
}

// Copy to user's clipboard
function userClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    console.log("Successfully copied to clipboard!");
  }).catch(err => {
    console.error("Failed to copy: ", err);
  });
}

// Small notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    setTimeout(() => {
      toast.innerText = '‎';
    }, 1000);
}

// Changes the suggestion after 8 seconds
function startTimer() {
  const timerDisplay = document.getElementById('timer');
  const resultDisplay = document.getElementById('result');
  const pausebtn = document.getElementById('toggleBtn');
  const searchbtn = document.getElementById('result');

  const runLogic = () => {
    seconds--;
    if (seconds < 1 && database.length > 0) {
      seconds = 8;
      searchbtn.innerText = randomSearch(resultDisplay);
      
      resultDisplay.classList.add('animate-pop-out');
      setTimeout(() => {
        resultDisplay.classList.remove('animate-pop-out');
      }, 500);
    }
    timerDisplay.innerText = "Timer: " + seconds;
  };

  // Pause/continue button
  pausebtn.addEventListener('click', () => {
    if (isRunning) {
      clearInterval(timerInterval);
      pausebtn.innerText = "Iniciar"; // Start
    } else {
      timerInterval = setInterval(runLogic, 1000);
      pausebtn.innerText = "Pausar"; // Pause
    }
    isRunning = !isRunning;
  });

  // Manual copy search
  searchbtn.addEventListener('click', () => {
    userClipboard(searchbtn.innerText);
    showToast("Copiado!");
  });
}

// Start everything when the page opens
loadData().then(startTimer);
