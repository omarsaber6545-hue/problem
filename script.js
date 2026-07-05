// Advanced Web Audio API Synthesizer & Terminal Script
let audioCtx = null;
let soundEnabled = true;

// Synthesizer Functions
function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function playTone(frequency, duration, type = 'sine', volume = 0.15) {
    if (!soundEnabled || !audioCtx) return;
    try {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.type = type;
        osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
        
        // Attack, Decay, Sustain, Release envelope to make it sound smooth
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, audioCtx.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
        
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
        console.warn("Audio Context blocked or failed:", e);
    }
}

function playKeyClick() {
    // Generate organic 8-bit retro mechanical click
    const pitch = 900 + Math.random() * 800;
    playTone(pitch, 0.04, 'triangle', 0.08);
}

function playBreachBeep() {
    // Play a distinct hacker alarm melody / glitch beep
    const now = audioCtx ? audioCtx.currentTime : 0;
    setTimeout(() => playTone(880, 0.12, 'sawtooth', 0.2), 0);
    setTimeout(() => playTone(659, 0.12, 'sawtooth', 0.2), 150);
    setTimeout(() => playTone(880, 0.25, 'sawtooth', 0.25), 300);
}

function playSuccessBeep() {
    setTimeout(() => playTone(523.25, 0.08, 'square', 0.15), 0); // C5
    setTimeout(() => playTone(659.25, 0.08, 'square', 0.15), 100); // E5
    setTimeout(() => playTone(783.99, 0.15, 'square', 0.2), 200); // G5
}

function playSiren() {
    // Warning alarm oscillating
    let t = 0;
    const interval = setInterval(() => {
        if (t > 4) {
            clearInterval(interval);
            return;
        }
        const freq = t % 2 === 0 ? 987.77 : 880; // B5 to A5
        playTone(freq, 0.2, 'sine', 0.12);
        t++;
    }, 250);
}

// Sound Button Controller
const soundToggle = document.getElementById('sound-toggle');
const soundOnIcon = document.getElementById('sound-on-icon');
const soundOffIcon = document.getElementById('sound-off-icon');
const soundStatusText = document.getElementById('sound-status-text');

soundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    if (soundEnabled) {
        soundToggle.classList.remove('active');
        soundOnIcon.classList.add('hidden');
        soundOffIcon.classList.remove('hidden');
        soundStatusText.textContent = "الصوت مفعل";
        initAudio();
        playTone(440, 0.1, 'sine', 0.1);
    } else {
        soundToggle.classList.add('active');
        soundOnIcon.classList.remove('hidden');
        soundOffIcon.classList.add('hidden');
        soundStatusText.textContent = "الصوت صامت";
    }
});

// Binary Matrix Background Rain on Canvas
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Adapt canvas to resizing
window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

const fontSize = 16;
const columns = Math.floor(width / fontSize) + 1;
const yPositions = Array(columns).fill(0).map(() => Math.random() * -height);

function drawMatrix() {
    ctx.fillStyle = 'rgba(3, 3, 3, 0.06)';
    ctx.fillRect(0, 0, width, height);
    
    ctx.fillStyle = '#00ff66';
    ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;
    
    yPositions.forEach((y, index) => {
        // Mostly binary with occasional HEX hacker symbols
        const chars = '01';
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = index * fontSize;
        
        // Randomly dim/brighten some characters for depth
        if (Math.random() > 0.98) {
            ctx.fillStyle = '#ffffff'; // White lead characters
        } else if (Math.random() > 0.8) {
            ctx.fillStyle = '#005511'; // Dim background
        } else {
            ctx.fillStyle = '#00ff66'; // Standard glowing green
        }
        
        ctx.fillText(text, x, y);
        
        if (y > height + Math.random() * 5000) {
            yPositions[index] = 0;
        } else {
            yPositions[index] = y + fontSize;
        }
    });
}

// Matrix animation loop
setInterval(drawMatrix, 35);

// Loading Screen Logs Data
const loadingLogsData = [
    { text: "[+] Initializing terminal shell connection...", delay: 200, type: "info" },
    { text: "[+] Port scanning host (192.168.1.100)... ACTIVE", delay: 400, type: "info" },
    { text: "[!] Vulnerability detected: CVE-2026-0814 SSH Bypass", delay: 700, type: "warn" },
    { text: "[+] Connecting to remote registry server...", delay: 900, type: "info" },
    { text: "[+] Injecting payload dll: rootkit_loader.so", delay: 1200, type: "info" },
    { text: "[*] Overriding system firewall rules... DONE", delay: 1500, type: "success" },
    { text: "[+] Mapping local network directory...", delay: 1800, type: "info" },
    { text: "[!] target_network: Wi-Fi unavailable (غير متاح)", delay: 2100, type: "warn" },
    { text: "[!] target_location: Unknown location", delay: 2300, type: "danger" },
    { text: "[+] Copying host authorization metadata...", delay: 2600, type: "info" },
    { text: "[+] Gaining ROOT access rights... [88%]", delay: 2900, type: "success" },
    { text: "[+] Clearing audit trail logs...", delay: 3200, type: "info" },
    { text: "[+] Hijack sequence completed successfully.", delay: 3500, type: "success" }
];

// Continuous Hacked Screen Console logs loop
const consoleLogsData = [
    "SYS_MONITOR: Kernel integrity checks... OK",
    "NET_STAT: Active listener on local interface 0.0.0.0:443",
    "DB_HIJACK: Extracting config hashes...",
    "ATTACK: Flood pinging gateway: 192.168.1.1",
    "MEM_DUMP: Scraped kernel buffers: [256MB]",
    "SYS_ALARM: Host memory capacity at 94.2%",
    "CRON_JOB: Restarting persistent backdoor agent...",
    "PROXY: Tunnel established via node-fr-42",
    "WIFI_SCAN: No active signals detected nearby",
    "GEO_IP: Fetching triangulation coordinates... Timeout",
    "ROOT: Access log appended to: /var/log/secure",
    "ENCRYPTION: Initializing background cipher lock...",
    "DECRYPTOR: Compiling hash table: SHA-256",
    "SYS_INFO: Local CPU core temperature: 68C",
    "SERVICE: Apache WebServer suspended",
    "EXPLOIT: Sending buffer overflow payload to port 80",
    "SHELL: Interactive session established (PID 4821)",
    "NET_DUMP: Monitoring packets for port 22...",
    "WARNING: Multiple failed admin authentication requests",
    "HIJACK: Redirecting all gateway requests to proxy server"
];

// App State Logic
const startOverlay = document.getElementById('start-overlay');
const startBtn = document.getElementById('start-btn');
const loadingScreen = document.getElementById('loading-screen');
const hackedScreen = document.getElementById('hacked-screen');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const loadingLogs = document.getElementById('loading-logs');
const hackedSubtext = document.getElementById('hacked-subtext');
const consoleOutput = document.getElementById('console-output');

// 1. START CLICK ACTION
startBtn.addEventListener('click', () => {
    initAudio();
    playTone(600, 0.15, 'sine', 0.1);
    
    // Smooth transition from start overlay to loading screen
    startOverlay.classList.add('hidden');
    setTimeout(() => {
        startOverlay.style.display = 'none';
        loadingScreen.classList.remove('hidden');
        startLoadingSequence();
    }, 800);
});

// 2. LOADING SCREEN SEQUENCE
function startLoadingSequence() {
    let progress = 0;
    const startTime = Date.now();
    const duration = 5000; // 5 seconds loading bar

    // Play initial breach chime
    setTimeout(() => {
        playBreachBeep();
    }, 400);

    // Schedule static logs display
    loadingLogsData.forEach(log => {
        setTimeout(() => {
            appendLoadingLog(log.text, log.type);
        }, log.delay);
    });

    // Loading bar interval tick
    const progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        progress = Math.min(Math.floor((elapsed / duration) * 100), 100);
        
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${progress}%`;
        
        // Random tick sound on percentage updates
        if (progress % 4 === 0 && progress < 100) {
            playKeyClick();
        }

        if (progress >= 100) {
            clearInterval(progressInterval);
            setTimeout(completeLoadingSequence, 600);
        }
    }, 50);
}

function appendLoadingLog(text, type) {
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.textContent = text;
    loadingLogs.appendChild(entry);
    loadingLogs.scrollTop = loadingLogs.scrollHeight;
    playKeyClick();
}

// 3. TRANSITION TO HACKED SCREEN
function completeLoadingSequence() {
    // Visual flash/shake effect
    document.body.style.backgroundColor = '#ff3333';
    setTimeout(() => {
        document.body.style.backgroundColor = '';
    }, 150);

    // Play hacking success siren beep
    playSuccessBeep();
    playSiren();

    loadingScreen.classList.add('hidden');
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        hackedScreen.classList.remove('hidden');
        
        // Start typing main sub-message
        startTypingAnimation("ما تسمعش كلام حد تاني يا مغفل.", 0);
        
        // Start continuous console logs loop
        startConsoleLogging();
    }, 800);
}

// 4. TYPING EFFECT
function startTypingAnimation(text, index) {
    if (index < text.length) {
        hackedSubtext.textContent += text.charAt(index);
        
        // Generate soft typing sounds
        playKeyClick();
        
        const delay = text.charAt(index) === ' ' || text.charAt(index) === '.' ? 250 : 80 + Math.random() * 50;
        setTimeout(() => {
            startTypingAnimation(text, index + 1);
        }, delay);
    } else {
        // Once typing finished, keep cursor blinking
        hackedSubtext.style.borderLeft = '3px solid var(--danger-red)';
    }
}

// 5. CONTINUOUS CONSOLE LOGS LOOP
function startConsoleLogging() {
    // Print initial system boot lines LTR
    appendConsoleLine("SYSTEM HIJACK SEQUENCE CONFIRMED.", "danger");
    setTimeout(() => appendConsoleLine("LOGGING TERMINAL INPUTS FOR ANALYSIS...", "info"), 200);
    setTimeout(() => appendConsoleLine("IP: 192.168.1.100 | WIFI: NOT AVAILABLE | LOC: UNKNOWN", "warn"), 400);

    // Continuous loop
    setInterval(() => {
        const randomIndex = Math.floor(Math.random() * consoleLogsData.length);
        const logText = consoleLogsData[randomIndex];
        
        // Assign type class based on message contents
        let logType = "info";
        if (logText.includes("WARNING") || logText.includes("ALARM")) {
            logType = "danger";
        } else if (logText.includes("OK") || logText.includes("established") || logText.includes("integrity")) {
            logType = "success";
        } else if (logText.includes("Timeout") || logText.includes("unavailable")) {
            logType = "warn";
        }

        appendConsoleLine(logText, logType);
    }, 800);
}

function appendConsoleLine(text, type) {
    const line = document.createElement('div');
    line.className = `log-entry ${type}`;
    line.textContent = `[${new Date().toLocaleTimeString()}] ${text}`;
    consoleOutput.appendChild(line);
    
    // Limit console items count to avoid browser lag
    if (consoleOutput.children.length > 80) {
        consoleOutput.removeChild(consoleOutput.firstChild);
    }
    
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
    playKeyClick();
}
