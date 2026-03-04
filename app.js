import { CIRCLE_OF_FIFTHS, ORDER_SHARPS, ORDER_FLATS, SCALES } from './data.js';

// Audio context
let audioCtx = null;
let audioEnabled = false;

// Progress (stub IndexedDB)
let progress = { correct: 0, total: 0, enharmonicTolerance: false };

// Keyboard
let keyboardNotes = [];
const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Init
async function init() {
  // Register SW
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }

  // Audio button stub
  document.body.insertAdjacentHTML('afterbegin', '<button id="enable-audio" class="btn btn-primary" style="position:fixed;top:10px;right:10px;">Activer audio</button>');
  document.getElementById('enable-audio').onclick = () => {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    audioEnabled = true;
    document.getElementById('enable-audio').remove();
  };

  buildKeyboard();
  setupEvents();
  showHome();
}

function buildKeyboard() {
  const kb = document.getElementById('keyboard');
  kb.innerHTML = '';
  for (let octave = 0; octave < 4; octave++) {
    for (let i = 0; i < 12; i++) {
      const note = NOTES[i] + octave;
      const key = document.createElement('div');
      key.className = i === 1 || i === 3 || i === 6 || i === 8 || i === 10 ? 'key black' : 'key white';
      key.dataset.note = note;
      key.textContent = NOTES[i];
      key.onclick = () => playNote(note);
      kb.appendChild(key);
    }
  }
}

function playNote(noteName) {
  if (!audioEnabled) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.frequency.value = 440 * Math.pow(2, (noteToMidi(noteName) - 69) / 12);
  gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
  osc.start(audioCtx.currentTime);
  osc.stop(audioCtx.currentTime + 0.5);

  // Highlight
  document.querySelectorAll(`[data-note="${noteName}"]`).forEach(k => k.classList.add('playing'));
  setTimeout(() => k.classList.remove('playing'), 200);
}

function noteToMidi(note) {
  // Stub simple
  return 60; // C4
}

function setupEvents() {
  document.getElementById('btn-quiz').onclick = () => showQuiz();
  document.getElementById('btn-learning').onclick = () => showLearning();
  // Stub more
}

function showHome() {
  document.getElementById('home').style.display = 'block';
  document.getElementById('quiz-area').style.display = 'none';
  document.getElementById('learning-area').style.display = 'none';
}

function showQuiz() {
  document.getElementById('home').style.display = 'none';
  document.getElementById('quiz-area').style.display = 'block';
  document.getElementById('learning-area').style.display = 'none';
  // Stub question
  document.getElementById('question').innerHTML = 'Quiz stub: Clique C majeur sur clavier';
}

function showLearning() {
  document.getElementById('home').style.display = 'none';
  document.getElementById('quiz-area').style.display = 'none';
  document.getElementById('learning-area').style.display = 'block';
  document.getElementById('scale-info').innerHTML = 'Learning stub: Cycle des quintes ' + JSON.stringify(CIRCLE_OF_FIFTHS);
}

init();