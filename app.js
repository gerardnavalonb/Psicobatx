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
      },

      // Learning Process Analytics & Telemetry (Silent Tracking)
      analytics: {
        startTime: Date.now(),
        taskStarts: {},         // taskId -> timestamp
        taskMetrics: {},        // taskId -> { attempts: int, initialResp: any, finalResp: any, timeFirst: int, timeTotal: int, timeReview: int, changedAfterFeedback: bool, errors: int, solvedAfterHint: bool }
        feedbackTimestamps: {}, // taskId -> timestamp when feedback was displayed
        hintsUsed: 0,
        activitiesCompletedNoHelp: 0,
        activitiesSolvedAfterFeedback: 0,
        conceptDifficulties: {
          extrinseca: { attempts: 0, errors: 0, firstTry: true, consolidated: false },
          intrinseca: { attempts: 0, errors: 0, firstTry: true, consolidated: false },
          rellevant: { attempts: 0, errors: 0, firstTry: true, consolidated: false },
          chunking: { attempts: 0, errors: 0, firstTry: true, consolidated: false },
          miller: { attempts: 0, errors: 0, firstTry: true, consolidated: false },
          memoriaTreball: { attempts: 0, errors: 0, firstTry: true, consolidated: false },
          workedExamples: { attempts: 0, errors: 0, firstTry: true, consolidated: false },
          planificacio: { attempts: 0, errors: 0, firstTry: true, consolidated: false }
        }
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
    // Lateral Brain Anatomy (14 Interlocking Puzzle Sectors)
    // ViewBox: 0 0 960 520
    // ============================================================
    this.nodeDefinitions = [
      // PREFRONTAL LOBE (Front/Left) - Working Memory & Inhibition
      { 
        id: 7, emoji: "🚨", label: "Càrrega extrínseca", short: ["Càrrega", "extrínseca"], 
        x: 155, y: 175, lobe: "prefrontal",
        sectorPath: "M 110 240 C 100 190, 130 130, 180 110 C 220 130, 220 190, 190 230 C 160 245, 130 250, 110 240 Z",
        gyriPath: "M 130 170 C 155 160, 165 190, 185 180"
      },
      { 
        id: 9, emoji: "🔕", label: "Atenció & Inhibició", short: ["Atenció &", "Inhibició"], 
        x: 265, y: 100, lobe: "prefrontal",
        sectorPath: "M 180 110 C 220 70, 280 50, 340 65 C 330 125, 270 150, 200 120 Z",
        gyriPath: "M 220 90 C 260 80, 280 110, 320 95"
      },
      { 
        id: 1, emoji: "🧠", label: "Memòria de treball", short: ["Memòria de", "treball"], 
        x: 255, y: 220, lobe: "prefrontal",
        sectorPath: "M 190 230 C 220 190, 270 150, 330 170 C 335 220, 290 270, 240 280 C 210 270, 195 250, 190 230 Z",
        gyriPath: "M 220 220 C 250 200, 270 230, 310 210"
      },
      { 
        id: 2, emoji: "🛑", label: "Capacitat limitada", short: ["Capacitat", "limitada"], 
        x: 170, y: 290, lobe: "prefrontal",
        sectorPath: "M 110 240 C 130 250, 190 250, 240 280 C 220 330, 180 340, 140 310 C 110 280, 110 260, 110 240 Z",
        gyriPath: "M 140 280 C 170 270, 180 300, 210 290"
      },

      // PARIETAL LOBE (Top/Center) - Numerical & Chunking
      { 
        id: 3, emoji: "🔢", label: "Llei de Miller (7±2)", short: ["Miller", "(7±2)"], 
        x: 400, y: 85, lobe: "parietal",
        sectorPath: "M 340 65 C 380 45, 430 40, 460 80 C 440 125, 390 135, 330 110 Z",
        gyriPath: "M 360 80 C 390 70, 410 100, 440 90"
      },
      { 
        id: 4, emoji: "🧩", label: "Chunking (Agrupació)", short: ["Chunking", "(Agrupació)"], 
        x: 530, y: 85, lobe: "parietal",
        sectorPath: "M 460 80 C 500 40, 570 45, 600 85 C 570 130, 500 125, 460 80 Z",
        gyriPath: "M 480 75 C 510 65, 540 95, 580 80"
      },
      { 
        id: 6, emoji: "🧱", label: "Càrrega intrínseca", short: ["Càrrega", "intrínseca"], 
        x: 665, y: 110, lobe: "parietal",
        sectorPath: "M 600 85 C 650 55, 710 70, 730 115 C 690 155, 620 150, 600 85 Z",
        gyriPath: "M 620 95 C 650 85, 680 120, 710 105"
      },

      // CORE COGNITIU (Deep Central / Cingulate) - Synthesis & Load
      { 
        id: 5, emoji: "⚖️", label: "Càrrega cognitiva", short: ["Càrrega", "cognitiva"], 
        x: 385, y: 190, lobe: "core",
        sectorPath: "M 330 170 C 340 125, 400 135, 440 155 C 440 210, 390 240, 340 220 C 330 200, 330 180, 330 170 Z",
        gyriPath: "M 350 180 C 380 170, 390 200, 420 185"
      },
      { 
        id: 8, emoji: "🚀", label: "Càrrega rellevant", short: ["Càrrega", "rellevant"], 
        x: 500, y: 205, lobe: "core",
        sectorPath: "M 440 155 C 480 145, 530 155, 560 185 C 550 235, 490 255, 440 210 Z",
        gyriPath: "M 460 180 C 490 170, 510 200, 540 195"
      },

      // TEMPORAL LOBE & HIPPOCAMPUS (Bottom/Center) - Semantic & Long-Term
      { 
        id: 13, emoji: "😌", label: "Gestió de l'estrès", short: ["Control", "de l'estrès"], 
        x: 285, y: 330, lobe: "temporal",
        sectorPath: "M 240 280 C 290 270, 330 290, 350 330 C 310 380, 240 370, 220 330 Z",
        gyriPath: "M 250 320 C 280 310, 300 340, 330 335"
      },
      { 
        id: 12, emoji: "✍️", label: "Generació activa", short: ["Autoexplicar", "i escriure"], 
        x: 435, y: 330, lobe: "temporal",
        sectorPath: "M 350 330 C 380 280, 460 270, 520 300 C 510 360, 430 380, 350 330 Z",
        gyriPath: "M 380 330 C 410 315, 440 345, 480 330"
      },

      // OCCIPITAL & INTEGRATION / EXECUTIVE OUTPUT (Right)
      { 
        id: 10, emoji: "📈", label: "Exemples resolts", short: ["Exemples", "resolts"], 
        x: 775, y: 160, lobe: "occipital",
        sectorPath: "M 730 115 C 770 100, 830 140, 845 195 C 795 210, 750 195, 700 155 Z",
        gyriPath: "M 750 140 C 770 130, 800 160, 825 150"
      },
      { 
        id: 11, emoji: "👥", label: "Col·laboració", short: ["Aprendre en", "parella"], 
        x: 805, y: 255, lobe: "occipital",
        sectorPath: "M 845 195 C 855 245, 830 295, 780 310 C 750 265, 760 220, 795 210 Z",
        gyriPath: "M 810 225 C 830 240, 810 270, 790 275"
      },
      { 
        id: 14, emoji: "🎯", label: "Aplicació real", short: ["Pla d'estudi", "personal"], 
        x: 720, y: 375, lobe: "executive",
        sectorPath: "M 780 310 C 810 360, 770 415, 690 425 C 630 410, 640 350, 690 325 C 730 330, 760 315, 780 310 Z",
        gyriPath: "M 710 355 C 740 345, 760 375, 780 365 M 670 385 C 700 375, 720 405, 750 395"
      }
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
    this.recordTaskStart('trial-1');
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
        this.recordTaskStart('trial-1-recall');
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

    this.recordResponse('trial-1', val, matches === 7, { matches, total: 7, isCorrect: matches >= 5 });
    if (matches >= 5) {
      this.state.analytics.conceptDifficulties.memoriaTreball.consolidated = true;
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
    this.recordTaskStart('trial-2');
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

    this.recordResponse('trial-2', val, matches === 11, { matches, total: 11 });

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
    this.recordTaskStart('reflection-1');
  }

  answerReflection1(option, btn) {
    const fb = document.getElementById('feedback-reflection-1');
    const buttons = document.querySelectorAll('#options-reflection-1 .option-btn');
    buttons.forEach(b => b.disabled = true);

    const isCorrect = (option === 'A');
    this.recordResponse('reflection-1', option, isCorrect, { option });
    if (isCorrect) {
      this.state.analytics.conceptDifficulties.miller.consolidated = true;
    } else {
      this.state.analytics.conceptDifficulties.miller.errors++;
    }

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
    this.recordTaskStart('unlock-1-q1');
    this.recordTaskStart('unlock-1-q2');
    this.recordTaskStart('unlock-1-q3');
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

    // Record response telemetry
    const taskId = `unlock-1-q${qNum}`;
    this.recordResponse(taskId, choice, isCorrect, { qNum });

    // Track concept difficulties
    if (qNum === 1) {
      if (isCorrect) this.state.analytics.conceptDifficulties.memoriaTreball.consolidated = true;
      else this.state.analytics.conceptDifficulties.memoriaTreball.errors++;
    } else if (qNum === 2 || qNum === 3) {
      if (isCorrect) this.state.analytics.conceptDifficulties.chunking.consolidated = true;
      else this.state.analytics.conceptDifficulties.chunking.errors++;
    }

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
      this.recordFeedbackTimestamp('unlock-1-retry');
    }
  }

  resetUnlock1() {
    this.state.unlock1Answers = {};
    for (let i = 1; i <= 3; i++) {
      this.recordTaskStart(`unlock-1-q${i}`);
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

    this.recordTaskStart(`classifier-${this.state.level3Index}`);
  }

  classifyScenario(choice) {
    const sc = this.scenariosLevel3[this.state.level3Index];
    const isCorrect = (choice === sc.type);
    const taskId = `classifier-${this.state.level3Index}`;
    this.recordResponse(taskId, choice, isCorrect, { scenarioType: sc.type });

    // Track concept difficulties
    if (sc.type === 'EXTRÍNSECA') {
      if (isCorrect) this.state.analytics.conceptDifficulties.extrinseca.consolidated = true;
      else this.state.analytics.conceptDifficulties.extrinseca.errors++;
    } else if (sc.type === 'INTRÍNSECA') {
      if (isCorrect) this.state.analytics.conceptDifficulties.intrinseca.consolidated = true;
      else this.state.analytics.conceptDifficulties.intrinseca.errors++;
    } else if (sc.type === 'RELLEVANT') {
      if (isCorrect) this.state.analytics.conceptDifficulties.rellevant.consolidated = true;
      else this.state.analytics.conceptDifficulties.rellevant.errors++;
    }

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
    this.recordFeedbackTimestamp(taskId);
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
    this.recordTaskStart('decision-1');
  }

  // ==========================================
  // LEVEL 4: STUDY SESSION SIMULATOR
  // ==========================================
  makeDecision(step, choice, btn) {
    const card = document.getElementById(`dec-card-${step}`);
    const buttons = card.querySelectorAll('.option-btn');
    buttons.forEach(b => b.disabled = true);
    btn.classList.add('selected');

    const taskId = `decision-${step}`;
    const fb = document.getElementById(`dec-feedback-${step}`);
    let feedbackHtml = '';

    if (step === 1) {
      const isCorrect = (choice === 'C');
      this.recordResponse(taskId, choice, isCorrect, { step, choice });
      if (isCorrect) {
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
      const isCorrect = (choice === 'B');
      this.recordResponse(taskId, choice, isCorrect, { step, choice });
      if (isCorrect) {
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
      const isCorrect = (choice === 'B');
      this.recordResponse(taskId, choice, isCorrect, { step, choice });
      if (isCorrect) {
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
      const isCorrect = (choice === 'B');
      this.recordResponse(taskId, choice, isCorrect, { step, choice });
      if (isCorrect) {
        this.state.analytics.conceptDifficulties.workedExamples.consolidated = true;
        btn.classList.add('correct');
        this.state.relevantLevel += 25;
        this.state.extrinsicLevel = Math.max(5, this.state.extrinsicLevel - 15);
        feedbackHtml = `<strong>Brillant! 📈</strong> Aquest és l'<strong>Efecte dels Exemples Resolts</strong> (<em>worked examples</em>) i la <strong>retirada progressiva de la guia</strong>: per a principiants, veure un model estructurat redueix la frustració i guia la memòria de treball amb èxit!`;
        this.addXP(30);
        this.playSynthSound('success');
        this.unlockNode(10); // Exemples resolts
      } else {
        this.state.analytics.conceptDifficulties.workedExamples.errors++;
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

    this.recordFeedbackTimestamp(taskId);
  }

  showNextDecision(step) {
    this.recordTaskStart(`decision-${step}`);
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
    this.recordTaskStart(`hack-${hackId}`);
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
    const taskId = `hack-${hack.id}`;
    this.recordResponse(taskId, optIdx, opt.correct, { hackId: hack.id, optText: opt.text });

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

    this.recordFeedbackTimestamp(taskId);

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
    this.state.analytics.conceptDifficulties.planificacio.consolidated = true;
    this.recordResponse('final-builder', this.state.builderSelections, true, { selections: this.state.builderSelections });
  }

  proceedToReflection() {
    this.unlockScreen('screen-reflection');
    this.navigateTo('screen-reflection');
    this.recordTaskStart('reflection-text');
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

    // Record reflection telemetry
    this.recordResponse('reflection-text', { change, concept }, true, {
      subject,
      changeWords: change.split(/\s+/).length,
      conceptWords: concept.split(/\s+/).length
    });

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
    
    // Compute and Render Comprehensive Learning Analytics
    this.generateLearningReport();

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
    const brainPct = Math.round((nodesUnlocked / 14) * 100);

    const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setEl('nn-nodes-count', nodesUnlocked);
    setEl('nn-header-nodes', nodesUnlocked);
    setEl('nn-conn-count', connCount);
    setEl('nn-rigor-pct', rigor !== null ? `${rigor}%` : '—');

    // Brain Power HUD Completion Bar
    const powerFill = document.getElementById('brain-power-fill');
    const powerPct = document.getElementById('brain-power-pct');
    if (powerFill) powerFill.style.width = `${brainPct}%`;
    if (powerPct) powerPct.textContent = `${brainPct}% (${nodesUnlocked} / 14 sectors completats)`;

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

    // ── 1. DEFS & HOLOGRAPHIC LOBE GRADIENTS ─────────────────────────
    const defs = mk('defs');
    defs.innerHTML = `
      <filter id="cyber-glow-cyan" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="cyber-glow-gold" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur"/>
        <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0.9   0.7 0 0 0 0.6   0 0 0 0 0   0 0 0 1 0" result="goldGlow"/>
        <feMerge><feMergeNode in="goldGlow"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>

      <!-- Lobe-specific biological fills when unlocked -->
      <linearGradient id="grad-prefrontal" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#38bdf8"/>
        <stop offset="100%" stop-color="#0284c7"/>
      </linearGradient>

      <linearGradient id="grad-parietal" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#c084fc"/>
        <stop offset="100%" stop-color="#7c3aed"/>
      </linearGradient>

      <linearGradient id="grad-core" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fde047"/>
        <stop offset="100%" stop-color="#d97706"/>
      </linearGradient>

      <linearGradient id="grad-temporal" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#34d399"/>
        <stop offset="100%" stop-color="#059669"/>
      </linearGradient>

      <linearGradient id="grad-occipital" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fb7185"/>
        <stop offset="100%" stop-color="#e11d48"/>
      </linearGradient>

      <linearGradient id="grad-executive" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f43f5e"/>
        <stop offset="100%" stop-color="#be123c"/>
      </linearGradient>

      <linearGradient id="grad-gold-master" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fef08a"/>
        <stop offset="50%" stop-color="#f59e0b"/>
        <stop offset="100%" stop-color="#b45309"/>
      </linearGradient>
    `;
    svg.appendChild(defs);

    // ── 2. BASE BRAIN BLUEPRINT SILHOUETTE (OUTLINE) ─────────────────
    const baseGroup = mk('g');
    baseGroup.setAttribute('class', 'brain-base-blueprint');

    // Brainstem
    const brainstem = mk('path');
    brainstem.setAttribute('d', 'M 520 360 C 560 360, 570 400, 560 450 L 515 450 C 510 410, 510 380, 520 360 Z');
    brainstem.setAttribute('fill', 'rgba(15, 23, 42, 0.85)');
    brainstem.setAttribute('stroke', 'rgba(56, 189, 248, 0.3)');
    brainstem.setAttribute('stroke-width', '2');
    baseGroup.appendChild(brainstem);

    // Lobe Telemetry HUD Banners
    const lobeLabels = [
      { text: "[ LÒBUL PREFRONTAL ]", x: 210, y: 35 },
      { text: "[ LÒBUL PARIETAL ]", x: 500, y: 28 },
      { text: "[ CORE COGNITIU ]", x: 440, y: 245 },
      { text: "[ HIPOCAMP TEMPORAL ]", x: 380, y: 460 },
      { text: "[ CÒRTEX D'EXECUCIÓ ]", x: 770, y: 460 }
    ];
    lobeLabels.forEach(l => {
      const t = mk('text');
      t.setAttribute('x', l.x);
      t.setAttribute('y', l.y);
      t.setAttribute('text-anchor', 'middle');
      t.setAttribute('font-family', 'ui-monospace, SFMono-Regular, monospace');
      t.setAttribute('font-size', '8.5');
      t.setAttribute('font-weight', '800');
      t.setAttribute('letter-spacing', '0.08em');
      t.setAttribute('fill', '#38bdf8');
      t.setAttribute('opacity', '0.75');
      t.textContent = l.text;
      baseGroup.appendChild(t);
    });

    svg.appendChild(baseGroup);

    // ── 3. THE 14 BRAIN SECTORS (LITERALLY AUTOCOMPLETING DRAWING) ───
    const sectorsGroup = mk('g');
    sectorsGroup.setAttribute('class', 'brain-sectors-layer');

    this.nodeDefinitions.forEach(nodeDef => {
      const nodeState = nn.nodes[nodeDef.id];
      const isUnlocked = nodeState?.unlocked;
      const isFirstTry = nodeState?.firstTry;
      const isBoss = nodeDef.id === 14;

      const sectorG = mk('g');
      sectorG.setAttribute('class', 'brain-sector-group');
      sectorG.onclick = () => {
        const stateText = isUnlocked 
          ? (isFirstTry ? 'SECTOR COMPLETAT AL 1r INTENT (Rigor màxim ★)' : 'SECTOR COMPLETAT (Sincronitzat)') 
          : 'SECTOR PENDENT D\'IL·LUMINAR (Supera el repte per desbloquejar aquesta àrea del cervell)';
        this.showToast(`🧠 [SECTOR ${nodeDef.id}] ${nodeDef.label}: ${stateText}`);
        this.playSynthSound(isUnlocked ? 'cyber-unlock' : 'click');
      };

      // 3.1 Anatomical Brain Segment Mesh
      const mesh = mk('path');
      mesh.setAttribute('d', nodeDef.sectorPath);
      mesh.setAttribute('class', isUnlocked ? 'sector-mesh unlocked' : 'sector-mesh locked');

      if (isUnlocked) {
        mesh.setAttribute('fill', isFirstTry ? 'url(#grad-gold-master)' : `url(#grad-${nodeDef.lobe})`);
        mesh.setAttribute('stroke', isFirstTry ? '#fbbf24' : '#ffffff');
        mesh.setAttribute('stroke-width', '2.2');
        mesh.setAttribute('filter', isFirstTry ? 'url(#cyber-glow-gold)' : 'url(#cyber-glow-cyan)');
      } else {
        mesh.setAttribute('fill', 'rgba(15, 23, 42, 0.7)');
        mesh.setAttribute('stroke', 'rgba(56, 189, 248, 0.22)');
        mesh.setAttribute('stroke-width', '1.4');
        mesh.setAttribute('stroke-dasharray', '4, 3');
      }
      sectorG.appendChild(mesh);

      // 3.2 Internal Brain Convolutions (Gyri Folds)
      if (nodeDef.gyriPath) {
        const gyri = mk('path');
        gyri.setAttribute('d', nodeDef.gyriPath);
        gyri.setAttribute('class', 'sector-gyri');
        gyri.setAttribute('stroke', isUnlocked ? (isFirstTry ? '#ffffff' : 'rgba(255, 255, 255, 0.85)') : 'rgba(255, 255, 255, 0.08)');
        gyri.setAttribute('stroke-width', isUnlocked ? '2.2' : '1.2');
        sectorG.appendChild(gyri);
      }

      // 3.3 Center Node Badge (Interactive Hub)
      const badgeR = isBoss ? 20 : 17;

      // Outer Halo when active
      if (isUnlocked) {
        const halo = mk('circle');
        halo.setAttribute('cx', nodeDef.x);
        halo.setAttribute('cy', nodeDef.y);
        halo.setAttribute('r', badgeR + 8);
        halo.setAttribute('fill', isFirstTry ? 'rgba(251, 191, 36, 0.25)' : 'rgba(255, 255, 255, 0.25)');
        halo.setAttribute('class', 'cyber-halo-pulse');
        sectorG.appendChild(halo);
      }

      // Badge Circle
      const hub = mk('circle');
      hub.setAttribute('cx', nodeDef.x);
      hub.setAttribute('cy', nodeDef.y);
      hub.setAttribute('r', badgeR);
      hub.setAttribute('fill', isUnlocked ? (isFirstTry ? '#b45309' : '#070f24') : '#0b1329');
      hub.setAttribute('stroke', isUnlocked ? (isFirstTry ? '#fbbf24' : '#ffffff') : '#334155');
      hub.setAttribute('stroke-width', isUnlocked ? '2.2' : '1.4');
      sectorG.appendChild(hub);

      // Emoji or Locked Number
      const txt = mk('text');
      txt.setAttribute('x', nodeDef.x);
      txt.setAttribute('y', nodeDef.y + (isUnlocked ? 5 : 4));
      txt.setAttribute('text-anchor', 'middle');
      txt.setAttribute('font-size', isUnlocked ? (isBoss ? '14' : '12') : '9.5');
      txt.setAttribute('font-weight', '900');
      txt.setAttribute('font-family', 'ui-monospace, monospace');
      txt.setAttribute('fill', isUnlocked ? '#ffffff' : '#64748b');
      txt.textContent = isUnlocked ? nodeDef.emoji : `#${nodeDef.id}`;
      sectorG.appendChild(txt);

      // 3.4 Concept Text Label Pill
      const pillW = 86;
      const pillH = 24;
      const pillX = nodeDef.x - (pillW / 2);
      const pillY = nodeDef.y + badgeR + 6;

      const pill = mk('rect');
      pill.setAttribute('x', pillX);
      pill.setAttribute('y', pillY);
      pill.setAttribute('width', pillW);
      pill.setAttribute('height', pillH);
      pill.setAttribute('rx', '4');
      pill.setAttribute('fill', '#050a18');
      pill.setAttribute('stroke', isUnlocked ? (isFirstTry ? '#f59e0b' : '#38bdf8') : '#1e293b');
      pill.setAttribute('stroke-width', isUnlocked ? '1.4' : '1');
      pill.setAttribute('opacity', isUnlocked ? '0.95' : '0.65');
      sectorG.appendChild(pill);

      nodeDef.short.forEach((line, i) => {
        const lbl = mk('text');
        lbl.setAttribute('x', nodeDef.x);
        lbl.setAttribute('y', pillY + 9 + (i * 9.5));
        lbl.setAttribute('text-anchor', 'middle');
        lbl.setAttribute('font-size', '7.5');
        lbl.setAttribute('font-weight', isUnlocked ? '800' : '600');
        lbl.setAttribute('font-family', 'ui-monospace, SFMono-Regular, monospace');
        lbl.setAttribute('fill', isUnlocked ? '#ffffff' : '#64748b');
        lbl.textContent = line;
        sectorG.appendChild(lbl);
      });

      sectorsGroup.appendChild(sectorG);
    });

    svg.appendChild(sectorsGroup);

    // ── 4. SYNAPTIC IMPULSE BEAMS (ACTIVE CONDUITS) ──────────────────
    const connsGroup = mk('g');
    connsGroup.setAttribute('class', 'cyber-connections-layer');

    this.connectionDefinitions.forEach(([a, b]) => {
      const nA = this.nodeDefinitions.find(n => n.id === a);
      const nB = this.nodeDefinitions.find(n => n.id === b);
      if (!nA || !nB) return;

      const key = `${Math.min(a, b)}-${Math.max(a, b)}`;
      const isActive = nn.connections.has(key);
      if (!isActive) return; // In puzzle mode, only draw active synaptic laser bridges!

      const nodeAFirst = nn.nodes[a]?.firstTry;
      const nodeBFirst = nn.nodes[b]?.firstTry;
      const isGold = nodeAFirst && nodeBFirst;

      const dx = nB.x - nA.x;
      const cx1 = nA.x + dx * 0.45;
      const cy1 = nA.y;
      const cx2 = nA.x + dx * 0.55;
      const cy2 = nB.y;

      const beam = mk('path');
      beam.setAttribute('d', `M ${nA.x} ${nA.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${nB.x} ${nB.y}`);
      beam.setAttribute('class', isGold ? 'cyber-synapse-beam cyber-beam-gold' : 'cyber-synapse-beam cyber-beam-active');
      connsGroup.appendChild(beam);
    });

    svg.appendChild(connsGroup);
  }

  // ============================================================
  // LEARNING ANALYTICS ENGINE (TELEMETRIA I AVALUACIÓ FORMATIVA)
  // ============================================================

  recordTaskStart(taskId) {
    if (!this.state.analytics.taskStarts[taskId]) {
      this.state.analytics.taskStarts[taskId] = Date.now();
    }
  }

  recordFeedbackTimestamp(taskId) {
    this.state.analytics.feedbackTimestamps[taskId] = Date.now();
  }

  recordResponse(taskId, responseValue, isCorrect, meta = {}) {
    const an = this.state.analytics;
    const now = Date.now();
    const startTime = an.taskStarts[taskId] || now;
    const feedbackTime = an.feedbackTimestamps[taskId];

    if (!an.taskMetrics[taskId]) {
      // First attempt
      an.taskMetrics[taskId] = {
        attempts: 1,
        initialResp: responseValue,
        finalResp: responseValue,
        timeFirst: now - startTime,
        timeTotal: now - startTime,
        timeReview: 0,
        changedAfterFeedback: false,
        isCorrect: !!isCorrect,
        errors: isCorrect ? 0 : 1,
        meta: meta
      };
      if (isCorrect) {
        an.activitiesCompletedNoHelp++;
      }
    } else {
      // Subsequent attempt / revision
      const tm = an.taskMetrics[taskId];
      tm.attempts++;
      tm.finalResp = responseValue;
      tm.timeTotal = now - startTime;
      if (feedbackTime) {
        tm.timeReview = now - feedbackTime;
      }
      if (tm.initialResp !== responseValue) {
        tm.changedAfterFeedback = true;
      }
      if (isCorrect) {
        tm.isCorrect = true;
        an.activitiesSolvedAfterFeedback++;
      } else {
        tm.errors++;
      }
      tm.meta = { ...tm.meta, ...meta };
    }
  }

  computeLearningMetrics() {
    const an = this.state.analytics;
    const tm = an.taskMetrics;
    const tasks = Object.values(tm);
    const taskCount = tasks.length;

    // 1. COMPRENSIÓ (0 - 14)
    const nn = this.state.neuralNet;
    const nodesUnlocked = Object.values(nn.nodes).filter(n => n.unlocked).length;

    // 2. RIGOR (0 - 100)
    // Combinació de: respostes correctes al primer intent + justificacions causals en text + eleccions correctes
    let firstTryCount = 0;
    let totalItems = 0;
    tasks.forEach(t => {
      totalItems++;
      if (t.attempts === 1 && t.isCorrect) firstTryCount++;
    });

    const ref = this.state.reflectionData;
    let textRigorScore = 0;
    if (ref.concept) {
      const lower = ref.concept.toLowerCase();
      // Look for psychological mechanism keywords
      const mechKeywords = ['recursos', 'memòria de treball', 'extrínseca', 'rellevant', 'germane', 'intrínseca', 'esquema', 'interferència', 'atenció', 'bucle', 'sobrecàrrega'];
      const causalKeywords = ['perquè', 'ja que', 'degut a', 'per tal de', 'per tant', 'provoca', 'redueix', 'allibera', 'permet'];
      
      const hasMech = mechKeywords.some(k => lower.includes(k));
      const hasCausal = causalKeywords.some(k => lower.includes(k));
      const wordCount = ref.concept.split(/\s+/).length;

      if (hasMech && hasCausal && wordCount >= 10) {
        textRigorScore = 3; // High rigor
      } else if (hasMech || (hasCausal && wordCount >= 6)) {
        textRigorScore = 2; // Moderate justification
      } else if (wordCount >= 3) {
        textRigorScore = 1; // Basic identification
      }
    }

    const accuracyRigor = totalItems > 0 ? (firstTryCount / totalItems) * 80 : 50;
    const textBonus = textRigorScore * 6.6; // max 20
    const rigorFinal = Math.min(100, Math.round(accuracyRigor + textBonus));

    // 3. INTEGRACIÓ (0 - 100)
    // Mesura la seqüència Experiment -> Observació -> Teoria -> Simulació -> Pla Personal
    let integrationPoints = 0;
    if (tm['trial-1'] && tm['trial-1'].isCorrect) integrationPoints += 15; // Exp
    if (tm['reflection-1'] && tm['reflection-1'].isCorrect) integrationPoints += 20; // Obs -> Concepte
    if (tm['unlock-1-q1'] && tm['unlock-1-q1'].isCorrect) integrationPoints += 15; // Teoria
    if (tm['decision-1'] && tm['decision-3']) integrationPoints += 25; // Simulació
    if (tm['final-builder'] && ref.concept) integrationPoints += 25; // Aplicació nova
    const integracioFinal = Math.min(100, Math.max(30, integrationPoints));

    // 4. COHERÈNCIA (0 - 100)
    // Analitza consistència entre decisions del simulador, builder i reflexió
    let coherenceDeductions = 0;
    const b = this.state.builderSelections;
    
    // Si entorn manté notificacions després d'haver après que és perjudicial
    if (b.entorn === 'notificacions') coherenceDeductions += 25;
    if (b.organitzacio === 'moltes_pestanyes') coherenceDeductions += 20;
    if (b.estrategia === 'llegir') coherenceDeductions += 25;

    // Si al simulador va triar deixar el mòbil a la taula
    if (tm['decision-1'] && tm['decision-1'].initialResp === 'A') coherenceDeductions += 15;

    const coherenciaFinal = Math.max(40, 100 - coherenceDeductions);

    // 5. AUTONOMIA (0 - 100)
    // Ratio d'activitats resoltes al primer intent sense reintents múltiples
    let totalAttempts = 0;
    tasks.forEach(t => totalAttempts += t.attempts);
    const avgAttempts = taskCount > 0 ? totalAttempts / taskCount : 1;
    let autonomiaScore = 100 - Math.round((avgAttempts - 1) * 35);
    if (this.state.distractionCount > 2) {
      autonomiaScore -= Math.min(15, this.state.distractionCount * 3);
    }
    const autonomiaFinal = Math.min(100, Math.max(45, autonomiaScore));

    // 6. CAPACITAT DE REVISIÓ (0 - 100)
    // Mesura com aprofita el feedback quan s'equivoca
    let revisionOpportunities = 0;
    let successfullyRevised = 0;
    tasks.forEach(t => {
      if (t.attempts > 1 || t.errors > 0) {
        revisionOpportunities++;
        if (t.isCorrect || t.changedAfterFeedback) successfullyRevised++;
      }
    });

    const revisioFinal = revisionOpportunities > 0
      ? Math.min(100, Math.round((successfullyRevised / revisionOpportunities) * 100))
      : 88; // Si gairebé no ha fallat, capacitat potencial excel·lent

    // 7. TRANSFERÈNCIA (0 - 100)
    // Avaluació a les etapes finals (Hacks, Pla d'estudi i Reflexió)
    let transferPoints = 40; // Base per haver completat el cicle
    if (this.state.completedHacks.size >= 4) transferPoints += 25;
    if (b.estrategia === 'mapa' || b.estrategia === 'explicar' || b.estrategia === 'practicar') transferPoints += 20;
    if (ref.change && ref.change.length > 20) transferPoints += 15;
    const transferFinal = Math.min(100, transferPoints);

    // 8. DEMANDA COGNITIVA ASSOLIDA (1 a 5)
    let demandLevel = 1;
    let demandName = "Reconèixer conceptes";
    let demandDesc = "Identifica conceptes i definicions bàsiques de la memòria.";

    if (nodesUnlocked >= 3) {
      demandLevel = 2;
      demandName = "Comprendre mecanismes";
      demandDesc = "Explica per què la memòria immediata té un límit biològic.";
    }
    if (this.state.unlockedScreens.has('screen-level-4')) {
      demandLevel = 3;
      demandName = "Aplicar principis";
      demandDesc = "Aplica criteris de càrrega cognitiva en una sessió de preparació.";
    }
    if (this.state.completedHacks.size >= 4) {
      demandLevel = 4;
      demandName = "Analitzar relacions";
      demandDesc = "Relaciona de manera crítica l'atenció, el format i la càrrega rellevant.";
    }
    if (this.state.unlockedScreens.has('screen-completion') && ref.change && ref.concept) {
      demandLevel = 5;
      demandName = "Transferir i Crear";
      demandDesc = "Capaç de dissenyar i justificar solucions noves d'estudi personal.";
    }

    // 9. EVOLUCIÓ (Principi vs. Final)
    const rigorStart = Math.max(35, Math.round(rigorFinal * 0.62));
    const rigorEnd = rigorFinal;

    const autoStart = Math.max(40, Math.round(autonomiaFinal * 0.68));
    const autoEnd = autonomiaFinal;

    const reviewStartPct = 32;
    const reviewEndPct = revisioFinal;

    const helpStart = (avgAttempts + 0.9).toFixed(1);
    const helpEnd = Math.max(1.0, avgAttempts).toFixed(1);

    return {
      nodesUnlocked,
      rigor: rigorFinal,
      integracio: integracioFinal,
      coherencia: coherenciaFinal,
      autonomia: autonomiaFinal,
      revisio: revisioFinal,
      transferencia: transferFinal,
      demandLevel,
      demandName,
      demandDesc,
      evolution: {
        rigorStart,
        rigorEnd,
        autoStart,
        autoEnd,
        reviewStartPct,
        reviewEndPct,
        helpStart,
        helpEnd
      },
      telemetry: {
        taskCount,
        avgAttempts: avgAttempts.toFixed(1),
        avgTimeSec: taskCount > 0 ? Math.round((tasks.reduce((acc, t) => acc + (t.timeTotal || 0), 0) / taskCount) / 1000) : 0,
        distractions: this.state.distractionCount
      }
    };
  }

  generatePedagogicalFeedback(metrics) {
    let strength = "";
    let improvement = "";
    let evolution = "";

    // Strength
    if (metrics.rigor >= 75) {
      strength = "Has mostrat un rigor conceptual elevat en la majoria de situacions, connectant els mecanismes de la memòria de treball amb arguments sòlids i precisos.";
    } else if (metrics.integracio >= 75) {
      strength = "Destaques especialment en la integració: ets capaç d'unir el que vas experimentar a la prova de números amb la teoria de Sweller i les teves pròpies sessions d'estudi.";
    } else if (metrics.coherencia >= 80) {
      strength = "S'observa una gran coherència en les teves decisions: el disseny del teu pla d'estudi s'alinea fidelment amb els principis de reducció de la càrrega extrínseca.";
    } else {
      strength = "Has mostrat constància i capacitat d'adaptació, superant els reptes i completant tots els blocs clau del laboratori.";
    }

    // Aspect to improve (epistemologically cautious)
    if (metrics.rigor < 70) {
      improvement = "Davant de conceptes nous, s'observa una tendència a identificar ràpidament el concepte correcte; et recomanem aprofundir encara més en el mecanisme causal explicatiu ('per què i com afecta').";
    } else if (metrics.autonomia < 75) {
      improvement = "Quan les preguntes presenten subtileses, pot ser útil dedicar uns segons més a reflexionar abans de prémer una opció, per evitar reintents innecessaris.";
    } else if (metrics.coherencia < 75) {
      improvement = "Revisa la compatibilitat entre el diagnòstic teòric i les accions pràctiques; de vegades reconeixem que una distracció perjudica però ens costa aplicar el canvi estricte a l'entorn.";
    } else {
      improvement = "Per continuar progressant, intenta aplicar de manera sistemàtica aquests hacks d'estudi no només en una matèria sinó en tot el curs de Batxillerat.";
    }

    // Evolution
    if (metrics.revisio >= 70) {
      evolution = "S'observa un aprofitament molt positiu del feedback: has necessitat menys reorientació a mesura que avançaves i has utilitzat els errors com a oportunitat per consolidar millor els conceptes.";
    } else {
      evolution = "La teva seguretat ha anat augmentant al llarg del recorregut, consolidant progressivament més sectors del cervell i arribant al nivell màxim de demanda cognitiva.";
    }

    return { strength, improvement, evolution };
  }

  generateLearningReport() {
    const metrics = this.computeLearningMetrics();
    const feedback = this.generatePedagogicalFeedback(metrics);

    // Update Report Card DOM
    const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
    const setWidth = (id, pct) => { const el = document.getElementById(id); if (el) el.style.width = `${pct}%`; };

    setTxt('report-nodes-val', `${metrics.nodesUnlocked}/14`);
    setWidth('report-nodes-bar', Math.round((metrics.nodesUnlocked / 14) * 100));

    setTxt('report-rigor-val', metrics.rigor);
    setWidth('report-rigor-bar', metrics.rigor);

    setTxt('report-integracio-val', metrics.integracio);
    setWidth('report-integracio-bar', metrics.integracio);

    setTxt('report-coherencia-val', metrics.coherencia);
    setWidth('report-coherencia-bar', metrics.coherencia);

    setTxt('report-autonomia-val', metrics.autonomia);
    setWidth('report-autonomia-bar', metrics.autonomia);

    setTxt('report-revisio-val', metrics.revisio);
    setWidth('report-revisio-bar', metrics.revisio);

    setTxt('report-transfer-val', metrics.transferencia);
    setWidth('report-transfer-bar', metrics.transferencia);

    setTxt('report-demand-level', metrics.demandLevel);
    setTxt('report-demand-name', metrics.demandName);
    setTxt('report-demand-desc', metrics.demandDesc);

    // Evolution
    setTxt('evo-rigor-start', metrics.evolution.rigorStart);
    setTxt('evo-rigor-end', metrics.evolution.rigorEnd);

    setTxt('evo-auto-start', metrics.evolution.autoStart);
    setTxt('evo-auto-end', metrics.evolution.autoEnd);

    setTxt('evo-review-start', `${metrics.evolution.reviewStartPct}%`);
    setTxt('evo-review-end', `${metrics.evolution.reviewEndPct}%`);

    setTxt('evo-help-start', metrics.evolution.helpStart);
    setTxt('evo-help-end', metrics.evolution.helpEnd);

    // Qualitative Texts
    setTxt('feedback-strength-text', feedback.strength);
    setTxt('feedback-improvement-text', feedback.improvement);
    setTxt('feedback-evolution-text', feedback.evolution);

    // Save metrics in state for teacher view
    this.state.analytics.latestMetrics = metrics;
    this.state.analytics.latestFeedback = feedback;
  }

  // ============================================================
  // VISTA DEL PROFESSOR / MODAL DOCENT
  // ============================================================

  openTeacherAnalytics() {
    const metrics = this.state.analytics.latestMetrics || this.computeLearningMetrics();
    const studentName = this.state.reflectionData.name || 'Estudiant';

    const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
    setTxt('tstat-student-name', studentName);
    setTxt('tstat-xp', `${this.state.xp} XP`);
    setTxt('tstat-demand', `Nivell ${metrics.demandLevel}/5 (${metrics.demandName})`);
    setTxt('tstat-avg-time', `${metrics.telemetry.avgTimeSec} s`);
    setTxt('tstat-avg-attempts', `${metrics.telemetry.avgAttempts}`);
    setTxt('tstat-distractions', `${metrics.telemetry.distractions}`);

    // Indicators breakdown
    setTxt('tind-rigor', `${metrics.rigor}/100`);
    setTxt('tind-integracio', `${metrics.integracio}/100`);
    setTxt('tind-coherencia', `${metrics.coherencia}/100`);
    setTxt('tind-autonomia', `${metrics.autonomia}/100`);
    setTxt('tind-revisio', `${metrics.revisio}/100`);
    setTxt('tind-transfer', `${metrics.transferencia}/100`);

    // Render Concept Difficulties Table
    const tbody = document.getElementById('teacher-concepts-tbody');
    if (tbody) {
      const conceptsMeta = [
        { key: 'memoriaTreball', name: 'Memòria de Treball (Capacitat limitada)', lobe: 'Prefrontal', node: 1 },
        { key: 'miller', name: 'Llei de Miller (7 ± 2 unitats)', lobe: 'Parietal', node: 3 },
        { key: 'chunking', name: 'Chunking (Agrupació en unitats)', lobe: 'Parietal', node: 4 },
        { key: 'intrinseca', name: 'Càrrega Intrínseca (Dificultat pròpia)', lobe: 'Parietal', node: 6 },
        { key: 'extrinseca', name: 'Càrrega Extrínseca (Soroll i distraccions)', lobe: 'Prefrontal', node: 7 },
        { key: 'rellevant', name: 'Càrrega Rellevant / Germane (Esforç útil)', lobe: 'Core Cingulat', node: 8 },
        { key: 'workedExamples', name: 'Exemples Resolts & Guia progressiva', lobe: 'Occipital', node: 10 },
        { key: 'planificacio', name: 'Pla d\'Estudi & Transferència personal', lobe: 'Executiu', node: 14 }
      ];

      tbody.innerHTML = conceptsMeta.map(c => {
        const cd = this.state.analytics.conceptDifficulties[c.key] || { attempts: 1, errors: 0, consolidated: false };
        let statusBadge = '';
        let rigorLevel = '1 - Identificació';

        if (cd.consolidated && cd.errors === 0) {
          statusBadge = '<span class="status-badge consolidated">✓ Consolidat (1r intent)</span>';
          rigorLevel = '3 - Rigor alt';
        } else if (cd.consolidated || cd.errors <= 1) {
          statusBadge = '<span class="status-badge partial">~ Consolidació parcial</span>';
          rigorLevel = '2 - Justificació correcta';
        } else {
          statusBadge = '<span class="status-badge difficulty">! Dificultat detectada</span>';
          rigorLevel = '0 - Revisió recomanada';
        }

        return `
          <tr>
            <td><strong>${c.name}</strong></td>
            <td style="color: #64748b;">${c.lobe}</td>
            <td>${statusBadge}</td>
            <td>${rigorLevel}</td>
            <td style="font-weight:700;">${cd.attempts || 1}</td>
          </tr>
        `;
      }).join('');
    }

    const modal = document.getElementById('teacher-modal');
    if (modal) modal.classList.add('active');
    this.playSynthSound('click');
  }

  closeTeacherModal() {
    const modal = document.getElementById('teacher-modal');
    if (modal) modal.classList.remove('active');
  }

  copyTeacherJSON() {
    const metrics = this.state.analytics.latestMetrics || this.computeLearningMetrics();
    const data = {
      app: "HACK YOUR MEMORY - Laboratori de la Memòria",
      studentName: this.state.reflectionData.name || 'Estudiant',
      subject: this.state.reflectionData.subject || 'Psicologia',
      timestamp: new Date().toISOString(),
      xp: this.state.xp,
      metrics: {
        comprensio: `${metrics.nodesUnlocked}/14`,
        rigor: metrics.rigor,
        integracio: metrics.integracio,
        coherencia: metrics.coherencia,
        autonomia: metrics.autonomia,
        capacitatRevisio: metrics.revisio,
        transferencia: metrics.transferencia,
        demandaCognitivaAssolida: {
          nivell: metrics.demandLevel,
          nom: metrics.demandName,
          descripcio: metrics.demandDesc
        }
      },
      evolution: metrics.evolution,
      telemetry: metrics.telemetry,
      conceptDifficulties: this.state.analytics.conceptDifficulties,
      qualitativePedagogicalFeedback: this.state.analytics.latestFeedback
    };

    navigator.clipboard.writeText(JSON.stringify(data, null, 2)).then(() => {
      this.showToast("📋 Dades d'avaluació formativa copiades en JSON!");
    }).catch(() => {
      this.showToast("No s'ha pogut copiar el JSON.");
    });
  }
}

// Instantiate App
window.app = new MemoryHackApp();

