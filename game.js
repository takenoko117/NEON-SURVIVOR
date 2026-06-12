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
    
    // Inputs
    this.keys = {};
    this.mouse = { x: 0, y: 0, isDown: false };
    
    // Game Entities lists
    this.player = null;
    this.enemies = [];
    this.projectiles = [];
    this.gems = [];
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
    this.spawnIntervalOverride = null;
    this.enemySpeedMultiplierOverride = 1.0;
    this.enemyHpMultiplierOverride = 1.0;

    // Screen Shake State
    this.shakeDuration = 0;
    this.shakeIntensity = 0;
    
    // Bind DOM events
    this.setupDOM();
    this.setupInput();
    this.loadWeaponBalance();
  }

  setupDOM() {
    this.startScreen = document.getElementById('start-screen');
    this.hud = document.getElementById('hud');
    this.levelUpScreen = document.getElementById('level-up-screen');
    this.gameOverScreen = document.getElementById('game-over-screen');
    
    this.startBtn = document.getElementById('start-btn');
    this.restartBtn = document.getElementById('restart-btn');
    
    this.startBtn.addEventListener('click', () => this.startGame());
    this.restartBtn.addEventListener('click', () => this.startGame());

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
      this.enemies = [];
    });

    // Spawn boss
    this.devSpawnBoss = document.getElementById('dev-spawn-boss');
    this.devSpawnBoss.addEventListener('click', () => {
      if (this.state === 'PLAYING') {
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
  }

  triggerScreenShake(duration, intensity) {
    this.shakeDuration = duration;
    this.shakeIntensity = intensity;
  }

  startGame() {
    // Start synth context
    gameAudio.init();

    // Reset Game State variables
    this.state = 'PLAYING';
    this.elapsedTime = 0;
    this.spawnTimer = 0;
    this.enemyScaleMultiplier = 1.0;
    this.playerIframeTimer = 0;
    this.shakeDuration = 0;
    this.shakeIntensity = 0;
    this.bossSpawned = false;

    // Reset Developer Mode State
    this.godMode = false;
    this.freezeSpawns = false;
    this.spawnIntervalOverride = null;
    this.enemySpeedMultiplierOverride = 1.0;
    this.enemyHpMultiplierOverride = 1.0;

    // Reset Dev Panel elements inputs
    if (this.devGodMode) this.devGodMode.checked = false;
    if (this.devFreezeSpawn) this.devFreezeSpawn.checked = false;
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
    this.particles = [];
    this.damageNumbers = [];

    // Hide screens, show HUD
    this.startScreen.classList.add('hidden');
    this.levelUpScreen.classList.add('hidden');
    this.gameOverScreen.classList.add('hidden');
    this.hud.classList.remove('hidden');

    // Reset keys
    this.keys = {};
    this.mouse.isDown = false;

    // Start gameloop
    this.lastTime = performance.now();
    requestAnimationFrame((timestamp) => this.loop(timestamp));
  }

  loop(timestamp) {
    if (this.state === 'LEVEL_UP') {
      // pause loop, wait for choice
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
    this.enemies.forEach(enemy => enemy.update(this.player, this.enemies));
    
    // Handle player invulnerability frame tick
    if (this.playerIframeTimer > 0) {
      this.playerIframeTimer -= dt;
    }

    // Spawning Logic
    this.spawnTimer += dt;
    const spawnRate = this.spawnIntervalOverride !== null ? this.spawnIntervalOverride : this.getSpawnInterval(currentSecs);
    if (this.freezeSpawns) {
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
        this.player.revivesRemaining--;
        this.player.reviveCount++;
        this.player.hp = this.player.maxHp;
        this.playerIframeTimer = 2000; // 2 seconds invulnerability
        
        if (this.damageNumbers) {
          this.damageNumbers.push(new DamageNumber(this.player.x, this.player.y, "REVIVED!", false));
        }

        this.triggerScreenShake(30, 15.0);
        gameAudio.playLevelUp(); // play level up sound for revival fanfare

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

    const enemy = new Enemy(x, y, type, this.enemyScaleMultiplier * this.enemyHpMultiplierOverride);
    enemy.speed *= this.enemySpeedMultiplierOverride;
    this.enemies.push(enemy);
  }

  spawnBoss() {
    // Screen shake when boss spawns
    this.triggerScreenShake(35, 12);
    
    const angle = Math.random() * Math.PI * 2;
    const x = this.player.x + Math.cos(angle) * 450;
    const y = this.player.y + Math.sin(angle) * 450;
    const boss = new Enemy(x, y, 'boss', this.enemyScaleMultiplier * 1.5 * this.enemyHpMultiplierOverride);
    boss.speed *= this.enemySpeedMultiplierOverride;
    this.enemies.push(boss);
  }

  spawnBoss2() {
    this.triggerScreenShake(30, 10);
    this.damageNumbers.push(new DamageNumber(this.player.x, this.player.y - 30, "+BOSS v2 ENTERS+", true));
    
    const angle = Math.random() * Math.PI * 2;
    const x = this.player.x + Math.cos(angle) * 450;
    const y = this.player.y + Math.sin(angle) * 450;
    const boss2 = new Enemy(x, y, 'boss2', this.enemyScaleMultiplier * 1.5 * this.enemyHpMultiplierOverride);
    boss2.speed *= this.enemySpeedMultiplierOverride;
    this.enemies.push(boss2);
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
            
            const mini = new Enemy(mx, my, 'mini-slime', this.enemyScaleMultiplier * this.enemyHpMultiplierOverride * 0.5); // mini slime has less HP
            mini.speed *= this.enemySpeedMultiplierOverride;
            newSpawns.push(mini);
          }
          this.triggerScreenShake(4, 2.0); // minor shake on division
        }

        // Spawn experience gem
        this.gems.push(new Gem(enemy.x, enemy.y, enemy.expValue));

        // Check if boss defeated -> spawn boss2
        if (enemy.type === 'boss') {
          this.spawnBoss2();
        }
        // Check if boss2 defeated -> Win!
        if (enemy.type === 'boss2') {
          this.state = 'VICTORY';
          this.triggerScreenShake(60, 16.0); // massive victory shake
          gameAudio.playVictory();
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
        this.applyUpgrade(opt);
        this.resumeGame();
      });
      
      container.appendChild(card);
    });

    this.levelUpScreen.classList.remove('hidden');
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
    this.levelUpScreen.classList.add('hidden');
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

    const titleEl = document.getElementById('end-title');
    const msgEl = document.getElementById('end-message');

    if (this.state === 'VICTORY') {
      titleEl.innerText = "VICTORY!";
      titleEl.style.color = '#fffb00';
      titleEl.style.textShadow = '0 0 15px #fffb00, 0 0 30px rgba(255, 251, 0, 0.5)';
      msgEl.innerText = "ネオ・ネメシスを撃破した！世界はまばゆい光に満たされた！";
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
    this.ctx.fillStyle = 'rgba(6, 7, 13, 0.25)';
    this.ctx.fillRect(0, 0, this.logicalWidth, this.logicalHeight);

    // Draw background grid lines for techno/retro aesthetic
    this.drawGrid();

    // 1. Draw Experience Gems
    this.gems.forEach(gem => gem.draw(this.ctx));

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
    
    this.ctx.restore();
  }

  drawGrid() {
    const gridSize = 40;
    this.ctx.save();
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
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
