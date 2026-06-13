// Core Game Engine for Neon Survivor

class NeonGameEngine {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');
    
    // Set fixed logical game resolution (3:2 aspect ratio)
    this.logicalWidth = 900;
    this.logicalHeight = 600;
    this.canvas.width = this.logicalWidth;
    this.canvas.height = this.logicalHeight;

    // Game state
    this.state = 'START'; // START, PLAYING, LEVEL_UP, GAME_OVER, VICTORY
    this.lastTime = 0;
    this.elapsedTime = 0; // ms
    this.totalGameDuration = 300; // 5 minutes in seconds
    this.difficulty = 'NORMAL';
    this.flashOpacity = 0;
    this.flashColorOverride = null;
    this.shockwaveRadius = 0;
    this.shockwaveMaxRadius = 650;
    this.shockwaveSpeed = 0.9;
    this.hellMode = false;
    this.hellModeStartTime = 0;
    
    // Inputs
    this.keys = {};
    this.mouse = { x: 0, y: 0, isDown: false };
    
    // Game Entities lists
    this.player = null;
    this.enemies = [];
    this.projectiles = [];
    this.gems = [];
    this.jewels = [];
    this.particles = [];
    this.damageNumbers = [];

    // Spawning timers
    this.spawnTimer = 0;
    this.enemyScaleMultiplier = 1.0;

    // Hit invulnerability timer for player
    this.playerIframeTimer = 0;

    // Developer Mode State
    this.devPanelOpen = false;
    this.godMode = false;
    this.freezeSpawns = false;
    this.autoRun = true;
    this.spawnIntervalOverride = null;
    this.enemySpeedMultiplierOverride = 1.0;
    this.enemyHpMultiplierOverride = 1.0;

    // Theme state
    this.theme = 'light';

    // Screen Shake State
    this.shakeDuration = 0;
    this.shakeIntensity = 0;

    // Countdown Timers for Auto-Close
    this.levelUpTimer = null;
    this.rouletteTimer = null;
    
    // Bind DOM events
    this.setupDOM();
    this.setupInput();
    this.loadWeaponBalance();
  }

  setupDOM() {
    this.startScreen = document.getElementById('start-screen');
    this.hud = document.getElementById('hud');
    this.hudDifficulty = document.getElementById('hud-difficulty');
    this.hudAutoRun = document.getElementById('hud-auto-run');
    this.levelUpScreen = document.getElementById('level-up-screen');
    this.gameOverScreen = document.getElementById('game-over-screen');
    
    this.startNormalBtn = document.getElementById('start-normal-btn');
    this.startHardBtn = document.getElementById('start-hard-btn');
    this.restartBtn = document.getElementById('restart-btn');
    this.themeToggle = document.getElementById('theme-toggle');
    
    this.startNormalBtn.addEventListener('click', () => this.startGame('NORMAL'));
    this.startHardBtn.addEventListener('click', () => this.startGame('HARD'));
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
    this.restartBtn.addEventListener('click', () => this.startGame(this.difficulty || 'NORMAL'));

    this.reviveScreen = document.getElementById('revive-screen');
    this.reviveConfirmBtn = document.getElementById('revive-confirm-btn');
    this.reviveConfirmBtn.addEventListener('click', () => this.confirmRevival());

    this.rouletteScreen = document.getElementById('roulette-screen');
    this.rouletteClaimBtn = document.getElementById('roulette-claim-btn');
    this.rouletteClaimBtn.addEventListener('click', () => this.resumeRoulette());

    // Setup Dev UI elements
    this.setupDevPanel();
  }

  setupInput() {
    // Keyboard inputs
    window.addEventListener('keydown', (e) => {
      if (e.key) {
        this.keys[e.key.toLowerCase()] = true;
      }

      // Dev mode hotkeys: Backquote (`) or @
      if (e.code === 'Backquote' || e.key === '`' || e.key === '@') {
        this.toggleDevPanel();
      }

      // Auto Run hotkey: R
      if (e.key && e.key.toLowerCase() === 'r' && this.state === 'PLAYING') {
        this.autoRun = !this.autoRun;
        if (this.devAutoRun) {
          this.devAutoRun.checked = this.autoRun;
        }
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.key) {
        this.keys[e.key.toLowerCase()] = false;
      }
    });

    // Mouse/Touch inputs
    const getCanvasMousePos = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      // Scale mouse coordinates to match canvas logical resolution
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: ((clientX - rect.left) / rect.width) * this.logicalWidth,
        y: ((clientY - rect.top) / rect.height) * this.logicalHeight
      };
    };

    const onPointerDown = (e) => {
      if (this.state !== 'PLAYING') return;
      this.mouse.isDown = true;
      const pos = getCanvasMousePos(e);
      this.mouse.x = pos.x;
      this.mouse.y = pos.y;
    };

    const onPointerMove = (e) => {
      if (this.state !== 'PLAYING') return;
      const pos = getCanvasMousePos(e);
      this.mouse.x = pos.x;
      this.mouse.y = pos.y;
    };

    const onPointerUp = () => {
      this.mouse.isDown = false;
    };

    this.canvas.addEventListener('mousedown', onPointerDown);
    this.canvas.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    this.canvas.addEventListener('touchstart', (e) => {
      onPointerDown(e);
    }, { passive: true });
    this.canvas.addEventListener('touchmove', (e) => {
      onPointerMove(e);
    }, { passive: true });
    window.addEventListener('touchend', onPointerUp);
  }

  loadWeaponBalance() {
    fetch('weapon_balance.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        window.weaponBalance = data;
        console.log('Weapon balance configuration loaded successfully:', data);
      })
      .catch(error => {
        console.warn('Failed to load weapon_balance.json. Falling back to default configuration:', error);
      });
  }

  toggleDevPanel() {
    this.devPanelOpen = !this.devPanelOpen;
    if (this.devPanelOpen) {
      this.devPanel.classList.remove('dev-panel-collapsed');
    } else {
      this.devPanel.classList.add('dev-panel-collapsed');
    }
  }

  setupDevPanel() {
    this.devToggle = document.getElementById('dev-toggle');
    this.devPanel = document.getElementById('dev-panel');
    
    // Toggle click
    this.devToggle.addEventListener('click', () => this.toggleDevPanel());

    // God mode
    this.devGodMode = document.getElementById('dev-god-mode');
    this.devGodMode.addEventListener('change', () => {
      this.godMode = this.devGodMode.checked;
    });

    // Auto Run
    this.devAutoRun = document.getElementById('dev-auto-run');
    this.devAutoRun.addEventListener('change', () => {
      this.autoRun = this.devAutoRun.checked;
    });

    // Heal
    this.devHealBtn = document.getElementById('dev-heal-btn');
    this.devHealBtn.addEventListener('click', () => {
      if (this.player) {
        this.player.hp = this.player.maxHp;
        this.updateHUD(Math.floor(this.elapsedTime / 1000));
      }
    });

    // Level up
    this.devLvlUpBtn = document.getElementById('dev-lvl-up-btn');
    this.devLvlUpBtn.addEventListener('click', () => {
      if (this.state === 'PLAYING') {
        this.triggerLevelUp();
      }
    });

    // Skip time 30s
    this.devSkip30sBtn = document.getElementById('dev-skip-30s-btn');
    this.devSkip30sBtn.addEventListener('click', () => {
      if (this.state === 'PLAYING') {
        this.elapsedTime += 30000;
        this.updateHUD(Math.floor(this.elapsedTime / 1000));
      }
    });

    // Skip time 1m
    this.devSkip1mBtn = document.getElementById('dev-skip-1m-btn');
    this.devSkip1mBtn.addEventListener('click', () => {
      if (this.state === 'PLAYING') {
        this.elapsedTime += 60000;
        this.updateHUD(Math.floor(this.elapsedTime / 1000));
      }
    });

    // Freeze spawn
    this.devFreezeSpawn = document.getElementById('dev-freeze-spawn');
    this.devFreezeSpawn.addEventListener('change', () => {
      this.freezeSpawns = this.devFreezeSpawn.checked;
    });

    // Spawn rate
    this.devSpawnRate = document.getElementById('dev-spawn-rate');
    this.devSpawnRateVal = document.getElementById('dev-spawn-rate-val');
    this.devSpawnRate.addEventListener('input', () => {
      const ms = parseInt(this.devSpawnRate.value);
      this.spawnIntervalOverride = ms;
      this.devSpawnRateVal.innerText = `${(ms / 1000).toFixed(1)}s`;
    });

    // Enemy speed
    this.devEnemySpeed = document.getElementById('dev-enemy-speed');
    this.devEnemySpeedVal = document.getElementById('dev-enemy-speed-val');
    this.devEnemySpeed.addEventListener('input', () => {
      const val = parseFloat(this.devEnemySpeed.value);
      this.enemySpeedMultiplierOverride = val;
      this.devEnemySpeedVal.innerText = `${val.toFixed(1)}x`;
      // Dynamically apply to existing enemies
      this.enemies.forEach(e => {
        const baseSpeed = e.type === 'spider' ? 1.6 : (e.type === 'skeleton' ? 1.1 : (e.type === 'orc' ? 0.7 : 0.55));
        e.speed = baseSpeed * val;
      });
    });

    // Enemy HP
    this.devEnemyHp = document.getElementById('dev-enemy-hp');
    this.devEnemyHpVal = document.getElementById('dev-enemy-hp-val');
    this.devEnemyHp.addEventListener('input', () => {
      const val = parseFloat(this.devEnemyHp.value);
      this.enemyHpMultiplierOverride = val;
      this.devEnemyHpVal.innerText = `${val.toFixed(1)}x`;
    });

    // Clear enemies
    this.devClearEnemies = document.getElementById('dev-clear-enemies');
    this.devClearEnemies.addEventListener('click', () => {
      this.enemies.forEach(enemy => {
        enemy.takeDamage(Infinity);
      });
    });

    // Spawn boss
    this.devSpawnBoss = document.getElementById('dev-spawn-boss');
    this.devSpawnBoss.addEventListener('click', () => {
      if (this.state === 'PLAYING') {
        this.bossSpawned = true;
        this.spawnBoss();
      }
    });

    // Weapon Level Sliders
    this.devWpnMagic = document.getElementById('dev-wpn-magic');
    this.devWpnMagicVal = document.getElementById('dev-wpn-magic-val');
    this.devWpnMagic.addEventListener('input', () => {
      const lvl = parseInt(this.devWpnMagic.value);
      this.devWpnMagicVal.innerText = `Lv${lvl}`;
      if (this.player) {
        this.player.setWeaponLevel('MagicWand', lvl);
        this.updateHUD(Math.floor(this.elapsedTime / 1000));
      }
    });

    this.devWpnGarlic = document.getElementById('dev-wpn-garlic');
    this.devWpnGarlicVal = document.getElementById('dev-wpn-garlic-val');
    this.devWpnGarlic.addEventListener('input', () => {
      const lvl = parseInt(this.devWpnGarlic.value);
      this.devWpnGarlicVal.innerText = `Lv${lvl}`;
      if (this.player) {
        this.player.setWeaponLevel('GarlicAura', lvl);
        this.updateHUD(Math.floor(this.elapsedTime / 1000));
      }
    });

    this.devWpnScythe = document.getElementById('dev-wpn-scythe');
    this.devWpnScytheVal = document.getElementById('dev-wpn-scythe-val');
    this.devWpnScythe.addEventListener('input', () => {
      const lvl = parseInt(this.devWpnScythe.value);
      this.devWpnScytheVal.innerText = `Lv${lvl}`;
      if (this.player) {
        this.player.setWeaponLevel('SpinningScythe', lvl);
        this.updateHUD(Math.floor(this.elapsedTime / 1000));
      }
    });

    this.devWpnSword = document.getElementById('dev-wpn-sword');
    this.devWpnSwordVal = document.getElementById('dev-wpn-sword-val');
    this.devWpnSword.addEventListener('input', () => {
      const lvl = parseInt(this.devWpnSword.value);
      this.devWpnSwordVal.innerText = `Lv${lvl}`;
      if (this.player) {
        this.player.setWeaponLevel('BigSword', lvl);
        this.updateHUD(Math.floor(this.elapsedTime / 1000));
      }
    });

    this.devWpnThunder = document.getElementById('dev-wpn-thunder');
    this.devWpnThunderVal = document.getElementById('dev-wpn-thunder-val');
    this.devWpnThunder.addEventListener('input', () => {
      const lvl = parseInt(this.devWpnThunder.value);
      this.devWpnThunderVal.innerText = `Lv${lvl}`;
      if (this.player) {
        this.player.setWeaponLevel('ThunderWave', lvl);
        this.updateHUD(Math.floor(this.elapsedTime / 1000));
      }
    });

    this.devWpnFire = document.getElementById('dev-wpn-fire');
    this.devWpnFireVal = document.getElementById('dev-wpn-fire-val');
    this.devWpnFire.addEventListener('input', () => {
      const lvl = parseInt(this.devWpnFire.value);
      this.devWpnFireVal.innerText = `Lv${lvl}`;
      if (this.player) {
        this.player.setWeaponLevel('FireRoad', lvl);
        this.updateHUD(Math.floor(this.elapsedTime / 1000));
      }
    });

    // Passive Level Sliders
    const bindPassive = (elemId, badgeId, statName) => {
      const slider = document.getElementById(elemId);
      const badge = document.getElementById(badgeId);
      slider.addEventListener('input', () => {
        const lvl = parseInt(slider.value);
        badge.innerText = `Lv${lvl}`;
        if (this.player) {
          this.player.setPassiveLevel(statName, lvl);
          this.updateHUD(Math.floor(this.elapsedTime / 1000));
        }
      });
    };

    bindPassive('dev-pass-hp', 'dev-pass-hp-val', 'maxHp');
    bindPassive('dev-pass-regen', 'dev-pass-regen-val', 'regen');
    bindPassive('dev-pass-damage', 'dev-pass-damage-val', 'damage');
    bindPassive('dev-pass-speed', 'dev-pass-speed-val', 'speed');
    bindPassive('dev-pass-magnet', 'dev-pass-magnet-val', 'magnet');
  }

  syncDevPanel() {
    if (!this.player) return;

    const syncWpn = (weaponClassName, sliderId, badgeId) => {
      const wpn = this.player.weapons.find(w => w.constructor.name === weaponClassName);
      const lvl = wpn ? wpn.level : 0;
      const slider = document.getElementById(sliderId);
      const badge = document.getElementById(badgeId);
      if (slider && badge) {
        slider.value = lvl;
        badge.innerText = `Lv${lvl}`;
      }
    };

    syncWpn('MagicWand', 'dev-wpn-magic', 'dev-wpn-magic-val');
    syncWpn('GarlicAura', 'dev-wpn-garlic', 'dev-wpn-garlic-val');
    syncWpn('SpinningScythe', 'dev-wpn-scythe', 'dev-wpn-scythe-val');
    syncWpn('BigSword', 'dev-wpn-sword', 'dev-wpn-sword-val');
    syncWpn('ThunderWave', 'dev-wpn-thunder', 'dev-wpn-thunder-val');
    syncWpn('FireRoad', 'dev-wpn-fire', 'dev-wpn-fire-val');

    const syncPass = (statName, sliderId, badgeId) => {
      const pass = this.player.passives.find(p => p.statName === statName);
      const lvl = pass ? pass.level : 0;
      const slider = document.getElementById(sliderId);
      const badge = document.getElementById(badgeId);
      if (slider && badge) {
        slider.value = lvl;
        badge.innerText = `Lv${lvl}`;
      }
    };

    syncPass('maxHp', 'dev-pass-hp', 'dev-pass-hp-val');
    syncPass('regen', 'dev-pass-regen', 'dev-pass-regen-val');
    syncPass('damage', 'dev-pass-damage', 'dev-pass-damage-val');
    syncPass('speed', 'dev-pass-speed', 'dev-pass-speed-val');
    syncPass('magnet', 'dev-pass-magnet', 'dev-pass-magnet-val');

    if (this.devAutoRun) {
      this.devAutoRun.checked = this.autoRun;
    }
  }

  triggerScreenShake(duration, intensity) {
    this.shakeDuration = duration;
    this.shakeIntensity = intensity;
  }

  startGame(difficulty = 'NORMAL') {
    // Start synth context
    gameAudio.init();
    
    this.difficulty = difficulty;
    if (this.difficulty === 'HARD') {
      this.hudDifficulty.classList.remove('hidden');
    } else {
      this.hudDifficulty.classList.add('hidden');
    }

    // Reset Game State variables
    this.state = 'PLAYING';
    this.elapsedTime = 0;
    this.spawnTimer = 0;
    this.enemyScaleMultiplier = 1.0;
    this.playerIframeTimer = 0;
    this.shakeDuration = 0;
    this.shakeIntensity = 0;
    this.bossSpawned = false;
    this.flashOpacity = 0;
    this.flashColorOverride = null;
    this.shockwaveRadius = 0;
    this.hellMode = false;
    this.hellModeStartTime = 0;

    // Clear active menu intervals
    if (this.levelUpTimer) {
      clearInterval(this.levelUpTimer);
      this.levelUpTimer = null;
    }
    if (this.rouletteTimer) {
      clearInterval(this.rouletteTimer);
      this.rouletteTimer = null;
    }

    // Reset Developer Mode State
    this.godMode = false;
    this.freezeSpawns = false;
    this.autoRun = true;
    this.spawnIntervalOverride = null;
    this.enemySpeedMultiplierOverride = 1.0;
    this.enemyHpMultiplierOverride = 1.0;

    // Reset Dev Panel elements inputs
    if (this.devGodMode) this.devGodMode.checked = false;
    if (this.devFreezeSpawn) this.devFreezeSpawn.checked = false;
    if (this.devAutoRun) this.devAutoRun.checked = true;
    if (this.devSpawnRate) {
      this.devSpawnRate.value = 1500;
      this.devSpawnRateVal.innerText = '1.5s';
    }
    if (this.devEnemySpeed) {
      this.devEnemySpeed.value = 1.0;
      this.devEnemySpeedVal.innerText = '1.0x';
    }
    if (this.devEnemyHp) {
      this.devEnemyHp.value = 1.0;
      this.devEnemyHpVal.innerText = '1.0x';
    }
    if (this.devWpnSword) {
      this.devWpnSword.value = 0;
      this.devWpnSwordVal.innerText = 'Lv0';
    }
    if (this.devWpnThunder) {
      this.devWpnThunder.value = 0;
      this.devWpnThunderVal.innerText = 'Lv0';
    }
    if (this.devWpnFire) {
      this.devWpnFire.value = 0;
      this.devWpnFireVal.innerText = 'Lv0';
    }
    
    // Clear entities
    this.player = new Player(this.logicalWidth / 2, this.logicalHeight / 2);
    this.player.particlesRef = this.particles;
    this.player.damageNumbersRef = this.damageNumbers;

    this.syncDevPanel();

    this.enemies = [];
    this.projectiles = [];
    this.gems = [];
    this.jewels = [];
    this.particles = [];
    this.damageNumbers = [];

    // Hide screens, show HUD
    this.startScreen.classList.add('hidden');
    this.levelUpScreen.classList.add('hidden');
    this.gameOverScreen.classList.add('hidden');
    if (this.reviveScreen) this.reviveScreen.classList.add('hidden');
    if (this.rouletteScreen) this.rouletteScreen.classList.add('hidden');
    this.hud.classList.remove('hidden');

    // Reset keys
    this.keys = {};
    this.mouse.isDown = false;

    // Start gameloop
    this.lastTime = performance.now();
    requestAnimationFrame((timestamp) => this.loop(timestamp));
  }

  loop(timestamp) {
    if (this.state === 'LEVEL_UP' || this.state === 'REVIVING' || this.state === 'ROULETTE') {
      // pause loop, wait for choice/confirmation
      return;
    }
    if (this.state === 'GAME_OVER' || this.state === 'VICTORY') {
      this.showEndScreen();
      return;
    }

    const dt = timestamp - this.lastTime;
    this.lastTime = timestamp;

    // Cap dt to prevent huge skips during background tab freeze
    const cappedDt = Math.min(dt, 100);

    this.update(cappedDt);
    this.draw();

    requestAnimationFrame((timestamp) => this.loop(timestamp));
  }

  update(dt) {
    this.elapsedTime += dt;
    const currentSecs = Math.floor(this.elapsedTime / 1000);

    // End condition
    if (currentSecs >= this.totalGameDuration && !this.bossSpawned) {
      this.bossSpawned = true;
      this.spawnBoss();
    }

    // Process inputs and move player
    let dx = 0;
    let dy = 0;

    // Toggle HUD Auto Run Badge visibility
    if (this.hudAutoRun) {
      if (this.autoRun) {
        this.hudAutoRun.classList.remove('hidden');
      } else {
        this.hudAutoRun.classList.add('hidden');
      }
    }

    // Check if user is actively inputting movement
    const keysPressed = ['w', 's', 'a', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'];
    const hasKeyboardInput = keysPressed.some(key => this.keys[key]);
    
    let hasMouseInput = false;
    if (this.mouse.isDown && this.player) {
      const mDx = this.mouse.x - this.player.x;
      const mDy = this.mouse.y - this.player.y;
      const mDist = Math.sqrt(mDx * mDx + mDy * mDy);
      if (mDist > 10) {
        hasMouseInput = true;
      }
    }
    const isUserInputting = hasKeyboardInput || hasMouseInput;

    if (isUserInputting) {
      // 1. Keyboard controls
      if (this.keys['w'] || this.keys['arrowup']) dy = -1;
      if (this.keys['s'] || this.keys['arrowdown']) dy = 1;
      if (this.keys['a'] || this.keys['arrowleft']) dx = -1;
      if (this.keys['d'] || this.keys['arrowright']) dx = 1;

      // 2. Mouse/Touch control overrides if active or dragging
      if (this.mouse.isDown) {
        const mDx = this.mouse.x - this.player.x;
        const mDy = this.mouse.y - this.player.y;
        const mDist = Math.sqrt(mDx * mDx + mDy * mDy);
        
        // If mouse is far enough from player, move player towards it
        if (mDist > 10) {
          dx = mDx;
          dy = mDy;
        }
      }
    } else if (this.autoRun && this.player) {
      // Auto run logic: evade enemies & walls, attract to experience gems / jewels.
      
      // 1. Evade enemies within dangerous threshold
      for (const enemy of this.enemies) {
        const diffX = this.player.x - enemy.x;
        const diffY = this.player.y - enemy.y;
        const dist = Math.sqrt(diffX * diffX + diffY * diffY);
        
        // Tuned threshold: Bosses are a much larger danger, normal enemies are only dangerous close up
        const isBoss = enemy.type === 'boss' || enemy.type === 'boss2';
        const dangerThreshold = isBoss ? 220 : 150;
        
        if (dist > 0 && dist < dangerThreshold) {
          // Weight increases rapidly as distance decreases
          const weight = (isBoss ? 15000 : 8000) / (dist * dist + 20);
          dx += (diffX / dist) * weight;
          dy += (diffY / dist) * weight;
        }
      }

      // 2. Evade walls
      const wallThreshold = 80;
      // Left wall
      if (this.player.x < wallThreshold) {
        const d = Math.max(5, this.player.x);
        dx += 2500 / (d * d);
      }
      // Right wall
      if (this.player.x > this.logicalWidth - wallThreshold) {
        const d = Math.max(5, this.logicalWidth - this.player.x);
        dx -= 2500 / (d * d);
      }
      // Top wall
      if (this.player.y < wallThreshold) {
        const d = Math.max(5, this.player.y);
        dy += 2500 / (d * d);
      }
      // Bottom wall
      if (this.player.y > this.logicalHeight - wallThreshold) {
        const d = Math.max(5, this.logicalHeight - this.player.y);
        dy -= 2500 / (d * d);
      }

      // 3. Attract to closest Gem or Jewel (Proactive Collection)
      let closestItem = null;
      let minItemDist = Infinity;
      
      // Prioritize jewels
      for (const jewel of this.jewels) {
        const d = Math.sqrt((jewel.x - this.player.x) ** 2 + (jewel.y - this.player.y) ** 2);
        if (d < minItemDist) {
          minItemDist = d;
          closestItem = jewel;
        }
      }
      // Check gems
      for (const gem of this.gems) {
        const d = Math.sqrt((gem.x - this.player.x) ** 2 + (gem.y - this.player.y) ** 2);
        if (d < minItemDist) {
          minItemDist = d;
          closestItem = gem;
        }
      }

      if (closestItem && minItemDist > 0) {
        const attractX = closestItem.x - this.player.x;
        const attractY = closestItem.y - this.player.y;
        
        // Attraction force scale (tuned to be proactive)
        let attractionWeight = 4.0;
        if (minItemDist < 120) {
          attractionWeight = 7.0; // Strongly pull to pick up close items
        }
        if (closestItem.constructor.name === 'Jewel') {
          attractionWeight = 9.0; // Upgrade jewel is top priority
        }
        
        dx += (attractX / minItemDist) * attractionWeight;
        dy += (attractY / minItemDist) * attractionWeight;
      }

      // 4. Add small jitter/noise to prevent getting stuck in deadlocks / vibration
      dx += (Math.random() - 0.5) * 0.15;
      dy += (Math.random() - 0.5) * 0.15;
    }

    this.player.move(dx, dy, this.logicalWidth, this.logicalHeight);
    this.player.update(dt);

    // Update Player Weapons
    this.player.weapons.forEach(weapon => {
      weapon.update(dt, this.player, this.enemies, this.projectiles);
    });

    // Update Projectiles
    this.projectiles.forEach(proj => proj.update(dt));
    this.projectiles = this.projectiles.filter(proj => proj.active && proj.life > 0);

    // Update Enemies
    this.enemies.forEach(enemy => enemy.update(this.player, this.enemies, this.logicalWidth, this.logicalHeight));
    
    // Fade screen flash
    if (this.flashOpacity > 0) {
      this.flashOpacity -= dt / 600; // fade out over 600ms
      if (this.flashOpacity <= 0) {
        this.flashOpacity = 0;
        this.flashColorOverride = null;
      }
    }

    // Expand shockwave
    if (this.shockwaveRadius > 0 && this.shockwaveRadius < this.shockwaveMaxRadius) {
      this.shockwaveRadius += this.shockwaveSpeed * dt;
    }

    // Handle player invulnerability frame tick
    if (this.playerIframeTimer > 0) {
      this.playerIframeTimer -= dt;
    }

    // Spawning Logic
    this.spawnTimer += dt;
    const spawnRate = this.spawnIntervalOverride !== null ? this.spawnIntervalOverride : this.getSpawnInterval(currentSecs);
    
    // Freeze normal spawns if a boss is alive (only if not in Hell Mode)
    const bossAlive = this.enemies.some(e => e.type === 'boss' || e.type === 'boss2');
    if (this.freezeSpawns || (bossAlive && !this.hellMode)) {
      this.spawnTimer = 0;
    } else if (this.spawnTimer >= spawnRate) {
      this.spawnTimer = 0;
      this.spawnEnemy(currentSecs);
    }

    // Check Collisions
    this.resolveCollisions();

    // Update Experience Gems
    this.gems.forEach(gem => gem.update(this.player));
    this.gems = this.gems.filter(gem => {
      const dist = getDistance(this.player.x, this.player.y, gem.x, gem.y);
      if (dist <= this.player.radius + gem.radius) {
        // Collect gem
        const levelUp = this.player.addExp(gem.expValue);
        if (levelUp) {
          this.triggerLevelUp();
        }
        return false;
      }
      return true;
    });

    // Update Jewels
    this.jewels.forEach(jewel => jewel.update(this.player));
    this.jewels = this.jewels.filter(jewel => {
      const dist = getDistance(this.player.x, this.player.y, jewel.x, jewel.y);
      if (dist <= this.player.radius + jewel.radius) {
        this.triggerJewelLottery();
        return false;
      }
      return true;
    });

    // Update Particles
    this.particles.forEach(p => p.update());
    this.particles = this.particles.filter(p => p.life > 0);

    // Update Damage Numbers
    this.damageNumbers.forEach(dn => dn.update());
    this.damageNumbers = this.damageNumbers.filter(dn => dn.life > 0);

    // Update HTML HUD
    this.updateHUD(currentSecs);

    // Check Defeat
    if (this.player.hp <= 0) {
      if (this.player.revivesRemaining > 0) {
        this.triggerRevivalScreen();
      } else {
        this.state = 'GAME_OVER';
      }
    }
  }

  getSpawnInterval(secs) {
    if (secs < 60) return 600;    // 0.6s
    if (secs < 120) return 400;   // 0.4s
    if (secs < 180) return 250;   // 0.25s
    if (secs < 240) return 180;   // 0.18s
    return 90;                    // 0.09s
  }

  spawnEnemy(secs) {
    const maxEnemies = this.getMaxEnemyCount(secs);
    if (this.enemies.length >= maxEnemies) return;

    const angle = Math.random() * Math.PI * 2;
    const spawnDist = 450;
    const x = this.player.x + Math.cos(angle) * spawnDist;
    const y = this.player.y + Math.sin(angle) * spawnDist;

    let type = 'spider';
    const roll = Math.random();

    this.enemyScaleMultiplier = 1.0 + (secs / 60) * 0.35;

    let scaleMultiplier = this.enemyScaleMultiplier * this.enemyHpMultiplierOverride * (this.difficulty === 'HARD' ? 2.0 : 1.0);
    let speedMult = this.enemySpeedMultiplierOverride;
    let damageMult = 1.0;

    if (this.hellMode) {
      const hellTimeSecs = (this.elapsedTime - this.hellModeStartTime) / 1000;
      const hellMultiplier = Math.exp(hellTimeSecs * 0.04);
      scaleMultiplier *= hellMultiplier;
      damageMult *= hellMultiplier;
      speedMult *= Math.min(2.5, 1 + hellTimeSecs * 0.005);

      // 5% Destroyer (boss), 3% Neo Nemesis (boss2), 92% Swarm
      if (roll < 0.03) {
        type = 'boss2';
      } else if (roll < 0.08) {
        type = 'boss';
      } else {
        // Standard high-level swarm mix
        const swarmRoll = Math.random();
        type = swarmRoll < 0.3 ? 'bat' : (swarmRoll < 0.55 ? 'phantom' : (swarmRoll < 0.75 ? 'slime' : (swarmRoll < 0.9 ? 'skeleton' : 'golem')));
      }
    } else {
      // Wave spawning logic based on time elapsed
      if (secs >= 240) {
        // 4-5 minutes (Ultimate Swarm)
        type = roll < 0.3 ? 'bat' : (roll < 0.55 ? 'phantom' : (roll < 0.75 ? 'slime' : (roll < 0.9 ? 'skeleton' : 'golem')));
      } else if (secs >= 180) {
        // 3-4 minutes (All types mixed)
        type = roll < 0.25 ? 'bat' : (roll < 0.45 ? 'phantom' : (roll < 0.65 ? 'slime' : (roll < 0.85 ? 'skeleton' : 'golem')));
      } else if (secs >= 120) {
        // 2-3 minutes (Introduce Golem & Slimes)
        type = roll < 0.25 ? 'slime' : (roll < 0.5 ? 'phantom' : (roll < 0.75 ? 'skeleton' : (roll < 0.9 ? 'bat' : 'golem')));
      } else if (secs >= 60) {
        // 1-2 minutes (Introduce Skeleton & Phantom)
        type = roll < 0.35 ? 'skeleton' : (roll < 0.7 ? 'phantom' : (roll < 0.85 ? 'bat' : 'spider'));
      } else {
        // 0-1 minute (Spiders & Bats)
        type = roll < 0.6 ? 'spider' : 'bat';
      }
    }

    const enemy = new Enemy(x, y, type, scaleMultiplier);
    enemy.speed *= speedMult;
    enemy.damage *= damageMult;
    this.enemies.push(enemy);
  }

  spawnBoss() {
    // Screen shake when boss spawns
    this.triggerScreenShake(35, 12);
    
    // Clear all normal enemies so player can face the BOSS in a clean field
    this.enemies = this.enemies.filter(e => e.type === 'boss' || e.type === 'boss2');
    
    const angle = Math.random() * Math.PI * 2;
    const x = this.player.x + Math.cos(angle) * 200; // spawn closer (200px) so it's instantly visible
    const y = this.player.y + Math.sin(angle) * 200;
    const boss = new Enemy(x, y, 'boss', this.enemyScaleMultiplier * 1.5 * this.enemyHpMultiplierOverride * (this.difficulty === 'HARD' ? 2.0 : 1.0));
    boss.speed *= this.enemySpeedMultiplierOverride;
    this.enemies.push(boss);
  }

  spawnBoss2() {
    this.triggerScreenShake(30, 10);
    this.damageNumbers.push(new DamageNumber(this.player.x, this.player.y - 30, "+BOSS v2 ENTERS+", true));
    
    const angle = Math.random() * Math.PI * 2;
    const x = this.player.x + Math.cos(angle) * 200; // spawn closer (200px) so it's instantly visible
    const y = this.player.y + Math.sin(angle) * 200;
    const boss2 = new Enemy(x, y, 'boss2', this.enemyScaleMultiplier * 1.5 * this.enemyHpMultiplierOverride * (this.difficulty === 'HARD' ? 2.0 : 1.0));
    boss2.speed *= this.enemySpeedMultiplierOverride;
    
    // Return boss2 instead of pushing to this.enemies directly to avoid the filter overwrite bug
    return boss2;
  }

  enterHellMode() {
    this.hellMode = true;
    this.hellModeStartTime = this.elapsedTime;
    
    // Shocking visual/shake effects
    this.triggerScreenShake(55, 16.0);
    this.flashOpacity = 1.0;
    this.flashColorOverride = 'rgba(255, 0, 0, ';
    
    // Audio trigger
    gameAudio.playHellMode();
    
    // On-screen message notices
    const px = this.player.x;
    const py = this.player.y;
    this.damageNumbers.push(new DamageNumber(px, py - 60, "★ HELL MODE ACTIVATED ★", true, "#ff0000", 22));
    this.damageNumbers.push(new DamageNumber(px, py - 35, "敵が指数関数的に無限に強化される...", false, "#ff5555", 14));
  }

  getMaxEnemyCount(secs) {
    if (secs < 60) return 120;
    if (secs < 120) return 200;
    if (secs < 180) return 320;
    if (secs < 240) return 400;
    return 500;
  }

  resolveCollisions() {
    // 1. Projectiles vs Enemies
    this.projectiles.forEach(proj => {
      this.enemies.forEach(enemy => {
        if (!proj.active || !enemy.active) return;
        
        // Skip if this projectile already hit this enemy
        if (proj.hits.includes(enemy.id)) return;

        const dist = getDistance(proj.x, proj.y, enemy.x, enemy.y);
        if (dist <= proj.radius + enemy.radius) {
          // Hit! Deal damage
          const isCrit = Math.random() < 0.08; // 8% crit chance
          const damageAmount = proj.damage * (isCrit ? 2.0 : 1.0);
          
          enemy.takeDamage(damageAmount);
          this.damageNumbers.push(new DamageNumber(enemy.x, enemy.y, damageAmount, isCrit));
          
          // Spawn particle blowout (increased count!)
          this.player.spawnParticles(proj.x, proj.y, proj.color, isCrit ? 1.6 : 0.8, isCrit ? 12 : 5);
          
          // Apply knockback (push away from player)
          const kDx = enemy.x - this.player.x;
          const kDy = enemy.y - this.player.y;
          const kLen = Math.sqrt(kDx * kDx + kDy * kDy);
          if (kLen > 0) {
            const baseForce = (proj.constructor.name === 'ScytheProjectile' || proj.radius >= 7) ? 15 : 7;
            const force = isCrit ? baseForce * 2.2 : baseForce;
            enemy.x += (kDx / kLen) * force;
            enemy.y += (kDy / kLen) * force;
          }

          // Trigger screen shake on crits
          if (isCrit) {
            this.triggerScreenShake(7, 3.5);
          }
          
          gameAudio.playHit();

          // Register hit
          proj.hits.push(enemy.id);
          proj.pierce--;
          if (proj.pierce <= 0) {
            proj.active = false;
          }
        }
      });
    });

    // Filter dead enemies & spawn experience gems
    const newSpawns = [];
    this.enemies = this.enemies.filter(enemy => {
      if (!enemy.active) {
        // Increment kill count
        this.player.kills++;
        
        // Spawn particles (blowout spark count!)
        this.player.spawnParticles(enemy.x, enemy.y, enemy.color, 1.3, enemy.type === 'boss' ? 50 : 18);
        
        // Slime split logic
        if (enemy.type === 'slime') {
          const splitOffset = 14;
          for (let j = 0; j < 2; j++) {
            const angleOffset = (j === 0 ? 1 : -1) * Math.PI / 3.5 + Math.random() * 0.4;
            const parentAngle = Math.random() * Math.PI * 2;
            const mx = enemy.x + Math.cos(parentAngle + angleOffset) * splitOffset;
            const my = enemy.y + Math.sin(parentAngle + angleOffset) * splitOffset;
            
            const mini = new Enemy(mx, my, 'mini-slime', this.enemyScaleMultiplier * this.enemyHpMultiplierOverride * 0.5 * (this.difficulty === 'HARD' ? 2.0 : 1.0)); // mini slime has less HP
            mini.speed *= this.enemySpeedMultiplierOverride;
            newSpawns.push(mini);
          }
          this.triggerScreenShake(4, 2.0); // minor shake on division
        }

        // Spawn experience gem
        this.gems.push(new Gem(enemy.x, enemy.y, enemy.expValue));

        // 5% chance to drop a special upgrade jewel
        if (Math.random() < 0.05) {
          this.jewels.push(new Jewel(enemy.x, enemy.y));
        }

        // Check if boss defeated -> spawn boss2
        if (enemy.type === 'boss' && !this.hellMode) {
          const boss2 = this.spawnBoss2();
          newSpawns.push(boss2);
        }
        // Check if boss2 defeated -> Win! Or enter Hell Mode!
        if (enemy.type === 'boss2') {
          if (!this.hellMode) {
            this.enterHellMode();
          }
        }
        return false;
      }
      return true;
    });

    // Add newly spawned mini-slimes
    if (newSpawns.length > 0) {
      this.enemies = this.enemies.concat(newSpawns);
    }

    // 2. Player vs Enemies
    if (this.godMode) {
      this.playerIframeTimer = 0;
      return;
    }
    if (this.playerIframeTimer <= 0) {
      for (let i = 0; i < this.enemies.length; i++) {
        const enemy = this.enemies[i];
        const dist = getDistance(this.player.x, this.player.y, enemy.x, enemy.y);
        if (dist <= this.player.radius + enemy.radius) {
          // Player takes damage
          this.player.takeDamage(enemy.damage);
          this.playerIframeTimer = 350; // 350ms iframes
          this.triggerScreenShake(15, 10.0); // heavy screen shake on player hit
          break; // only take hit from 1 enemy per frame
        }
      }
    }
  }

  triggerLevelUp() {
    const pool = this.getUpgradePool();
    if (pool.length === 0) {
      this.triggerMaxExpBlast();
      return;
    }

    this.state = 'LEVEL_UP';
    gameAudio.playLevelUp();
    
    // Choose 3 random upgrade options
    const upgrades = this.generateUpgrades(pool);
    
    const container = document.getElementById('upgrade-options');
    container.innerHTML = ''; // Clear options
    
    upgrades.forEach(opt => {
      const card = document.createElement('div');
      card.className = `upgrade-card ${opt.cardClass}`;
      
      card.innerHTML = `
        <div class="card-emoji">${opt.emoji}</div>
        <div class="card-title">${opt.name}</div>
        <div class="card-type-badge">${opt.badge}</div>
        <p class="card-desc">${opt.description}</p>
        <div class="card-level-indicator">${opt.levelText}</div>
      `;
      
      card.addEventListener('click', () => {
        if (this.levelUpTimer) {
          clearInterval(this.levelUpTimer);
          this.levelUpTimer = null;
        }
        this.applyUpgrade(opt);
        this.resumeGame();
      });
      
      container.appendChild(card);
    });

    this.levelUpScreen.classList.remove('hidden');

    // Start 3-second auto-select countdown
    let timeLeft = 3;
    const descText = document.getElementById('level-up-desc-text');
    if (descText) {
      descText.innerText = `アップグレードを選択してください (自動選択まで ${timeLeft}秒)`;
    }

    if (this.levelUpTimer) clearInterval(this.levelUpTimer);
    this.levelUpTimer = setInterval(() => {
      timeLeft--;
      if (descText) {
        descText.innerText = `アップグレードを選択してください (自動選択まで ${timeLeft}秒)`;
      }
      if (timeLeft <= 0) {
        clearInterval(this.levelUpTimer);
        this.levelUpTimer = null;
        
        // Auto-select the middle option
        const middleIndex = Math.floor(upgrades.length / 2);
        const selectedOpt = upgrades[middleIndex];
        this.applyUpgrade(selectedOpt);
        this.resumeGame();
      }
    }, 1000);
  }

  triggerMaxExpBlast() {
    if (!this.player) return;

    // 1. HP Full Heal
    this.player.hp = this.player.maxHp;

    // 2. Heavy Screen Shake
    this.triggerScreenShake(45, 22.0);

    // 3. Play special synthesized blast audio
    if (gameAudio.ctx && !gameAudio.muted) {
      const t = gameAudio.ctx.currentTime;
      const osc = gameAudio.ctx.createOscillator();
      const noise = gameAudio.ctx.createOscillator();
      const gain = gameAudio.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, t);
      osc.frequency.linearRampToValueAtTime(30, t + 0.8);

      noise.type = 'square';
      noise.frequency.setValueAtTime(80, t);
      noise.frequency.exponentialRampToValueAtTime(2000, t + 0.8);

      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.8);

      osc.connect(gain);
      noise.connect(gain);
      gain.connect(gameAudio.ctx.destination);

      osc.start(t);
      noise.start(t);
      osc.stop(t + 0.8);
      noise.stop(t + 0.8);
    }

    // 4. Deal massive damage to all active enemies on screen
    this.enemies.forEach(enemy => {
      if (enemy.active) {
        enemy.takeDamage(500);
        this.damageNumbers.push(new DamageNumber(enemy.x, enemy.y, 500, true));
      }
    });

    // 5. Spawn 130+ expanding gold/cyan explosion particles
    const particleColors = ['#fffb00', '#00f0ff', '#ff5e00', '#ffffff'];
    for (let i = 0; i < 130; i++) {
      const angle = (i / 130) * Math.PI * 2 + Math.random() * 0.2;
      const speed = Math.random() * 8 + 3;
      const p = new Particle(this.player.x, this.player.y, particleColors[i % particleColors.length], speed * 0.8);
      this.particles.push(p);
    }

    // 6. Create floaty max blast text overlay
    this.damageNumbers.push(new DamageNumber(this.player.x, this.player.y - 30, "+MAX EXP BLAST+", true));

    // Force HUD to update HP and levels immediately
    this.updateHUD(Math.floor(this.elapsedTime / 1000));
  }

  getUpgradePool() {
    const pool = [];

    // Check weapon upgrades available
    this.player.weapons.forEach(w => {
      if (w.level < 10) {
        pool.push({
          type: 'weapon_upgrade',
          instance: w,
          name: w.name,
          emoji: w.emoji,
          badge: '武器強化',
          cardClass: 'upgrade-weapon',
          description: w.getDescription(true),
          levelText: `LV ${w.level} → ${w.level + 1}`
        });
      }
    });

    // Check new weapons available to acquire
    const allWeapons = [new MagicWand(), new GarlicAura(), new SpinningScythe(), new BigSword(), new ThunderWave(), new FireRoad()];
    allWeapons.forEach(w => {
      const alreadyOwned = this.player.weapons.some(owned => owned.constructor.name === w.constructor.name);
      if (!alreadyOwned) {
        pool.push({
          type: 'weapon_new',
          instance: w,
          name: w.name,
          emoji: w.emoji,
          badge: '新規武器',
          cardClass: 'new-weapon',
          description: w.getDescription(false),
          levelText: 'NEW'
        });
      }
    });

    // Check passives available to upgrade
    this.player.passives.forEach(p => {
      if (p.level < 5) {
        pool.push({
          type: 'passive',
          instance: p,
          name: p.name,
          emoji: p.emoji,
          badge: 'ステータス強化',
          cardClass: 'stat-buff',
          description: p.getDescription(true),
          levelText: p.level === 0 ? 'NEW' : `LV ${p.level} → ${p.level + 1}`
        });
      }
    });

    return pool;
  }

  generateUpgrades(pool) {
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const choices = shuffled.slice(0, 3);
    while (choices.length < 3) {
      choices.push({
        type: 'heal',
        name: 'HP全回復',
        emoji: '🧪',
        badge: '消耗品',
        cardClass: 'stat-buff',
        description: '体力を最大まで回復し、戦闘態勢を立て直します。',
        levelText: 'MAX HEAL'
      });
    }
    return choices;
  }

  applyUpgrade(opt) {
    if (opt.type === 'weapon_new') {
      this.player.weapons.push(opt.instance);
    } else if (opt.type === 'weapon_upgrade') {
      opt.instance.upgrade();
    } else if (opt.type === 'passive') {
      opt.instance.upgrade(this.player);
    } else if (opt.type === 'heal') {
      this.player.hp = this.player.maxHp;
    }
    this.syncDevPanel();
  }

  resumeGame() {
    if (this.levelUpTimer) {
      clearInterval(this.levelUpTimer);
      this.levelUpTimer = null;
    }
    this.levelUpScreen.classList.add('hidden');
    this.state = 'PLAYING';
    this.lastTime = performance.now();
    requestAnimationFrame((timestamp) => this.loop(timestamp));
  }

  async triggerJewelLottery() {
    this.state = 'ROULETTE';
    
    // Reset UI
    const spinner = document.getElementById('roulette-spinner');
    const itemName = document.getElementById('roulette-item-name');
    const claimBtn = document.getElementById('roulette-claim-btn');
    const resultsBox = document.getElementById('roulette-results');
    const resultsList = document.getElementById('roulette-results-list');
    
    spinner.innerText = '❓';
    itemName.innerText = 'READY...';
    resultsBox.style.display = 'none';
    resultsList.innerHTML = '';
    
    claimBtn.classList.add('disabled');
    claimBtn.style.pointerEvents = 'none';
    claimBtn.style.borderColor = 'var(--text-muted)';
    claimBtn.style.color = 'var(--text-muted)';
    claimBtn.style.boxShadow = 'none';
    claimBtn.innerText = '抽選中...';
    
    if (this.reviveScreen) this.reviveScreen.classList.add('hidden');
    if (this.levelUpScreen) this.levelUpScreen.classList.add('hidden');
    if (this.gameOverScreen) this.gameOverScreen.classList.add('hidden');
    this.rouletteScreen.classList.remove('hidden');

    let pool = this.getUpgradePool();
    if (pool.length === 0) {
      pool = [{
        type: 'heal',
        name: 'HP全回復',
        emoji: '🧪',
        badge: '消耗品',
        cardClass: 'stat-buff',
        description: '体力を最大まで回復する',
        levelText: 'HEAL'
      }];
    }

    const rewardCount = Math.min(pool.length, Math.floor(Math.random() * 3) + 1);
    const selectedUpgrades = [];
    const tempPool = [...pool];
    for (let i = 0; i < rewardCount; i++) {
      const idx = Math.floor(Math.random() * tempPool.length);
      selectedUpgrades.push(tempPool.splice(idx, 1)[0]);
    }

    // List of items to cycle through during the spin
    const spinItems = [
      { emoji: '🪄', name: '魔法の杖' },
      { emoji: '🧄', name: 'ニンニクオーラ' },
      { emoji: '🪓', name: '回転鎌' },
      { emoji: '🗡️', name: '大剣' },
      { emoji: '⚡', name: 'サンダーウェーブ' },
      { emoji: '🔥', name: 'ファイアロード' },
      { emoji: '❤️', name: 'ホロウ・ハート' },
      { emoji: '🥓', name: 'プマローラ' },
      { emoji: '🥬', name: 'ホウレンソウ' },
      { emoji: '🪶', name: 'ウィング' },
      { emoji: '🧲', name: 'アトラクターブ' },
      { emoji: '🧪', name: 'HP全回復' }
    ];

    // Play SE for jewel pickup
    gameAudio.playCollect();

    // Sequentially spin and select for each reward
    for (let r = 0; r < selectedUpgrades.length; r++) {
      const targetUpgrade = selectedUpgrades[r];
      
      // Roulette spinner animation
      let delay = 50; // ms
      const steps = 18; // total cycles
      for (let s = 0; s < steps; s++) {
        const randItem = spinItems[Math.floor(Math.random() * spinItems.length)];
        spinner.innerText = randItem.emoji;
        itemName.innerText = randItem.name;
        
        if (gameAudio.playRouletteTick && s % 2 === 0) {
          gameAudio.playRouletteTick();
        }
        
        if (s > 10) {
          delay += 40;
        }
        await new Promise(resolve => setTimeout(resolve, delay));
      }

      // Final stop on target upgrade!
      spinner.innerText = targetUpgrade.emoji;
      itemName.innerText = targetUpgrade.name;
      
      gameAudio.playLevelUp();
      this.applyUpgrade(targetUpgrade);

      // Flashy Upgrade VFX
      // 1. Cyan neon overlay flash behind the roulette card
      this.rouletteScreen.style.transition = 'none';
      this.rouletteScreen.style.backgroundColor = 'rgba(0, 240, 255, 0.35)'; // cyan flash
      this.rouletteScreen.offsetHeight; // force reflow
      this.rouletteScreen.style.transition = 'background-color 0.8s ease';
      this.rouletteScreen.style.backgroundColor = 'rgba(6, 7, 13, 0.9)';

      // 2. Explode HTML particles from center of the roulette spinner
      const box = document.getElementById('roulette-box');
      if (box) {
        const rect = box.getBoundingClientRect();
        const pColors = ['#00f0ff', '#ff00ff', '#fffb00', '#39ff14', '#ffffff'];
        const centerX = rect.left + rect.width / 2 + window.scrollX;
        const centerY = rect.top + rect.height / 2 + window.scrollY;
        
        this.spawnHTMLParticles(document.body, centerX, centerY, pColors, 40);
      }

      // Add to results list
      resultsBox.style.display = 'block';
      const li = document.createElement('li');
      li.style.margin = '8px 0';
      li.style.display = 'flex';
      li.style.alignItems = 'center';
      li.style.gap = '10px';
      
      let levelText = '';
      if (targetUpgrade.type === 'weapon_upgrade') {
        levelText = `(Lv ${targetUpgrade.instance.level})`;
      } else if (targetUpgrade.type === 'passive') {
        levelText = `(Lv ${targetUpgrade.instance.level})`;
      } else if (targetUpgrade.type === 'weapon_new') {
        levelText = `(NEW!)`;
      } else {
        levelText = `(HP回復)`;
      }

      li.innerHTML = `
        <span style="font-size: 20px;">${targetUpgrade.emoji}</span>
        <span style="font-weight: bold; color: #ffffff;">${targetUpgrade.name}</span>
        <span style="color: var(--neon-yellow); font-size: 11px; font-family: var(--font-retro);">${levelText}</span>
      `;
      resultsList.appendChild(li);

      if (r < selectedUpgrades.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 800));
      }
    }

    // Enable the CLAIM button
    claimBtn.classList.remove('disabled');
    claimBtn.style.pointerEvents = 'auto';
    claimBtn.style.borderColor = 'var(--neon-green)';
    claimBtn.style.color = 'var(--neon-green)';
    claimBtn.style.boxShadow = '0 0 15px rgba(57, 255, 20, 0.3)';
    
    // Start 3-second auto-close countdown
    let rouletteTimeLeft = 3;
    claimBtn.innerText = `閉じる (自動クローズまで ${rouletteTimeLeft}秒)`;

    if (this.rouletteTimer) clearInterval(this.rouletteTimer);
    this.rouletteTimer = setInterval(() => {
      rouletteTimeLeft--;
      claimBtn.innerText = `閉じる (自動クローズまで ${rouletteTimeLeft}秒)`;
      if (rouletteTimeLeft <= 0) {
        clearInterval(this.rouletteTimer);
        this.rouletteTimer = null;
        this.resumeRoulette();
      }
    }, 1000);
  }

  resumeRoulette() {
    if (this.rouletteTimer) {
      clearInterval(this.rouletteTimer);
      this.rouletteTimer = null;
    }
    this.rouletteScreen.classList.add('hidden');
    this.state = 'PLAYING';
    this.lastTime = performance.now();
    requestAnimationFrame((timestamp) => this.loop(timestamp));
  }

  toggleTheme() {
    if (this.theme === 'light') {
      this.theme = 'dark';
      document.body.classList.remove('light-mode');
      if (this.themeToggle) {
        this.themeToggle.innerText = '🌙 DARK';
      }
    } else {
      this.theme = 'light';
      document.body.classList.add('light-mode');
      if (this.themeToggle) {
        this.themeToggle.innerText = '☀️ LIGHT';
      }
    }
  }

  spawnHTMLParticles(parentEl, x, y, colors, count) {
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.width = `${Math.random() * 10 + 6}px`;
      particle.style.height = particle.style.width;
      particle.style.borderRadius = '50%';
      const color = colors[Math.floor(Math.random() * colors.length)];
      particle.style.backgroundColor = color;
      particle.style.boxShadow = `0 0 12px ${color}, 0 0 20px ${color}`;
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '99999';
      
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 10 + 5;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;
      
      parentEl.appendChild(particle);
      
      let px = x;
      let py = y;
      let opacity = 1.0;
      
      const updateParticle = () => {
        px += vx;
        py += vy;
        opacity -= 0.022;
        
        particle.style.left = `${px}px`;
        particle.style.top = `${py}px`;
        particle.style.opacity = opacity;
        
        if (opacity > 0) {
          requestAnimationFrame(updateParticle);
        } else {
          particle.remove();
        }
      };
      requestAnimationFrame(updateParticle);
    }
  }

  triggerRevivalScreen() {
    this.state = 'REVIVING';
    document.getElementById('revive-remaining-val').innerText = this.player.revivesRemaining;
    this.reviveScreen.classList.remove('hidden');
  }

  confirmRevival() {
    this.reviveScreen.classList.add('hidden');
    
    // Deduct revives
    this.player.revivesRemaining--;
    this.player.reviveCount++;
    this.player.hp = this.player.maxHp;
    this.playerIframeTimer = 2000; // 2 seconds invulnerability
    
    if (this.damageNumbers) {
      this.damageNumbers.push(new DamageNumber(this.player.x, this.player.y, "REVIVED!", false));
    }

    this.triggerScreenShake(30, 15.0);
    gameAudio.playLevelUp(); // play level up sound for revival fanfare

    // Trigger full screen flash & shockwave
    this.flashOpacity = 1.0;
    this.shockwaveRadius = 1;

    // Spawn flashy revival particles
    this.player.spawnParticles(this.player.x, this.player.y, '#fffb00', 1.5, 30);
    this.player.spawnParticles(this.player.x, this.player.y, '#39ff14', 1.2, 20);

    // Blow away nearby enemies for breathing room
    this.enemies.forEach(enemy => {
      const dist = getDistance(this.player.x, this.player.y, enemy.x, enemy.y);
      if (dist < 250) {
        const dx = enemy.x - this.player.x;
        const dy = enemy.y - this.player.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        if (len > 0) {
          enemy.x += (dx / len) * 80;
          enemy.y += (dy / len) * 80;
        }
      }
    });

    // Resume game loop
    this.state = 'PLAYING';
    this.lastTime = performance.now();
    requestAnimationFrame((timestamp) => this.loop(timestamp));
  }

  updateHUD(secs) {
    // Level value
    document.getElementById('hud-level-value').innerText = this.player.level;

    // EXP fill bar
    const expPercent = Math.min(100, (this.player.exp / this.player.nextLevelExp) * 100);
    document.getElementById('hud-exp-bar-fill').style.width = `${expPercent}%`;

    // Timer display (MM:SS)
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    const timeString = `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
    document.getElementById('hud-timer').innerText = timeString;

    // HP Value and bar
    const hpPercent = Math.max(0, (this.player.hp / this.player.maxHp) * 100);
    document.getElementById('hud-hp-bar-fill').style.width = `${hpPercent}%`;
    document.getElementById('hud-hp-text').innerText = `${Math.round(this.player.hp)}/${this.player.maxHp}`;

    // Kills value
    document.getElementById('hud-kills').innerText = this.player.kills;

    // Weapons list overlay
    const weaponsContainer = document.getElementById('hud-weapons');
    weaponsContainer.innerHTML = '';
    
    // Draw weapons in bottom left list
    this.player.weapons.forEach(w => {
      const wEl = document.createElement('div');
      wEl.className = 'hud-weapon-icon';
      wEl.innerHTML = `
        <span class="hud-weapon-emoji">${w.emoji}</span>
        <span class="hud-weapon-level">L${w.level}</span>
      `;
      weaponsContainer.appendChild(wEl);
    });

    // Draw passives in bottom left list (only active ones)
    this.player.passives.forEach(p => {
      if (p.level > 0) {
        const pEl = document.createElement('div');
        pEl.className = 'hud-weapon-icon';
        pEl.style.borderColor = 'rgba(176, 38, 255, 0.4)';
        pEl.innerHTML = `
          <span class="hud-weapon-emoji">${p.emoji}</span>
          <span class="hud-weapon-level">L${p.level}</span>
        `;
        weaponsContainer.appendChild(pEl);
      }
    });

    // Toggle HUD Hell Badge visibility
    const hellBadge = document.getElementById('hud-hell');
    if (hellBadge) {
      if (this.hellMode) {
        hellBadge.classList.remove('hidden');
      } else {
        hellBadge.classList.add('hidden');
      }
    }
  }

  showEndScreen() {
    this.hud.classList.add('hidden');
    this.gameOverScreen.classList.remove('hidden');

    const mins = Math.floor(this.elapsedTime / 60000);
    const secs = Math.floor((this.elapsedTime % 60000) / 1000);
    const timeString = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    document.getElementById('result-time').innerText = timeString;
    document.getElementById('result-level').innerText = this.player.level;
    document.getElementById('result-kills').innerText = this.player.kills;
    document.getElementById('result-revives').innerText = `${this.player.reviveCount}回`;

    const difficultyEl = document.getElementById('result-difficulty');
    if (difficultyEl) {
      difficultyEl.innerText = this.difficulty === 'HARD' ? 'HARD' : 'NORMAL';
      difficultyEl.style.color = this.difficulty === 'HARD' ? 'var(--neon-pink)' : 'var(--neon-cyan)';
    }

    const titleEl = document.getElementById('end-title');
    const msgEl = document.getElementById('end-message');

    if (this.state === 'VICTORY') {
      titleEl.innerText = "VICTORY!";
      titleEl.style.color = '#fffb00';
      titleEl.style.textShadow = '0 0 15px #fffb00, 0 0 30px rgba(255, 251, 0, 0.5)';
      msgEl.innerText = "ネオ・ネメシスを撃破した！世界はまばゆい光に満たされた！";
    } else if (this.hellMode) {
      titleEl.innerText = "HELL VANQUISHED";
      titleEl.style.color = '#ff3300';
      titleEl.style.textShadow = '0 0 15px #ff3300, 0 0 30px rgba(255, 51, 0, 0.5)';
      msgEl.innerText = "地獄モードの果てに散った... あなたの闘志は永遠に語り継がれる！";
    } else {
      titleEl.innerText = "GAME OVER";
      titleEl.style.color = '#ff007f';
      titleEl.style.textShadow = '0 0 15px #ff007f, 0 0 30px rgba(255, 0, 127, 0.5)';
      msgEl.innerText = "ネオンの灯火が完全に消え去ってしまった...";
    }
  }

  draw() {
    this.ctx.save();
    
    // Apply screen shake
    if (this.shakeDuration > 0) {
      const dx = (Math.random() - 0.5) * this.shakeIntensity;
      const dy = (Math.random() - 0.5) * this.shakeIntensity;
      this.ctx.translate(dx, dy);
      this.shakeDuration--;
    }

    // Clear screen with neon trails (small opacity fill for visual speed trails)
    this.ctx.fillStyle = this.theme === 'light' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(6, 7, 13, 0.25)';
    this.ctx.fillRect(0, 0, this.logicalWidth, this.logicalHeight);

    // Draw background grid lines for techno/retro aesthetic
    this.drawGrid();

    // 1. Draw Experience Gems
    this.gems.forEach(gem => gem.draw(this.ctx));
    
    // Draw Special Jewels
    this.jewels.forEach(jewel => jewel.draw(this.ctx));

    // 2. Draw Projectiles
    this.projectiles.forEach(proj => proj.draw(this.ctx));

    // 3. Draw Enemies
    this.enemies.forEach(enemy => enemy.draw(this.ctx));

    // 4. Draw Player (also draws aura and orbiting weapons)
    this.player.draw(this.ctx);

    // 5. Draw Particles
    this.particles.forEach(p => p.draw(this.ctx));

    // 6. Draw Damage Numbers
    this.damageNumbers.forEach(dn => dn.draw(this.ctx));
    
    // Draw Low HP Red Vignette Aura (under 20% HP)
    const hpRatio = this.player.hp / this.player.maxHp;
    if (hpRatio < 0.20 && hpRatio > 0) {
      this.ctx.save();
      // Pulsing opacity based on game time
      const pulse = 0.45 + Math.sin(performance.now() * 0.005) * 0.25;
      
      const grad = this.ctx.createRadialGradient(
        this.logicalWidth / 2, this.logicalHeight / 2, this.logicalHeight * 0.3,
        this.logicalWidth / 2, this.logicalHeight / 2, this.logicalWidth * 0.65
      );
      grad.addColorStop(0, 'rgba(255, 0, 0, 0)');
      grad.addColorStop(1, `rgba(255, 0, 50, ${pulse * 0.85})`);
      
      this.ctx.fillStyle = grad;
      this.ctx.fillRect(0, 0, this.logicalWidth, this.logicalHeight);
      
      // Outer border glow
      this.ctx.strokeStyle = `rgba(255, 0, 50, ${pulse})`;
      this.ctx.lineWidth = 8;
      this.ctx.shadowBlur = 25;
      this.ctx.shadowColor = '#ff0032';
      this.ctx.strokeRect(4, 4, this.logicalWidth - 8, this.logicalHeight - 8);
      
      this.ctx.restore();
    }

    // Draw Shockwave
    if (this.shockwaveRadius > 0 && this.shockwaveRadius < this.shockwaveMaxRadius) {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(this.player.x, this.player.y, this.shockwaveRadius, 0, Math.PI * 2);
      const alpha = 1.0 - this.shockwaveRadius / this.shockwaveMaxRadius;
      this.ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
      this.ctx.lineWidth = 15 * alpha + 2;
      this.ctx.shadowBlur = 30;
      this.ctx.shadowColor = '#00f0ff';
      this.ctx.stroke();
      this.ctx.restore();
    }

    // Draw Screen Flash
    if (this.flashOpacity > 0) {
      this.ctx.save();
      const color = this.flashColorOverride ? `${this.flashColorOverride}${this.flashOpacity})` : `rgba(255, 255, 255, ${this.flashOpacity})`;
      this.ctx.fillStyle = color;
      this.ctx.fillRect(0, 0, this.logicalWidth, this.logicalHeight);
      this.ctx.restore();
    }
    
    this.ctx.restore();
  }

  drawGrid() {
    const gridSize = 40;
    this.ctx.save();
    this.ctx.strokeStyle = this.theme === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.025)';
    this.ctx.lineWidth = 1;

    // Draw vertical lines
    for (let x = 0; x < this.logicalWidth; x += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.logicalHeight);
      this.ctx.stroke();
    }

    // Draw horizontal lines
    for (let y = 0; y < this.logicalHeight; y += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.logicalWidth, y);
      this.ctx.stroke();
    }
    
    this.ctx.restore();
  }
}

// Global engine instantiator on load
window.addEventListener('load', () => {
  window.gameEngine = new NeonGameEngine();
});
