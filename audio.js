// Retro Sound Effects Generator using Web Audio API
class AudioSynthManager {
  constructor() {
    this.ctx = null;
    this.muted = false;
    
    // BGM sequencer states
    this.bgmPlaying = false;
    this.bgmTimerId = null;
    this.nextNoteTime = 0.0;
    this.currentNoteIndex = 0;
    this.tempo = 130.0; // BPM
    this.bgmGainNode = null;
    this.bgmVolume = 0.22; // default volume
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

  startBGM() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      if (this.bgmPlaying) return;
      
      this.bgmPlaying = true;
      this.currentNoteIndex = 0;
      this.nextNoteTime = this.ctx.currentTime + 0.05;
      
      // Update BGM Volume to reflect active state
      if (this.bgmGainNode) {
        this.bgmGainNode.gain.setValueAtTime(this.muted ? 0 : this.bgmVolume, this.ctx.currentTime);
      }

      // Schedule next beats
      const scheduler = () => {
        if (!this.bgmPlaying) return;
        this.scheduleNextBeats();
        this.bgmTimerId = setTimeout(scheduler, 35);
      };
      scheduler();
    } catch (e) {
      console.warn("Failed to start BGM:", e);
    }
  }

  stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmTimerId) {
      clearTimeout(this.bgmTimerId);
      this.bgmTimerId = null;
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
  }

  scheduleNextBeats() {
    try {
      const secondsPerBeat = 60.0 / this.tempo;
      const stepDuration = secondsPerBeat / 4; // 16th notes
      
      // Prevent scheduling overload if tab was suspended/lagged
      if (this.nextNoteTime < this.ctx.currentTime) {
        this.nextNoteTime = this.ctx.currentTime + 0.02;
      }
      
      while (this.nextNoteTime < this.ctx.currentTime + 0.1) {
        this.scheduleNote(this.currentNoteIndex, this.nextNoteTime);
        this.nextNoteTime += stepDuration;
        this.currentNoteIndex = (this.currentNoteIndex + 1) % 16;
      }
    } catch (e) {
      console.warn("Error scheduling BGM beats:", e);
    }
  }

  scheduleNote(stepIndex, time) {
    // 1. Kick Drum (Steps 0, 4, 8, 12)
    if (stepIndex % 4 === 0) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.bgmGainNode);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, time);
      osc.frequency.linearRampToValueAtTime(45, time + 0.12);
      
      gain.gain.setValueAtTime(0.22, time);
      gain.gain.linearRampToValueAtTime(0.001, time + 0.12);
      
      osc.start(time);
      osc.stop(time + 0.13);
    }

    // 2. Snare Drum / Noise (Steps 4, 12)
    if (stepIndex === 4 || stepIndex === 12) {
      const bufferSize = this.ctx.sampleRate * 0.08;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1000;
      
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.12, time);
      gain.gain.linearRampToValueAtTime(0.001, time + 0.08);
      
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.bgmGainNode);
      
      noise.start(time);
      noise.stop(time + 0.08);
    }

    // 3. Hi-Hat / Off-beat tick (Steps 2, 6, 10, 14)
    if (stepIndex % 4 === 2) {
      const bufferSize = this.ctx.sampleRate * 0.02;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 6000;
      
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.04, time);
      gain.gain.linearRampToValueAtTime(0.001, time + 0.02);
      
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.bgmGainNode);
      
      noise.start(time);
      noise.stop(time + 0.02);
    }

    // 4. Bassline (Sawtooth + Lowpass sweep on every step)
    const bassNotes = [
      82.41, 164.81, 82.41, 164.81, // E2, E3, E2, E3
      98.00, 196.00, 98.00, 196.00, // G2, G3, G2, G3
      110.00, 220.00, 123.47, 246.94, // A2, A3, B2, B3
      82.41, 164.81, 73.42, 146.83   // E2, E3, D2, D3
    ];
    const bassFreq = bassNotes[stepIndex];
    
    const bassOsc = this.ctx.createOscillator();
    const bassFilter = this.ctx.createBiquadFilter();
    const bassGain = this.ctx.createGain();
    
    bassOsc.connect(bassFilter);
    bassFilter.connect(bassGain);
    bassGain.connect(this.bgmGainNode);
    
    bassOsc.type = 'sawtooth';
    bassOsc.frequency.setValueAtTime(bassFreq, time);
    
    bassFilter.type = 'lowpass';
    bassFilter.frequency.setValueAtTime(600, time);
    bassFilter.frequency.linearRampToValueAtTime(200, time + 0.1);
    
    bassGain.gain.setValueAtTime(0.07, time);
    bassGain.gain.linearRampToValueAtTime(0.001, time + 0.1);
    
    bassOsc.start(time);
    bassOsc.stop(time + 0.1);

    // 5. Melody Lead (Square wave in E minor)
    const melodyNotes = [
      329.63, 0, 0, 392.00, // E4, rest, rest, G4
      0, 493.88, 0, 440.00, // rest, B4, rest, A4
      0, 493.88, 0, 587.33, // rest, B4, rest, D5
      0, 493.88, 0, 0       // rest, B4, rest, rest
    ];
    const melodyFreq = melodyNotes[stepIndex];
    if (melodyFreq > 0) {
      const leadOsc = this.ctx.createOscillator();
      const leadFilter = this.ctx.createBiquadFilter();
      const leadGain = this.ctx.createGain();
      
      leadOsc.connect(leadFilter);
      leadFilter.connect(leadGain);
      leadGain.connect(this.bgmGainNode);
      
      leadOsc.type = 'square';
      leadOsc.frequency.setValueAtTime(melodyFreq, time);
      
      leadFilter.type = 'lowpass';
      leadFilter.frequency.setValueAtTime(2000, time);
      leadFilter.frequency.linearRampToValueAtTime(800, time + 0.22);
      
      leadGain.gain.setValueAtTime(0.04, time);
      leadGain.gain.linearRampToValueAtTime(0.001, time + 0.22);
      
      leadOsc.start(time);
      leadOsc.stop(time + 0.23);
    }
  }
}

// Global audio player instance
const gameAudio = new AudioSynthManager();
