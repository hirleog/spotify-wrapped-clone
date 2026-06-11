/**
 * LÓGICA PRINCIPAL DO SPOTIFY WRAPPED CLONE
 */

document.addEventListener("DOMContentLoaded", () => {
  // Garantir que a config está carregada
  const config = window.COUPLE_CONFIG;
  if (!config) {
    console.error("Configuração não encontrada! Verifique o arquivo config.js.");
    return;
  }

  /* --------------------------------------------------
     ELEMENTOS DO DOM
     -------------------------------------------------- */
  const introView = document.getElementById("intro-view");
  const introPlayBtn = document.getElementById("intro-play-btn");
  const landingView = document.getElementById("landing-view");
  const storiesView = document.getElementById("stories-view");
  const startBtn = document.getElementById("start-btn");
  const closeBtn = document.getElementById("close-btn");
  const muteBtn = document.getElementById("mute-btn");
  const muteIcon = document.getElementById("mute-icon");
  const progressContainer = document.getElementById("progress-container");
  const slidesWrapper = document.getElementById("slides-wrapper");

  // Canvas de Confetes
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");

  /* --------------------------------------------------
     ESTADO DA APLICAÇÃO
     -------------------------------------------------- */
  let currentSlideIndex = 0;
  const slideDuration = 8500; // Tempo de cada slide em ms (8.5 segundos)
  let progressTime = 0; // Progresso atual do slide em ms
  let lastFrameTime = 0;
  let animationFrameId = null;
  let isPaused = false;
  let isMuted = false;
  let counterInterval = null;
  let swipeStartX = 0;
  let swipeStartY = 0;

  // Áudio
  const audio = new Audio(config.music.audioUrl);
  audio.loop = true;

  /* --------------------------------------------------
     INICIALIZAÇÃO & HIDRATAÇÃO DO DOM
     -------------------------------------------------- */
  function init() {
    // 0. Hidratar Tela de Introdução
    document.getElementById("intro-bg").style.backgroundImage = `url('${config.intro.imageUrl}')`;
    document.getElementById("intro-title").textContent = config.intro.title;
    document.getElementById("intro-artist").textContent = config.intro.artist;

    // Hidratar também o player estático da tela inicial (Landing Page)
    document.getElementById("landing-player-img").src = config.intro.imageUrl;
    document.getElementById("landing-player-title").textContent = config.music.title;
    document.getElementById("landing-player-artist").textContent = config.music.artist;

    // 1. SLIDE 0: Capa
    document.getElementById("cover-photo").src = config.slides[0].imageUrl;
    document.getElementById("cover-title").textContent = config.slides[0].title;
    document.getElementById("cover-desc").textContent = config.slides[0].subtitle;
    document.querySelector("#slide-0 .slide-background").style.background = config.slides[0].gradient;

    // 2. SLIDE 1: Nossa Conexão
    document.getElementById("connection-avatar").src = config.slides[1].avatarUrl;
    document.getElementById("connection-season").textContent = config.slides[1].seasonText;
    document.getElementById("connection-date").textContent = config.slides[1].specialDateText;
    document.getElementById("connection-days").textContent = config.slides[1].totalDays;
    document.getElementById("connection-top").textContent = config.slides[1].topPercentage;
    document.querySelector("#slide-1 .slide-background").style.background = config.slides[1].gradient;

    // 3. SLIDE 2: Contador
    document.getElementById("counter-photo").src = config.slides[2].imageUrl;
    document.getElementById("counter-names").textContent = `${config.partner1} e ${config.partner2}`;
    document.getElementById("counter-since").textContent = `Juntos desde ${config.startDate.getFullYear()}`;
    document.querySelector("#slide-2 .slide-background").style.background = config.slides[2].gradient;

    // 4. SLIDE 3: Mensagem Especial
    document.getElementById("msg-title").textContent = config.slides[3].title;
    document.getElementById("msg-text").textContent = config.slides[3].text;
    document.querySelector("#slide-3 .slide-background").style.background = config.slides[3].gradient;

    // 5. SLIDE 4: Player
    document.getElementById("player-photo").src = config.music.coverUrl;
    document.getElementById("player-track-title").textContent = config.music.title;
    document.getElementById("player-track-artist").textContent = config.music.artist;
    document.querySelector("#slide-4 .slide-background").style.background = config.slides[4].gradient;

    // 6. SLIDE 5: Letra da Música
    document.getElementById("lyrics-photo").src = config.slides[5].imageUrl;
    document.querySelector("#slide-5 .slide-background").style.background = config.slides[5].gradient;
    const lyricsContainer = document.getElementById("lyrics-lines-container");
    lyricsContainer.innerHTML = config.slides[5].lyrics.map((line, idx) => `
      <div class="lyric-line" id="lyric-line-${idx}">${line}</div>
    `).join("");

    // 7. SLIDE 6: Timeline
    document.getElementById("timeline-story-title").textContent = config.slides[6].title;
    document.querySelector("#slide-6 .slide-background").style.background = config.slides[6].gradient;
    const timelineContainer = document.getElementById("timeline-story-container");
    timelineContainer.innerHTML = config.slides[6].events.map((ev, index) => {
      const isRight = index % 2 !== 0;
      const mediaHtml = ev.mediaUrl.endsWith(".mp4") 
        ? `<video src="${ev.mediaUrl}" autoplay loop muted playsinline></video>`
        : `<img src="${ev.mediaUrl}" alt="Memória">`;
      return `
        <div class="timeline-item ${isRight ? 'right' : 'left'}">
          <div class="timeline-dot">❤</div>
          <div class="timeline-content polaroid-wrapper">
            <div class="polaroid">
              <div class="polaroid-media">${mediaHtml}</div>
              <div class="polaroid-text">${ev.polaroidText}</div>
            </div>
          </div>
          <div class="timeline-text">
            <div class="timeline-date">${ev.date}</div>
            <div class="timeline-desc">${ev.description}</div>
          </div>
        </div>
      `;
    }).join("");

    // 8. SLIDE 7: Constelação
    document.getElementById("const-names").textContent = `${config.partner1} e ${config.partner2}`;
    document.getElementById("const-img").src = config.slides[7].imageUrl;
    document.getElementById("const-title").textContent = config.slides[7].title;
    document.getElementById("const-loc").textContent = config.slides[7].location;
    document.getElementById("const-date").textContent = config.slides[7].date;
    document.getElementById("const-coord").textContent = config.slides[7].coordinates;
    document.querySelector("#slide-7 .slide-background").style.background = config.slides[7].gradient;

    // 9. SLIDE 8: Grid de Fotos
    document.getElementById("grid-title").textContent = config.slides[8].title;
    document.getElementById("grid-desc").textContent = config.slides[8].subtitle;
    const photosGrid = document.getElementById("photos-grid");
    photosGrid.innerHTML = config.slides[8].images.map(imgUrl => `
      <div class="grid-photo-item">
        <img src="${imgUrl}" alt="Memória">
      </div>
    `).join("");
    document.querySelector("#slide-8 .slide-background").style.background = config.slides[8].gradient;

    // 10. SLIDE 9: Roleta
    document.getElementById("roulette-story-title").textContent = config.slides[9].title;
    const rouletteWheel = document.getElementById("roulette-story-wheel");
    const options = config.slides[9].options;
    const sliceAngle = 360 / options.length;
    rouletteWheel.innerHTML = options.map((opt, i) => {
      const rotate = i * sliceAngle;
      return `
        <div class="roulette-slice" style="transform: rotate(${rotate}deg);" data-index="${i}">
          <span class="slice-text">${opt}</span>
        </div>
      `;
    }).join("");
    document.querySelector("#slide-9 .slide-background").style.background = config.slides[9].gradient;

    // 11. SLIDE 10: Nossa Playlist
    document.getElementById("playlist-title").textContent = config.slides[10].title;
    document.getElementById("playlist-subtitle").textContent = config.slides[10].subtitle;
    document.getElementById("playlist-cover-img").src = config.slides[10].imageUrl;
    document.getElementById("playlist-link-btn").href = config.slides[10].playlistUrl;
    document.querySelector("#slide-10 .slide-background").style.background = config.slides[10].gradient;

    // 12. SLIDE 11: Carta Romântica
    document.getElementById("letter-title").textContent = config.slides[11].title;
    document.getElementById("letter-text").textContent = config.slides[11].letter;
    document.querySelector("#slide-11 .slide-background").style.background = config.slides[11].gradient;

    // 9. Criar as Barras de Progresso no topo dos Stories
    progressContainer.innerHTML = config.slides.map((_, index) => `
      <div class="bar-track">
        <div class="bar-fill" id="bar-fill-${index}"></div>
      </div>
    `).join("");

    // Configurar o Canvas para o tamanho da tela
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
  }

  /* --------------------------------------------------
     MECANISMO DE STORIES (PROGRESSO & NAVEGAÇÃO)
     -------------------------------------------------- */
  
  function startStoryLoop() {
    progressTime = 0;
    lastFrameTime = performance.now();
    isPaused = false;
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(updateProgress);
  }

  function updateProgress(timestamp) {
    if (!lastFrameTime) lastFrameTime = timestamp;
    const elapsed = timestamp - lastFrameTime;
    lastFrameTime = timestamp;

    if (!isPaused) {
      progressTime += elapsed;
      const percent = Math.min((progressTime / slideDuration) * 100, 100);
      
      // Atualizar a barra atual
      const currentBar = document.getElementById(`bar-fill-${currentSlideIndex}`);
      if (currentBar) {
        currentBar.style.width = `${percent}%`;
      }

      // Hooks específicos de cada slide em tempo real
      if (currentSlideIndex === 2) {
        // Player de música: atualizar barra de progresso do player
        updatePlayerTimeline();
      } else if (currentSlideIndex === 3) {
        // Letra de música: destacar as frases
        updateLyricsHighlight(percent);
      }

      // Ao finalizar o slide, avançar
      if (progressTime >= slideDuration) {
        nextSlide();
        return;
      }
    }

    animationFrameId = requestAnimationFrame(updateProgress);
  }

  function goToSlide(index) {
    if (index < 0 || index >= config.slides.length) return;

    // Resetar barras de progresso
    for (let i = 0; i < config.slides.length; i++) {
      const bar = document.getElementById(`bar-fill-${i}`);
      if (bar) {
        if (i < index) {
          bar.style.width = "100%";
        } else {
          bar.style.width = "0%";
        }
      }
    }

    // Atualizar classes dos slides para a transição 3D
    const slides = document.querySelectorAll(".story-slide");
    slides.forEach(slide => {
      const idx = parseInt(slide.dataset.index);
      slide.classList.remove("active", "next-slide", "prev-slide");
      
      if (idx === index) {
        slide.classList.add("active");
      } else if (idx < index) {
        slide.classList.add("prev-slide");
      } else {
        slide.classList.add("next-slide");
      }
    });

    currentSlideIndex = index;
    progressTime = 0;

    // Parar efeitos de outros slides
    clearInterval(counterInterval);
    stopHearts();

    // Executar ações do slide atual
    if (currentSlideIndex === 1) {
      // Iniciar Contador de Tempo
      startCounter();
    } else if (currentSlideIndex === 2) {
      // Garantir sincronia do play/pause
      syncPlayerButton();
    } else if (currentSlideIndex === 5) {
      // Disparar confetes de coração no final
      startHearts();
    }

    startStoryLoop();
  }

  function nextSlide() {
    if (currentSlideIndex < config.slides.length - 1) {
      goToSlide(currentSlideIndex + 1);
    } else {
      // Fim da retrospectiva: voltar para o início (sem parar a música)
      exitStories(false);
    }
  }

  function prevSlide() {
    if (currentSlideIndex > 0) {
      goToSlide(currentSlideIndex - 1);
    } else {
      // Se estiver no primeiro, apenas reinicia ele
      goToSlide(0);
    }
  }

  function pauseStory() {
    isPaused = true;
    lastFrameTime = 0;
  }

  function resumeStory() {
    isPaused = false;
    lastFrameTime = performance.now();
  }

  function enterStories() {
    landingView.classList.remove("active");
    storiesView.classList.add("active");
    
    // Garantir que a música está tocando (já deve estar tocando a partir da tela de introdução)
    if (audio.paused) {
      audio.volume = 0;
      audio.play().catch(err => console.log("Áudio bloqueado ou erro ao tocar:", err));
      fadeAudio(audio, 1, 1000);
    }

    goToSlide(0);
  }

  function exitStories(stopMusic = true) {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    clearInterval(counterInterval);
    stopHearts();
    
    storiesView.classList.remove("active");
    landingView.classList.add("active");
    
    if (stopMusic) {
      // Fade out da música e pausa
      fadeAudio(audio, 0, 800, () => {
        audio.pause();
      });
    } else {
      // Retoma o volume para garantir que não pare
      fadeAudio(audio, 1, 800);
    }
  }

  /* --------------------------------------------------
     ÁUDIO & SINCRO DO PLAYER (SLIDE 3)
     -------------------------------------------------- */
  
  // Fade suave de volume
  function fadeAudio(audioEl, targetVolume, duration, callback) {
    const startVolume = audioEl.volume;
    const diff = targetVolume - startVolume;
    if (diff === 0) {
      if (callback) callback();
      return;
    }

    const steps = 20;
    const interval = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      audioEl.volume = startVolume + (diff * (currentStep / steps));
      
      if (currentStep >= steps) {
        clearInterval(timer);
        audioEl.volume = targetVolume;
        if (callback) callback();
      }
    }, interval);
  }

  function updatePlayerTimeline() {
    const timelineBar = document.getElementById("timeline-progress-bar");
    const currentTimeText = document.getElementById("player-current-time");
    const totalTimeText = document.getElementById("player-total-time");

    if (!audio.duration) {
      timelineBar.style.width = "0%";
      currentTimeText.textContent = "0:00";
      totalTimeText.textContent = "-0:00";
      return;
    }

    const current = audio.currentTime;
    const total = audio.duration;
    const pct = (current / total) * 100;

    timelineBar.style.width = `${pct}%`;
    currentTimeText.textContent = formatTime(current);
    totalTimeText.textContent = `-${formatTime(total - current)}`;
  }

  function formatTime(secs) {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  function syncPlayerButton() {
    const playSvg = document.getElementById("play-btn-svg");
    const pauseSvg = document.getElementById("pause-btn-svg");
    
    if (audio.paused) {
      playSvg.classList.remove("hidden");
      pauseSvg.classList.add("hidden");
    } else {
      playSvg.classList.add("hidden");
      pauseSvg.classList.remove("hidden");
    }
  }

  function toggleAudioPlay() {
    if (audio.paused) {
      audio.play().then(syncPlayerButton);
    } else {
      audio.pause();
      syncPlayerButton();
    }
  }

  /* --------------------------------------------------
     LETRA DA MÚSICA (SLIDE 4)
     -------------------------------------------------- */
  function updateLyricsHighlight(percent) {
    const linesCount = config.slides[3].lyrics.length;
    if (linesCount === 0) return;

    // Distribuir as linhas proporcionalmente ao tempo do slide (de 0 a 100%)
    const pctPerLine = 100 / linesCount;
    const activeLineIndex = Math.floor(percent / pctPerLine);

    for (let i = 0; i < linesCount; i++) {
      const lineEl = document.getElementById(`lyric-line-${i}`);
      if (lineEl) {
        if (i === activeLineIndex) {
          lineEl.classList.add("active");
        } else {
          lineEl.classList.remove("active");
        }
      }
    }
  }

  /* --------------------------------------------------
     CONTADOR DE RELACIONAMENTO (SLIDE 2)
     -------------------------------------------------- */
  function startCounter() {
    updateCounterDOM(); // primeira rodada imediata
    counterInterval = setInterval(updateCounterDOM, 1000);
  }

  function updateCounterDOM() {
    const now = new Date();
    const start = config.startDate;

    let diffMs = now - start;
    if (diffMs < 0) diffMs = 0; // Prevenir negativo caso a data seja futura

    // Cálculo exato de anos, meses e dias baseado em calendários reais
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();

    if (days < 0) {
      // Ajuste se o dia atual for menor que o dia inicial
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += lastMonth.getDate();
      months--;
    }

    if (months < 0) {
      months += 12;
      years--;
    }

    // Sobras em horas, minutos e segundos
    const diffSeconds = Math.floor(diffMs / 1000);
    const hours = Math.floor((diffSeconds / 3600) % 24);
    const minutes = Math.floor((diffSeconds / 60) % 60);
    const seconds = Math.floor(diffSeconds % 60);

    // Injetar valores no DOM com transição
    document.getElementById("count-years").textContent = years;
    document.getElementById("count-months").textContent = months;
    document.getElementById("count-days").textContent = days;
    document.getElementById("count-hours").textContent = hours;
    document.getElementById("count-minutes").textContent = minutes;
    document.getElementById("count-seconds").textContent = seconds;
  }

  /* --------------------------------------------------
     CANVAS DE CONFETES DE CORAÇÃO (SLIDE 6)
     -------------------------------------------------- */
  let hearts = [];
  let isHeartsRunning = false;

  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    // Adaptado para o wrapper no desktop
    const appEl = document.getElementById("app");
    const rect = appEl.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
  }

  class HeartConfetti {
    constructor(w, h) {
      this.w = w;
      this.h = h;
      this.x = Math.random() * w;
      this.y = Math.random() * -h - 20;
      this.size = Math.random() * 8 + 6;
      this.speedY = Math.random() * 2 + 1;
      this.speedX = Math.random() * 1.5 - 0.75;
      this.rotation = Math.random() * Math.PI;
      this.rotationSpeed = Math.random() * 0.02 - 0.01;
      this.opacity = Math.random() * 0.5 + 0.5;
      
      const colors = ["#ff416c", "#ff4b2b", "#ff758c", "#ff7eb3", "#ffffff"];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.y / 30) * 0.5;
      this.rotation += this.rotationSpeed;
      
      if (this.y > this.h + 20) {
        this.y = -20;
        this.x = Math.random() * this.w;
        this.opacity = Math.random() * 0.5 + 0.5;
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      
      // Desenhar formato de coração
      ctx.beginPath();
      const d = this.size;
      ctx.moveTo(0, -d / 4);
      ctx.bezierCurveTo(-d / 2, -d / 2, -d, -d / 4, -d, d / 4);
      ctx.bezierCurveTo(-d, d * 0.7, -d / 4, d * 0.9, 0, d * 1.2);
      ctx.bezierCurveTo(d / 4, d * 0.9, d, d * 0.7, d, d / 4);
      ctx.bezierCurveTo(d, -d / 4, d / 2, -d / 2, 0, -d / 4);
      ctx.closePath();
      ctx.fill();
      
      ctx.restore();
    }
  }

  function startHearts() {
    isHeartsRunning = true;
    hearts = [];
    const appEl = document.getElementById("app");
    const rect = appEl.getBoundingClientRect();
    
    // Criar confetes baseados na largura da tela
    const count = Math.floor(rect.width / 8);
    for (let i = 0; i < count; i++) {
      hearts.push(new HeartConfetti(rect.width, rect.height));
    }
    
    animateHearts();
  }

  function stopHearts() {
    isHeartsRunning = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function animateHearts() {
    if (!isHeartsRunning) return;
    
    const appEl = document.getElementById("app");
    const rect = appEl.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    
    hearts.forEach(heart => {
      heart.update();
      heart.draw();
    });
    
    requestAnimationFrame(animateHearts);
  }

  /* --------------------------------------------------
     ESCUTADORES DE EVENTOS (INTERAÇÕES)
     -------------------------------------------------- */

  // Iniciar retrospectiva
  // Iniciar Intro (Play Music e ir para Landing)
  introPlayBtn.addEventListener("click", () => {
    introView.classList.remove("active");
    landingView.classList.add("active");
    
    // Tocar música
    audio.play().then(() => {
      document.getElementById("landing-play-icon").style.display = "none";
      document.getElementById("landing-pause-icon").style.display = "block";
    }).catch(err => console.log("Áudio bloqueado ou erro ao tocar:", err));
  });

  // Voltar para a Tela de Introdução
  const backToIntroBtn = document.getElementById("back-to-intro-btn");
  if (backToIntroBtn) {
    backToIntroBtn.addEventListener("click", () => {
      landingView.classList.remove("active");
      introView.classList.add("active");
      audio.pause();
      audio.currentTime = 0;
    });
  }

  // Lógica do Contador
  function startCounterLoop() {
    setInterval(() => {
      const now = new Date();
      const diff = Math.max(0, now - config.startDate);
      
      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
      const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      // Atualiza os contadores dentro dos stories (caso exista)
      const elAnos = document.getElementById("count-years");
      if(elAnos) {
        elAnos.textContent = years;
        document.getElementById("count-months").textContent = months;
        document.getElementById("count-days").textContent = days;
        document.getElementById("count-hours").textContent = hours;
        document.getElementById("count-minutes").textContent = minutes;
        document.getElementById("count-seconds").textContent = seconds;
      }

      // Atualiza os contadores na tela inicial (landing view)
      const landingAnos = document.getElementById("landing-val-years");
      if (landingAnos) {
        landingAnos.textContent = years;
        document.getElementById("landing-val-months").textContent = months;
        document.getElementById("landing-val-days").textContent = days;
        document.getElementById("landing-val-hours").textContent = hours;
        document.getElementById("landing-val-minutes").textContent = minutes;
        document.getElementById("landing-val-seconds").textContent = seconds;
      }

    }, 1000);
  }
  startCounterLoop();

  // Play/Pause na Landing
  const landingPlayPause = document.getElementById("landing-play-pause");
  if(landingPlayPause) {
    landingPlayPause.addEventListener("click", () => {
      if(audio.paused) {
        audio.play();
        document.getElementById("landing-play-icon").style.display = "none";
        document.getElementById("landing-pause-icon").style.display = "block";
      } else {
        audio.pause();
        document.getElementById("landing-play-icon").style.display = "block";
        document.getElementById("landing-pause-icon").style.display = "none";
      }
    });
  }

  function formatTime(secs) {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return m + ":" + (s < 10 ? "0" : "") + s;
  }

  audio.addEventListener("timeupdate", () => {
    const landingProgress = document.getElementById("landing-time-progress");
    const landingCurrent = document.getElementById("landing-time-current");
    const landingTotal = document.getElementById("landing-time-total");
    if(landingProgress && audio.duration) {
      const p = (audio.currentTime / audio.duration) * 100;
      landingProgress.style.width = p + "%";
      landingCurrent.textContent = formatTime(audio.currentTime);
      landingTotal.textContent = "-" + formatTime(audio.duration - audio.currentTime);
    }
  });

  // Roleta nos Stories
  const spinBtn = document.getElementById("spin-roulette-story-btn");
  if(spinBtn) {
    let clickCount = 0;
    spinBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Evita que o click avance o story
      clickCount++;
      
      const wheel = document.getElementById("roulette-story-wheel");
      
      // Resetar estado anterior
      stopHearts();
      const previousWinner = wheel.querySelector(".winner");
      if (previousWinner) {
        previousWinner.classList.remove("winner");
      }
      
      spinBtn.textContent = "Girando...";
      spinBtn.disabled = true;
      isPaused = true; // Pausa o story enquanto roda
      
      // Sempre parar no Cinema (Índice 3 = 180deg). 
      // Para o Cinema parar no topo (ponteiro), a roda precisa girar 90deg, 
      // porque 180deg + 90deg = 270deg (topo em CSS conic-gradient padrão).
      const targetDeg = 90; 
      const spins = 5 * 360 * clickCount; // 5 voltas a cada clique
      const finalDeg = spins + targetDeg;
      
      wheel.style.transform = `rotate(${finalDeg}deg)`;
      
      setTimeout(() => {
        spinBtn.textContent = "Girar Novamente";
        spinBtn.disabled = false;
        isPaused = false; // Retoma o story
        
        // Adicionar classe de destaque na opção sorteada (Cinema - index 3)
        const winnerSlice = wheel.querySelector('[data-index="3"]');
        if (winnerSlice) {
          winnerSlice.classList.add("winner");
        }
        
        // Efeito celebration com corações de confete por 3 segundos
        startHearts();
        setTimeout(() => {
          if (currentSlideIndex === 9) {
            stopHearts();
          }
        }, 3000);
      }, 4000);
    });
  }

  // Iniciar retrospectiva
  startBtn.addEventListener("click", enterStories);

  // Fechar retrospectiva
  closeBtn.addEventListener("click", exitStories);

  // Replay da retrospectiva
  document.getElementById("replay-btn").addEventListener("click", () => {
    audio.currentTime = 0; // Reinicia a música se recomeçar a retrospectiva daqui
    goToSlide(0);
  });

  // Mutar / Desmutar
  muteBtn.addEventListener("click", () => {
    isMuted = !isMuted;
    audio.muted = isMuted;
    
    if (isMuted) {
      muteIcon.innerHTML = `
        <!-- Alto falante desativado/mutado -->
        <path fill="currentColor" d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
      `;
    } else {
      muteIcon.innerHTML = `
        <!-- Alto falante ativado -->
        <path fill="currentColor" d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zm-3 1.77L6.43 9H3v6h3.43L11 19V5z"/>
      `;
    }
  });

  // Player Slide (Slide 3): Controles de Play/Pause internos
  document.getElementById("btn-play-pause").addEventListener("click", (e) => {
    e.stopPropagation();
    toggleAudioPlay();
  });

  // Botões informais de shuffle/repeat
  document.getElementById("btn-shuffle").addEventListener("click", (e) => {
    e.stopPropagation();
    document.getElementById("btn-shuffle").classList.toggle("active");
  });

  document.getElementById("btn-repeat").addEventListener("click", (e) => {
    e.stopPropagation();
    document.getElementById("btn-repeat").classList.toggle("active");
  });

  document.getElementById("player-like-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    const heart = document.querySelector(".heart-icon");
    heart.classList.toggle("active");
  });

  // Navegação pelos Stories (Toques Esquerdo/Direito)
  storiesView.addEventListener("click", (e) => {
    // Ignorar cliques em botões, links, controles, barra de progresso ou área scrollável
    if (e.target.closest("button") || 
        e.target.closest("a") || 
        e.target.closest(".player-controls") ||
        e.target.closest(".like-btn") ||
        e.target.closest(".stories-header")) {
      return;
    }
    const rect = storiesView.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width * 0.3) {
      prevSlide();
    } else {
      nextSlide();
    }
  });

  // Gestão de Pause nos Stories ao pressionar e segurar
  const handlePressStart = (e) => {
    // Evitar disparos se for clique nos botões de controle superiores
    if (e.target.closest(".stories-header") || e.target.closest(".player-controls") || e.target.closest(".like-btn")) {
      return;
    }
    pauseStory();
  };

  const handlePressEnd = (e) => {
    resumeStory();
  };

  // Suporte para Mouse e Touch (Pressionar para pausar)
  storiesView.addEventListener("mousedown", handlePressStart);
  storiesView.addEventListener("mouseup", handlePressEnd);
  storiesView.addEventListener("mouseleave", handlePressEnd);

  storiesView.addEventListener("touchstart", (e) => {
    handlePressStart(e);
    // Coletar coordenadas de swipe
    swipeStartX = e.touches[0].clientX;
    swipeStartY = e.touches[0].clientY;
  }, { passive: true });

  storiesView.addEventListener("touchend", (e) => {
    handlePressEnd(e);
    
    // Calcular swipe
    const diffX = e.changedTouches[0].clientX - swipeStartX;
    const diffY = e.changedTouches[0].clientY - swipeStartY;

    // Se o movimento for mais horizontal do que vertical e acima do limiar
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // Deslizar para a direita -> Anterior
        prevSlide();
      } else {
        // Deslizar para a esquerda -> Próximo
        nextSlide();
      }
    }
  }, { passive: true });

  // Rodar inicializador
  init();
});
