// Web Audio API ambient noise generator & musical chord synthesizer

class AudioEngine {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private isAmbientRunning = false;
  private currentAmbientType: string | null = null;
  private ambientSourceNodes: any[] = [];

  // Track Synth preview
  private trackGain: GainNode | null = null;
  private isTrackPlaying = false;
  private trackInterval: any = null;
  private currentTrackId: string | null = null;
  private analyserNode: AnalyserNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getAnalyser(): AnalyserNode | null {
    if (!this.ctx) this.initContext();
    if (!this.analyserNode && this.ctx) {
      this.analyserNode = this.ctx.createAnalyser();
      this.analyserNode.fftSize = 64;
    }
    return this.analyserNode;
  }

  // --- AMBIENT SOUND GENERATOR (Rain, Vinyl, 432Hz Drone) ---
  public playAmbient(type: 'rain' | 'vinyl' | 'drone' | 'waves', volume = 0.3) {
    this.initContext();
    if (!this.ctx) return;

    this.stopAmbient();

    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.setValueAtTime(volume, this.ctx.currentTime);
    this.ambientGain.connect(this.ctx.destination);

    if (type === 'rain') {
      this.createRainSound();
    } else if (type === 'vinyl') {
      this.createVinylSound();
    } else if (type === 'drone') {
      this.create432HzDrone();
    } else if (type === 'waves') {
      this.createOceanWaves();
    }

    this.isAmbientRunning = true;
    this.currentAmbientType = type;
  }

  public stopAmbient() {
    this.ambientSourceNodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch (e) {
        // ignore
      }
    });
    this.ambientSourceNodes = [];
    if (this.ambientGain) {
      try {
        this.ambientGain.disconnect();
      } catch (e) {}
      this.ambientGain = null;
    }
    this.isAmbientRunning = false;
    this.currentAmbientType = null;
  }

  public setAmbientVolume(val: number) {
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.linearRampToValueAtTime(val, this.ctx.currentTime + 0.1);
    }
  }

  public getAmbientState() {
    return {
      isPlaying: this.isAmbientRunning,
      type: this.currentAmbientType,
    };
  }

  private createRainSound() {
    if (!this.ctx || !this.ambientGain) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    // Pink noise for natural rain
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to simulate raindrops falling
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(this.ambientGain);
    whiteNoise.start();

    this.ambientSourceNodes.push(whiteNoise, filter);
  }

  private createVinylSound() {
    if (!this.ctx || !this.ambientGain) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      // Crackles
      if (Math.random() < 0.0008) {
        output[i] = (Math.random() * 2 - 1) * 0.8;
      } else {
        output[i] = (Math.random() * 2 - 1) * 0.015;
      }
    }

    const vinylSource = this.ctx.createBufferSource();
    vinylSource.buffer = noiseBuffer;
    vinylSource.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);

    vinylSource.connect(filter);
    filter.connect(this.ambientGain);
    vinylSource.start();

    this.ambientSourceNodes.push(vinylSource, filter);
  }

  private create432HzDrone() {
    if (!this.ctx || !this.ambientGain) return;

    // Deep binaural & 432Hz warm chord for nervous system calm
    const freqs = [108, 216, 432, 648];
    freqs.forEach(freq => {
      if (!this.ctx || !this.ambientGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.04 / (freq / 100), this.ctx.currentTime);

      osc.connect(gain);
      gain.connect(this.ambientGain);
      osc.start();

      this.ambientSourceNodes.push(osc, gain);
    });
  }

  private createOceanWaves() {
    if (!this.ctx || !this.ambientGain) return;
    const bufferSize = this.ctx.sampleRate * 3;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(300, this.ctx.currentTime);

    // LFO for wave ebb and flow
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime); // ~8 seconds per wave
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(400, this.ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    noise.connect(filter);
    filter.connect(this.ambientGain);

    noise.start();
    lfo.start();

    this.ambientSourceNodes.push(noise, filter, lfo, lfoGain);
  }

  // --- PROCEDURAL TRACK PREVIEW PLAYER ---
  public playTrackPreview(trackId: string, energy: number = 75, onStop?: () => void) {
    this.initContext();
    if (!this.ctx) return;

    if (this.currentTrackId === trackId && this.isTrackPlaying) {
      this.stopTrackPreview();
      return;
    }

    this.stopTrackPreview();
    this.currentTrackId = trackId;
    this.isTrackPlaying = true;

    const analyser = this.getAnalyser();

    this.trackGain = this.ctx.createGain();
    this.trackGain.gain.setValueAtTime(0.2, this.ctx.currentTime);

    if (analyser) {
      this.trackGain.connect(analyser);
      analyser.connect(this.ctx.destination);
    } else {
      this.trackGain.connect(this.ctx.destination);
    }

    // Determine scale and tempo based on energy
    const bpm = Math.max(70, Math.min(150, Math.floor(60 + energy * 0.9)));
    const stepDuration = 60 / bpm / 2; // eighth notes

    // Minor or Phrygian scales for intensity, Pentatonic for chill
    const notes = energy > 65
      ? [146.83, 174.61, 196.00, 220.00, 261.63, 293.66, 349.23] // D minor
      : [130.81, 164.81, 196.00, 246.94, 261.63, 329.63, 392.00]; // C maj / Am chill

    let step = 0;
    const playStep = () => {
      if (!this.ctx || !this.trackGain || !this.isTrackPlaying) return;

      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      const note = notes[step % notes.length];
      const isBass = step % 4 === 0;
      const freq = isBass ? note / 2 : note * (step % 3 === 0 ? 1.5 : 1);

      osc.type = energy > 70 ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.linearRampToValueAtTime(isBass ? 0.25 : 0.15, now + 0.03);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + stepDuration * 0.9);

      osc.connect(noteGain);
      noteGain.connect(this.trackGain);

      osc.start(now);
      osc.stop(now + stepDuration);

      step++;
    };

    playStep();
    this.trackInterval = setInterval(playStep, stepDuration * 1000);

    // Auto-stop after 35 seconds of preview
    setTimeout(() => {
      if (this.currentTrackId === trackId) {
        this.stopTrackPreview();
        if (onStop) onStop();
      }
    }, 35000);
  }

  public stopTrackPreview() {
    if (this.trackInterval) {
      clearInterval(this.trackInterval);
      this.trackInterval = null;
    }
    if (this.trackGain) {
      try {
        this.trackGain.disconnect();
      } catch (e) {}
      this.trackGain = null;
    }
    this.isTrackPlaying = false;
    this.currentTrackId = null;
  }

  public getTrackPlayingId() {
    return this.isTrackPlaying ? this.currentTrackId : null;
  }
}

export const audioEngine = new AudioEngine();
