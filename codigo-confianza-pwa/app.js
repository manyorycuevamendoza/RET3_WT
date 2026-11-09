const CORRECT_CODE = '4870';
let currentScreen = 'screen-welcome';
let enteredCode = '';
let currentBoxIndex = 0;
let callTimerInterval = null;
let callSeconds = 0;
let isProcessing = false;
const pendingTimeouts = new Set();
const advisorAudio = new Audio('assets/audio/clara-codigo-confianza.mp3');

// Cancel pending scene actions whenever the viewer leaves that screen.
function schedule(callback, delay) {
  const timer = setTimeout(() => {
    pendingTimeouts.delete(timer);
    callback();
  }, delay);
  pendingTimeouts.add(timer);
  return timer;
}

function clearSceneActions() {
  pendingTimeouts.forEach(clearTimeout);
  pendingTimeouts.clear();
}

function showScreen(id) {
  const prev = document.getElementById(currentScreen);
  const next = document.getElementById(id);
  if (!next || id === currentScreen) return;

  clearSceneActions();
  prev.classList.remove('active');
  next.classList.add('active');
  currentScreen = id;
}

function navigateWithinBCP(id) {
  const destinations = {
    'screen-bcp-home': 'Abriendo el inicio de BCP',
    'screen-code-entry': 'Abriendo Código Confianza',
  };
  if (!destinations[id] || currentScreen === id || currentScreen === 'screen-app-transition') return;
  document.getElementById('app-transition-label').textContent = destinations[id];
  showScreen('screen-app-transition');
  schedule(() => showScreen(id), 1000);
}

function startDemo() {
  resetDemo();
  updateClock();
  document.querySelector('.lockscreen').classList.remove('notification-departing');
  document.getElementById('notification-continue').disabled = true;
  document.getElementById('notification-tap-hint').classList.remove('show');
  showScreen('screen-notification');
  const push = document.getElementById('push-notif');
  if (push) {
    push.classList.remove('show');
    schedule(() => {
      push.classList.add('show');
      document.getElementById('notification-continue').disabled = false;
      document.getElementById('notification-tap-hint').classList.add('show');
      vibrate(30);
    }, 800);
  }
}

function continueAfterNotification() {
  const button = document.getElementById('notification-continue');
  if (currentScreen !== 'screen-notification' || button.disabled) return;
  button.disabled = true;
  document.querySelector('.lockscreen').classList.add('notification-departing');
  schedule(() => {
    showScreen('screen-time-passage');
    schedule(acceptCall, 4200);
  }, 350);
}

function updateClock() {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, '0');
  const m = now.getMinutes().toString().padStart(2, '0');
  const el = document.getElementById('lock-time');
  if (el) el.textContent = `${h}:${m}`;

  const days = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  const months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  const dateEl = document.getElementById('lock-date');
  if (dateEl) dateEl.textContent = `${days[now.getDay()]} ${now.getDate()} de ${months[now.getMonth()]}`;
}

function acceptCall() {
  vibrate(50);
  showScreen('screen-call');
  schedule(() => {
    const ring = document.querySelector('.call-btn-accept');
    if (ring) ring.style.animation = 'pulse-dot 0.8s infinite';
  }, 300);
}

function declineCall() {
  vibrate(30);
  showScreen('screen-call-declined');
  schedule(() => startWhatsAppFlow(), 2200);
}

function startWhatsAppFlow() {
  resetWhatsAppFlow();
  showScreen('screen-whatsapp');

  const typing = document.getElementById('wa-typing');
  const status = document.getElementById('wa-status');

  typing.classList.add('show');
  status.textContent = 'escribiendo…';

  schedule(() => {
    typing.classList.remove('show');
    status.textContent = 'en línea';
    document.getElementById('wa-msg-1').hidden = false;
    vibrate(20);
  }, 1800);

  schedule(() => {
    document.getElementById('wa-msg-2').hidden = false;
    vibrate(20);
  }, 3400);

  schedule(() => {
    status.textContent = 'escribiendo…';
  }, 4100);

  schedule(() => {
    status.textContent = 'en línea';
    document.getElementById('wa-msg-3').hidden = false;
    document.getElementById('wa-footer').hidden = false;
    vibrate(20);
  }, 5400);
}

function resetWhatsAppFlow() {
  const typing = document.getElementById('wa-typing');
  if (typing) typing.classList.remove('show');
  const status = document.getElementById('wa-status');
  if (status) status.textContent = 'en línea';
  ['wa-msg-1', 'wa-msg-2', 'wa-msg-3'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.hidden = true;
  });
  const footer = document.getElementById('wa-footer');
  if (footer) footer.hidden = true;
}

function answerCall() {
  vibrate(50);
  showScreen('screen-active-call');
  startCallTimer();
  document.getElementById('return-to-app').hidden = true;
  document.getElementById('call-continue').hidden = false;
  document.getElementById('call-continue').disabled = true;
  document.getElementById('call-tap-hint').classList.remove('show');
  const bubble = document.getElementById('advisor-bubble');
  bubble.classList.remove('show');
  document.querySelectorAll('.code-digit-reveal').forEach(el => el.textContent = '');
  schedule(() => {
    bubble.classList.add('show');
    advisorAudio.currentTime = 0;
    advisorAudio.play().catch(() => {});
  }, 1500);
  revealCode();
  // Let the viewer continue right after the 4th digit settles, without waiting for
  // Clara's "Repito..." (the audio keeps playing in the background either way).
  schedule(() => {
    document.getElementById('call-continue').disabled = false;
    document.getElementById('call-tap-hint').classList.add('show');
  }, 17300);
}

function continueFromAdvisor() {
  const button = document.getElementById('call-continue');
  if (currentScreen !== 'screen-active-call' || button.disabled || button.hidden) return;
  button.disabled = true;
  button.hidden = true;
  document.getElementById('call-tap-hint').classList.remove('show');
  advisorAudio.pause();
  showScreen('screen-opening-app');
  schedule(openBCPApp, 4000);
}

function startCallTimer() {
  callSeconds = 0;
  document.getElementById('call-timer').textContent = '00:00';
  clearInterval(callTimerInterval);
  callTimerInterval = setInterval(() => {
    callSeconds++;
    const m = Math.floor(callSeconds / 60).toString().padStart(2, '0');
    const s = (callSeconds % 60).toString().padStart(2, '0');
    const el = document.getElementById('call-timer');
    if (el) el.textContent = `${m}:${s}`;
  }, 1000);
}

function revealCode() {
  const digits = ['4', '8', '7', '0'];
  const ids = ['cd1', 'cd2', 'cd3', 'cd4'];
  // Audio starts at 1500ms. Exact per-digit timestamps from ElevenLabs alignment
  // (scripts/generate-audio.mjs), offset by that 1500ms audio start delay.
  const AUDIO_START_DELAY = 1500;
  const DIGIT_TIMES_MS = [13305, 13920, 14489, 15174];
  ids.forEach((id, i) => {
    schedule(() => {
      const el = document.getElementById(id);
      if (el) {
        el.textContent = digits[i];
        el.style.transform = 'scale(1.15)';
        el.style.transition = 'transform 0.15s ease-out';
        vibrate(20);
        schedule(() => {
          el.style.transform = 'scale(1)';
        }, 150);
      }
    }, AUDIO_START_DELAY + DIGIT_TIMES_MS[i]);
  });
}

function openBCPApp() {
  document.getElementById('call-continue').hidden = true;
  document.getElementById('call-tap-hint').classList.remove('show');
  document.getElementById('return-to-app').hidden = false;
  vibrate(30);
  showScreen('screen-bcp-home');
}

function openCodigoConfianza() {
  vibrate(30);
  enteredCode = '';
  currentBoxIndex = 0;
  isProcessing = false;

  const boxes = document.querySelectorAll('.code-box');
  boxes.forEach(box => {
    box.textContent = '';
    box.className = 'code-box';
  });

  const codeBoxes = document.getElementById('code-boxes');
  if (codeBoxes) codeBoxes.classList.remove('shake');

  if (boxes[0]) boxes[0].classList.add('focused');

  navigateWithinBCP('screen-code-entry');
}

function pressKey(digit) {
  if (currentBoxIndex >= 4 || isProcessing) return;

  vibrate(15);

  const box = document.getElementById(`box-${currentBoxIndex}`);
  if (!box) return;

  box.textContent = digit;
  box.className = 'code-box filled pop';
  enteredCode += digit;
  currentBoxIndex++;

  if (currentBoxIndex < 4) {
    const nextBox = document.getElementById(`box-${currentBoxIndex}`);
    if (nextBox) nextBox.classList.add('focused');
  }

  if (currentBoxIndex === 4) {
    isProcessing = true;
    schedule(() => validateCode(), 300);
  }
}

function pressDelete() {
  if (currentBoxIndex <= 0 || isProcessing) return;

  vibrate(10);
  currentBoxIndex--;
  const box = document.getElementById(`box-${currentBoxIndex}`);
  if (box) {
    box.textContent = '';
    box.className = 'code-box focused';
  }

  if (currentBoxIndex < 3) {
    const nextBox = document.getElementById(`box-${currentBoxIndex + 1}`);
    if (nextBox) nextBox.classList.remove('focused');
  }

  enteredCode = enteredCode.slice(0, -1);
}

function validateCode() {
  if (enteredCode === CORRECT_CODE) {
    const boxes = document.querySelectorAll('.code-box');
    boxes.forEach(box => {
      box.className = 'code-box success';
    });
    vibrate([50, 30, 50]);

    schedule(() => {
      showScreen('screen-success');
    }, 600);
  } else {
    const boxes = document.querySelectorAll('.code-box');
    boxes.forEach(box => {
      box.className = 'code-box error';
    });

    const codeBoxes = document.getElementById('code-boxes');
    if (codeBoxes) {
      codeBoxes.classList.add('shake');
    }

    vibrate([100, 30, 100, 30, 100]);

    schedule(() => {
      if (codeBoxes) codeBoxes.classList.remove('shake');
      showScreen('screen-unverified');
      document.getElementById('unverified-title').focus();
    }, 450);
  }
}

function correctCallCode() {
  openCodigoConfianza();
}

function resetDemo() {
  clearSceneActions();
  advisorAudio.pause();
  advisorAudio.currentTime = 0;
  document.getElementById('call-continue').hidden = true;
  document.getElementById('call-continue').disabled = true;
  document.getElementById('call-tap-hint').classList.remove('show');
  document.getElementById('return-to-app').hidden = true;
  document.getElementById('call-timer').textContent = '00:00';
  clearInterval(callTimerInterval);
  callSeconds = 0;
  enteredCode = '';
  currentBoxIndex = 0;
  isProcessing = false;

  const revealDigits = ['cd1','cd2','cd3','cd4'];
  revealDigits.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
  });

  const bubble = document.getElementById('advisor-bubble');
  if (bubble) bubble.classList.remove('show');

  const pushNotif = document.getElementById('push-notif');
  if (pushNotif) pushNotif.classList.remove('show');

  resetWhatsAppFlow();

  showScreen('screen-welcome');
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('visible');
  schedule(() => toast.classList.remove('visible'), 1500);
}

function vibrate(pattern) {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
  }
}
