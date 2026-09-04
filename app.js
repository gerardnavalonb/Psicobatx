/**
 * HACK YOUR MEMORY 🧠 - Interactive Learning App Engine
 * Academic rigor: Miller's Law, Working Memory, Sweller's Cognitive Load Theory
 * Target: Batxillerat Psychology students (16-18 y/o)
 * Fresh & Luminous Theme
 */

class MemoryHackApp {
  constructor() {
    this.state = {
      xp: 0,
      currentScreen: 'screen-home',
      unlockedScreens: new Set(['screen-home', 'screen-level-1']),
      completedChallenges: 0,
      soundEnabled: true,
      
      // Level 1 Trials
      trial1Sequence: [7, 2, 9, 4, 1, 8, 3],
      trial2Sequence: [5, 8, 1, 3, 9, 2, 6, 4, 7, 0, 3],
      
      // Unlock 1
      unlock1Answers: {},
      
      // Level 2
      deskOverloaded: true,
      
      // Level 3 Game
      level3Index: 0,
      level3Score: 0,
      level3Finished: false,
      
      // Level 4 Simulator
      level4Decisions: {},
      extrinsicLevel: 80,
      relevantLevel: 20,
      
      // Level 5 Hacks
      completedHacks: new Set(),
      activeHackId: null,
      
      // Final Challenge Builder
      builderSelections: {
        entorn: null,
        organitzacio: null,
        estrategia: null,
        colaboracio: null
      },
      
      // Distraction Monitoring
      distractionCount: 0,
      isDistractionAlertOpen: false,
      
      // Reflection
      reflectionData: {
        name: '',
        subject: '',
        change: '',
        concept: ''
      },

      // Neural Network Progress System
      neuralNet: {
        nodes: {},           // nodeId -> { unlocked: bool, firstTry: bool }
        connections: new Set(), // Set of 'a-b' strings (a < b)
        wrongFirstNodes: new Set() // nodeIds where wrong answer came before unlock
      }
    };

    // Scenarios for Level 3
    this.scenariosLevel3 = [
      {
        text: "Estàs aprenent un concepte molt complex per primera vegada.",
        type: "INTRÍNSECA",
        feedback: "Correcte! És CÀRREGA INTRÍNSECA perquè la dificultat prové de la pròpia naturalesa i relacions internes del concepte que estàs aprenent, no de com està presentat."
      },
      {
        text: "Estudies mentre reps notificacions constants d'Instagram.",
        type: "EXTRÍNSECA",
        feedback: "Correcte! És CÀRREGA EXTRÍNSECA. Les notificacions són estímuls innecessaris que fragmenten la teva atenció i consumeixen espai a la memòria de treball sense aportar cap benefici."
      },
      {
        text: "Després de llegir un tema, intentes explicar-lo sense mirar els apunts.",
        type: "RELLEVANT",
        feedback: "Molt bé! És CÀRREGA RELLEVANT (Germane). L'esforç d'autoexplicació i recuperació activa ajuda directament a construir nous esquemes mentals a la memòria a llarg termini."
      },
      {
        text: "Els apunts tenen cinc colors, animacions, imatges decoratives i text difícil de llegir.",
        type: "EXTRÍNSECA",
        feedback: "Exacte! És CÀRREGA EXTRÍNSECA. El disseny confús o excessivament decoratiu obliga el cervell a gastar recursos filtrant elements irrellevants en lloc de processar la matèria."
      },
      {
        text: "Transformes el tema en un mapa conceptual.",
        type: "RELLEVANT",
        feedback: "Molt bé! És CÀRREGA RELLEVANT. Connectar i jerarquitzar conceptes és un esforç cognitiu productiu que facilita la comprensió profunda."
      },
      {
        text: "Intentes entendre les relacions entre diversos conceptes complexos.",
        type: "INTRÍNSECA",
        feedback: "Correcte! És CÀRREGA INTRÍNSECA. L'alta interactivitat entre elements forma part de la dificultat pròpia del contingut."
      }
    ];

    // The 8 Hacks Data (Level 5)
    this.hacksData = [
      {
        id: 1,
        title: "Agrupa (Chunking)",
        icon: "🧩",
        desc: "Agrupa elements petits en unitats significatives per reduir el nombre d'elements a la memòria de treball.",
        example: "En lloc de memoritzar 9 dígits solts (1-7-1-4-1-9-3-9-2-0-2-6), agrupa'ls en 3 anys històrics (1714 | 1939 | 2026).",
        challenge: {
          question: "Com agrupareies millor aquests 6 conceptes: [Axó, Memòria de treball, Dendrita, Llei de Miller, Sinapsi, Càrrega cognitiva]?",
          options: [
            { text: "A. Per ordre alfabètic estricte.", correct: false },
            { text: "B. En 2 categories (Estructures neuronals vs Processos cognitius).", correct: true, feedback: "Molt bé! Crear categories lògiques redueix la càrrega de 6 unitats soltes a només 2 'chunks' significatius." },
            { text: "C. Memoritzant la primera lletra de cadascun a l'atzar.", correct: false }
          ]
        }
      },
      {
        id: 2,
        title: "Explica-ho",
        icon: "✍️",
        desc: "Posa-ho per escrit o explica-ho amb les teves pròpies paraules com si ho ensenyessis a algú altre.",
        example: "Després de llegir un paràgraf sobre la sinapsi, tanca el llibre i explica el procés en veu alta durant 1 minut.",
        challenge: {
          question: "Per què explicar un tema amb les pròpies paraules és més eficaç que rellegir-lo?",
          options: [
            { text: "A. Perquè activa la càrrega rellevant (germane) forçant el cervell a organitzar la informació.", correct: true, feedback: "Exacte! L'autoexplicació requereix processament actiu i revela immediatament què hem entès i què no." },
            { text: "B. Perquè rellegir gasta massa energia als ulls.", correct: false },
            { text: "C. Perquè fa que la informació es memoritzi automàticament sense esforç.", correct: false }
          ]
        }
      },
      {
        id: 3,
        title: "Practica Activa",
        icon: "🧪",
        desc: "La pràctica de recuperació (active recall) consolida el coneixement molt millor que el reconeixement passiu.",
        example: "Fes-te preguntes tipus test o intenta resoldre problemes sense mirar la solució d'entrada.",
        challenge: {
          question: "Quin d'aquests mètodes d'estudi aprofita millor la pràctica activa?",
          options: [
            { text: "A. Subratllar el 70% del llibre amb marcadors de colors.", correct: false },
            { text: "B. Respondre preguntes d'autoavaluació sense consultar els apunts prèviament.", correct: true, feedback: "Molt bé! L'esforç per recuperar informació de la memòria enforteix les rutes neuronals de recuperació." },
            { text: "C. Escoltar la gravació de la classe mentre jugues a un videojoc.", correct: false }
          ]
        }
      },
      {
        id: 4,
        title: "Col·labora",
        icon: "👥",
        desc: "Treballar amb altres persones permet repartir i processar informació (càrrega cognitiva compartida).",
        example: "En un tema extens, cadascú aprofundeix en una part i després s'expliquen mútuament els conceptes clau.",
        challenge: {
          question: "Com s'optimitza la càrrega cognitiva quan s'estudia en parella?",
          options: [
            { text: "A. Deixant que una persona faci tot el treball i l'altra només escolti.", correct: false },
            { text: "B. Explicant-se mútuament les parts i fent preguntes per comprovar la comprensió de l'altre.", correct: true, feedback: "Correcte! La co-explicació permet contrastar esquemes mentals i repartir l'esforç cognitiu." },
            { text: "C. Parlant de temes personals durant la sessió d'estudi.", correct: false }
          ]
        }
      },
      {
        id: 5,
        title: "Utilitza Senyals",
        icon: "👆",
        desc: "Gestos, paraules clau o indicadors visuals dirigeixen l'atenció exactament cap on cal sense dispersar-la.",
        example: "Utilitzar una fletxa o negreta per destacar la relació de causa-efecte en un esquema.",
        challenge: {
          question: "Quin és l'objectiu principal de la senyalització (*signaling*) en els apunts?",
          options: [
            { text: "A. Fer que la pàgina sembli una obra d'art amb molts dibuixos.", correct: false },
            { text: "B. Guiar l'atenció cap als elements crítics per reduir la recerca visual innecessària.", correct: true, feedback: "Brillant! La senyalització clara redueix la càrrega extrínseca d'haver de buscar on és la informació important." },
            { text: "C. Omplir els espais buits del full.", correct: false }
          ]
        }
      },
      {
        id: 6,
        title: "Elimina Distraccions",
        icon: "🔕",
        desc: "Redueix estímuls irrellevants. Cada notificació o element desordenat consumeix atenció de treball.",
        example: "Mòbil fora de l'habitació i només la pestanya necessària oberta al navegador.",
        challenge: {
          question: "Per què fins i tot un mòbil silenciat a la taula pot reduir el rendiment cognitiu?",
          options: [
            { text: "A. Perquè emet ones invisibles que apaguen el cervell.", correct: false },
            { text: "B. Perquè el cervell gasta recursos de memòria de treball 'inhibint' la temptació de mirar-lo.", correct: true, feedback: "Molt encertat! La investigació psicològica demostra que resistir la temptació d'un estímul proper consumeix capacitat atencional." },
            { text: "C. No el redueix mai si està en silenci.", correct: false }
          ]
        }
      },
      {
        id: 7,
        title: "Gestiona l'Estrès",
        icon: "😌",
        desc: "L'estrès i les preocupacions intrusives ocupen directament espai a la memòria de treball.",
        example: "Fes un 'buidatge mental' escrivint en un full tot el que et preocupa abans d'estudiar per alliberar la ment.",
        challenge: {
          question: "Quin efecte té l'ansietat sobre la memòria de treball durant un examen?",
          options: [
            { text: "A. Ocupa 'slots' de la memòria de treball amb pensaments intrusius de por a fallar.", correct: true, feedback: "Exacte! L'ansietat actua com a càrrega extrínseca interna que redueix l'espai disponible per resoldre les preguntes." },
            { text: "B. Augmenta la memòria de treball un 50%.", correct: false },
            { text: "C. No té cap efecte si has estudiat molt.", correct: false }
          ]
        }
      },
      {
        id: 8,
        title: "Retira la Guia Progressivament",
        icon: "📈",
        desc: "Comença estudiant exemples resolts (worked examples) i retira les ajudes a mesura que guanyis expertesa.",
        example: "1r Mirar un exercici complet resolt → 2n Completar un exercici parcial → 3r Resoldre'n un des de zero.",
        challenge: {
          question: "Per a qui són més útils els exemples resolts complets?",
          options: [
            { text: "A. Per als principiants que s'enfronten a un problema nou per primera vegada.", correct: true, feedback: "Exacte! L'efecte dels exemples resolts redueix la sobrecàrrega inicial. Després, la guia es retira a mesura que es domina el contingut." },
            { text: "B. Per als experts que ja dominen el tema.", correct: false },
            { text: "C. No són útils per a ningú.", correct: false }
          ]
        }
      }
    ];

    // ============================================================
    // NEURAL NETWORK: Node & Connection Definitions
    // Lateral Brain Hologram Topology (Cyberpunk Skill-Tree HUD)
    // ViewBox: 0 0 1000 520
    // ============================================================
    this.nodeDefinitions = [
      // PREFRONTAL LOBE (Front/Left) - Working Memory & Inhibition
      { id: 1,  emoji: "🧠", label: "Memòria de treball",      short: ["Memòria de", "treball"],       x: 200, y: 245, lobe: "prefrontal" },
      { id: 2,  emoji: "🛑", label: "Capacitat limitada",       short: ["Capacitat", "limitada"],       x: 160, y: 340, lobe: "prefrontal" },
      { id: 7,  emoji: "🚨", label: "Càrrega extrínseca",       short: ["Càrrega", "extrínseca"],       x: 140, y: 170, lobe: "prefrontal" },
      { id: 9,  emoji: "🔕", label: "Atenció & Inhibició",     short: ["Atenció &", "Inhibició"],      x: 265, y: 155, lobe: "prefrontal" },

      // PARIETAL LOBE (Top/Center) - Numerical & Chunking
      { id: 3,  emoji: "🔢", label: "Llei de Miller (7±2)",     short: ["Miller", "(7±2)"],             x: 375, y: 120, lobe: "parietal" },
      { id: 4,  emoji: "🧩", label: "Chunking (Agrupació)",     short: ["Chunking", "(Agrupació)"],     x: 505, y: 100, lobe: "parietal" },
      { id: 6,  emoji: "🧱", label: "Càrrega intrínseca",       short: ["Càrrega", "intrínseca"],       x: 630, y: 110, lobe: "parietal" },

      // CORE COGNITIU (Deep Central / Cingulate) - Synthesis & Load
      { id: 5,  emoji: "⚖️", label: "Càrrega cognitiva",        short: ["Càrrega", "cognitiva"],        x: 385, y: 240, lobe: "core" },
      { id: 8,  emoji: "🚀", label: "Càrrega rellevant",        short: ["Càrrega", "rellevant"],        x: 515, y: 225, lobe: "core" },

      // TEMPORAL LOBE & HIPPOCAMPUS (Bottom/Center) - Semantic & Long-Term
      { id: 12, emoji: "✍️", label: "Generació activa",         short: ["Autoexplicar", "i escriure"],  x: 430, y: 365, lobe: "temporal" },
      { id: 13, emoji: "😌", label: "Gestió de l'estrès",       short: ["Control", "de l'estrès"],      x: 575, y: 345, lobe: "temporal" },

      // OCCIPITAL & INTEGRATION / EXECUTIVE OUTPUT (Right)
      { id: 10, emoji: "📈", label: "Exemples resolts",         short: ["Exemples", "resolts"],         x: 690, y: 180, lobe: "occipital" },
      { id: 11, emoji: "👥", label: "Col·laboració",            short: ["Aprendre en", "parella"],      x: 815, y: 170, lobe: "occipital" },
      { id: 14, emoji: "🎯", label: "Aplicació real",           short: ["Pla d'estudi", "personal"],    x: 865, y: 290, lobe: "executive" },
    ];

    // Connection conduits [a, b]
    this.connectionDefinitions = [
      [1, 2],   // Memòria ↔ Capacitat limitada
      [1, 7],   // Memòria ↔ Càrrega extrínseca
      [7, 9],   // Extrínseca ↔ Atenció & Inhibició
      [9, 1],   // Atenció ↔ Memòria de treball
      [1, 3],   // Memòria ↔ Miller
      [3, 4],   // Miller ↔ Chunking
      [2, 5],   // Capacitat ↔ Càrrega cognitiva
      [3, 5],   // Miller ↔ Càrrega cognitiva
      [5, 6],   // Càrrega ↔ Intrínseca
      [4, 6],   // Chunking ↔ Intrínseca
      [5, 8],   // Càrrega ↔ Rellevant (Core)
      [8, 12],  // Rellevant ↔ Generació activa (Hipocamp)
      [12, 13], // Generació ↔ Gestió estrès
      [8, 10],  // Rellevant ↔ Exemples resolts
      [10, 11], // Exemples resolts ↔ Col·laboració
      [10, 14], // Exemples resolts ↔ Aplicació real
      [11, 14], // Col·laboració ↔ Aplicació real
      [12, 14], // Generació activa ↔ Aplicació real
    ];

    this.init();
  }

  init() {
    this.updateProgressUI();
    this.renderWorkbenchAnimation();
    this.renderHacksCards();
    this.setupVisibilityListeners();
    this.renderNeuralNet();
    this.updateNeuralStats();
  }

  // --- DISTRACTION / TAB-SWITCH MONITORING ---
  setupVisibilityListeners() {
    // Detect tab switch or window minimization
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.triggerDistractionAlert();
      }
    });

    window.addEventListener('blur', () => {
      // Small timeout to avoid false positives when clicking inside iframe/inputs
      setTimeout(() => {
        if (!document.hasFocus() || document.hidden) {
          this.triggerDistractionAlert();
        }
      }, 200);
    });

    // Prevent closing the alert overlay with Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.state.isDistractionAlertOpen) {
        e.preventDefault();
        e.stopPropagation();
      }
    });
  }

  triggerDistractionAlert() {
    if (this.state.isDistractionAlertOpen) return;

    this.state.distractionCount++;
    this.state.isDistractionAlertOpen = true;

    // Update Header Badge and Modal Counter
    const headerCount = document.getElementById('distraction-count-header');
    const modalCount = document.getElementById('distraction-counter-modal');
    if (headerCount) headerCount.innerText = this.state.distractionCount;
    if (modalCount) modalCount.innerText = this.state.distractionCount;

    // Open Lockout Overlay
    const overlay = document.getElementById('distraction-lockout-overlay');
    if (overlay) {
      overlay.classList.add('active');
    }

    this.playSynthSound('wrong');
  }

  dismissDistractionAlert() {
    this.state.isDistractionAlertOpen = false;
    const overlay = document.getElementById('distraction-lockout-overlay');
    if (overlay) {
      overlay.classList.remove('active');
    }
    this.showToast(`⚠️ Has reprès la sessió (${this.state.distractionCount} distraccions registrades)`);
    this.playSynthSound('click');
  }

  // --- AUDIO SYNTHESIZER (Web Audio API) ---
  playSynthSound(type) {
    if (!this.state.soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const createNote = (freq, startTime, duration, noteType = 'sine') => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = noteType;
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.12, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + duration);
      };

      const now = ctx.currentTime;
      if (type === 'correct') {
        createNote(523.25, now, 0.12); // C5
        createNote(659.25, now + 0.08, 0.18); // E5
      } else if (type === 'success') {
        createNote(523.25, now, 0.1);
        createNote(659.25, now + 0.08, 0.1);
        createNote(783.99, now + 0.16, 0.25); // G5
      } else if (type === 'wrong') {
        createNote(311.13, now, 0.12, 'sawtooth');
        createNote(261.63, now + 0.1, 0.18, 'sawtooth');
      } else if (type === 'click') {
        createNote(800, now, 0.04);
      } else if (type === 'cyber-unlock') {
        createNote(587.33, now, 0.07, 'triangle'); // D5
        createNote(880, now + 0.06, 0.08, 'sine'); // A5
        createNote(1174.66, now + 0.12, 0.18, 'sine'); // D6
      }
    } catch (e) {
      // Audio context might be restricted before user gesture
    }
  }

  toggleSound() {
    this.state.soundEnabled = !this.state.soundEnabled;
    const btn = document.getElementById('sound-btn');
    if (btn) {
      btn.innerText = this.state.soundEnabled ? '🔊' : '🔇';
      btn.title = this.state.soundEnabled ? 'So activat' : 'So desactivat';
    }
    this.showToast(this.state.soundEnabled ? 'Efectes de so activats' : 'Efectes de so desactivats');
  }

  showToast(text) {
    const toast = document.getElementById('app-toast');
    const toastText = document.getElementById('toast-text');
    if (toast && toastText) {
      toastText.innerText = text;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2600);
    }
  }

  addXP(amount, reason = '') {
    this.state.xp += amount;
    const xpEl = document.getElementById('xp-points');
    if (xpEl) xpEl.innerText = this.state.xp;
    if (reason) this.showToast(`+${amount} XP: ${reason}`);
  }

  // --- NAVIGATION & PROGRESS ---
  navigateTo(screenId) {
    if (!this.state.unlockedScreens.has(screenId)) {
      this.showToast("🔒 Completa el nivell anterior per desbloquejar aquest pas!");
      return;
    }

    document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add('active');
      this.state.currentScreen = screenId;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.playSynthSound('click');
    }

    this.updateProgressUI();
  }

  unlockScreen(screenId) {
    this.state.unlockedScreens.add(screenId);
    this.updateProgressUI();
  }

  updateProgressUI() {
    let completed = 0;
    if (this.state.unlockedScreens.has('screen-microtheory-1')) completed = 1;
    if (this.state.unlockedScreens.has('screen-level-3')) completed = 2;
    if (this.state.unlockedScreens.has('screen-level-4')) completed = 3;
    if (this.state.unlockedScreens.has('screen-level-5')) completed = 4;
    if (this.state.unlockedScreens.has('screen-reflection') || this.state.unlockedScreens.has('screen-completion')) completed = 5;

    this.state.completedChallenges = completed;
    const labelChallenges = document.getElementById('progress-challenges-label');
    if (labelChallenges) {
      labelChallenges.innerText = `${completed} / 5 reptes completats`;
    }

    const progressPct = Math.min(100, Math.round((completed / 5) * 100));
    const barFill = document.getElementById('main-progress-bar');
    if (barFill) barFill.style.width = `${Math.max(5, progressPct)}%`;

    // Update Navigation Pills
    const pillMap = [
      { id: 'pill-level-1', screen: 'screen-level-1' },
      { id: 'pill-microtheory-1', screen: 'screen-microtheory-1' },
      { id: 'pill-level-2', screen: 'screen-level-2' },
      { id: 'pill-level-3', screen: 'screen-level-3' },
      { id: 'pill-level-4', screen: 'screen-level-4' },
      { id: 'pill-level-5', screen: 'screen-level-5' },
      { id: 'pill-final', screen: 'screen-final-challenge' },
      { id: 'pill-reflection', screen: 'screen-reflection' }
    ];

    pillMap.forEach(item => {
      const pill = document.getElementById(item.id);
      if (!pill) return;
      pill.classList.remove('active', 'completed', 'locked');
      if (this.state.currentScreen === item.screen) {
        pill.classList.add('active');
      } else if (this.state.unlockedScreens.has(item.screen)) {
        pill.classList.add('completed');
      } else {
        pill.classList.add('locked');
      }
    });
  }

  // ==========================================
  // LEVEL 1: EXPERIMENT LOGIC
  // ==========================================
  startLevel1() {
    this.unlockScreen('screen-level-1');
    this.navigateTo('screen-level-1');
  }

  runTrial1() {
    document.getElementById('trial-1-ready').style.display = 'none';
    const displayBox = document.getElementById('trial-1-display');
    displayBox.style.display = 'block';

    let count = 5;
    const timerVal = document.getElementById('timer-1-val');
    const interval = setInterval(() => {
      count--;
      if (timerVal) timerVal.innerText = count;
      if (count <= 0) {
        clearInterval(interval);
        displayBox.style.display = 'none';
        document.getElementById('trial-1-recall').style.display = 'block';
        document.getElementById('input-trial-1').focus();
      }
    }, 1000);
  }

  checkTrial1() {
    const input = document.getElementById('input-trial-1');
    const fb = document.getElementById('trial-1-feedback');
    const val = input.value.trim().replace(/\D/g, '');
    const correctSeq = this.state.trial1Sequence.join('');

    let matches = 0;
    for (let i = 0; i < Math.min(val.length, correctSeq.length); i++) {
      if (val[i] === correctSeq[i]) matches++;
    }

    fb.className = 'feedback-box visible info';
    fb.innerHTML = `
      <strong>Seqüència original:</strong> <span style="font-family: monospace; font-size: 1.15rem; color: #1e1b4b; font-weight:800;">7 - 2 - 9 - 4 - 1 - 8 - 3</span> (7 dígits)<br>
      <strong>La teva resposta:</strong> <span style="font-family: monospace; font-size: 1.15rem; color: #4338ca; font-weight:800;">${val || '(buit)'}</span><br>
      Has recordat correctament <strong>${matches} de 7</strong> números en la posició exacta!
      <div style="margin-top: 0.75rem;">
        <button class="btn btn-primary" onclick="app.setupTrial2()">Passar a la Prova 2 (Més difícil) ➔</button>
      </div>
    `;
    this.addXP(20, "Prova 1 completada");
    this.playSynthSound('correct');
    this.unlockNode(1, true);
  }

  setupTrial2() {
    document.getElementById('trial-1-container').style.display = 'none';
    document.getElementById('trial-2-container').style.display = 'block';
  }

  runTrial2() {
    document.getElementById('trial-2-ready').style.display = 'none';
    const displayBox = document.getElementById('trial-2-display');
    displayBox.style.display = 'block';

    let count = 5;
    const timerVal = document.getElementById('timer-2-val');
    const interval = setInterval(() => {
      count--;
      if (timerVal) timerVal.innerText = count;
      if (count <= 0) {
        clearInterval(interval);
        displayBox.style.display = 'none';
        document.getElementById('trial-2-recall').style.display = 'block';
        document.getElementById('input-trial-2').focus();
      }
    }, 1000);
  }

  checkTrial2() {
    const input = document.getElementById('input-trial-2');
    const fb = document.getElementById('trial-2-feedback');
    const val = input.value.trim().replace(/\D/g, '');
    const correctSeq = this.state.trial2Sequence.join('');

    let matches = 0;
    for (let i = 0; i < Math.min(val.length, correctSeq.length); i++) {
      if (val[i] === correctSeq[i]) matches++;
    }

    fb.className = 'feedback-box visible info';
    fb.innerHTML = `
      <strong>Seqüència original:</strong> <span style="font-family: monospace; font-size: 1.15rem; color: #1e1b4b; font-weight:800;">5 - 8 - 1 - 3 - 9 - 2 - 6 - 4 - 7 - 0 - 3</span> (11 dígits 🤯)<br>
      <strong>La teva resposta:</strong> <span style="font-family: monospace; font-size: 1.15rem; color: #be123c; font-weight:800;">${val || '(buit)'}</span><br>
      Has recordat <strong>${matches} d'11</strong> números. Observa com a partir del 6è o 7è número, el record comença a fallar de manera generalitzada.
      <div style="margin-top: 0.75rem;">
        <button class="btn btn-primary" onclick="app.setupReflection1()">Descobreix per què passa això ➔</button>
      </div>
    `;
    this.addXP(25, "Prova 2 de sobrecàrrega completada");
    this.playSynthSound('correct');
    this.unlockNode(2, true);
  }

  setupReflection1() {
    document.getElementById('trial-2-container').style.display = 'none';
    document.getElementById('trial-reflection-container').style.display = 'block';
  }

  answerReflection1(option, btn) {
    const fb = document.getElementById('feedback-reflection-1');
    const buttons = document.querySelectorAll('#options-reflection-1 .option-btn');
    buttons.forEach(b => b.disabled = true);

    if (option === 'A') {
      btn.classList.add('correct');
      fb.className = 'feedback-box visible success';
      fb.innerHTML = `
        <strong>Exacte! 🎯</strong> El cervell humà no és un disc dur il·limitat. Disposa d'una <strong>memòria de treball</strong> amb un nombre molt limitat d'unitats d'informació simultànies.
        <div style="margin-top: 0.75rem;">
          <button class="btn btn-primary" onclick="app.proceedToMicrotheory1()">Descobreix la Teoria Científica ➔</button>
        </div>
      `;
      this.addXP(30, "Comprensió dels límits cognitius");
      this.playSynthSound('success');
      this.unlockNode(3);
    } else {
      btn.classList.add('incorrect');
      fb.className = 'feedback-box visible info';
      fb.innerHTML = `
        En realitat, l'opció correcta és la <strong>A</strong>. No és una qüestió de concentració o esforç: tots els cervells humans tenen una <strong>capacitat biològica limitada</strong> per mantenir informació activa alhora.
        <div style="margin-top: 0.75rem;">
          <button class="btn btn-primary" onclick="app.proceedToMicrotheory1()">Descobreix com funciona ➔</button>
        </div>
      `;
      this.playSynthSound('wrong');
      this.trackWrongAnswer(3);
    }
  }

  proceedToMicrotheory1() {
    this.unlockScreen('screen-microtheory-1');
    this.navigateTo('screen-microtheory-1');
  }

  // ==========================================
  // UNLOCK 1 (3 QUESTIONS QUIZ)
  // ==========================================
  startUnlock1() {
    this.unlockScreen('screen-unlock-1');
    this.navigateTo('screen-unlock-1');
  }

  selectUnlock1(qNum, choice, btn) {
    const correctMap = { 1: 'B', 2: 'A', 3: 'B' };
    const container = document.getElementById(`q${qNum}-options`);
    const buttons = container.querySelectorAll('.option-btn');
    buttons.forEach(b => {
      b.classList.remove('selected', 'correct', 'incorrect');
      b.disabled = true;
    });

    const isCorrect = (choice === correctMap[qNum]);
    this.state.unlock1Answers[qNum] = isCorrect;

    const fb = document.getElementById(`q${qNum}-feedback`);
    if (isCorrect) {
      btn.classList.add('correct');
      fb.className = 'feedback-box visible success';
      fb.innerHTML = `<strong>Molt bé!</strong> Resposta correcta.`;
      this.playSynthSound('correct');
      this.addXP(20);
      // Unlock corresponding concept node
      if (qNum === 1) this.unlockNode(5); // Càrrega cognitiva
      if (qNum === 2) this.unlockNode(4); // Chunking
    } else {
      btn.classList.add('incorrect');
      fb.className = 'feedback-box visible error';
      if (qNum === 1) fb.innerHTML = `La memòria de treball és el sistema de retenció temporal i manipulació activa (la taula mental).`;
      if (qNum === 2) fb.innerHTML = `Chunking és agrupar informació solta en unitats amb significat.`;
      if (qNum === 3) fb.innerHTML = `Agrupar ajuda perquè redueix el nombre d'unitats independents a gestionar.`;
      this.playSynthSound('wrong');
      // Track wrong first attempt for node unlock quality
      if (qNum === 1) this.trackWrongAnswer(5);
      if (qNum === 2) this.trackWrongAnswer(4);
    }

    // Check if all 3 answered
    if (Object.keys(this.state.unlock1Answers).length === 3) {
      this.evaluateUnlock1();
    }
  }

  evaluateUnlock1() {
    const score = Object.values(this.state.unlock1Answers).filter(Boolean).length;
    const resultBox = document.getElementById('unlock-1-result');
    const msg = document.getElementById('unlock-1-status-msg');
    const btnProceed = document.getElementById('btn-unlock-1-proceed');
    const btnRetry = document.getElementById('btn-unlock-1-retry');

    resultBox.style.display = 'block';

    if (score >= 2) {
      msg.style.color = '#047857';
      msg.innerHTML = `🎉 Has encertat <strong>${score} de 3</strong> preguntes! Nivell 2 Desbloquejat!`;
      btnProceed.style.display = 'inline-flex';
      btnRetry.style.display = 'none';
      this.addXP(40, "Punt de control 1 superat!");
      this.playSynthSound('success');
    } else {
      msg.style.color = '#be123c';
      msg.innerHTML = `Necessites encertar almenys 2 preguntes (has encertat ${score}/3). Revisa i torna-ho a provar!`;
      btnProceed.style.display = 'none';
      btnRetry.style.display = 'inline-flex';
    }
  }

  resetUnlock1() {
    this.state.unlock1Answers = {};
    for (let i = 1; i <= 3; i++) {
      const fb = document.getElementById(`q${i}-feedback`);
      if (fb) {
        fb.className = 'feedback-box';
        fb.innerHTML = '';
      }
      const container = document.getElementById(`q${i}-options`);
      if (container) {
        container.querySelectorAll('.option-btn').forEach(b => {
          b.classList.remove('selected', 'correct', 'incorrect');
          b.disabled = false;
        });
      }
    }
    document.getElementById('unlock-1-result').style.display = 'none';
  }

  proceedToLevel2() {
    this.unlockScreen('screen-level-2');
    this.navigateTo('screen-level-2');
  }

  // ==========================================
  // LEVEL 2: COGNITIVE LOAD METAPHOR & SIMULATION
  // ==========================================
  renderWorkbenchAnimation() {
    const container = document.getElementById('desk-animation-slots');
    if (!container) return;

    if (this.state.deskOverloaded) {
      container.innerHTML = `
        <div class="workbench-slot overloaded"><span>📱 Notificació</span><strong>Instagram</strong></div>
        <div class="workbench-slot overloaded"><span>🎵 Soroll</span><strong>Música lletra</strong></div>
        <div class="workbench-slot overloaded"><span>📑 Pestanya 1</span><strong>PDF 1</strong></div>
        <div class="workbench-slot overloaded"><span>📑 Pestanya 2</span><strong>PDF 2</strong></div>
        <div class="workbench-slot overloaded"><span>📑 Pestanya 3</span><strong>PDF 3</strong></div>
        <div class="workbench-slot overloaded"><span>🧱 Dificultat</span><strong>Materia difícil</strong></div>
        <div class="workbench-slot overloaded"><span>💥 COL·LAPSE</span><strong style="color:#e11d48;">Sense espai!</strong></div>
      `;
    } else {
      container.innerHTML = `
        <div class="workbench-slot filled" style="border-color:#38bdf8; background:#f0f9ff; color:#0369a1;"><span>🧱 Intrínseca</span><strong>Concepte clau</strong></div>
        <div class="workbench-slot filled" style="border-color:#34d399; background:#ecfdf5; color:#047857;"><span>🚀 Rellevant</span><strong>Mapa conceptual</strong></div>
        <div class="workbench-slot filled" style="border-color:#34d399; background:#ecfdf5; color:#047857;"><span>🚀 Rellevant</span><strong>Autoexplicació</strong></div>
        <div class="workbench-slot"><span style="color:var(--text-faint);">📦 Slot lliure</span><span style="color:var(--text-muted); font-weight:600;">Espai net</span></div>
        <div class="workbench-slot"><span style="color:var(--text-faint);">📦 Slot lliure</span><span style="color:var(--text-muted); font-weight:600;">Espai net</span></div>
        <div class="workbench-slot"><span style="color:var(--text-faint);">📦 Slot lliure</span><span style="color:var(--text-muted); font-weight:600;">Espai net</span></div>
        <div class="workbench-slot"><span style="color:var(--text-faint);">📦 Slot lliure</span><span style="color:var(--text-muted); font-weight:600;">Espai net</span></div>
      `;
    }
  }

  toggleDeskOverload() {
    this.state.deskOverloaded = !this.state.deskOverloaded;
    const label = document.getElementById('desk-state-label');
    const expl = document.getElementById('desk-explanation-text');
    if (label) {
      label.innerText = this.state.deskOverloaded ? 'Taula Sobrecarregada' : 'Taula Òptima Neta';
    }
    if (expl) {
      if (this.state.deskOverloaded) {
        expl.style.color = '#be123c';
        expl.innerHTML = `🚨 <strong>Sobrecàrrega Extrínseca:</strong> El soroll i la dispersió ocupen tota la taula mental, impedint l'aprenentatge.`;
      } else {
        expl.style.color = '#047857';
        expl.innerHTML = `✨ <strong>Balanç Òptim:</strong> Reduint la càrrega extrínseca a zero, alliberem espai per a la càrrega rellevant (aprenentatge profund).`;
      }
    }
    this.renderWorkbenchAnimation();
    this.playSynthSound('click');
  }

  startLevel3() {
    this.unlockScreen('screen-level-3');
    this.navigateTo('screen-level-3');
    this.loadScenario();
  }

  // ==========================================
  // LEVEL 3: CLASSIFIER GAME (CAÇA LA CÀRREGA)
  // ==========================================
  loadScenario() {
    const sc = this.scenariosLevel3[this.state.level3Index];
    document.getElementById('current-scenario-box').innerText = `"${sc.text}"`;
    document.getElementById('game-progress-label').innerText = `Situació ${this.state.level3Index + 1} de ${this.scenariosLevel3.length}`;
    document.getElementById('game-score-label').innerText = `Encerts: ${this.state.level3Score} / ${this.scenariosLevel3.length}`;

    const fb = document.getElementById('classifier-feedback');
    fb.className = 'feedback-box';
    fb.innerHTML = '';
    document.getElementById('classifier-next-action').style.display = 'none';

    const btns = document.querySelectorAll('#classifier-action-buttons .btn-classify');
    btns.forEach(b => b.disabled = false);
  }

  classifyScenario(choice) {
    const sc = this.scenariosLevel3[this.state.level3Index];
    const isCorrect = (choice === sc.type);

    const fb = document.getElementById('classifier-feedback');
    const btns = document.querySelectorAll('#classifier-action-buttons .btn-classify');
    btns.forEach(b => b.disabled = true);

    if (isCorrect) {
      this.state.level3Score++;
      fb.className = 'feedback-box visible success';
      fb.innerHTML = `<strong>MOLT BÉ! 🎯</strong> ${sc.feedback}`;
      this.playSynthSound('correct');
      this.addXP(25);
      // Unlock concept node for this load type (only first time)
      if (sc.type === 'INTRÍNSECA') this.unlockNode(6);
      if (sc.type === 'EXTRÍNSECA') this.unlockNode(7);
      if (sc.type === 'RELLEVANT')  this.unlockNode(8);
    } else {
      fb.className = 'feedback-box visible error';
      fb.innerHTML = `<strong>No exactament.</strong> La resposta correcta és <strong>${sc.type}</strong>.<br>${sc.feedback}`;
      this.playSynthSound('wrong');
      // Track wrong first attempt
      if (sc.type === 'INTRÍNSECA') this.trackWrongAnswer(6);
      if (sc.type === 'EXTRÍNSECA') this.trackWrongAnswer(7);
      if (sc.type === 'RELLEVANT')  this.trackWrongAnswer(8);
    }

    document.getElementById('game-score-label').innerText = `Encerts: ${this.state.level3Score} / ${this.scenariosLevel3.length}`;
    document.getElementById('classifier-next-action').style.display = 'block';
  }

  nextScenario() {
    this.state.level3Index++;
    if (this.state.level3Index < this.scenariosLevel3.length) {
      this.loadScenario();
    } else {
      this.finishLevel3();
    }
  }

  finishLevel3() {
    document.querySelector('.classifier-container').style.display = 'none';
    const summary = document.getElementById('level-3-summary');
    summary.style.display = 'block';

    const text = document.getElementById('level-3-score-text');
    text.innerHTML = `Has identificat correctament <strong>${this.state.level3Score} de 6</strong> situacions de càrrega cognitiva. Ara ja saps detectar la càrrega intrínseca, extrínseca i rellevant!`;

    this.addXP(50, "Mestratge en Caça la Càrrega!");
    this.playSynthSound('success');
  }

  proceedToLevel4() {
    this.unlockScreen('screen-level-4');
    this.navigateTo('screen-level-4');
  }

  // ==========================================
  // LEVEL 4: STUDY SESSION SIMULATOR
  // ==========================================
  makeDecision(step, choice, btn) {
    const card = document.getElementById(`dec-card-${step}`);
    const buttons = card.querySelectorAll('.option-btn');
    buttons.forEach(b => b.disabled = true);
    btn.classList.add('selected');

    const fb = document.getElementById(`dec-feedback-${step}`);
    let feedbackHtml = '';

    if (step === 1) {
      if (choice === 'C') {
        btn.classList.add('correct');
        this.state.extrinsicLevel = Math.max(10, this.state.extrinsicLevel - 35);
        this.state.relevantLevel += 20;
        feedbackHtml = `<strong>Genial! 🔕</strong> Allunyar físicament el telèfon elimina la càrrega extrínseca de la distracció i l'esforç d'inhibir la temptació.`;
        this.addXP(25);
        this.playSynthSound('correct');
        this.unlockNode(9); // Atenció i distraccions
      } else {
        btn.classList.add('incorrect');
        feedbackHtml = `<strong>Atenció:</strong> Encara que estigui en silenci a la taula, la simple presència visual del mòbil genera interferència atencional i augmenta la càrrega extrínseca.`;
        this.playSynthSound('wrong');
        this.trackWrongAnswer(9);
      }
      this.updateCognitiveMeters();
      fb.className = 'feedback-box visible info';
      fb.innerHTML = feedbackHtml + `<div style="margin-top:0.5rem;"><button class="btn btn-primary" onclick="app.showNextDecision(2)">Següent Decisió ➔</button></div>`;
    }

    if (step === 2) {
      if (choice === 'B') {
        btn.classList.add('correct');
        this.state.extrinsicLevel = Math.max(5, this.state.extrinsicLevel - 30);
        this.state.relevantLevel += 20;
        feedbackHtml = `<strong>Molt bé! 📑</strong> Integrar la informació evita l'efecte de divisió de l'atenció (<em>split-attention effect</em>), evitant que el cervell hagi de saltar d'un document a l'altre.`;
        this.addXP(25);
        this.playSynthSound('correct');
      } else {
        btn.classList.add('incorrect');
        feedbackHtml = `Saltar entre 5 pestanyes fragmenta la informació i sobrecarrega la memòria de treball intentant recordar on era cada dada.`;
        this.playSynthSound('wrong');
      }
      this.updateCognitiveMeters();
      fb.className = 'feedback-box visible info';
      fb.innerHTML = feedbackHtml + `<div style="margin-top:0.5rem;"><button class="btn btn-primary" onclick="app.showNextDecision(3)">Següent Decisió ➔</button></div>`;
    }

    if (step === 3) {
      if (choice === 'B') {
        btn.classList.add('correct');
        this.state.relevantLevel += 35;
        feedbackHtml = `<strong>Excel·lent! 🚀</strong> Fer mapes conceptuals i explicar amb paraules pròpies activa la <strong>càrrega rellevant (germane)</strong>, que construeix esquemes sòlids a la memòria a llarg termini.`;
        this.addXP(30);
        this.playSynthSound('correct');
      } else {
        btn.classList.add('incorrect');
        feedbackHtml = `Rellegir o copiar paraula per paraula crea la "il·lusió de competència": sembla fàcil perquè és reconeixement passiu, però activa molt poca càrrega rellevant.`;
        this.playSynthSound('wrong');
      }
      this.updateCognitiveMeters();
      fb.className = 'feedback-box visible info';
      fb.innerHTML = feedbackHtml + `<div style="margin-top:0.5rem;"><button class="btn btn-primary" onclick="app.showNextDecision(4)">Següent Decisió ➔</button></div>`;
    }

    if (step === 4) {
      if (choice === 'B') {
        btn.classList.add('correct');
        this.state.relevantLevel += 25;
        this.state.extrinsicLevel = Math.max(5, this.state.extrinsicLevel - 15);
        feedbackHtml = `<strong>Brillant! 📈</strong> Aquest és l'<strong>Efecte dels Exemples Resolts</strong> (<em>worked examples</em>) i la <strong>retirada progressiva de la guia</strong>: per a principiants, veure un model estructurat redueix la frustració i guia la memòria de treball amb èxit!`;
        this.addXP(30);
        this.playSynthSound('success');
        this.unlockNode(10); // Exemples resolts
      } else {
        btn.classList.add('incorrect');
        feedbackHtml = `Per a principiants, intentar resoldre a cegues sense model previ satura la memòria de treball amb cerques infructuoses. Els exemples resolts són molt més eficaços.`;
        this.playSynthSound('wrong');
        this.trackWrongAnswer(10);
      }
      this.updateCognitiveMeters();
      fb.className = 'feedback-box visible success';
      fb.innerHTML = feedbackHtml;
      document.getElementById('level-4-finish-box').style.display = 'block';
    }
  }

  showNextDecision(step) {
    document.getElementById(`dec-card-${step}`).style.display = 'block';
    document.getElementById(`dec-card-${step}`).scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  updateCognitiveMeters() {
    const extFill = document.getElementById('meter-extrinsic');
    const relFill = document.getElementById('meter-relevant');
    const extLabel = document.getElementById('label-extrinsic');
    const relLabel = document.getElementById('label-relevant');

    if (extFill && relFill) {
      extFill.style.width = `${this.state.extrinsicLevel}%`;
      relFill.style.width = `${Math.min(100, this.state.relevantLevel)}%`;
      extLabel.innerText = `${this.state.extrinsicLevel}%`;
      relLabel.innerText = `${Math.min(100, this.state.relevantLevel)}%`;
    }
  }

  proceedToLevel5() {
    this.unlockScreen('screen-level-5');
    this.navigateTo('screen-level-5');
  }

  // ==========================================
  // LEVEL 5: THE 8 MEMORY HACKS
  // ==========================================
  renderHacksCards() {
    const container = document.getElementById('hacks-cards-container');
    if (!container) return;

    container.innerHTML = this.hacksData.map(h => {
      const isDone = this.state.completedHacks.has(h.id);
      return `
        <div class="hack-card ${isDone ? 'completed' : ''}" onclick="app.openHackModal(${h.id})">
          <div class="hack-card-header">
            <span style="font-size: 1.6rem;">${h.icon}</span>
            <span class="hack-status">${isDone ? '✓ Resolt' : 'Toca per obrir'}</span>
          </div>
          <div class="hack-title">${h.title}</div>
          <p style="font-size: 0.88rem; color: #475569; margin-top: 0.35rem;">${h.desc}</p>
        </div>
      `;
    }).join('');

    const counter = document.getElementById('hacks-completed-counter');
    if (counter) {
      counter.innerText = `${this.state.completedHacks.size} / 8 completats`;
    }

    const btnFinal = document.getElementById('btn-goto-final-challenge');
    if (btnFinal) {
      if (this.state.completedHacks.size >= 4) {
        btnFinal.disabled = false;
        btnFinal.classList.add('btn-primary');
      }
    }
  }

  openHackModal(hackId) {
    const hack = this.hacksData.find(h => h.id === hackId);
    if (!hack) return;

    this.state.activeHackId = hackId;
    document.getElementById('modal-hack-title').innerHTML = `${hack.icon} ${hack.title}`;
    
    const body = document.getElementById('modal-hack-body');
    body.innerHTML = `
      <div style="background: #eef2ff; padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1rem; border: 1px solid #c7d2fe;">
        <strong style="color: #4338ca;">💡 EXEMPLE D'APLICACIÓ:</strong>
        <p style="color: #1e1b4b; margin-top: 0.25rem; font-weight: 500;">${hack.example}</p>
      </div>

      <div style="background: #f8fafc; padding: 1.25rem; border-radius: var(--radius-md); border: 1.5px solid #c7d2fe;">
        <strong style="color: #0369a1;">🎯 MINI-REPTE INTERACTIU:</strong>
        <p style="color: #1e1b4b; margin: 0.5rem 0 1rem 0; font-weight: 700;">${hack.challenge.question}</p>
        
        <div class="option-list">
          ${hack.challenge.options.map((opt, idx) => `
            <button class="option-btn" onclick="app.answerHackChallenge(${idx}, this)">
              <span>${opt.text}</span>
            </button>
          `).join('')}
        </div>
        <div id="modal-hack-feedback" class="feedback-box"></div>
      </div>
    `;

    document.getElementById('hack-modal').classList.add('active');
    this.playSynthSound('click');
  }

  closeHackModal() {
    document.getElementById('hack-modal').classList.remove('active');
  }

  answerHackChallenge(optIdx, btn) {
    const hack = this.hacksData.find(h => h.id === this.state.activeHackId);
    if (!hack) return;

    const opt = hack.challenge.options[optIdx];
    const fb = document.getElementById('modal-hack-feedback');
    const buttons = document.querySelectorAll('#hack-modal .option-btn');
    buttons.forEach(b => b.disabled = true);

    if (opt.correct) {
      btn.classList.add('correct');
      fb.className = 'feedback-box visible success';
      fb.innerHTML = `<strong>Molt bé! 🎯</strong> ${opt.feedback}`;
      this.state.completedHacks.add(hack.id);
      this.renderHacksCards();
      this.addXP(30, `Hack ${hack.title} completat!`);
      this.playSynthSound('success');
      // Unlock concept nodes for specific hacks
      if (hack.id === 2) this.unlockNode(12); // Generació activa
      if (hack.id === 4) this.unlockNode(11); // Col·laboració
      if (hack.id === 7) this.unlockNode(13); // Gestió de l'estrès
    } else {
      btn.classList.add('incorrect');
      fb.className = 'feedback-box visible error';
      fb.innerHTML = `No és l'opció ideal. Recorda com funciona la càrrega cognitiva.`;
      this.playSynthSound('wrong');
    }

    setTimeout(() => {
      fb.innerHTML += `
        <div style="margin-top: 0.75rem; text-align: right;">
          <button class="btn btn-secondary" onclick="app.closeHackModal()">Tancar i continuar</button>
        </div>
      `;
    }, 400);
  }

  proceedToFinalChallenge() {
    this.unlockScreen('screen-final-challenge');
    this.navigateTo('screen-final-challenge');
  }

  // ==========================================
  // FINAL CHALLENGE: STUDY PLAN BUILDER
  // ==========================================
  setBuilderOption(category, value, btn) {
    this.state.builderSelections[category] = value;
    const col = document.getElementById(`build-col-${category}`);
    if (col) {
      col.querySelectorAll('.builder-option-btn').forEach(b => b.classList.remove('selected'));
    }
    btn.classList.add('selected');
    this.playSynthSound('click');
  }

  generateStudyPlan() {
    const { entorn, organitzacio, estrategia, colaboracio } = this.state.builderSelections;

    if (!entorn || !organitzacio || !estrategia || !colaboracio) {
      this.showToast("⚠️ Si us plau, tria una opció de cadascuna de les 4 columnes!");
      return;
    }

    const diagnosticList = document.getElementById('plan-diagnostic-list');
    let extReduced = "";
    let relIncreased = "";
    let wmMgmt = "";

    // Analysis for Environment
    if (entorn === 'mobil_lluny' || entorn === 'espai_tranquil') {
      extReduced += "✅ <strong>Entorn lliure d'estímuls nocius:</strong> Has eliminat les alertes visuals i auditives, alliberant atenció executiva.";
    } else {
      extReduced += "⚠️ <strong>Risc de sobrecàrrega extrínseca a l'entorn:</strong> Les notificacions o la música amb lletra competeixen directament amb el teu bucle fonològic de treball.";
    }

    // Analysis for Organization
    if (organitzacio === 'agrupada' || organitzacio === 'un_document') {
      extReduced += "<br>✅ <strong>Organització en Chunks:</strong> Evites la divisió de l'atenció (<em>split-attention</em>) centralitzant les dades en unitats amb significat.";
    } else {
      extReduced += "<br>⚠️ <strong>Atenció fragmentada:</strong> Tenir 10 pestanyes disperses obliga el cervell a gastar memòria de treball recordant la ubicació de cada recurs.";
    }

    // Analysis for Strategy
    if (estrategia === 'explicar' || estrategia === 'mapa' || estrategia === 'practicar' || estrategia === 'exemples') {
      relIncreased = "🚀 <strong>Màxima Càrrega Rellevant:</strong> L'estratègia triada requereix processament actiu profund (generació d'esquemes, recuperació activa i autoexplicació). Això consolida l'aprenentatge a la memòria a llarg termini!";
    } else {
      relIncreased = "⚠️ <strong>Baixa Càrrega Rellevant:</strong> La relectura passiva sol generar la 'il·lusió de saber', però no construeix esquemes neuronals sòlids.";
    }

    // Analysis for Collaboration & WM
    if (colaboracio === 'company') {
      wmMgmt = "🧠👥 <strong>Gestió compartida de la memòria de treball:</strong> Explicar-ho a una altra persona permet detectar mancances de comprensió i co-construir esquemes.";
    } else {
      wmMgmt = "🧠🧘 <strong>Focus individual concentrat:</strong> Permet un ritme personalitzat sense distraccions socials.";
    }

    diagnosticList.innerHTML = `
      <div class="diagnostic-item">
        <div class="diagnostic-icon">🗑️</div>
        <div class="diagnostic-content">
          <h4>Càrrega Extrínseca (Soroll i Distraccions)</h4>
          <p>${extReduced}</p>
        </div>
      </div>

      <div class="diagnostic-item">
        <div class="diagnostic-icon">🚀</div>
        <div class="diagnostic-content">
          <h4>Càrrega Rellevant (Aprenentatge Profund)</h4>
          <p>${relIncreased}</p>
        </div>
      </div>

      <div class="diagnostic-item">
        <div class="diagnostic-icon">🧠</div>
        <div class="diagnostic-content">
          <h4>Gestió de la Memòria de Treball (Taula Mental)</h4>
          <p>${wmMgmt}</p>
        </div>
      </div>
    `;

    document.getElementById('plan-output-container').style.display = 'block';
    document.getElementById('plan-output-container').scrollIntoView({ behavior: 'smooth' });
    this.addXP(60, "Pla d'estudi auditat amb èxit!");
    this.playSynthSound('success');
    this.unlockNode(14, true); // Aplicació real - sempre primer intent (és disseny, no test)
  }

  proceedToReflection() {
    this.unlockScreen('screen-reflection');
    this.navigateTo('screen-reflection');
  }

  // ==========================================
  // REFLECTION & COMPLETION
  // ==========================================
  submitReflection() {
    const name = document.getElementById('ref-name').value.trim();
    const subject = document.getElementById('ref-subject').value.trim();
    const change = document.getElementById('ref-change').value.trim();
    const concept = document.getElementById('ref-concept').value.trim();

    if (!name || !subject || !change || !concept) {
      this.showToast("⚠️ Si us plau, omple tots els camps de reflexió!");
      return;
    }

    this.state.reflectionData = { name, subject, change, concept };

    // Fill completion screen
    document.getElementById('final-student-name').innerText = name;
    document.getElementById('final-xp-score').innerText = `${this.state.xp + 100} XP`;
    document.getElementById('dossier-subject').innerText = subject;
    document.getElementById('dossier-change').innerText = change;
    document.getElementById('dossier-concept').innerText = concept;

    const b = this.state.builderSelections;
    document.getElementById('dossier-session-summary').innerHTML = `
      • <strong>Entorn:</strong> ${b.entorn || 'Espai net sense mòbil'}<br>
      • <strong>Organització:</strong> ${b.organitzacio || 'Informació agrupada'}<br>
      • <strong>Estratègia:</strong> ${b.estrategia || 'Pràctica activa i explicació'}<br>
      • <strong>Col·laboració:</strong> ${b.colaboracio || 'Individual / Co-explicació'}
    `;

    this.addXP(100, "Reflexió completada!");
    this.updateNeuralStats();
    this.unlockScreen('screen-completion');
    this.navigateTo('screen-completion');
    this.playSynthSound('success');
  }

  copyDossierToClipboard() {
    const d = this.state.reflectionData;
    const b = this.state.builderSelections;
    const nn = this.state.neuralNet;
    const nodesUnlocked = Object.values(nn.nodes).filter(n => n.unlocked).length;
    const firstTryNodes = Object.values(nn.nodes).filter(n => n.unlocked && n.firstTry).length;
    const connCount = nn.connections.size;
    const rigor = nodesUnlocked > 0 ? `${Math.round((firstTryNodes / nodesUnlocked) * 100)}%` : '—';

    const text = `
=== HACK YOUR MEMORY 🧠 | INFORME D'APRENENTATGE ===
Alumne/a: ${d.name}
Punts d'Aprenentatge (XP): ${this.state.xp} XP

🧠 XARXA DE CONEIXEMENT:
- Conceptes consolidats: ${nodesUnlocked}/14
- Connexions construïdes: ${connCount}/13
- Rigor de justificacions (1r intent): ${rigor}

1. ASSIGNATURA TRIADA:
${d.subject}

2. CANVI CONCRET EN LA MANERA D'ESTUDIAR:
${d.change}

3. JUSTIFICACIÓ TEÒRICA (CÀRREGA COGNITIVA):
${d.concept}

4. DISSENY DE SESSIÓ D'ESTUDI ÒPTIMA:
- Entorn: ${b.entorn || 'Espai net sense mòbil'}
- Organització: ${b.organitzacio || 'Informació agrupada en chunks'}
- Estratègia activa: ${b.estrategia || 'Pràctica activa i mapes conceptuals'}
- Col·laboració: ${b.colaboracio || 'Estudi focalitzat'}
====================================================
    `.trim();

    navigator.clipboard.writeText(text).then(() => {
      this.showToast("📋 Informe copiat al porta-retalls!");
    }).catch(() => {
      this.showToast("No s'ha pogut copiar automàticament.");
    });
  }

  resetAll() {
    if (confirm("Vols reiniciar el progrés i tornar a la pantalla inicial?")) {
      window.location.reload();
    }
  }

  // ============================================================
  // NEURAL NETWORK SYSTEM
  // ============================================================

  trackWrongAnswer(nodeId) {
    if (!this.state.neuralNet.nodes[nodeId]?.unlocked) {
      this.state.neuralNet.wrongFirstNodes.add(nodeId);
    }
  }

  unlockNode(nodeId, isFirstTryOverride = null) {
    const nn = this.state.neuralNet;
    if (nn.nodes[nodeId]?.unlocked) return; // Already unlocked

    const isFirstTry = isFirstTryOverride !== null
      ? isFirstTryOverride
      : !nn.wrongFirstNodes.has(nodeId);

    nn.nodes[nodeId] = { unlocked: true, firstTry: isFirstTry };

    // Check for new connections
    const newConns = this.checkNewConnections(nodeId);

    // Show appropriate toast
    if (newConns.length > 0) {
      this.showNodeToast('connection', this.nodeDefinitions.find(n => n.id === nodeId)?.label || '');
    } else {
      this.showNodeToast('concept', this.nodeDefinitions.find(n => n.id === nodeId)?.label || '');
    }

    this.renderNeuralNet();
    this.updateNeuralStats();
  }

  checkNewConnections(newNodeId) {
    const nn = this.state.neuralNet;
    const newConns = [];

    this.connectionDefinitions.forEach(([a, b]) => {
      const key = `${Math.min(a, b)}-${Math.max(a, b)}`;
      if (!nn.connections.has(key)) {
        const nodeAOk = nn.nodes[a]?.unlocked;
        const nodeBOk = nn.nodes[b]?.unlocked;
        if (nodeAOk && nodeBOk) {
          nn.connections.add(key);
          newConns.push(key);
        }
      }
    });

    return newConns;
  }

  showNodeToast(type, label) {
    const toast = document.getElementById('node-toast');
    const toastIcon = document.getElementById('node-toast-icon');
    const toastType = document.getElementById('node-toast-type');
    const toastLabel = document.getElementById('node-toast-label');
    if (!toast) return;

    toast.classList.remove('show', 'connection-type');
    toastType.classList.remove('connection-color');

    if (type === 'connection') {
      toastIcon.textContent = '🔗';
      toastType.textContent = 'NOVA CONNEXIÓ';
      toastType.classList.add('connection-color');
      toast.classList.add('connection-type');
    } else {
      toastIcon.textContent = '⚡';
      toastType.textContent = 'CONCEPTE CONSOLIDAT';
    }
    toastLabel.textContent = label;

    // Trigger reflow then show
    void toast.offsetWidth;
    toast.classList.add('show');
    clearTimeout(this._nodeToastTimer);
    this._nodeToastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
  }

  scrollToNeuron() {
    const board = document.getElementById('persistent-neural-board');
    if (board) {
      board.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.playSynthSound('click');
    }
  }

  toggleNeuralPanel() {
    this.scrollToNeuron();
  }

  updateNeuralStats() {
    const nn = this.state.neuralNet;
    const nodesUnlocked = Object.values(nn.nodes).filter(n => n.unlocked).length;
    const firstTryNodes = Object.values(nn.nodes).filter(n => n.unlocked && n.firstTry).length;
    const connCount = nn.connections.size;
    const rigor = nodesUnlocked > 0 ? Math.round((firstTryNodes / nodesUnlocked) * 100) : null;

    const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setEl('nn-nodes-count', nodesUnlocked);
    setEl('nn-header-nodes', nodesUnlocked);
    setEl('nn-conn-count', connCount);
    setEl('nn-rigor-pct', rigor !== null ? `${rigor}%` : '—');

    // Completion screen stats
    setEl('nn-final-nodes', `${nodesUnlocked}/14`);
    setEl('nn-final-conns', `${connCount}/18`);
    setEl('nn-final-rigor', rigor !== null ? `${rigor}%` : '—');
  }

  renderNeuralNet() {
    const svg = document.getElementById('neural-net-svg');
    if (!svg) return;

    const nn = this.state.neuralNet;

    // Clear previous elements
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const SVG_NS = 'http://www.w3.org/2000/svg';
    const mk = (tag) => document.createElementNS(SVG_NS, tag);

    // ── 1. DEFS, GLOW FILTERS & CYBER GRADIENTS ─────────────────────
    const defs = mk('defs');
    defs.innerHTML = `
      <filter id="cyber-glow-cyan" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" result="blur"/>
        <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0   0 1 0 0 0.9   1 1 1 0 1   0 0 0 0.9 0" result="cyanGlow"/>
        <feMerge><feMergeNode in="cyanGlow"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="cyber-glow-gold" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5.5" result="blur"/>
        <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0.9   0.7 0 0 0 0.6   0 0 0 0 0   0 0 0 1 0" result="goldGlow"/>
        <feMerge><feMergeNode in="goldGlow"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="cyber-brain-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>

      <!-- Holographic brain fill gradient -->
      <linearGradient id="grad-brain-holo" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0284c7" stop-opacity="0.16"/>
        <stop offset="45%" stop-color="#38bdf8" stop-opacity="0.08"/>
        <stop offset="85%" stop-color="#6366f1" stop-opacity="0.14"/>
        <stop offset="100%" stop-color="#a855f7" stop-opacity="0.08"/>
      </linearGradient>

      <!-- Active Node Gradients -->
      <radialGradient id="grad-core-cyan" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#e0f2fe"/>
        <stop offset="35%" stop-color="#38bdf8"/>
        <stop offset="100%" stop-color="#0284c7"/>
      </radialGradient>

      <radialGradient id="grad-core-gold" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#fffbeb"/>
        <stop offset="35%" stop-color="#f59e0b"/>
        <stop offset="100%" stop-color="#b45309"/>
      </radialGradient>
    `;
    svg.appendChild(defs);

    // ── 2. CYBER BRAIN SILHOUETTE & ANATOMICAL CIRCUIT TRACKS ───────
    const brainBgGroup = mk('g');
    brainBgGroup.setAttribute('class', 'cyber-brain-anatomy');

    // Brain lateral profile silhouette path (ViewBox: 0 0 1000 520)
    const brainContour = mk('path');
    brainContour.setAttribute('d', `
      M 90 260
      C 80 170, 150 85, 290 60
      C 400 40, 580 40, 720 70
      C 830 95, 930 160, 930 250
      C 930 320, 890 380, 830 395
      C 770 435, 690 430, 640 395
      C 610 380, 580 420, 550 465
      L 510 465
      C 490 410, 460 385, 390 395
      C 320 410, 240 400, 190 350
      C 170 320, 140 330, 110 305
      C 95 285, 90 275, 90 260 Z
    `);
    brainContour.setAttribute('fill', 'url(#grad-brain-holo)');
    brainContour.setAttribute('stroke', '#38bdf8');
    brainContour.setAttribute('stroke-width', '2.5');
    brainContour.setAttribute('class', 'brain-contour-glow');
    brainBgGroup.appendChild(brainContour);

    // Cerebellar folds & Brainstem accent
    const brainstem = mk('path');
    brainstem.setAttribute('d', `
      M 530 465 L 530 495
      M 550 465 L 550 495
      M 640 395 C 690 435, 770 435, 830 395
      M 670 410 C 720 440, 780 430, 820 400
    `);
    brainstem.setAttribute('stroke', 'rgba(56, 189, 248, 0.28)');
    brainstem.setAttribute('stroke-width', '2');
    brainstem.setAttribute('fill', 'none');
    brainBgGroup.appendChild(brainstem);

    // Cerebral Gyri & Sulci (Folds) represented as cyber holographic circuit traces
    const gyriCircuits = mk('path');
    gyriCircuits.setAttribute('d', `
      M 200 100 C 230 180, 190 210, 280 220
      M 280 90  C 310 160, 310 210, 360 210
      M 380 60  C 390 140, 360 180, 430 190
      M 480 60  C 480 130, 460 170, 540 180
      M 580 60  C 590 140, 560 190, 650 200
      M 690 85  C 710 150, 700 210, 780 220
      M 800 120 C 820 180, 790 250, 880 250
      M 230 330 C 290 320, 320 280, 360 300
      M 350 350 C 420 340, 460 290, 520 310
      M 530 370 C 580 340, 640 320, 700 310
      M 190 350 C 240 380, 310 370, 380 360
    `);
    gyriCircuits.setAttribute('class', 'brain-gyri-circuit');
    brainBgGroup.appendChild(gyriCircuits);

    // Lobe Telemetry HUD Banners / Badges
    const lobeLabels = [
      { text: "[ CÒRTEX PREFRONTAL · ATENCIÓ & MEMÒRIA ]", x: 200, y: 38 },
      { text: "[ LÒBUL PARIETAL · CHUNKING & DÍGITS ]", x: 505, y: 32 },
      { text: "[ CORE COGNITIU · CÀRREGA CENTRAL ]", x: 450, y: 205 },
      { text: "[ HIPOCAMP TEMPORAL · AUTOEXPLICACIÓ ]", x: 500, y: 440 },
      { text: "[ CÒRTEX D'INTEGRACIÓ · EXECUTIU ]", x: 820, y: 55 }
    ];
    lobeLabels.forEach(l => {
      const g = mk('g');
      const t = mk('text');
      t.setAttribute('x', l.x);
      t.setAttribute('y', l.y);
      t.setAttribute('text-anchor', 'middle');
      t.setAttribute('font-family', 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace');
      t.setAttribute('font-size', '8.5');
      t.setAttribute('font-weight', '800');
      t.setAttribute('letter-spacing', '0.08em');
      t.setAttribute('fill', '#38bdf8');
      t.setAttribute('opacity', '0.85');
      t.textContent = l.text;
      g.appendChild(t);
      brainBgGroup.appendChild(g);
    });

    svg.appendChild(brainBgGroup);

    // ── 3. SYNAPSE LASER CONDUITS (CONNECTIONS LAYER) ──────────────
    const connsGroup = mk('g');
    connsGroup.setAttribute('class', 'cyber-connections-layer');

    this.connectionDefinitions.forEach(([a, b]) => {
      const nA = this.nodeDefinitions.find(n => n.id === a);
      const nB = this.nodeDefinitions.find(n => n.id === b);
      if (!nA || !nB) return;

      const key = `${Math.min(a, b)}-${Math.max(a, b)}`;
      const isActive = nn.connections.has(key);
      const nodeAFirst = nn.nodes[a]?.firstTry;
      const nodeBFirst = nn.nodes[b]?.firstTry;
      const isGold = isActive && nodeAFirst && nodeBFirst;

      // Cubic Bézier for organic, sleek technological curve
      const dx = nB.x - nA.x;
      const cx1 = nA.x + dx * 0.45;
      const cy1 = nA.y;
      const cx2 = nA.x + dx * 0.55;
      const cy2 = nB.y;

      const path = mk('path');
      path.setAttribute('d', `M ${nA.x} ${nA.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${nB.x} ${nB.y}`);
      path.setAttribute('class', isActive 
        ? (isGold ? 'cyber-synapse-beam cyber-beam-gold' : 'cyber-synapse-beam cyber-beam-active')
        : 'cyber-synapse-beam cyber-beam-inactive');

      connsGroup.appendChild(path);
    });
    svg.appendChild(connsGroup);

    // ── 4. CYBER SKILL-TREE NODES (SKILL HUBS) ──────────────────────
    const nodesGroup = mk('g');
    nodesGroup.setAttribute('class', 'cyber-nodes-layer');

    this.nodeDefinitions.forEach(nodeDef => {
      const nodeState = nn.nodes[nodeDef.id];
      const isUnlocked = nodeState?.unlocked;
      const isFirstTry = nodeState?.firstTry;
      const isBossNode = nodeDef.id === 14;
      const radius = isBossNode ? 24 : (nodeDef.lobe === 'core' ? 22 : 19);

      const g = mk('g');
      g.setAttribute('class', 'cyber-node-group');
      g.onclick = () => {
        const tier = isFirstTry ? 'TIER LLEGENDA (1r intent · Màxim rigor)' : (isUnlocked ? 'TIER COMPLETAT (Sincronitzat)' : 'CIRCUIT BLOQUEJAT');
        this.showToast(`🎮 [${tier}] ${nodeDef.label}`);
        this.playSynthSound(isUnlocked ? 'cyber-unlock' : 'click');
      };

      // Outer sci-fi targeting halo when unlocked
      if (isUnlocked) {
        const ring = mk('circle');
        ring.setAttribute('cx', nodeDef.x);
        ring.setAttribute('cy', nodeDef.y);
        ring.setAttribute('r', radius + 11);
        ring.setAttribute('fill', isFirstTry ? 'rgba(245, 158, 11, 0.22)' : 'rgba(0, 240, 255, 0.18)');
        ring.setAttribute('stroke', isFirstTry ? 'rgba(245, 158, 11, 0.6)' : 'rgba(0, 240, 255, 0.5)');
        ring.setAttribute('stroke-width', '1.5');
        ring.setAttribute('stroke-dasharray', '5, 3');
        ring.setAttribute('class', 'cyber-halo-pulse');
        g.appendChild(ring);
      }

      // Sci-fi Node Core
      const core = mk('circle');
      core.setAttribute('cx', nodeDef.x);
      core.setAttribute('cy', nodeDef.y);
      core.setAttribute('r', radius);
      core.setAttribute('class', isUnlocked ? 'cyber-node-core active' : 'cyber-node-core offline');

      if (isUnlocked) {
        core.setAttribute('fill', isFirstTry ? 'url(#grad-core-gold)' : 'url(#grad-core-cyan)');
        core.setAttribute('stroke', isFirstTry ? '#fbbf24' : '#00f0ff');
        core.setAttribute('stroke-width', '2.5');
        core.setAttribute('filter', isFirstTry ? 'url(#cyber-glow-gold)' : 'url(#cyber-glow-cyan)');
      } else {
        core.setAttribute('fill', '#091124');
        core.setAttribute('stroke', '#334155');
        core.setAttribute('stroke-width', '1.8');
        core.setAttribute('stroke-dasharray', '4, 3');
      }
      g.appendChild(core);

      // Node Icon / Emoji or Node ID
      const iconTxt = mk('text');
      iconTxt.setAttribute('x', nodeDef.x);
      iconTxt.setAttribute('y', nodeDef.y + (isUnlocked ? 5 : 4));
      iconTxt.setAttribute('text-anchor', 'middle');
      iconTxt.setAttribute('font-size', isUnlocked ? (isBossNode ? '16' : '13') : '10');
      iconTxt.setAttribute('font-weight', '900');
      iconTxt.setAttribute('font-family', 'ui-monospace, monospace');
      iconTxt.setAttribute('fill', isUnlocked ? '#ffffff' : '#64748b');
      iconTxt.textContent = isUnlocked ? nodeDef.emoji : `#${nodeDef.id}`;
      g.appendChild(iconTxt);

      // Sci-fi Pill Badge Below
      const pillW = 90;
      const pillH = 26;
      const pillX = nodeDef.x - (pillW / 2);
      const pillY = nodeDef.y + radius + 7;

      const pillRect = mk('rect');
      pillRect.setAttribute('x', pillX);
      pillRect.setAttribute('y', pillY);
      pillRect.setAttribute('width', pillW);
      pillRect.setAttribute('height', pillH);
      pillRect.setAttribute('rx', '4');
      pillRect.setAttribute('fill', '#070f24');
      pillRect.setAttribute('stroke', isUnlocked ? (isFirstTry ? '#f59e0b' : '#38bdf8') : '#1e293b');
      pillRect.setAttribute('stroke-width', '1.4');
      g.appendChild(pillRect);

      // Concept Text lines
      const labelColor = isUnlocked ? '#f8fafc' : '#64748b';
      nodeDef.short.forEach((line, i) => {
        const lbl = mk('text');
        lbl.setAttribute('x', nodeDef.x);
        lbl.setAttribute('y', pillY + 10 + (i * 10));
        lbl.setAttribute('text-anchor', 'middle');
        lbl.setAttribute('font-size', '8');
        lbl.setAttribute('font-weight', isUnlocked ? '800' : '600');
        lbl.setAttribute('font-family', 'ui-monospace, SFMono-Regular, monospace');
        lbl.setAttribute('fill', labelColor);
        lbl.textContent = line;
        g.appendChild(lbl);
      });

      nodesGroup.appendChild(g);
    });

    svg.appendChild(nodesGroup);
  }
}

// Instantiate App
window.app = new MemoryHackApp();
