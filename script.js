const siteCopy = JSON.parse(document.getElementById("siteCopy").textContent);

function formatCopy(template, values = {}) {
  const replacements = { name: playerName, ...values };
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    Object.prototype.hasOwnProperty.call(replacements, key) ? replacements[key] : match
  );
}

const introLoveButton = document.querySelector(".intro-ad-btn");
const introLoveMessage = document.getElementById("introLoveMessage");
if (introLoveButton && introLoveMessage) {
  introLoveButton.addEventListener("click", () => {
    introLoveMessage.textContent = siteCopy.introLoveMessage;
    introLoveMessage.hidden = false;
    introLoveButton.setAttribute("aria-expanded", "true");
  });
}

const playerBirthdayField = document.getElementById("playerBirthday");
const birthdayError = document.getElementById("birthdayError");
if (playerBirthdayField && birthdayError) {
  playerBirthdayField.addEventListener("input", () => {
    birthdayError.hidden = true;
    birthdayError.textContent = "";
    playerBirthdayField.removeAttribute("aria-invalid");
  });
}

function toggleLongNote() {
  const note = document.getElementById("longNote");
  const noteNextContainer = document.getElementById("noteNextContainer");
  note.classList.toggle("active");
  if (noteNextContainer) {
    noteNextContainer.style.display = note.classList.contains("active") ? "block" : "none";
  }
}

let playerName = "";

function startEnvelope() {
  const playerNameField = document.getElementById("playerName");
  const playerNameInput = playerNameField.value.trim();
  const playerBirthdayInput = playerBirthdayField.value;

  birthdayError.hidden = true;
  birthdayError.textContent = "";
  playerBirthdayField.removeAttribute("aria-invalid");

  if (!playerNameInput) {
    alert(siteCopy.validation.nameRequired);
    return;
  }
  if (!playerBirthdayInput) {
    alert(siteCopy.validation.birthdayRequired);
    playerBirthdayField.focus();
    return;
  }
  if (playerBirthdayInput !== "2005-08-30") {
    birthdayError.textContent = siteCopy.validation.birthdayIncorrect;
    birthdayError.hidden = false;
    playerBirthdayField.setAttribute("aria-invalid", "true");
    playerBirthdayField.focus();
    alert(siteCopy.validation.birthdayIncorrect);
    return;
  }
  
  playerName = playerNameInput;
  
  const paperEl = document.getElementById("paper");
  if (paperEl) {
    const paperText = document.createElement("p");
    paperText.textContent = formatCopy(siteCopy.paper, { name: playerName });
    paperEl.replaceChildren(paperText);
  }
  
  // Update meter label with player name
  const meterLabel = document.querySelector(".meter-label");
  if (meterLabel) {
    meterLabel.textContent = formatCopy(siteCopy.meterLabel, { name: playerName });
  }
  
  const finalMessage = document.getElementById("finalMessage");
  if (finalMessage) {
    finalMessage.textContent = formatCopy(siteCopy.finalMessage, { name: playerName });
  }
  
  const introPage = document.getElementById("introPage");
  const envelopeTitle = document.querySelector(".envelope-title");
  const envelopeSection = document.querySelector(".envelope-section");
  if (introPage) introPage.style.display = "none";
  if (envelopeTitle) envelopeTitle.style.display = "block";
  if (envelopeSection) envelopeSection.style.display = "block";
  setTimeout(() => {
    if (envelopeSection) envelopeSection.scrollIntoView({ behavior: "smooth" });
  }, 100);
}
function openLetter() {
  const envelope = document.querySelector(".envelope");
  if (envelope) envelope.classList.add("open");
  const letterPageKicker = document.getElementById("letterPageKicker");
  if (letterPageKicker) letterPageKicker.classList.add("is-fading");
}

const noBtn = document.getElementById("noBtn");
let noClickCount = 0;
let lockInteractionInitialized = false;
function answerYes() {
  const buttonContainer = document.getElementById("buttonContainer");
  const envelope = document.querySelector(".envelope");
  envelope.classList.add("open");
  const letterPageKicker = document.getElementById("letterPageKicker");
  if (letterPageKicker) letterPageKicker.classList.add("is-fading");
  buttonContainer.style.display = "none";
  const yesBtn = buttonContainer.querySelector(".yes-btn");
  if (yesBtn) yesBtn.style.display = "none";
  const nextContainer = document.getElementById("nextContainer");
  nextContainer.style.display = "block";
  for (let i = 0; i < 10; i++) {
    createConfetti();
  }
}

function showContent() {
  const noteContainer = document.getElementById("noteContainer");
  const nextContainer = document.getElementById("nextContainer");
  const envelopeSection = document.querySelector(".envelope-section");
  const envelopeTitle = document.querySelector(".envelope-title");
  const noteNextContainer = document.getElementById("noteNextContainer");
  const finalContent = document.getElementById("finalContent");
  const movieGallery = document.getElementById('movieGallery');
  nextContainer.style.display = 'none';
  if (envelopeSection) envelopeSection.style.display = 'none';
  if (envelopeTitle) envelopeTitle.style.display = 'none';
  if (noteNextContainer) noteNextContainer.style.display = 'none';
  if (finalContent) finalContent.style.display = 'none';
  if (movieGallery) movieGallery.style.display = 'none';
  noteContainer.style.display = "block";
  setTimeout(() => {
    noteContainer.scrollIntoView({ behavior: "smooth" });
  }, 100);
}

function showFinalContent() {
  const noteContainer = document.getElementById("noteContainer");
  const noteNextContainer = document.getElementById("noteNextContainer");
  const finalContent = document.getElementById("finalContent");
  const movieGallery = document.getElementById("movieGallery");
  const lastPage = document.getElementById("lastPage");
  const newPage = document.getElementById("newPage");
  const visualNovel = document.getElementById("visualNovel");
  const errorEnding = document.getElementById("errorEnding");
  if (noteNextContainer) noteNextContainer.style.display = "none";
  if (noteContainer) noteContainer.style.display = "none";
  if (movieGallery) movieGallery.style.display = "none";
  if (lastPage) lastPage.style.display = "none";
  if (newPage) newPage.style.display = "none";
  if (visualNovel) visualNovel.style.display = "none";
  if (errorEnding) errorEnding.style.display = "none";
  document.body.classList.remove("error-ending-active");
  if (finalContent) finalContent.style.display = "block";
  startCatMessageRotation();
  setTimeout(() => {
    if (finalContent) finalContent.scrollIntoView({ behavior: "smooth" });
  }, 100);
}

let loveIndex = 0;
let catMessageTimer = null;
const customCatMessages = siteCopy.catMessages;

function startCatMessageRotation() {
  const finalMessage = document.getElementById("finalMessage");
  if (!finalMessage) return;

  if (catMessageTimer) clearInterval(catMessageTimer);
  loveIndex = 0;
  finalMessage.textContent = customCatMessages[loveIndex];
  loveIndex = (loveIndex + 1) % customCatMessages.length;
  catMessageTimer = setInterval(() => {
    finalMessage.textContent = customCatMessages[loveIndex];
    loveIndex = (loveIndex + 1) % customCatMessages.length;
  }, 3000);
}

function revealLoveMessage() {
  const finalMessage = document.getElementById("finalMessage");
  if (!finalMessage) return;
  finalMessage.textContent = customCatMessages[loveIndex];
  loveIndex = (loveIndex + 1) % customCatMessages.length;
  createConfetti();
}

function showRomanticIdea() {
  const gameArea = document.getElementById("gameArea");
  const ideaNote = document.getElementById("ideaNote");
  const meterBar = document.getElementById("meterBar");
  const meterPercentage = document.getElementById("meterPercentage");
  const lockSection = document.getElementById("lockSection");
  const lockBox = document.getElementById("lockBox");
  const lockResult = document.getElementById("lockResult");
  const unlockNextContainer = document.getElementById("unlockNextContainer");
  if (!gameArea || !ideaNote || !meterBar || !meterPercentage || !lockSection || !lockBox || !lockResult || !unlockNextContainer) return;
  gameArea.innerHTML = "";
  meterBar.style.width = "0%";
  meterPercentage.textContent = "0%";
  lockSection.style.display = "none";
  unlockNextContainer.style.display = "none";
  lockBox.textContent = "🔒";
  gameArea.style.display = "block";
  ideaNote.classList.add("active");
  createLoveGameHearts(10);
}

function createLoveGameHearts(amount) {
  const gameArea = document.getElementById("gameArea");
  const ideaNote = document.getElementById("ideaNote");
  const meterBar = document.getElementById("meterBar");
  const meterPercentage = document.getElementById("meterPercentage");
  const lockSection = document.getElementById("lockSection");
  const keyIcon = document.getElementById("keyIcon");
  const lockBox = document.getElementById("lockBox");
  const lockResult = document.getElementById("lockResult");
  if (!gameArea || !ideaNote || !meterBar || !meterPercentage || !lockSection || !keyIcon || !lockBox || !lockResult) return;
  let caught = 0;
  const target = amount;
  lockSection.style.display = "none";
  keyIcon.style.opacity = "1";
  keyIcon.style.pointerEvents = "auto";
  lockBox.textContent = "🔒";
  lockResult.textContent = siteCopy.loveGame.lockPrompt;
  const updateStatus = () => {
    meterBar.style.width = `${caught * 10}%`;
    meterPercentage.textContent = `${caught * 10}%`;
    if (caught === target) {
      ideaNote.textContent = formatCopy(siteCopy.loveGame.unlocked);
      gameArea.style.display = "none";
      const lockSection = document.getElementById("lockSection");
      if (lockSection) lockSection.style.display = "flex";
      createConfetti();
    } else {
      ideaNote.textContent = formatCopy(siteCopy.loveGame.caught, { caught, target });
    }
  };
  updateStatus();
  gameArea.innerHTML = "";
  for (let i = 0; i < amount; i++) {
    const heart = document.createElement("div");
    heart.className = "game-heart";
    heart.innerHTML = `<img src="assets/${["pastel-bow.svg","pastel-flower.svg","pastel-star.svg","pastel-strawberry.svg","pastel-sparkle.svg"][i%5]}" alt="" style="width:100%;height:100%;object-fit:contain">`;
    heart.style.left = Math.random() * 70 + 10 + "%";
    heart.style.top = Math.random() * 60 + 10 + "%";
    heart.addEventListener("click", () => {
      if (caught >= target) return;
      caught += 1;
      heart.remove();
      updateStatus();
      createConfetti();
    });
    gameArea.appendChild(heart);
  }
  setupLockInteraction();
}

function setupLockInteraction() {
  if (lockInteractionInitialized) return;
  const lockBox = document.getElementById("lockBox");
  const keyIcon = document.getElementById("keyIcon");
  const lockResult = document.getElementById("lockResult");
  if (!lockBox || !keyIcon || !lockResult) return;
  keyIcon.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", "key");
  });
  lockBox.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
  lockBox.addEventListener("drop", (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    if (data === "key" && lockBox.textContent === "🔒") {
      lockBox.textContent = "🔓";
      keyIcon.style.opacity = "0.4";
      keyIcon.style.pointerEvents = "none";
      document.getElementById("passwordHint").hidden = false;
      const unlockNextContainer = document.getElementById("unlockNextContainer");
      if (unlockNextContainer) unlockNextContainer.style.display = "block";
      createConfetti();
    }
  });
  lockInteractionInitialized = true;
}

function showPasswordPage() {
  const unlockNextContainer = document.getElementById("unlockNextContainer");
  if (!unlockNextContainer) return;
  unlockNextContainer.style.display = "none";
  document.getElementById("finalContent").style.display = "none";
  document.getElementById("passwordPage").style.display = "flex";
  document.getElementById("passwordPage").scrollIntoView({ behavior: "smooth" });
  document.getElementById("secretPassword").focus();
}

function submitPassword() {
  const passwordInput = document.getElementById("secretPassword");
  const passwordError = document.getElementById("passwordError");
  if (passwordInput.value.trim().toLocaleLowerCase() !== "pipi pie") {
    passwordError.textContent = siteCopy.passwordIncorrect;
    passwordInput.focus();
    return;
  }

  passwordError.textContent = "";
  document.getElementById("passwordPage").style.display = "none";
  createConfetti();
  openNewPage();
}

let timeLeft = 7;
let quizTimer = null;

function openNewPage() {
  if (catMessageTimer) {
    clearInterval(catMessageTimer);
    catMessageTimer = null;
  }

  const elementsToHide = ['noteContainer', 'finalContent', 'passwordPage'];
  elementsToHide.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  
  const newPage = document.getElementById('newPage');
  const movieGallery = document.getElementById('movieGallery');
  if (movieGallery) movieGallery.style.display = 'none';
  if (newPage) {
    newPage.style.display = 'block';
    newPage.scrollIntoView({ behavior: 'smooth' });
  }
  
  setTimeout(() => startMemoryGame(), 250);
}

function showMovieGallery() {
  const newPage = document.getElementById('newPage');
  const movieGallery = document.getElementById('movieGallery');
  const lastPage = document.getElementById('lastPage');
  if (newPage) newPage.style.display = 'none';
  if (lastPage) lastPage.style.display = 'none';
  if (movieGallery) {
    movieGallery.style.display = 'block';
    movieGallery.scrollIntoView({ behavior: 'smooth' });
  }
}

function showLastPage() {
  const movieGallery = document.getElementById('movieGallery');
  const lastPage = document.getElementById('lastPage');
  if (movieGallery) movieGallery.style.display = 'none';
  if (lastPage) {
    lastPage.style.display = 'block';
    lastPage.scrollIntoView({ behavior: 'smooth' });
  }
}

let waitingTimer = null;
let waitingShown = false;

function startQuizTimer() {
  stopQuizTimer();
  timeLeft = 7;
  waitingShown = false;
  const timerDisplay = document.getElementById('gameTimer');
  
  if (timerDisplay) {
    timerDisplay.textContent = formatCopy(siteCopy.quiz.timer, { seconds: timeLeft });
  }
  
  quizTimer = setInterval(() => {
    timeLeft--;
    if (timerDisplay) {
      timerDisplay.textContent = formatCopy(siteCopy.quiz.timer, { seconds: timeLeft });
    }
    
    if (timeLeft <= 0) {
      stopQuizTimer();
      triggerBadEnding();
    }
  }, 1000);
  
  waitingTimer = setTimeout(() => {
    if (!waitingShown) {
      waitingShown = true;
      const vnChoices = document.getElementById('vnChoices');
      if (vnChoices) {
        const existingWaiting = vnChoices.querySelector('.waiting-text');
        if (!existingWaiting) {
          const waitingText = document.createElement('div');
          waitingText.className = 'waiting-text';
          waitingText.textContent = formatCopy(siteCopy.quiz.waiting);
          waitingText.style.cssText = 'color: #ff1493; font-size: 1rem; margin-top: 10px; font-style: italic; animation: pulse 1s infinite;';
          vnChoices.appendChild(waitingText);
        }
      }
    }
  }, 3000);
}

function stopQuizTimer() {
  if (quizTimer) {
    clearInterval(quizTimer);
    quizTimer = null;
  }
  if (waitingTimer) {
    clearTimeout(waitingTimer);
    waitingTimer = null;
  }
}

function triggerBadEnding() {
  wrongAnswers++;
  endVisualNovel();
}

const backgroundAudio = document.getElementById("backgroundAudio");
const audioToggle = document.getElementById("audioToggle");
const audioStatus = document.getElementById("audioStatus");

function updateAudioButton(isPlaying) {
  if (!audioToggle) return;
  audioToggle.classList.toggle("is-playing", isPlaying);
  audioToggle.setAttribute("aria-pressed", String(isPlaying));
  audioToggle.setAttribute("aria-label", isPlaying ? "Jeda musik" : "Putar musik");
  const playIcon = audioToggle.querySelector(".audio-play-icon");
  const pauseIcon = audioToggle.querySelector(".audio-pause-icon");
  if (playIcon) playIcon.hidden = isPlaying;
  if (pauseIcon) pauseIcon.hidden = !isPlaying;
}

if (backgroundAudio) {
  backgroundAudio.addEventListener("play", () => updateAudioButton(true));
  backgroundAudio.addEventListener("pause", () => updateAudioButton(false));
}

function toggleAudio() {
  if (!backgroundAudio || !audioStatus) return;
  if (backgroundAudio.paused) {
    audioStatus.hidden = true;
    audioStatus.textContent = "";
    backgroundAudio.play().catch(error => {
      updateAudioButton(false);
      audioStatus.textContent = "gabisa muter kayanya error :(";
      audioStatus.hidden = false;
      console.error("Background music could not be played:", error);
    });
  } else {
    backgroundAudio.pause();
  }
}

function animateLoveMeter(targetPercent) {
  const meterBar = document.getElementById("meterBar");
  const meterPercentage = document.getElementById("meterPercentage");
  if (!meterBar || !meterPercentage) return;
  let current = 0;
  const step = 5;
  const interval = setInterval(() => {
    if (current >= targetPercent) {
      current = targetPercent;
      clearInterval(interval);
    }
    meterBar.style.width = `${current}%`;
    meterPercentage.textContent = `${current}%`;
    current += step;
  }, 70);
}

function createConfetti() {
  const confetti = document.createElement("div");
  const stickers = ["pastel-bow.svg", "pastel-flower.svg", "pastel-star.svg", "pastel-cloud.svg", "pastel-sparkle.svg"];
  confetti.innerHTML = `<img src="assets/${stickers[Math.floor(Math.random() * stickers.length)]}" alt="" style="width:100%;height:100%;object-fit:contain">`;
  confetti.style.position = "fixed";
  confetti.style.width = (Math.random() * 14 + 28) + "px";
  confetti.style.height = confetti.style.width;
  confetti.style.left = Math.random() * 100 + "vw";
  confetti.style.top = Math.random() * 100 + "vh";
  confetti.style.pointerEvents = "none";
  confetti.style.zIndex = "1999";
  confetti.style.opacity = "0";
  document.body.appendChild(confetti);
  const duration = Math.random() * 0.8 + 1.1;
  const startTime = Date.now();
  const angle = Math.random() * Math.PI * 2;
  const velocity = Math.random() * 65 + 35;
  const animate = () => {
    const elapsed = (Date.now() - startTime) / 1000;
    const progress = Math.min(elapsed / duration, 1);
    const distance = velocity * progress;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    let opacity;
    if (progress < 0.35) {
      opacity = progress / 0.35;
    } else {
      opacity = Math.pow(1 - (progress - 0.35) / 0.65, 2);
    }
    const rotation = progress * 360;
    confetti.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
    confetti.style.opacity = opacity;
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      confetti.remove();
    }
  };
  animate();
}

function answerNo() {
  noClickCount++;
  const yesBtn = document.querySelector("#buttonContainer .yes-btn");
  if (!yesBtn || !noBtn) return;
  yesBtn.style.setProperty("--yes-button-scale", Math.pow(1.2, noClickCount));
  yesBtn.classList.add("is-growing");

  const rect = noBtn.getBoundingClientRect();
  const margin = 16;
  const maxLeft = Math.max(margin, window.innerWidth - rect.width - margin);
  const maxTop = Math.max(margin, window.innerHeight - rect.height - margin);
  let left = margin;
  let top = margin;
  for (let attempt = 0; attempt < 8; attempt++) {
    left = margin + Math.random() * (maxLeft - margin);
    top = margin + Math.random() * (maxTop - margin);
    if (Math.hypot(left - rect.left, top - rect.top) > 120) break;
  }
  noBtn.style.position = "fixed";
  noBtn.style.left = `${left}px`;
  noBtn.style.top = `${top}px`;
  noBtn.style.zIndex = "10";
}

let currentScene = 0;
let wrongAnswers = 0;
let visualNovelFinished = false;
const scenes = siteCopy.quiz.scenes;

function startVisualNovel() {
  const noteContainer = document.getElementById("noteContainer");
  const visualNovel = document.getElementById("visualNovel");
  if (noteContainer) noteContainer.style.display = "none";
  visualNovel.style.display = "flex";
  currentScene = 0;
  wrongAnswers = 0;
  visualNovelFinished = false;
  showScene();
  visualNovel.scrollIntoView({ behavior: "smooth" });
}

function showScene() {
  const vnText = document.getElementById("vnText");
  const vnChoices = document.getElementById("vnChoices");
  const scene = scenes[currentScene];
  const vnCharacter = document.getElementById("vnCharacter");
  if (vnCharacter) vnCharacter.textContent = siteCopy.quiz.character;
  vnText.textContent = formatCopy(scene.text);
  vnChoices.innerHTML = "";
  
  startQuizTimer();
  
  scene.choices.forEach(choice => {
    const button = document.createElement("button");
    button.className = "vn-choice";
    button.textContent = formatCopy(choice.text);
    button.addEventListener("click", () => {
      if (visualNovelFinished) return;
      stopQuizTimer();
      if (!choice.correct) {
        wrongAnswers++;
        endVisualNovel();
        return;
      }
      if (currentScene === scenes.length - 1) {
        endVisualNovel();
      } else {
        currentScene++;
        showScene();
      }
    });
    vnChoices.appendChild(button);
  });
}

function endVisualNovel() {
  if (visualNovelFinished) return;
  visualNovelFinished = true;
  stopQuizTimer();
  const visualNovel = document.getElementById("visualNovel");
  visualNovel.style.display = "none";
  if (wrongAnswers >= 1) {
    document.getElementById("errorEndingMessage").textContent = `> ${formatCopy(siteCopy.badEnding, { name: playerName })}`;
    document.getElementById("errorEnding").style.display = "flex";
    document.body.classList.add("error-ending-active");
    document.getElementById("errorEnding").scrollIntoView({ behavior: "smooth" });
    return;
  }
  showFinalContent();
}
const memoryDeck = [
  {name:"bow", src:"assets/pastel-bow.svg"}, {name:"flower", src:"assets/pastel-flower.svg"},
  {name:"star", src:"assets/pastel-star.svg"}, {name:"strawberry", src:"assets/pastel-strawberry.svg"},
  {name:"cloud", src:"assets/pastel-cloud.svg"}, {name:"moon", src:"assets/pastel-moon.svg"}
];
let memoryFirst=null, memoryLock=false, memoryFound=0, memoryMoves=0;
function startMemoryGame(){
  const grid=document.getElementById("memoryGrid"); if(!grid)return;
  memoryFirst=null; memoryLock=false; memoryFound=0; memoryMoves=0;
  document.getElementById("memoryPairs").textContent="0"; document.getElementById("memoryMoves").textContent="0";
  document.getElementById("memoryMessage").textContent=formatCopy(siteCopy.memory.start, { name: playerName });
  const deck=[...memoryDeck,...memoryDeck].sort(()=>Math.random()-0.5); grid.innerHTML="";
  deck.forEach((item,index)=>{const card=document.createElement("button");card.type="button";card.className="memory-card";card.setAttribute("aria-label",siteCopy.memory.hiddenCard);card.dataset.name=item.name;card.innerHTML=`<span class="memory-card-back">✿</span><img src="${item.src}" alt="${item.name}"/>`;card.addEventListener("click",()=>flipMemoryCard(card));grid.appendChild(card);});
}
function flipMemoryCard(card){
  if(memoryLock||card.classList.contains("is-open")||card.classList.contains("is-matched"))return;
  card.classList.add("is-open"); card.setAttribute("aria-label",card.dataset.name);
  if(!memoryFirst){memoryFirst=card;return;}
  memoryMoves++; document.getElementById("memoryMoves").textContent=memoryMoves;
  if(memoryFirst.dataset.name===card.dataset.name){memoryFirst.classList.add("is-matched");card.classList.add("is-matched");memoryFound++;document.getElementById("memoryPairs").textContent=memoryFound;memoryFirst=null;
    if(memoryFound===6){document.getElementById("memoryMessage").textContent=formatCopy(siteCopy.memory.allFound, { name: playerName });setTimeout(showMovieGallery,900);}else{document.getElementById("memoryMessage").textContent=formatCopy(siteCopy.memory.match, { name: playerName });}
  }else{memoryLock=true;const first=memoryFirst;memoryFirst=null;document.getElementById("memoryMessage").textContent=formatCopy(siteCopy.memory.noMatch, { name: playerName });setTimeout(()=>{first.classList.remove("is-open");card.classList.remove("is-open");memoryLock=false;},750);}
}
function returnToIntro(){
  stopQuizTimer(); if(catMessageTimer){clearInterval(catMessageTimer);catMessageTimer=null;}
  ["introPage","errorEnding","passwordPage","visualNovel","newPage","movieGallery","lastPage"].forEach(id=>{const el=document.getElementById(id);if(el)el.style.display="none";});
  const intro=document.getElementById("introPage"); if(intro){intro.style.display="flex";intro.scrollIntoView({behavior:"smooth",block:"start"});}
  const form=document.getElementById("introForm"),ad=document.getElementById("introAd"); if(form){form.classList.add("is-visible");form.style.removeProperty("display");} if(ad){ad.hidden=false;ad.classList.remove("is-hidden");}
  const name=document.getElementById("playerName"),birthday=document.getElementById("playerBirthday");if(name)name.value="";if(birthday)birthday.value="";
}
(function(){const choices=["pastel-bow.svg","pastel-flower.svg","pastel-star.svg","pastel-cloud.svg","pastel-moon.svg","pastel-sparkle.svg","pastel-bunny.svg","pastel-envelope.svg"];let n=0;document.addEventListener("pointerdown",e=>{if(e.target.closest("input,textarea,select,[type=range]"))return;const layer=document.getElementById("tap-sparkles");if(!layer)return;const img=document.createElement("img");img.src="assets/"+choices[n++%choices.length];img.className="tap-sticker-pop";img.alt="";const jitter=()=>Math.round(Math.random()*10-5);img.style.left=(e.clientX+jitter())+"px";img.style.top=(e.clientY+jitter())+"px";img.style.setProperty("--sticker-tilt",(Math.random()*26-13)+"deg");layer.appendChild(img);setTimeout(()=>img.remove(),950);});})();

document.addEventListener("DOMContentLoaded",()=>{const restart=document.getElementById("memoryRestart");if(restart)restart.addEventListener("click",startMemoryGame);});

(() => {
  const pageSelectors = [
    "#introPage", ".envelope-section", "#nextContainer", "#noteContainer",
    "#noteNextContainer", "#finalContent",
    "#passwordPage", "#newPage", "#movieGallery", "#lastPage",
    "#visualNovel", "#errorEnding"
  ];
  const pages = pageSelectors.map(selector => document.querySelector(selector)).filter(Boolean);
  const observer = new MutationObserver(entries => {
    entries.forEach(({ target }) => {
      if (getComputedStyle(target).display === "none") return;
      target.classList.remove("page-transition-enter");
      void target.offsetWidth;
      target.classList.add("page-transition-enter");
      window.setTimeout(() => target.classList.remove("page-transition-enter"), 650);
    });
  });

  pages.forEach(page => {
    observer.observe(page, { attributes: true, attributeFilter: ["style"] });
    page.addEventListener("animationend", event => {
      if (event.animationName === "pageTransitionEnter") {
        page.classList.remove("page-transition-enter");
      }
    });
  });
})();