// Retro Sound Effects Generator using Web Audio API
class AudioSynthManager {
  constructor() {
    this.ctx = null;
    this.muted = false;
    
    // BGM states
    this.bgmPlaying = false;
    this.bgmIntervalId = null;
    this.tempo = 130.0; // BPM
    this.bgmGainNode = null;
    this.bgmVolume = 0.22; // default volume
    
    this.bgmAudio = null;
    this.bgmSource = null;
    this.bgmFiles = [
      'bgm/ashika006-edm-512189.mp3',
      'bgm/diogodasilvasimoes-forever-edm-trance-vibes-489439.mp3',
      'bgm/diogodasilvasimoes-unity-mainstage-dark-edm-489435.mp3',
      'bgm/the_mountain-energy-edm-155588.mp3',
      'bgm/vjgalaxy-edm-celtic-music-01-482037.mp3'
    ];
    this.currentBgmIndex = -1;
  }

  // Initialize context on user interaction
  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      
      // Setup BGM Gain Node
      this.bgmGainNode = this.ctx.createGain();
      this.bgmGainNode.gain.value = this.muted ? 0 : this.bgmVolume;
      this.bgmGainNode.connect(this.ctx.destination);
      
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      // Initialize HTML5 Audio element and source node for MP3 BGM
      this.bgmAudio = new Audio();
      this.bgmAudio.crossOrigin = "anonymous";
      this.bgmAudio.loop = true;
      this.bgmSource = this.ctx.createMediaElementSource(this.bgmAudio);
      this.bgmSource.connect(this.bgmGainNode);
    } catch (e) {
      console.warn("Web Audio API is not supported in this browser:", e);
    }
  }

  // Play a simple 8-bit retro shoot sound (high pitch sweep down)
  playShoot() {
    this.init();
    if (!this.ctx || this.muted) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(880, t);
    osc.frequency.exponentialRampToValueAtTime(110, t + 0.15);

    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.15);
  }

  // Play enemy hit sound (short noise burst)
  playHit() {
    this.init();
    if (!this.ctx || this.muted) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const t = this.ctx.currentTime;
    const dur = 0.08;
    
    // Create white noise buffer
    const bufferSize = this.ctx.sampleRate * dur;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    // Filter to make it sound like a blunt hit
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 400;
    filter.Q.value = 1.0;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + dur);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(t);
    noise.stop(t + dur);
  }

  // Play gem collection sound (sweet high-pitched synth chime)
  playCollect() {
    this.init();
    if (!this.ctx || this.muted) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    
    // Arpeggio: start at 660Hz (E5), then jump to 987Hz (B5)
    osc.frequency.setValueAtTime(660, t);
    osc.frequency.setValueAtTime(987, t + 0.05);

    gain.gain.setValueAtTime(0.12, t);
    gain.gain.setValueAtTime(0.12, t + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.2);
  }

  // Play Level-Up melody (rising retro arpeggio)
  playLevelUp() {
    this.init();
    if (!this.ctx || this.muted) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const t = this.ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C Major scale notes
    const noteDur = 0.06;

    notes.forEach((freq, index) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.value = freq;

      const noteStart = t + index * noteDur;
      gain.gain.setValueAtTime(0.08, noteStart);
      gain.gain.exponentialRampToValueAtTime(0.01, noteStart + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(noteStart);
      osc.stop(noteStart + 0.15);
    });
  }

  // Play player death sound (dramatic pitch sweep down to silent noise)
  playDeath() {
    this.init();
    if (!this.ctx || this.muted) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, t);
    osc.frequency.linearRampToValueAtTime(40, t + 1.0);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.linearRampToValueAtTime(0.01, t + 1.0);

    // Apply lowpass filter to make it sound muffled and doom-like
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, t);
    filter.frequency.linearRampToValueAtTime(100, t + 1.0);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 1.0);
  }

  // Play victory jingle (happy chord resolution)
  playVictory() {
    this.init();
    if (!this.ctx || this.muted) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const t = this.ctx.currentTime;
    
    // Play a retro major chord arpeggio followed by sustained chord
    const playNote = (freq, startOffset, duration, volume = 0.08) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.value = freq;
      
      const startTime = t + startOffset;
      gain.gain.setValueAtTime(volume, startTime);
      gain.gain.exponentialRampToValueAtTime(0.005, startTime + duration);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    // Arpeggio
    playNote(523.25, 0.0, 0.3); // C5
    playNote(659.25, 0.1, 0.3); // E5
    playNote(783.99, 0.2, 0.3); // G5
    playNote(1046.50, 0.3, 0.8, 0.1); // C6 (climax)
    
    // Harmony
    playNote(783.99, 0.3, 0.8, 0.05); // G5
    playNote(659.25, 0.3, 0.8, 0.05); // E5
  }

  playRouletteTick() {
    this.init();
    if (!this.ctx || this.muted) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(850, t); // high click frequency
    osc.frequency.exponentialRampToValueAtTime(150, t + 0.05); // quick slide down

    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05); // short decay

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.06);
  }

  playHellMode() {
    try {
      this.init();
      if (!this.ctx || this.muted) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(100, t);
      osc.frequency.linearRampToValueAtTime(800, t + 0.5);
      osc.frequency.linearRampToValueAtTime(80, t + 1.2);

      gain.gain.setValueAtTime(0.25, t);
      gain.gain.linearRampToValueAtTime(0.3, t + 0.5);
      gain.gain.linearRampToValueAtTime(0.01, t + 1.5);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, t);
      filter.frequency.linearRampToValueAtTime(200, t + 1.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 1.5);
    } catch (e) {
      console.warn("Failed to play Hell Mode audio cue:", e);
    }
  }

  playRandomBGMFile() {
    if (!this.bgmFiles || this.bgmFiles.length === 0) return;
    
    let nextIndex = Math.floor(Math.random() * this.bgmFiles.length);
    if (this.bgmFiles.length > 1 && nextIndex === this.currentBgmIndex) {
      nextIndex = (nextIndex + 1) % this.bgmFiles.length;
    }
    
    this.currentBgmIndex = nextIndex;
    const selectedFile = this.bgmFiles[this.currentBgmIndex];
    console.log("Playing BGM:", selectedFile);

    if (this.bgmAudio) {
      try {
        this.bgmAudio.pause();
        this.bgmAudio.src = selectedFile;
        this.bgmAudio.load();
        
        // Reset playback rate based on current tempo
        const baseBpm = 130.0;
        const playbackRate = this.tempo / baseBpm;
        this.bgmAudio.playbackRate = playbackRate;
        
        this.bgmAudio.play().catch(err => {
          console.warn("Audio play failed / deferred:", err);
        });
      } catch (err) {
        console.warn("Error changing BGM source:", err);
      }
    }
  }

  startBGM() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      if (this.bgmPlaying) return;
      
      this.bgmPlaying = true;
      
      // Update BGM Volume to reflect active state
      if (this.bgmGainNode) {
        this.bgmGainNode.gain.setValueAtTime(this.muted ? 0 : this.bgmVolume, this.ctx.currentTime);
      }

      // Play the first random BGM file
      this.playRandomBGMFile();

      // Switch to another random BGM every 60 seconds (1 minute)
      if (this.bgmIntervalId) clearInterval(this.bgmIntervalId);
      this.bgmIntervalId = setInterval(() => {
        if (this.bgmPlaying) {
          this.playRandomBGMFile();
        }
      }, 60000);
      
    } catch (e) {
      console.warn("Failed to start BGM:", e);
    }
  }

  stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmIntervalId) {
      clearInterval(this.bgmIntervalId);
      this.bgmIntervalId = null;
    }
    if (this.bgmAudio) {
      this.bgmAudio.pause();
    }
  }

  setBGMVolume(val) {
    this.bgmVolume = val;
    if (this.bgmGainNode && this.ctx) {
      const targetGain = this.muted ? 0 : val;
      this.bgmGainNode.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.1);
    }
  }

  setBGMTempo(bpm) {
    this.tempo = bpm;
    if (this.bgmAudio) {
      const baseBpm = 130.0;
      const playbackRate = bpm / baseBpm;
      this.bgmAudio.playbackRate = playbackRate;
    }
  }
}

// Global audio player instance
const gameAudio = new AudioSynthManager();
