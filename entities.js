// Gameplay Entities for Neon Survivor

const DEFAULT_WEAPON_BALANCE = {
  MagicWand: {
    baseDamage: 12,
    damageGrowth: 0.15,
    baseCooldown: 1200,
    cooldownGrowth: -0.078,
    levels: [
      { "cooldownMult": 1.00, "count": 1, "pierce": 1, "damageMult": 1.00 },
      { "cooldownMult": 1.00, "count": 2, "pierce": 1, "damageMult": 1.00 },
      { "cooldownMult": 1.00, "count": 3, "pierce": 1, "damageMult": 1.00 },
      { "cooldownMult": 1.00, "count": 3, "pierce": 2, "damageMult": 1.00 },
      { "cooldownMult": 0.60, "count": 5, "pierce": 2, "damageMult": 1.00 },
      { "cooldownMult": 0.57, "count": 6, "pierce": 2, "damageMult": 1.00 },
      { "cooldownMult": 0.62, "count": 7, "pierce": 3, "damageMult": 1.00 },
      { "cooldownMult": 0.69, "count": 8, "pierce": 3, "damageMult": 1.00 },
      { "cooldownMult": 0.70, "count": 8, "pierce": 3, "damageMult": 1.00 },
      { "cooldownMult": 0.73, "count": 18, "pierce": 4, "damageMult": 1.00 }
    ]
  },
  GarlicAura: {
    baseDamage: 3,
    damageGrowth: 0.77,
    baseCooldown: 500,
    cooldownGrowth: -0.066,
    baseRadius: 55,
    radiusGrowth: 0.27,
    levels: [
      { "cooldownMult": 1.00, "radiusMult": 1.00, "damageMult": 1.00, "slowRatio": 0.00 },
      { "cooldownMult": 1.00, "radiusMult": 1.00, "damageMult": 1.00, "slowRatio": 0.00 },
      { "cooldownMult": 1.00, "radiusMult": 1.00, "damageMult": 1.00, "slowRatio": 0.00 },
      { "cooldownMult": 1.00, "radiusMult": 1.00, "damageMult": 1.00, "slowRatio": 0.00 },
      { "cooldownMult": 1.00, "radiusMult": 1.00, "damageMult": 1.00, "slowRatio": 0.65 },
      { "cooldownMult": 1.00, "radiusMult": 1.00, "damageMult": 1.00, "slowRatio": 0.65 },
      { "cooldownMult": 0.99, "radiusMult": 1.00, "damageMult": 1.00, "slowRatio": 0.65 },
      { "cooldownMult": 1.00, "radiusMult": 1.00, "damageMult": 1.00, "slowRatio": 0.65 },
      { "cooldownMult": 1.01, "radiusMult": 1.00, "damageMult": 1.00, "slowRatio": 0.55 },
      { "cooldownMult": 0.98, "radiusMult": 1.00, "damageMult": 1.00, "slowRatio": 0.40 }
    ]
  },
  SpinningScythe: {
    baseDamage: 18,
    damageGrowth: 0.15,
    baseCooldown: 9999,
    cooldownGrowth: 0.0,
    baseDistance: 70,
    distanceGrowth: 0.039,
    baseSpeed: 0.03,
    speedGrowth: 0.166,
    levels: [
      { "cooldownMult": 1.00, "count": 1, "distanceMult": 1.00, "speedMult": 1.00, "damageMult": 1.00 },
      { "cooldownMult": 1.00, "count": 2, "distanceMult": 1.00, "speedMult": 1.00, "damageMult": 1.00 },
      { "cooldownMult": 1.00, "count": 3, "distanceMult": 1.06, "speedMult": 1.05, "damageMult": 1.00 },
      { "cooldownMult": 1.00, "count": 3, "distanceMult": 1.00, "speedMult": 0.90, "damageMult": 1.00 },
      { "cooldownMult": 1.00, "count": 4, "distanceMult": 0.94, "speedMult": 0.81, "damageMult": 1.00 },
      { "cooldownMult": 1.00, "count": 5, "distanceMult": 0.89, "speedMult": 0.74, "damageMult": 1.00 },
      { "cooldownMult": 1.00, "count": 6, "distanceMult": 0.88, "speedMult": 0.90, "damageMult": 1.00 },
      { "cooldownMult": 1.00, "count": 6, "distanceMult": 0.84, "speedMult": 0.82, "damageMult": 1.00 },
      { "cooldownMult": 1.00, "count": 7, "distanceMult": 0.80, "speedMult": 0.76, "damageMult": 1.00 },
      { "cooldownMult": 1.00, "count": 9, "distanceMult": 0.82, "speedMult": 0.79, "damageMult": 1.00 }
    ]
  },
  BigSword: {
    baseDamage: 25,
    damageGrowth: 0.61,
    baseCooldown: 450,
    cooldownGrowth: -0.024,
    baseLength: 55,
    lengthGrowth: 0.29,
    baseWidth: 12,
    widthGrowth: 0.22,
    levels: [
      { "cooldownMult": 1.00, "count": 1, "lengthMult": 1.00, "widthMult": 1.00, "damageMult": 1.00 },
      { "cooldownMult": 1.01, "count": 2, "lengthMult": 0.91, "widthMult": 0.96, "damageMult": 1.00 },
      { "cooldownMult": 1.02, "count": 2, "lengthMult": 0.98, "widthMult": 1.04, "damageMult": 1.00 },
      { "cooldownMult": 1.04, "count": 3, "lengthMult": 0.92, "widthMult": 0.99, "damageMult": 1.00 },
      { "cooldownMult": 1.05, "count": 4, "lengthMult": 1.01, "widthMult": 1.06, "damageMult": 1.00 },
      { "cooldownMult": 1.07, "count": 5, "lengthMult": 1.00, "widthMult": 1.01, "damageMult": 1.00 },
      { "cooldownMult": 0.88, "count": 5, "lengthMult": 0.99, "widthMult": 0.99, "damageMult": 1.00 },
      { "cooldownMult": 0.92, "count": 6, "lengthMult": 0.99, "widthMult": 0.99, "damageMult": 1.00 },
      { "cooldownMult": 0.94, "count": 6, "lengthMult": 0.99, "widthMult": 0.99, "damageMult": 1.00 },
      { "cooldownMult": 0.97, "count": 8, "lengthMult": 1.00, "widthMult": 1.00, "damageMult": 1.00 }
    ]
  },
  ThunderWave: {
    baseDamage: 15,
    damageGrowth: 0.20,
    baseCooldown: 2400,
    cooldownGrowth: -0.095,
    baseRange: 650,
    rangeGrowth: 0.018,
    levels: [
      { "cooldownMult": 1.00, "rangeMult": 1.00, "damageMult": 1.00, "waveCount": 1, "maxAge": 75 },
      { "cooldownMult": 0.99, "rangeMult": 1.00, "damageMult": 1.10, "waveCount": 1, "maxAge": 75 },
      { "cooldownMult": 0.98, "rangeMult": 1.00, "damageMult": 1.20, "waveCount": 1, "maxAge": 75 },
      { "cooldownMult": 0.96, "rangeMult": 1.00, "damageMult": 1.30, "waveCount": 1, "maxAge": 75 },
      { "cooldownMult": 0.94, "rangeMult": 1.00, "damageMult": 1.40, "waveCount": 1, "maxAge": 75 },
      { "cooldownMult": 0.92, "rangeMult": 1.00, "damageMult": 1.50, "waveCount": 1, "maxAge": 75 },
      { "cooldownMult": 0.90, "rangeMult": 1.00, "damageMult": 1.60, "waveCount": 1, "maxAge": 75 },
      { "cooldownMult": 0.81, "rangeMult": 1.00, "damageMult": 1.70, "waveCount": 2, "maxAge": 75 },
      { "cooldownMult": 0.74, "rangeMult": 1.00, "damageMult": 1.80, "waveCount": 2, "maxAge": 75 },
      { "cooldownMult": 0.66, "rangeMult": 1.00, "damageMult": 2.00, "waveCount": 3, "maxAge": 75 }
    ]
  },
  FireRoad: {
    baseDamage: 8,
    damageGrowth: 1.05,
    baseCooldown: 220,
    cooldownGrowth: -0.045,
    baseLifetime: 1500,
    lifetimeGrowth: 0.407,
    baseRadius: 10,
    radiusGrowth: 0.355,
    levels: [
      { "cooldownMult": 1.00, "lifetimeMult": 1.00, "radiusMult": 1.00, "damageMult": 1.00 },
      { "cooldownMult": 1.00, "lifetimeMult": 0.95, "radiusMult": 0.96, "damageMult": 1.00 },
      { "cooldownMult": 1.00, "lifetimeMult": 0.93, "radiusMult": 0.94, "damageMult": 1.00 },
      { "cooldownMult": 1.00, "lifetimeMult": 0.90, "radiusMult": 0.97, "damageMult": 1.00 },
      { "cooldownMult": 1.00, "lifetimeMult": 0.96, "radiusMult": 1.07, "damageMult": 1.00 },
      { "cooldownMult": 1.00, "lifetimeMult": 0.97, "radiusMult": 1.04, "damageMult": 1.00 },
      { "cooldownMult": 1.12, "lifetimeMult": 0.96, "radiusMult": 1.02, "damageMult": 1.00 },
      { "cooldownMult": 1.22, "lifetimeMult": 0.96, "radiusMult": 1.00, "damageMult": 1.00 },
      { "cooldownMult": 1.32, "lifetimeMult": 0.96, "radiusMult": 0.99, "damageMult": 1.00 },
      { "cooldownMult": 1.10, "lifetimeMult": 1.00, "radiusMult": 1.00, "damageMult": 1.00 }
    ]
  }
};

window.weaponBalance = window.weaponBalance || DEFAULT_WEAPON_BALANCE;


// Math Utilities
function getDistance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

// Particle Class for visual effects (damage sparks, death explosions, levels)
class Particle {
  constructor(x, y, color, speedMultiplier = 1) {
    this.x = x;
    this.y = y;
    const angle = Math.random() * Math.PI * 2;
    const speed = (Math.random() * 3 + 1) * speedMultiplier;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.radius = Math.random() * 3 + 1;
    this.color = color;
    this.alpha = 1.0;
    this.maxLife = Math.random() * 30 + 20; // frames
    this.life = this.maxLife;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.96; // drag
    this.vy *= 0.96;
    this.life--;
    this.alpha = Math.max(0, this.life / this.maxLife);
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.fill();
    ctx.restore();
  }
}

// Floating Damage Numbers
class DamageNumber {
  constructor(x, y, amount, isCrit = false, customColor = null, customFontSize = null) {
    this.x = x + (Math.random() * 20 - 10);
    this.y = y - 10;
    this.text = typeof amount === 'string' ? amount : Math.round(amount).toString();
    this.vy = -1.5 - Math.random() * 1.5;
    this.vx = Math.random() * 1 - 0.5;
    this.color = customColor || (isCrit ? '#fffb00' : '#ff007f'); // Critical strikes are yellow, regular pink
    this.fontSize = customFontSize || (isCrit ? 16 : 11);
    this.alpha = 1.0;
    this.maxLife = 40;
    this.life = this.maxLife;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy *= 0.98; // slow rising
    this.life--;
    this.alpha = Math.max(0, this.life / this.maxLife);
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.font = `bold ${this.fontSize}px 'Outfit', sans-serif`;
    ctx.textAlign = 'center';
    
    // Add text outline for readability
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.strokeText(this.text, this.x, this.y);
    ctx.fillText(this.text, this.x, this.y);
    ctx.restore();
  }
}

// Experience Gems Class
class Gem {
  constructor(x, y, expValue = 1) {
    this.x = x;
    this.y = y;
    this.radius = 4;
    this.expValue = expValue;
    this.color = expValue >= 10 ? '#b026ff' : (expValue >= 5 ? '#39ff14' : '#00f0ff'); // Violet, Green, Cyan based on value
    this.isAttracted = false;
    this.speed = 1.5;
  }

  update(player) {
    if (!this.isAttracted) {
      // Check magnet range
      const dist = getDistance(this.x, this.y, player.x, player.y);
      if (dist <= player.stats.magnet) {
        this.isAttracted = true;
      }
    } else {
      // Move towards player with acceleration
      const dx = player.x - this.x;
      const dy = player.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist > 5) {
        this.speed += 0.25; // Accelerate
        this.x += (dx / dist) * this.speed;
        this.y += (dy / dist) * this.speed;
      }
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    
    // Draw diamond shape
    ctx.moveTo(this.x, this.y - this.radius);
    ctx.lineTo(this.x + this.radius, this.y);
    ctx.lineTo(this.x, this.y + this.radius);
    ctx.lineTo(this.x - this.radius, this.y);
    ctx.closePath();
    
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.fill();
    ctx.restore();
  }
}

// Special Upgrade Jewel Class
class Jewel {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 9; // larger than normal gems
    this.color = '#fffb00'; // neon yellow/gold
    this.isAttracted = false;
    this.speed = 1.0;
  }

  update(player) {
    if (!this.isAttracted) {
      const dist = getDistance(this.x, this.y, player.x, player.y);
      if (dist <= player.stats.magnet) {
        this.isAttracted = true;
      }
    } else {
      const dx = player.x - this.x;
      const dy = player.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist > 5) {
        this.speed += 0.3; // Accelerate faster
        this.x += (dx / dist) * this.speed;
        this.y += (dy / dist) * this.speed;
      }
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    
    // Draw 8-pointed star shape for the jewel
    const numPoints = 8;
    for (let i = 0; i < numPoints * 2; i++) {
      const angle = (i * Math.PI) / numPoints;
      const r = i % 2 === 0 ? this.radius : this.radius * 0.55;
      const px = this.x + Math.cos(angle) * r;
      const py = this.y + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    
    ctx.fillStyle = '#fffb00';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#fffb00';
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}

// Relic Chest Drop Class
class RelicChest {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 12; // Larger than jewel
    this.color = '#ffe600'; // neon gold
    this.isAttracted = false;
    this.speed = 1.0;
  }

  update(player) {
    if (!this.isAttracted) {
      const dist = getDistance(this.x, this.y, player.x, player.y);
      if (dist <= player.stats.magnet) {
        this.isAttracted = true;
      }
    } else {
      const dx = player.x - this.x;
      const dy = player.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist > 5) {
        this.speed += 0.35; // Accelerate slightly faster than jewel
        this.x += (dx / dist) * this.speed;
        this.y += (dy / dist) * this.speed;
      }
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    
    // Animate rotation over time
    const time = Date.now() / 300;
    ctx.rotate(time);

    // Draw glowing chest box (neon golden chest)
    ctx.beginPath();
    ctx.rect(-8, -8, 16, 16);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.shadowBlur = 15;
    ctx.shadowColor = this.color;
    ctx.fillStyle = 'rgba(255, 230, 0, 0.25)';
    ctx.fill();
    ctx.stroke();

    // Draw inner lock symbol
    ctx.beginPath();
    ctx.arc(0, -1, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.fillRect(-1.5, 1, 3, 4);

    ctx.restore();
  }
}

// Projectile Class
class Projectile {
  constructor(x, y, angle, speed, damage, radius, color, pierce = 1, isEnemyProjectile = false) {
    this.x = x;
    this.y = y;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.baseVx = this.vx;
    this.baseVy = this.vy;
    this.damage = damage;
    this.radius = radius;
    this.color = color;
    this.pierce = pierce;
    this.hits = []; // Keep track of already hit enemies
    this.active = true;
    this.angle = angle;
    this.life = 180; // frames max life to prevent out of bounds memory leaks
    this.isEnemyProjectile = isEnemyProjectile;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life--;
    if (this.life <= 0) {
      this.active = false;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 12;
    ctx.shadowColor = this.color;
    ctx.fill();
    
    // Tiny light core
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 0.4, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.restore();
  }
}

// Orbiting Scythe Projectile
class ScytheProjectile extends Projectile {
  constructor(owner, offsetAngle, index, orbitalSpeed, distance, damage, color) {
    super(owner.x, owner.y, 0, 0, damage, 8, color, 9999); // high pierce, handles damage over time ticks
    this.owner = owner;
    this.offsetAngle = offsetAngle;
    this.orbitalSpeed = orbitalSpeed;
    this.distance = distance;
    this.index = index;
    this.trail = [];
    
    // Ticks track (enemyId -> time of last hit)
    this.hitCooldowns = new Map();
  }

  update(dt, activeEnemies) {
    // Increment angle
    this.offsetAngle += this.orbitalSpeed;
    if (this.offsetAngle > Math.PI * 2) this.offsetAngle -= Math.PI * 2;
    
    // Position relative to player
    this.x = this.owner.x + Math.cos(this.offsetAngle) * this.distance;
    this.y = this.owner.y + Math.sin(this.offsetAngle) * this.distance;
    
    // Save trail
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > 5) this.trail.shift();

    // Handle tick cooldowns
    for (let [enemyId, cooldown] of this.hitCooldowns) {
      this.hitCooldowns.set(enemyId, cooldown - 1);
      if (cooldown <= 0) {
        this.hitCooldowns.delete(enemyId);
      }
    }
  }

  draw(ctx) {
    ctx.save();
    
    // Draw neon trail
    if (this.trail.length > 1) {
      ctx.beginPath();
      ctx.moveTo(this.trail[0].x, this.trail[0].y);
      for (let i = 1; i < this.trail.length; i++) {
        ctx.lineTo(this.trail[i].x, this.trail[i].y);
      }
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.globalAlpha = 0.4;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.stroke();
    }
    
    // Draw spinning scythe (triangle/blade shape)
    ctx.globalAlpha = 1.0;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.offsetAngle * 4); // spin faster than orbit
    
    ctx.beginPath();
    ctx.moveTo(0, -this.radius);
    ctx.lineTo(this.radius * 1.5, this.radius);
    ctx.lineTo(-this.radius * 0.5, this.radius * 0.5);
    ctx.closePath();
    
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 15;
    ctx.shadowColor = this.color;
    ctx.fill();

    // inner core
    ctx.beginPath();
    ctx.arc(0, 0, this.radius * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    
    ctx.restore();
  }
}

// WEAPONS BASE CLASS
class Weapon {
  constructor(name, emoji, typeDescription) {
    this.name = name;
    this.emoji = emoji;
    this.typeDescription = typeDescription; // For UI Card
    this.level = 1;
    this.cooldownTimer = 0;
    this.isEvolved = false;
  }

  upgrade() {
    if (this.level < 10) {
      this.level++;
      return true;
    }
    return false;
  }

  update(dt, player, enemies, projectiles) {
    if (this.cooldownTimer > 0) {
      this.cooldownTimer -= dt;
    } else {
      const fired = this.fire(player, enemies, projectiles);
      if (fired) {
        this.cooldownTimer = this.getCooldown(player);

        // Relic: Ruined Codex synergy (12% chance to trigger double attack if cooldown is reduced by >= 30%)
        if (player.relics && player.relics.includes('RuinedCodex') && (player.stats.cooldownMultiplier || 1.0) <= 0.70) {
          if (Math.random() < 0.12) {
            setTimeout(() => {
              if (window.gameEngine && window.gameEngine.state === 'PLAYING' && player.hp > 0) {
                this.fire(player, enemies, projectiles);
                player.spawnParticles(player.x, player.y, '#b026ff', 1.0, 5);
              }
            }, 180);
          }
        }
      }
    }
  }

  getCooldown(player) {
    return 1000 * (player ? player.stats.cooldownMultiplier : 1); // default 1 second
  }

  fire(player, enemies, projectiles) {
    return false;
  }

  getDescription(nextLevel = false) {
    return "武器の効果";
  }
}

// 1. MAGIC WAND (Targets nearest enemy)
class MagicWand extends Weapon {
  constructor() {
    super("マナ・ボルト", "🔮", "単体追尾攻撃");
  }

  getCooldown(player) {
    if (this.isEvolved) return 30; // 30ms super rapid fire
    const balance = window.weaponBalance.MagicWand;
    const config = balance.levels[this.level - 1];
    const base = balance.baseCooldown * (1 + balance.cooldownGrowth * (this.level - 1)) * config.cooldownMult;
    return base * (player ? player.stats.cooldownMultiplier : 1);
  }

  fire(player, enemies, projectiles) {
    if (enemies.length === 0) return false;
    
    // Find nearest enemies (up to level count)
    const sortedEnemies = [...enemies].sort((a, b) => {
      return getDistance(player.x, player.y, a.x, a.y) - getDistance(player.x, player.y, b.x, b.y);
    });

    const balance = window.weaponBalance.MagicWand;
    const config = balance.levels[this.level - 1];
    const projectileCount = this.isEvolved ? 1 : config.count;
    const baseDamage = balance.baseDamage * player.stats.damageMultiplier;
    let damage = baseDamage * (1 + balance.damageGrowth * (this.level - 1)) * config.damageMult;
    if (this.isEvolved) damage *= 0.55; // Adjust damage for extreme fire rate
    const speed = this.isEvolved ? 12 : 7;
    const pierce = this.isEvolved ? 99 : config.pierce;

    // Fire at nearest target
    const target = sortedEnemies[0];
    let baseAngle = Math.atan2(target.y - player.y, target.x - player.x);

    // Audio cue (reduced frequency for evolved rapid fire)
    if (!this.isEvolved || Math.random() < 0.15) {
      gameAudio.playShoot();
    }

    for (let i = 0; i < projectileCount; i++) {
      let angle;
      if (this.isEvolved) {
        angle = baseAngle + (Math.random() - 0.5) * 0.05; // slight spread
      } else if (this.level === 10) {
        angle = (i / 18) * Math.PI * 2;
      } else {
        angle = baseAngle + (i - (projectileCount - 1) / 2) * 0.15;
      }
      projectiles.push(new Projectile(
        player.x, 
        player.y, 
        angle, 
        speed, 
        damage, 
        this.isEvolved ? 8 : 5, 
        this.isEvolved ? '#ffe600' : '#00f0ff', // Yellow neon for evolved
        pierce
      ));
    }

    return true;
  }

  getDescription(nextLevel = false) {
    const lvl = nextLevel ? this.level + 1 : this.level;
    if (lvl > 10) return "最大レベルです";
    
    const desc = [
      "最寄りの敵にマナ・ボルトを1発放ちます。",
      "発射数が2発に増加し、再装填速度が上がります。",
      "発射数が3発に増加します。",
      "貫通力が向上し、ボルトが敵を1体貫通するようになります。",
      "超高速連射モード！発射数が5発になり、貫通力が2に増加します。",
      "発射数が6発に増加し、再装填速度がさらに上がります。",
      "発射数が7発に増加し、貫通力が3に増加します。",
      "発射数が8発に増加し、拡散範囲が広がります。",
      "限界連射！発射数が9発になり、再装填速度が極限まで上がります。",
      "【究極】全方位ネオン・バースト！全方位（18発）に貫通力4のボルトを一斉発射します！"
    ];
    return desc[lvl - 1];
  }
}

// 2. GARLIC AURA (Damage zone around player)
class GarlicAura extends Weapon {
  constructor() {
    super("ネオン・ハロー", "🧄", "範囲持続ダメージ");
    this.damageInterval = 500; // ticks every 0.5s
    this.tickTimer = 0;
  }

  update(dt, player, enemies, projectiles) {
    const balance = window.weaponBalance.GarlicAura;
    const config = balance.levels[this.level - 1];
    const interval = balance.baseCooldown * (1 + balance.cooldownGrowth * (this.level - 1)) * config.cooldownMult * player.stats.cooldownMultiplier;
    this.tickTimer += dt;
    if (this.tickTimer >= interval) {
      this.tickTimer = 0;
      this.triggerAura(player, enemies);
    }
  }

  getRadius(player) {
    const balance = window.weaponBalance.GarlicAura;
    const config = balance.levels[this.level - 1];
    let base = balance.baseRadius * (1 + balance.radiusGrowth * (this.level - 1)) * config.radiusMult;
    if (this.isEvolved) base *= 2.0;
    return base * (player ? player.stats.areaMultiplier : 1);
  }

  getDamage(player) {
    const balance = window.weaponBalance.GarlicAura;
    const config = balance.levels[this.level - 1];
    const baseDamage = balance.baseDamage * player.stats.damageMultiplier;
    let damage = baseDamage * (1 + balance.damageGrowth * (this.level - 1)) * config.damageMult;
    if (this.isEvolved) damage *= 1.35; // Evolved damage buff
    return damage;
  }

  triggerAura(player, enemies) {
    const radius = this.getRadius(player);
    const damage = this.getDamage(player);
    const config = window.weaponBalance.GarlicAura.levels[this.level - 1];
    const slowEffect = config.slowRatio > 0.0 || this.isEvolved;
    const isUltimate = this.level >= 10 || this.isEvolved;
    
    let hitAny = false;

    enemies.forEach(enemy => {
      const dist = getDistance(player.x, player.y, enemy.x, enemy.y);
      if (dist <= radius + enemy.radius) {
        // Deal damage
        const damageDealt = enemy.takeDamage(damage);
        hitAny = true;
        
        // Push back / Pull in
        if (isUltimate) {
          // Pull in: move enemy slightly closer to player (gravitational singularity)
          const dx = player.x - enemy.x;
          const dy = player.y - enemy.y;
          const len = Math.sqrt(dx * dx + dy * dy);
          if (len > 0) {
            const pullForce = this.isEvolved ? 3.0 : 1.8; // Evolved pulls smoothly but strongly
            enemy.x += (dx / len) * pullForce;
            enemy.y += (dy / len) * pullForce;
          }
        } else if (this.level >= 3) {
          const dx = enemy.x - player.x;
          const dy = enemy.y - player.y;
          const len = Math.sqrt(dx * dx + dy * dy);
          if (len > 0) {
            const pushForce = this.level >= 8 ? 24 : 12;
            const kbMult = enemy.getKnockbackMultiplier();
            enemy.x += (dx / len) * pushForce * kbMult; // Knockback push
            enemy.y += (dy / len) * pushForce * kbMult;
          }
        }
        
        // Slow effect (Level 5+)
        if (slowEffect) {
          enemy.slowTimer = isUltimate ? 40 : 30; // slow duration
          enemy.slowRatio = this.isEvolved ? 0.60 : config.slowRatio; // 60% slow for evolved
        }
      }
    });

    if (hitAny) {
      gameAudio.playHit();
    }
  }

  drawAura(ctx, player) {
    const radius = this.getRadius(player);
    const time = Date.now() / 1000;
    ctx.save();
    
    const color1 = this.isEvolved ? '0, 240, 255' : '57, 255, 20'; // Cyan vs Green
    const color2 = this.isEvolved ? '176, 38, 255' : '57, 255, 20'; // Purple vs Green
    const shadowColor = this.isEvolved ? '#b026ff' : '#39ff14';

    // 1. Draw dynamic glowing wavy bio-field fill
    ctx.beginPath();
    const pointsCount = 48;
    const angleStep = (Math.PI * 2) / pointsCount;
    for (let i = 0; i <= pointsCount; i++) {
      const angle = i * angleStep;
      // Pulse radius with 6 waves rotating over time
      const wave = Math.sin(angle * 6 - time * 4.5) * (3 + this.level * 1.5);
      const r = radius + wave;
      const px = player.x + Math.cos(angle) * r;
      const py = player.y + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();

    // Radial gradient based on average radius
    const grad = ctx.createRadialGradient(player.x, player.y, radius * 0.4, player.x, player.y, radius + 5);
    grad.addColorStop(0, `rgba(${color1}, 0.0)`);
    grad.addColorStop(0.6, `rgba(${color1}, 0.03)`);
    grad.addColorStop(0.9, `rgba(${color2}, 0.15)`);
    grad.addColorStop(1, `rgba(${color2}, 0.35)`);
    
    ctx.fillStyle = grad;
    ctx.fill();

    // Wavy outer glowing stroke
    ctx.strokeStyle = `rgba(${color1}, 0.7)`;
    ctx.lineWidth = this.isEvolved ? 3 : 2;
    ctx.shadowBlur = this.isEvolved ? 20 : 12;
    ctx.shadowColor = shadowColor;
    ctx.stroke();

    // 2. Expanding radial energy ripple (pulses outward)
    const rippleCount = this.isEvolved ? 3 : 2;
    for (let rIdx = 0; rIdx < rippleCount; rIdx++) {
      const pulseSpeed = this.isEvolved ? 1.0 : 1.3;
      const pulseProgress = ((time * pulseSpeed) + (rIdx / rippleCount)) % 1.0;
      const rippleRadius = radius * pulseProgress;
      const rippleAlpha = (1 - pulseProgress) * 0.45;
      
      ctx.beginPath();
      ctx.arc(player.x, player.y, rippleRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${this.isEvolved ? color1 : '57, 255, 20'}, ${rippleAlpha})`;
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 6;
      ctx.shadowColor = shadowColor;
      ctx.stroke();
    }

    // 3. Rotating dashed rings
    // Outer dashed ring
    ctx.beginPath();
    ctx.arc(player.x, player.y, radius - 2, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(${color2}, 0.35)`;
    ctx.lineWidth = 1;
    ctx.setLineDash([15, 30]);
    ctx.lineDashOffset = time * 25; // Rotate counter-clockwise
    ctx.shadowBlur = 0;
    ctx.stroke();

    // Inner dashed ring
    ctx.beginPath();
    ctx.arc(player.x, player.y, radius * 0.75, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(${color1}, 0.25)`;
    ctx.lineWidth = 1;
    ctx.setLineDash([8, 16]);
    ctx.lineDashOffset = -time * 18; // Rotate clockwise
    ctx.stroke();

    ctx.restore();
  }

  getDescription(nextLevel = false) {
    const lvl = nextLevel ? this.level + 1 : this.level;
    if (lvl > 10) return "最大レベルです";
    
    const desc = [
      "プレイヤーの周囲に緑色の毒性ネオンフィールドを展開し、敵に微小な持続ダメージを与えます。",
      "フィールドの範囲が20%広がり、ダメージが25%上昇します。",
      "衝撃波が発生！範囲内の敵を小さくノックバックさせるようになります。",
      "範囲がさらに拡大し、ダメージが大幅に上昇します。",
      "極大展開！範囲内の敵の移動速度を30%低下させ、ダメージが倍増します。",
      "フィールドの範囲がさらに広がり（2.1倍）、ダメージが大幅に上昇します。",
      "フィールドが共鳴！ダメージを与える間隔が300msに短縮されます。",
      "衝撃波が強化！敵へのノックバック距離が2倍になります。",
      "フィールドが濃縮！範囲内の敵の移動速度を45%低下させます。",
      "【究極】イベント・ホライズン！範囲3.5倍、200ms間隔で超ダメージを与え、敵を徐々に吸い寄せ、速度を60%低下させます！"
    ];
    return desc[lvl - 1];
  }
}

// 3. SPINNING SCYTHE (Orbiting blades)
class SpinningScythe extends Weapon {
  constructor() {
    super("サイバー・エッジ", "🪓", "周囲回転攻撃");
    this.blades = [];
  }

  // Overriding standard update to handle orbital physics
  update(dt, player, enemies, projectiles) {
    const balance = window.weaponBalance.SpinningScythe;
    const config = balance.levels[this.level - 1];
    const count = this.isEvolved ? 8 : config.count;
    const baseDamage = balance.baseDamage * player.stats.damageMultiplier;
    let damage = baseDamage * (1 + balance.damageGrowth * (this.level - 1)) * config.damageMult;
    if (this.isEvolved) damage *= 1.25; // Evolved damage buff
    const speed = balance.baseSpeed * (1 + balance.speedGrowth * (this.level - 1)) * config.speedMult * (this.isEvolved ? 2.5 : 1.0);
    const distance = this.isEvolved ? 35 * player.stats.areaMultiplier : balance.baseDistance * (1 + balance.distanceGrowth * (this.level - 1)) * config.distanceMult * player.stats.areaMultiplier;
    
    // Keep array size matching target count
    if (this.blades.length !== count) {
      this.blades = [];
      for (let i = 0; i < count; i++) {
        const offsetAngle = (i / count) * Math.PI * 2;
        this.blades.push(new ScytheProjectile(
          player,
          offsetAngle,
          i,
          speed,
          distance,
          damage,
          this.isEvolved ? '#00f0ff' : '#b026ff' // Cyan for evolved, purple for normal
        ));
      }
    }

    // Update orbit positions and run collision tests
    this.blades.forEach(blade => {
      // update speed and parameters in real time
      blade.orbitalSpeed = speed;
      blade.distance = distance;
      blade.damage = damage;
      blade.radius = (this.isEvolved ? 10 : 8) * player.stats.areaMultiplier;
      if (this.isEvolved) blade.color = '#00f0ff';
      
      blade.update(dt, enemies);

      // check collisions manually since scythe pierces continuously but needs hit cooldowns
      enemies.forEach(enemy => {
         const dist = getDistance(blade.x, blade.y, enemy.x, enemy.y);
         if (dist <= blade.radius + enemy.radius) {
           // Check if cooldown expired for this specific enemy
           if (!blade.hitCooldowns.has(enemy.id)) {
             enemy.takeDamage(blade.damage, true);
             blade.hitCooldowns.set(enemy.id, this.isEvolved ? 12 : 20); // Faster hit tick rate for evolved
             gameAudio.playHit();
             
             // Level 5 extra: spawn spark particles
             if (this.level >= 5 || this.isEvolved) {
               const sparkCount = this.isEvolved ? 5 : (this.level >= 10 ? 7 : 3);
               player.spawnParticles(blade.x, blade.y, this.isEvolved ? '#00f0ff' : '#b026ff', 0.5, sparkCount);
             }
           }
         }
      });
    });
  }

  getBladeCount() {
    return window.weaponBalance.SpinningScythe.levels[this.level - 1].count;
  }

  // Draw blades in entities loop
  drawBlades(ctx) {
    this.blades.forEach(b => b.draw(ctx));
  }

  getDescription(nextLevel = false) {
    const lvl = nextLevel ? this.level + 1 : this.level;
    if (lvl > 10) return "最大レベルです";
    
    const desc = [
      "プレイヤーの周囲を公転する紫色のサイバーブレードを1枚召喚し、敵を切り裂きます。",
      "ブレードの枚数が2枚に増加します。",
      "回転速度が30%高速化し、攻撃範囲がわずかに広がります。",
      "ブレードの枚数が3枚に増加します。",
      "極限展開！ブレードが4枚になり、衝突時にネオン火花を散らして周囲の敵を巻き込みます。",
      "ブレードの枚数が5枚に増加します。",
      "回転軌道が広がり、さらに高速で公転するようになります。",
      "ブレードの枚数が6枚に増加します。",
      "ブレードの枚数が7枚になり、威力が25%上昇します。",
      "【究極】終末のオービット！極大サイズかつ最高速で公転する9枚のブレードが、敵を蹂躙します！"
    ];
    return desc[lvl - 1];
  }
}

// 4. BIG SWORD (Colossal rotating blades)
class BigSword extends Weapon {
  constructor() {
    super("マキシマム・エッジ", "🗡️", "巨大剣公転攻撃");
    this.angle = 0;
    this.hitCooldowns = new Map();
  }

  update(dt, player, enemies, projectiles) {
    const rotSpeed = 0.012 * (1 + (this.level - 1) * 0.05); // slightly faster by level
    this.angle += rotSpeed;
    if (this.angle > Math.PI * 2) this.angle -= Math.PI * 2;

    // Tick hit cooldowns
    for (let [enemyId, cooldown] of this.hitCooldowns) {
      this.hitCooldowns.set(enemyId, cooldown - dt);
      if (cooldown <= 0) {
        this.hitCooldowns.delete(enemyId);
      }
    }

    const balance = window.weaponBalance.BigSword;
    const config = balance.levels[this.level - 1];
    const count = config.count;
    const length = this.getLength(player);
    const width = this.getWidth(player);
    const damage = this.getDamage(player);
    const handleOffset = 25;

    for (let i = 0; i < count; i++) {
      const swordAngle = this.angle + (i / count) * Math.PI * 2;

      enemies.forEach(enemy => {
        if (!enemy.active) return;

        // Line-projection math for sword-to-enemy collisions
        const dx = enemy.x - player.x;
        const dy = enemy.y - player.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist === 0) return;

        const enemyAngle = Math.atan2(dy, dx);
        let diff = enemyAngle - swordAngle;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;

        const perpDist = Math.abs(dist * Math.sin(diff));
        const parDist = dist * Math.cos(diff);

        // Collision logic
        if (perpDist <= (width / 2) + enemy.radius && 
            parDist >= handleOffset - enemy.radius && 
            parDist <= handleOffset + length + enemy.radius) {
          
          const hitKey = `${enemy.id}_${i}`;
          if (!this.hitCooldowns.has(hitKey)) {
            const critChance = this.level >= 10 ? 0.25 : 0.12;
            const isCrit = Math.random() < critChance;
            const critMultiplier = this.level >= 10 ? 3.0 : 2.5;
            const finalDamage = damage * (isCrit ? critMultiplier : 1.0);
            
            enemy.takeDamage(finalDamage, true);
            
            if (player.damageNumbersRef) {
              player.damageNumbersRef.push(new DamageNumber(enemy.x, enemy.y, finalDamage, isCrit));
            }

            if (player.particlesRef) {
              const contactX = player.x + Math.cos(swordAngle) * parDist;
              const contactY = player.y + Math.sin(swordAngle) * parDist;
              player.spawnParticles(contactX, contactY, '#fffb00', 1.0, isCrit ? (this.level >= 10 ? 24 : 12) : 5);
              if (this.level >= 5) {
                player.spawnParticles(contactX, contactY, '#ff5e00', 1.4, this.level >= 10 ? 8 : 3);
              }
            }

            // Apply strong knockback
            const kDx = enemy.x - player.x;
            const kDy = enemy.y - player.y;
            const kLen = Math.sqrt(kDx * kDx + kDy * kDy);
            if (kLen > 0) {
              const force = isCrit ? 36 : 18;
              const kbMult = enemy.getKnockbackMultiplier();
              enemy.x += (kDx / kLen) * force * kbMult;
              enemy.y += (kDy / kLen) * force * kbMult;
            }

            gameAudio.playHit();
            const cooldownVal = balance.baseCooldown * (1 + balance.cooldownGrowth * (this.level - 1)) * config.cooldownMult * player.stats.cooldownMultiplier;
            this.hitCooldowns.set(hitKey, cooldownVal);
          }
        }
      });
    }
  }

  getSwordCount() {
    if (this.isEvolved) return 8;
    return window.weaponBalance.BigSword.levels[this.level - 1].count;
  }

  getLength(player) {
    const balance = window.weaponBalance.BigSword;
    const config = balance.levels[this.level - 1];
    let base = balance.baseLength * (1 + balance.lengthGrowth * (this.level - 1)) * config.lengthMult;
    if (this.isEvolved) base *= 1.3;
    return base * (player ? player.stats.areaMultiplier : 1);
  }

  getWidth(player) {
    const balance = window.weaponBalance.BigSword;
    const config = balance.levels[this.level - 1];
    let base = balance.baseWidth * (1 + balance.widthGrowth * (this.level - 1)) * config.widthMult;
    if (this.isEvolved) base *= 1.2;
    return base * (player ? player.stats.areaMultiplier : 1);
  }

  getDamage(player) {
    const balance = window.weaponBalance.BigSword;
    const config = balance.levels[this.level - 1];
    const baseDamage = balance.baseDamage * player.stats.damageMultiplier;
    let damage = baseDamage * (1 + balance.damageGrowth * (this.level - 1)) * config.damageMult;
    if (this.isEvolved) damage *= 1.4; // Evolved damage buff
    return damage;
  }

  drawSwords(ctx, player) {
    const count = this.getSwordCount();
    const length = this.getLength(player);
    const width = this.getWidth(player);
    const handleOffset = 25;

    for (let i = 0; i < count; i++) {
      const swordAngle = this.angle + (i / count) * Math.PI * 2;

      ctx.save();
      ctx.translate(player.x, player.y);
      ctx.rotate(swordAngle);

      // Draw sword path
      ctx.beginPath();
      const xStart = handleOffset;
      const xEnd = handleOffset + length;
      const halfW = width / 2;

      ctx.moveTo(xStart, -halfW * 0.4);
      ctx.lineTo(xStart + 8, -halfW);
      ctx.lineTo(xEnd - 10, -halfW);
      ctx.lineTo(xEnd, 0); // Tip
      ctx.lineTo(xEnd - 10, halfW);
      ctx.lineTo(xStart + 8, halfW);
      ctx.lineTo(xStart, halfW * 0.4);
      ctx.closePath();

      // Premium golden neon style rendering, red/pink for evolved
      const color = this.isEvolved ? '#ff0055' : (this.level >= 10 ? '#ffe600' : '#ffb700');
      const strokeColor = this.isEvolved ? '#ffffff' : (this.level >= 10 ? '#ffffff' : '#ffd700');
      const fillStyle = this.isEvolved ? 'rgba(255, 0, 85, 0.25)' : `rgba(${this.level >= 10 ? '255, 230, 0' : '255, 183, 0'}, 0.25)`;

      ctx.fillStyle = fillStyle;
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2.5;
      ctx.shadowBlur = this.isEvolved ? 24 : (this.level >= 10 ? 20 : 10);
      ctx.shadowColor = color;
      
      ctx.fill();
      ctx.stroke();

      // Inner glowing core line (laser blade style)
      ctx.beginPath();
      ctx.moveTo(xStart + 5, 0);
      ctx.lineTo(xEnd - 5, 0);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = width * 0.15;
      ctx.lineCap = 'round';
      ctx.shadowBlur = 5;
      ctx.shadowColor = '#ffffff';
      ctx.stroke();

      ctx.restore();
    }
  }

  getDescription(nextLevel = false) {
    const lvl = nextLevel ? this.level + 1 : this.level;
    if (lvl > 10) return "最大レベルです";
    
    const desc = [
      "プレイヤーの周囲を薙ぎ払うように公転する巨大な黄金の剣を1本召喚します。",
      "剣が2本に増え、剣のサイズ（長さ＋幅）がわずかに拡張されます。",
      "剣がさらに巨大化し、威力が大幅に上昇します（長さ85px / 太さ18px）。",
      "剣の本数が3本に増え、基本威力がさらに高まります。",
      "極限の剣！剣が4本になり、サイズが大きく（長さ120px / 太さ25px）向上します。",
      "剣の本数が5本に増え、サイズが長さ135px / 太さ27pxに拡張されます。",
      "威力が大幅に上昇し、さらにサイズが長さ150px / 太さ29pxに拡張されます。",
      "剣の本数が6本に増え、サイズが長さ165px / 太さ31pxに拡張されます。",
      "威力が30%上昇し、サイズが長さ180px / 太さ33pxに拡張されます。",
      "【究極】ラグナロク・ブレード！8本の超巨大金剛剣（長さ200px / 太さ36px）が画面全体を薙ぎ払い、クリティカル率が25%に急増します！"
    ];
    return desc[lvl - 1];
  }
}

// 5. THUNDER WAVE (Expanding lightning shockwaves)
class ThunderWave extends Weapon {
  constructor() {
    super("サンダーウェーブ", "⚡", "放射状範囲電撃");
    this.activeWaves = [];
  }

  getCooldown(player) {
    const balance = window.weaponBalance.ThunderWave;
    const config = balance.levels[this.level - 1];
    const base = balance.baseCooldown * (1 + balance.cooldownGrowth * (this.level - 1)) * config.cooldownMult;
    return base * (player ? player.stats.cooldownMultiplier : 1);
  }

  getRange(player) {
    const balance = window.weaponBalance.ThunderWave;
    const config = balance.levels[this.level - 1];
    const base = balance.baseRange * (1 + balance.rangeGrowth * (this.level - 1)) * config.rangeMult;
    return base * (player ? player.stats.areaMultiplier : 1);
  }

  getDamage(player) {
    const balance = window.weaponBalance.ThunderWave;
    const config = balance.levels[this.level - 1];
    const baseDamage = balance.baseDamage * player.stats.damageMultiplier;
    return baseDamage * (1 + balance.damageGrowth * (this.level - 1)) * config.damageMult;
  }

  getKnockback() {
    return this.level >= 9 ? 30 : (this.level >= 3 ? 18 : 10);
  }

  fire(player, enemies, projectiles) {
    const config = window.weaponBalance.ThunderWave.levels[this.level - 1];
    const waveCount = this.isEvolved ? 3 : config.waveCount; // Evolved always releases 3 waves
    for (let w = 0; w < waveCount; w++) {
      this.activeWaves.push({
        delay: w * 250, // 250ms delay between consecutive waves
        age: 0,
        maxAge: config.maxAge,
        maxRange: this.getRange(player),
        damage: this.getDamage(player),
        knockback: this.getKnockback(),
        hitEnemies: []
      });
    }
    gameAudio.playShoot();
    return true;
  }

  update(dt, player, enemies, projectiles) {
    super.update(dt, player, enemies, projectiles);

    this.activeWaves.forEach(wave => {
      if (wave.delay > 0) {
        wave.delay -= dt;
        return;
      }

      wave.age++;
      const progress = wave.age / wave.maxAge;
      const currentRadius = progress * wave.maxRange;

      enemies.forEach(enemy => {
        if (!enemy.active) return;
        if (wave.hitEnemies.includes(enemy.id)) return;

        const dist = getDistance(player.x, player.y, enemy.x, enemy.y);
        const thickness = 18;
        if (dist >= currentRadius - thickness && dist <= currentRadius + 3) {
          const isCrit = Math.random() < 0.10;
          const finalDmg = wave.damage * (isCrit ? 2.0 : 1.0);
          
          enemy.takeDamage(finalDmg, true);
          wave.hitEnemies.push(enemy.id);

          if (player.damageNumbersRef) {
            player.damageNumbersRef.push(new DamageNumber(enemy.x, enemy.y, finalDmg, isCrit));
          }

          // Overload Synergy: Fire + Thunder
          if (enemy.burnTimer > 0) {
            enemy.burnTimer = 0; // consume burn
            
            const overloadBase = enemy.maxHp * 0.10;
            const overloadDmg = overloadBase * (isCrit ? 1.5 : 1.0);
            enemy.takeDamage(overloadDmg);
            
            if (player.damageNumbersRef) {
              player.damageNumbersRef.push(new DamageNumber(enemy.x, enemy.y, Math.round(overloadDmg), true, '#ff00ff', 16));
            }
            
            // Splash damage and knockback to nearby enemies
            enemies.forEach(other => {
              if (!other.active || other.id === enemy.id) return;
              const splashDist = getDistance(enemy.x, enemy.y, other.x, other.y);
              if (splashDist <= 80) {
                const splashDmg = overloadDmg * 0.5;
                other.takeDamage(splashDmg);
                if (player.damageNumbersRef) {
                  player.damageNumbersRef.push(new DamageNumber(other.x, other.y, Math.round(splashDmg), false, '#ff00ff', 12));
                }
                
                // Knockback
                const okDx = other.x - enemy.x;
                const okDy = other.y - enemy.y;
                const okLen = Math.sqrt(okDx * okDx + okDy * okDy);
                if (okLen > 0) {
                  const force = 12 * other.getKnockbackMultiplier();
                  other.x += (okDx / okLen) * force;
                  other.y += (okDy / okLen) * force;
                }
              }
            });
            
            // Visual particles (pink & white)
            for (let pi = 0; pi < 12; pi++) {
              player.spawnParticles(enemy.x, enemy.y, '#ff00ff', 1.5, 1);
              player.spawnParticles(enemy.x, enemy.y, '#ffffff', 1.3, 1);
            }
          }

          if (player.particlesRef) {
            player.spawnParticles(enemy.x, enemy.y, '#00f0ff', 1.0, isCrit ? 9 : 3);
            if (this.level >= 10) {
              // Spawn vertical lightning strikes (visual particle beams)
              for (let ly = enemy.y - 120; ly < enemy.y; ly += 15) {
                player.spawnParticles(enemy.x, ly, '#ffffff', 0.2, 1);
              }
              player.spawnParticles(enemy.x, enemy.y, '#fffb00', 1.5, 5);
            }
          }

          // Apply knockback
          const kDx = enemy.x - player.x;
          const kDy = enemy.y - player.y;
          const kLen = Math.sqrt(kDx * kDx + kDy * kDy);
          if (kLen > 0) {
            const force = isCrit ? wave.knockback * 2.2 : wave.knockback;
            const kbMult = enemy.getKnockbackMultiplier();
            enemy.x += (kDx / kLen) * force * kbMult;
            enemy.y += (kDy / kLen) * force * kbMult;
          }

          gameAudio.playHit();
        }
      });
    });

    this.activeWaves = this.activeWaves.filter(w => w.age < w.maxAge);
  }

  drawWaves(ctx, player) {
    this.activeWaves.forEach(wave => {
      if (wave.delay > 0) return;

      const progress = wave.age / wave.maxAge;
      const currentRadius = progress * wave.maxRange;
      const alpha = Math.max(0, 1 - progress);

      ctx.save();
      const waveColor = this.isEvolved ? `rgba(255, 230, 0, ${alpha})` : `rgba(0, 240, 255, ${alpha})`;
      const glowColor = this.isEvolved ? '#fffb00' : '#00f0ff';
      ctx.strokeStyle = waveColor;
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = this.isEvolved ? 22 : 15;

      // Draw expanding electric concentric waves
      // 1. Draw smooth circle
      ctx.beginPath();
      ctx.arc(player.x, player.y, currentRadius, 0, Math.PI * 2);
      ctx.lineWidth = (this.isEvolved ? 6 : 4) * (1 - progress) + 1;
      ctx.stroke();

      // 2. Draw a slightly jagged electric circle
      ctx.beginPath();
      const segments = this.isEvolved ? 32 : 24;
      const angleStep = (Math.PI * 2) / segments;
      for (let i = 0; i <= segments; i++) {
        const angle = i * angleStep;
        const jitterMagnitude = this.isEvolved ? 14 : 8;
        const jitter = (Math.random() - 0.5) * jitterMagnitude * (1 - progress);
        const r = currentRadius + jitter;
        const x = player.x + Math.cos(angle) * r;
        const y = player.y + Math.sin(angle) * r;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.strokeStyle = this.isEvolved ? `rgba(255, 255, 255, ${alpha * 0.95})` : `rgba(255, 255, 255, ${alpha * 0.9})`;
      ctx.lineWidth = this.isEvolved ? 2.5 : 1.5;
      ctx.stroke();

      if (this.level >= 5 || this.isEvolved) {
        ctx.beginPath();
        ctx.arc(player.x, player.y, Math.max(0, currentRadius - 20), 0, Math.PI * 2);
        
        const innerColor = this.isEvolved ? `rgba(255, 94, 0, ${alpha * 0.8})` : `rgba(176, 38, 255, ${alpha * 0.7})`;
        const innerGlow = this.isEvolved ? '#ff5e00' : '#b026ff';
        
        ctx.strokeStyle = innerColor;
        ctx.shadowColor = innerGlow;
        ctx.lineWidth = this.isEvolved ? 3 : 2;
        ctx.stroke();
      }

      ctx.restore();
    });
  }

  getDescription(nextLevel = false) {
    const lvl = nextLevel ? this.level + 1 : this.level;
    if (lvl > 10) return "最大レベルです";

    const desc = [
      "自機から放射状にゆっくりと画面端まで広がる電撃ショックウェーブを放ち、周囲の敵をノックバックさせてダメージを与えます。",
      "電撃の威力が上昇し、再装填速度（クールダウン）が短縮されます。",
      "威力が上昇し、再装填速度が上がります。ノックバック距離が向上します。",
      "威力が大幅に上昇し、再装填速度がさらに向上します。",
      "電磁波過給！威力が極大化し、再装填速度が大幅に向上します。",
      "威力が上昇し、再装填速度が向上します。",
      "再装填速度がさらに向上します（再装填750ms）。",
      "過充電！1回のアクションで2連続の電撃ショックウェーブを放つようになります。",
      "威力が大幅に上昇し、ノックバック距離が極大化します。",
      "【究極】ジャッジメント・ストーム！威力極大の電撃を3連続で放ち、ヒットしたすべての敵に強力な落雷を発生させます！"
    ];
    return desc[lvl - 1];
  }
}

// 6. FIRE ROAD (Plasma fire trail segments)
class FireRoad extends Weapon {
  constructor() {
    super("ファイアーロード", "🔥", "軌道プラズマ炎");
    this.flames = [];
    this.lastPlayerX = undefined;
    this.lastPlayerY = undefined;
  }

  getLifetime() {
    const balance = window.weaponBalance.FireRoad;
    const config = balance.levels[this.level - 1];
    return balance.baseLifetime * (1 + balance.lifetimeGrowth * (this.level - 1)) * config.lifetimeMult;
  }

  getRadius(player) {
    const balance = window.weaponBalance.FireRoad;
    const config = balance.levels[this.level - 1];
    const base = balance.baseRadius * (1 + balance.radiusGrowth * (this.level - 1)) * config.radiusMult;
    return base * (player ? player.stats.areaMultiplier : 1);
  }

  getDamage(player) {
    const balance = window.weaponBalance.FireRoad;
    const config = balance.levels[this.level - 1];
    const baseDamage = balance.baseDamage * player.stats.damageMultiplier;
    let damage = baseDamage * (1 + balance.damageGrowth * (this.level - 1)) * config.damageMult;
    if (this.isEvolved) damage *= 1.5; // Evolved damage buff
    return damage;
  }

  getCooldown(player) {
    const balance = window.weaponBalance.FireRoad;
    const config = balance.levels[this.level - 1];
    return balance.baseCooldown * (1 + balance.cooldownGrowth * (this.level - 1)) * config.cooldownMult * player.stats.cooldownMultiplier;
  }

  fire(player, enemies, projectiles) {
    const isMoving = this.lastPlayerX !== undefined && (Math.abs(this.lastPlayerX - player.x) > 0.1 || Math.abs(this.lastPlayerY - player.y) > 0.1);
    this.lastPlayerX = player.x;
    this.lastPlayerY = player.y;

    if (isMoving) {
      this.flames.push({
        x: player.x,
        y: player.y,
        life: this.getLifetime(),
        maxLife: this.getLifetime(),
        radius: this.getRadius(player),
        damage: this.getDamage(player),
        hitImmunity: new Map() // enemyId -> immunity duration
      });
      return true;
    }
    return false;
  }

  update(dt, player, enemies, projectiles) {
    if (this.lastPlayerX === undefined) {
      this.lastPlayerX = player.x;
      this.lastPlayerY = player.y;
    }

    super.update(dt, player, enemies, projectiles);

    // Update flame timers & collision ticks
    this.flames.forEach(flame => {
      const oldLife = flame.life;
      flame.life -= dt;

      // Level 10 Ultimate / Evolved expiration explosion triggers once
      if ((this.level >= 10 || this.isEvolved) && oldLife > 0 && flame.life <= 0) {
        player.spawnParticles(flame.x, flame.y, this.isEvolved ? '#00f0ff' : '#ff007f', 1.2, 5);
        player.spawnParticles(flame.x, flame.y, this.isEvolved ? '#005eff' : '#ff5e00', 1.0, 3);
        // Deal damage to enemies around it on explosion
        enemies.forEach(enemy => {
          if (!enemy.active) return;
          const dist = getDistance(flame.x, flame.y, enemy.x, enemy.y);
          if (dist <= flame.radius * 1.5) {
            enemy.takeDamage(flame.damage * (this.isEvolved ? 1.2 : 0.8));
            if (player.damageNumbersRef) {
              player.damageNumbersRef.push(new DamageNumber(enemy.x, enemy.y, flame.damage * (this.isEvolved ? 1.2 : 0.8), false));
            }
          }
        });
      }

      // Tick hit immunity cooldowns
      for (let [enemyId, cooldown] of flame.hitImmunity) {
        flame.hitImmunity.set(enemyId, cooldown - dt);
        if (cooldown <= 0) {
          flame.hitImmunity.delete(enemyId);
        }
      }

      // Player self-healing if evolved and stepping on own flames
      if (this.isEvolved && player.hp > 0 && player.hp < player.maxHp) {
        const pDist = getDistance(flame.x, flame.y, player.x, player.y);
        if (pDist <= flame.radius) {
          player.hp = Math.min(player.maxHp, player.hp + dt * 0.003); // Heal approx 3 HP per second
        }
      }

      enemies.forEach(enemy => {
        if (!enemy.active) return;
        if (flame.hitImmunity.has(enemy.id)) return;

        const dist = getDistance(flame.x, flame.y, enemy.x, enemy.y);
        if (dist <= flame.radius + enemy.radius) {
          let dmg = flame.damage;
          
          // Slow effect (Level 3+)
          if (this.level >= 3 || this.isEvolved) {
            enemy.slowTimer = 35; // slow for 35 frames (approx 600ms)
            if (this.level >= 10 || this.isEvolved) {
              enemy.slowRatio = this.isEvolved ? 0.60 : 0.50; // 60% slow for evolved fire
            }
          }

          // Double damage on slowed enemies (Level 5+)
          if ((this.level >= 5 || this.isEvolved) && enemy.slowTimer > 0) {
            dmg *= 2.0;
          }

          enemy.takeDamage(dmg);
          enemy.burnTimer = 180; // Overload burn effect (3 seconds)
          flame.hitImmunity.set(enemy.id, 300); // 300ms hit ticks

          if (player.damageNumbersRef) {
            player.damageNumbersRef.push(new DamageNumber(enemy.x, enemy.y, dmg, false));
          }

          if (player.particlesRef && Math.random() < 0.35) {
            player.spawnParticles(enemy.x, enemy.y, this.isEvolved ? '#00f0ff' : '#ff007f', 0.6, 2);
          }

          gameAudio.playHit();
        }
      });
    });

    // Remove expired flames
    this.flames = this.flames.filter(f => f.life > 0);
  }

  getDescription(nextLevel = false) {
    const lvl = nextLevel ? this.level + 1 : this.level;
    if (lvl > 10) return "最大レベルです";
    
    const desc = [
      "自機の移動軌跡にプラズマ炎を発生させ、それに触れた敵にダメージを与えます。",
      "プラズマ炎の残存時間が2.0秒に延長され、範囲が13pxに広がります。",
      "プラズマ炎の残存時間が2.5秒になり、接触した敵の速度を35%低下させます。",
      "プラズマ炎の残存時間が3.0秒に延長され、範囲が20pxに広がります。",
      "火炎放射！範囲が26pxに拡大し、速度低下中の敵に与えるダメージが2倍になります。",
      "プラズマ炎の残存時間が4.4秒に延長され、範囲が29pxに広がります。",
      "炎の密度が上昇！移動時に炎をドロップする間隔が180msに短縮されます。",
      "プラズマ炎の残存時間が5.6秒に延長され、範囲が35pxに広がります。",
      "威力が25%上昇し、範囲が38pxに広がります。",
      "【究極】インフェルノ・デヴァステーション！範囲42px・7秒持続の炎を残し、消滅時に爆発して周囲の敵を焼き尽くします！"
    ];
    return desc[lvl - 1];
  }

  drawFlames(ctx) {
    ctx.save();
    const time = Date.now() / 1000;
    
    this.flames.forEach(f => {
      const progress = f.life / f.maxLife; // 1.0 down to 0.0
      const alpha = Math.max(0, progress);
      
      // Flickering scale factor
      const flicker = 1 + Math.sin(time * 18 + f.x) * 0.08;
      const baseRadius = f.radius * flicker;
      const drawRadius = baseRadius * (0.8 + (1 - progress) * 0.2); // expand slightly

      // 1. Draw outer flame shape (Cyan for evolved)
      ctx.beginPath();
      const segments = 16;
      const angleStep = (Math.PI * 2) / segments;
      for (let i = 0; i <= segments; i++) {
        const angle = i * angleStep;
        // Jitter points to simulate licking flames
        const jitter = Math.sin(angle * 4 + time * 15) * (drawRadius * 0.12);
        const r = drawRadius + jitter;
        // Pull top vertices upward to create flame tongue shape
        const pyOffset = Math.sin(angle) < 0 ? (1 - progress) * drawRadius * 0.45 : 0;
        const px = f.x + Math.cos(angle) * r;
        const py = f.y + Math.sin(angle) * r - pyOffset;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();

      const color1 = this.isEvolved ? '0, 240, 255' : '255, 0, 127';
      const color2 = this.isEvolved ? '0, 94, 255' : '255, 94, 0';
      const color3 = this.isEvolved ? '255, 255, 255' : '255, 230, 0';

      ctx.strokeStyle = `rgba(${color1}, ${alpha * 0.7})`;
      ctx.shadowColor = this.isEvolved ? '#00f0ff' : '#ff007f';
      ctx.shadowBlur = this.isEvolved ? 18 : 12;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Semi-transparent hot center
      ctx.fillStyle = `rgba(${color1}, ${alpha * 0.05})`;
      ctx.fill();

      // 2. Draw inner hot core flame shape
      ctx.beginPath();
      const coreRadius = drawRadius * 0.6;
      for (let i = 0; i <= segments; i++) {
        const angle = i * angleStep;
        const jitter = Math.sin(angle * 3 + time * 18) * (coreRadius * 0.1);
        const r = coreRadius + jitter;
        const pyOffset = Math.sin(angle) < 0 ? (1 - progress) * coreRadius * 0.5 : 0;
        const px = f.x + Math.cos(angle) * r;
        const py = f.y + Math.sin(angle) * r - pyOffset;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();

      ctx.fillStyle = `rgba(${color2}, ${alpha * 0.5})`;
      ctx.shadowColor = this.isEvolved ? '#005eff' : '#ff5e00';
      ctx.shadowBlur = 6;
      ctx.fill();

      // 3. Draw innermost heat core
      ctx.beginPath();
      const heatRadius = drawRadius * 0.3;
      for (let i = 0; i <= segments; i++) {
        const angle = i * angleStep;
        const r = heatRadius;
        const pyOffset = Math.sin(angle) < 0 ? (1 - progress) * heatRadius * 0.55 : 0;
        const px = f.x + Math.cos(angle) * r;
        const py = f.y + Math.sin(angle) * r - pyOffset;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();

      ctx.fillStyle = `rgba(${color3}, ${alpha * 0.65})`;
      ctx.shadowColor = this.isEvolved ? '#ffffff' : '#fffb00';
      ctx.shadowBlur = 4;
      ctx.fill();

      // 4. Draw floating micro-sparks rising from each trail segment
      const sparkProgress = 1 - progress; // 0.0 to 1.0
      const sparkCount = 3;
      for (let sIdx = 0; sIdx < sparkCount; sIdx++) {
        const seed = sIdx * 5.3 + f.x + f.y;
        const sparkTime = (sparkProgress + (sIdx / sparkCount)) % 1.0;
        const sparkX = f.x + Math.sin(seed + sparkTime * 6.5) * (f.radius * 0.85);
        const sparkY = f.y - sparkTime * (f.radius * 2.2) - 2; // Float upward
        const sparkR = Math.max(0.5, 3.0 * (1 - sparkTime));
        const sparkAlpha = alpha * (1 - sparkTime);

        ctx.beginPath();
        ctx.arc(sparkX, sparkY, sparkR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.isEvolved ? '0, 240, 255' : '255, 230, 0'}, ${sparkAlpha * 0.85})`;
        ctx.shadowColor = this.isEvolved ? '#00f0ff' : '#fffb00';
        ctx.shadowBlur = 6;
        ctx.fill();
      }
    });

    ctx.restore();
  }
}

// PASSIVE STAT UPGRADES
class PassiveItem {
  constructor(name, emoji, statName, modifierPerLevel, description) {
    this.name = name;
    this.emoji = emoji;
    this.statName = statName;
    this.modifierPerLevel = modifierPerLevel; // e.g. 0.1 for 10%
    this.description = description;
    this.level = 0;
  }

  upgrade(player) {
    if (this.level < 5) {
      this.level++;
      player.recalculatePassiveStats();
      return true;
    }
    return false;
  }

  getDescription(nextLevel = false) {
    const lvl = nextLevel ? this.level + 1 : this.level;
    if (lvl > 5) return "最大レベルです";
    
    const valPercent = Math.round(lvl * this.modifierPerLevel * 100);
    
    if (this.statName === 'maxHp') return `最大体力が ${valPercent}% 増加します。`;
    if (this.statName === 'speed') return `プレイヤーの移動速度が ${valPercent}% 増加します。`;
    if (this.statName === 'magnet') return `アイテムの吸引範囲（マグネット）が ${valPercent}% 拡大します。`;
    if (this.statName === 'damage') return `与えるすべてのダメージが ${valPercent}% 増加します。`;
    if (this.statName === 'regen') return `1秒ごとにHPが ${lvl * this.modifierPerLevel} 回復します。`;
    if (this.statName === 'cooldown') return `武器の攻撃間隔（クールダウン）が ${Math.abs(valPercent)}% 減少します。`;
    if (this.statName === 'area') return `武器の攻撃範囲とサイズが ${valPercent}% 増加します。`;
    return "";
  }
}

// PLAYER CHARACTER CLASS
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 12;
    this.speed = 2.5;
    this.maxHp = 100;
    this.hp = 100;
    this.level = 1;
    this.exp = 0;
    this.nextLevelExp = 10;
    this.revivesRemaining = 3;
    this.reviveCount = 0;
    
    // Active weapons
    this.weapons = [new MagicWand()]; // Start with Magic Wand
    // Inactive inventory tracking for passives
    this.passives = [
      new PassiveItem("ホロウ・ハート", "❤️", "maxHp", 0.2, "最大HP増加"),
      new PassiveItem("プマローラ", "🥓", "regen", 0.5, "自動HP回復"),
      new PassiveItem("ホウレンソウ", "🥬", "damage", 0.1, "全攻撃力増加"),
      new PassiveItem("ウィング", "🪶", "speed", 0.08, "移動速度上昇"),
      new PassiveItem("アトラクターブ", "🧲", "magnet", 0.25, "回収範囲増加"),
      new PassiveItem("空白の書", "📖", "cooldown", -0.08, "攻撃のクールダウン減少"),
      new PassiveItem("ロウソク", "🕯️", "area", 0.1, "攻撃範囲・サイズ増加")
    ];

    // Relics and Shield
    this.relics = [];
    this.shield = 0;
    this.stationaryFrames = 0;
    this.lastX = x;
    this.lastY = y;

    // Core stats modifiable by passives
    const self = this;
    this.stats = {
      magnet: 60,
      baseDamageMultiplier: 1.0,
      get damageMultiplier() {
        let mult = this.baseDamageMultiplier;
        
        // Check "Blood Pact" Synergy (maxHp + damage)
        const hasHeart = self.passives.find(p => p.statName === 'maxHp').level > 0;
        const hasSpinach = self.passives.find(p => p.statName === 'damage').level > 0;
        const bloodPact = hasHeart && hasSpinach;
        
        const threshold = bloodPact ? 0.40 : 0.20;
        const buffMult = bloodPact ? 2.0 : 1.5;

        if (self.hp / self.maxHp < threshold && self.hp > 0) {
          mult *= buffMult;
        }

        // Relic: Iron Bulwark synergy (+25% damage when shield is active)
        if (self.relics && self.relics.includes('IronBulwark') && self.shield > 0) {
          mult *= 1.25;
        }
        
        // Relic: Neon Anchor synergy (up to +100% damage when standing still)
        if (self.relics && self.relics.includes('NeonAnchor') && self.stationaryFrames > 0) {
          const anchorSeconds = Math.min(5, self.stationaryFrames / 60);
          mult *= (1.0 + anchorSeconds * 0.20);
        }

        return mult;
      },
      set damageMultiplier(val) {
        this.baseDamageMultiplier = val;
      },
      hpRegen: 0.0,
      cooldownMultiplier: 1.0,
      areaMultiplier: 1.0
    };

    this.kills = 0;
    
    // For hit visual effect
    this.hitTimer = 0;
    this.regenTimer = 0;

    // References to spawn particles externally
    this.particlesRef = null;
    this.damageNumbersRef = null;
  }

  move(dx, dy, width, height) {
    if (dx === 0 && dy === 0) return;
    
    // Normalize movement vector for diagonals
    const length = Math.sqrt(dx * dx + dy * dy);
    this.x += (dx / length) * this.speed;
    this.y += (dy / length) * this.speed;

    // Clamp inside screen bounds
    this.x = Math.max(this.radius, Math.min(width - this.radius, this.x));
    this.y = Math.max(this.radius, Math.min(height - this.radius, this.y));
  }

  takeDamage(amount) {
    if (this.hp <= 0) return;
    
    // Relic: Iron Bulwark (generate shield on taking damage to prevent subsequent damage)
    if (this.relics && this.relics.includes('IronBulwark')) {
      if (this.shield <= 0) {
        this.shield = this.maxHp * 0.15;
      }
    }

    // Shield mitigation
    if (this.shield > 0) {
      if (this.shield >= amount) {
        this.shield -= amount;
        amount = 0;
      } else {
        amount -= this.shield;
        this.shield = 0;
      }
    }

    if (amount <= 0) {
      gameAudio.playHit();
      // Show blocked text
      if (this.damageNumbersRef) {
        this.damageNumbersRef.push(new DamageNumber(this.x, this.y - 20, "BLOCKED", false, '#00f0ff', 11));
      }
      return;
    }
    
    this.hp -= amount;
    this.hitTimer = 10; // flash white for 10 frames
    
    // Spawn damage sparks
    this.spawnParticles(this.x, this.y, '#ff007f', 0.8, 5);
    
    if (this.hp <= 0) {
      this.hp = 0;
      gameAudio.playDeath();
      this.spawnParticles(this.x, this.y, '#00f0ff', 1.8, 40); // huge death explosion
    } else {
      gameAudio.playHit();
    }
  }

  addExp(amount) {
    this.exp += amount;
    gameAudio.playCollect();
    
    // Sparkle effect at player
    this.spawnParticles(this.x, this.y, '#00f0ff', 0.4, 3);

    let leveledUp = false;
    while (this.exp >= this.nextLevelExp) {
      this.exp -= this.nextLevelExp;
      this.level++;
      const growth = (window.gameEngine && window.gameEngine.expGrowthRate !== undefined) ? window.gameEngine.expGrowthRate : 1.3;
      this.nextLevelExp = Math.round(this.nextLevelExp * growth + 12);
      leveledUp = true;
    }
    return leveledUp;
  }

  setWeaponLevel(weaponClassName, level) {
    const existingIndex = this.weapons.findIndex(w => w.constructor.name === weaponClassName);
    if (level === 0) {
      if (existingIndex !== -1) {
        this.weapons.splice(existingIndex, 1);
      }
    } else {
      if (existingIndex !== -1) {
        this.weapons[existingIndex].level = level;
      } else {
        let w;
        if (weaponClassName === 'MagicWand') w = new MagicWand();
        else if (weaponClassName === 'GarlicAura') w = new GarlicAura();
        else if (weaponClassName === 'SpinningScythe') w = new SpinningScythe();
        else if (weaponClassName === 'BigSword') w = new BigSword();
        else if (weaponClassName === 'ThunderWave') w = new ThunderWave();
        else if (weaponClassName === 'FireRoad') w = new FireRoad();
        
        if (w) {
          w.level = level;
          this.weapons.push(w);
        }
      }
    }
  }

  setPassiveLevel(passiveStatName, level) {
    const passive = this.passives.find(p => p.statName === passiveStatName);
    if (passive) {
      passive.level = level;
      this.recalculatePassiveStats();
    }
  }

  recalculatePassiveStats() {
    const oldMaxHp = this.maxHp;
    this.maxHp = 100;
    this.speed = 2.5;
    this.stats.magnet = 60;
    this.stats.damageMultiplier = 1.0;
    this.stats.hpRegen = 0.0;
    this.stats.cooldownMultiplier = 1.0;
    this.stats.areaMultiplier = 1.0;

    this.passives.forEach(p => {
      if (p.level > 0) {
        if (p.statName === 'maxHp') {
          this.maxHp = Math.round(100 * (1 + p.level * p.modifierPerLevel));
        } else if (p.statName === 'speed') {
          this.speed = 2.5 * (1 + p.level * p.modifierPerLevel);
        } else if (p.statName === 'magnet') {
          this.stats.magnet = 60 * (1 + p.level * p.modifierPerLevel);
        } else if (p.statName === 'damage') {
          this.stats.damageMultiplier = 1 + p.level * p.modifierPerLevel;
        } else if (p.statName === 'regen') {
          this.stats.hpRegen = p.level * p.modifierPerLevel;
        } else if (p.statName === 'cooldown') {
          this.stats.cooldownMultiplier = 1 + p.level * p.modifierPerLevel; // negative modifier, so 1 - 0.08 * level
        } else if (p.statName === 'area') {
          this.stats.areaMultiplier = 1 + p.level * p.modifierPerLevel;
        }
      }
    });

    if (this.maxHp !== oldMaxHp) {
      this.hp = Math.min(this.maxHp, Math.max(1, this.hp + (this.maxHp - oldMaxHp)));
    }
  }

  update(dt, enemies) {
    if (this.hitTimer > 0) this.hitTimer--;

    // Update stationary timer for Neon Anchor
    if (this.relics && this.relics.includes('NeonAnchor')) {
      if (this.lastX !== undefined && Math.abs(this.x - this.lastX) < 0.05 && Math.abs(this.y - this.lastY) < 0.05) {
        this.stationaryFrames++;
      } else {
        this.stationaryFrames = 0;
      }
      this.lastX = this.x;
      this.lastY = this.y;
    }

    // HP regeneration tick (every 1 second)
    if (this.stats.hpRegen > 0 && this.hp > 0 && this.hp < this.maxHp) {
      this.regenTimer += dt;
      if (this.regenTimer >= 1000) {
        this.regenTimer = 0;
        const oldHp = this.hp;
        this.hp = Math.min(this.maxHp, this.hp + this.stats.hpRegen);
        const actualHealed = this.hp - oldHp;
        
        // Relic: Iron Bulwark (generate shield on healing)
        if (this.relics && this.relics.includes('IronBulwark') && actualHealed > 0) {
          const maxShield = this.maxHp * 0.15;
          this.shield = Math.min(maxShield, this.shield + maxShield);
        }
        
        // Check "Melt Aura" Synergy (regen + area)
        const hasRegen = this.passives.find(p => p.statName === 'regen').level > 0;
        const hasArea = this.passives.find(p => p.statName === 'area').level > 0;
        if (hasRegen && hasArea && enemies) {
          this.triggerMeltAuraPulse(enemies);
        }
      }
    }
  }

  triggerMeltAuraPulse(enemies) {
    // Green pulse VFX
    const pulseCount = 16;
    for (let i = 0; i < pulseCount; i++) {
      const p = new Particle(this.x, this.y, '#39ff14', 1.5);
      if (this.particlesRef) this.particlesRef.push(p);
    }
    
    // Apply Melt debuff to nearby enemies
    const meltRadius = 150 * (this.stats.areaMultiplier || 1.0);
    enemies.forEach(enemy => {
      if (enemy.active) {
        const dist = getDistance(this.x, this.y, enemy.x, enemy.y);
        if (dist <= meltRadius) {
          enemy.meltTimer = 600; // 10 seconds of defense down (+30% damage)
        }
      }
    });
  }

  spawnParticles(x, y, color, speed, count) {
    if (this.particlesRef) {
      for (let i = 0; i < count; i++) {
        this.particlesRef.push(new Particle(x, y, color, speed));
      }
    }
  }

  draw(ctx) {
    ctx.save();
    
    // Garlic Aura representation (rendered behind player)
    const garlic = this.weapons.find(w => w instanceof GarlicAura);
    if (garlic) {
      garlic.drawAura(ctx, this);
    }
    
    // Draw spinning blades (also behind player)
    const scythe = this.weapons.find(w => w instanceof SpinningScythe);
    if (scythe) {
      scythe.drawBlades(ctx);
    }

    // Draw giant swords (also behind player)
    const sword = this.weapons.find(w => w instanceof BigSword);
    if (sword) {
      sword.drawSwords(ctx, this);
    }

    // Draw thunder waves (also behind player)
    const thunder = this.weapons.find(w => w instanceof ThunderWave);
    if (thunder) {
      thunder.drawWaves(ctx, this);
    }

    // Draw fire road trails (also behind player)
    const fire = this.weapons.find(w => w instanceof FireRoad);
    if (fire) {
      fire.drawFlames(ctx);
    }

    // Player Neon Organic Body
    ctx.translate(this.x, this.y);
    
    // White/Neon glow depending on hit state
    const coreColor = this.hitTimer > 0 ? '#ffffff' : '#00f0ff';
    const glowColor = this.hitTimer > 0 ? '#ff007f' : '#b026ff';
    const time = Date.now() / 1000;

    // Draw waving organic tendrils/tentacles radiating 360 degrees (behind body)
    const tendrilCount = 10;
    ctx.save();
    ctx.shadowBlur = 10;
    ctx.shadowColor = glowColor;
    ctx.strokeStyle = glowColor;
    ctx.lineWidth = 2.0; // slightly thinner for multiple tendrils
    for (let tIdx = 0; tIdx < tendrilCount; tIdx++) {
      // Radiating 360 degrees
      const startAngle = (tIdx / tendrilCount) * Math.PI * 2;
      const startR = this.radius * 0.8;
      const sx = Math.cos(startAngle) * startR;
      const sy = Math.sin(startAngle) * startR;

      ctx.beginPath();
      ctx.moveTo(sx, sy);
      
      const segmentCount = 6;
      const segLen = (this.radius * 1.2) / segmentCount; // slightly shorter to avoid overwhelming clutter
      for (let seg = 1; seg <= segmentCount; seg++) {
        const dist = startR + seg * segLen;
        const baseX = Math.cos(startAngle) * dist;
        const baseY = Math.sin(startAngle) * dist;

        // Waving sine wave offset (perpendicular to startAngle)
        const waveOffset = Math.sin(time * 8.5 - seg * 0.9 + tIdx * 2.2) * (this.radius * 0.2);
        const targetX = baseX + (-Math.sin(startAngle)) * waveOffset;
        const targetY = baseY + Math.cos(startAngle) * waveOffset;
        
        ctx.lineTo(targetX, targetY);
      }
      ctx.stroke();
    }
    ctx.restore();

    // Draw main organic wobbling body
    ctx.beginPath();
    const points = 36;
    const angleStep = (Math.PI * 2) / points;
    for (let i = 0; i <= points; i++) {
      const angle = i * angleStep;
      // Breathe/wobble radius formula
      const baseR = this.radius * 1.05;
      const wave1 = Math.sin(angle * 4 + time * 4.0) * (this.radius * 0.16);
      const wave2 = Math.cos(angle * 3 - time * 5.5) * (this.radius * 0.08);
      const r = baseR + wave1 + wave2;
      
      const px = Math.cos(angle) * r;
      const py = Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    
    ctx.strokeStyle = coreColor;
    ctx.lineWidth = 3;
    ctx.shadowBlur = 18;
    ctx.shadowColor = glowColor;
    ctx.stroke();
    
    // Semi-transparent organic fill
    ctx.fillStyle = 'rgba(6, 7, 13, 0.8)';
    ctx.fill();

    // Shifting amoeba-like central glowing core
    ctx.beginPath();
    const corePoints = 24;
    const coreStep = (Math.PI * 2) / corePoints;
    for (let i = 0; i <= corePoints; i++) {
      const angle = i * coreStep;
      const baseR = this.radius * 0.42;
      const wave = Math.sin(angle * 3 - time * 6.5) * (this.radius * 0.08);
      const r = baseR + wave;
      const px = Math.cos(angle) * r;
      const py = Math.sin(angle) * r + 2; // slightly offset downward
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = coreColor;
    ctx.shadowBlur = 12;
    ctx.shadowColor = coreColor;
    ctx.fill();

    ctx.restore();
  }
}

// ENEMY CLASS
class Enemy {
  constructor(x, y, type = 'spider', scaleMultiplier = 1.0, isElite = false) {
    this.id = Math.random().toString(36).substring(2, 9);
    this.x = x;
    this.y = y;
    this.type = type;
    this.isElite = isElite;
    this.slowTimer = 0;
    this.hitTimer = 0;
    this.burnTimer = 0; // Overload synergy
    this.meltTimer = 0; // Melt Aura synergy
    this.phantomTime = Math.random() * 100;
    this.isKnockedBack = false;
    this.knockbackTimer = 0;
    this.lastHitDamage = 0;
    
    // 20% chance to spawn with custom image for minor enemies (non-bosses)
    this.useImage = (type !== 'boss' && type !== 'boss2') && (Math.random() < 0.20) && !isElite;

    // Configure properties based on enemy type
    switch (type) {
      case 'spider':
        this.name = "スパイダー";
        this.radius = 8;
        this.speed = 1.6;
        this.maxHp = 10 * scaleMultiplier;
        this.damage = 8;
        this.color = '#39ff14'; // neon green
        this.expValue = 1;
        this.sides = 4; // diamond
        break;
      case 'bat':
        this.name = "コウモリ";
        this.radius = 7;
        this.speed = 2.3;
        this.maxHp = 7 * scaleMultiplier;
        this.damage = 6;
        this.color = '#ff3300'; // neon bright red/orange
        this.expValue = 1;
        this.sides = 3; // triangle pointing in direction
        break;
      case 'skeleton':
        this.name = "スケルトン";
        this.radius = 11;
        this.speed = 1.1;
        this.maxHp = 25 * scaleMultiplier;
        this.damage = 15;
        this.color = '#ff007f'; // neon pink
        this.expValue = 3;
        this.sides = 5; // pentagon
        break;
      case 'golem':
        this.name = "ゴーレム";
        this.radius = 21;
        this.speed = 0.45;
        this.maxHp = 140 * scaleMultiplier;
        this.damage = 30;
        this.color = '#0055ff'; // neon deep blue
        this.expValue = 15;
        this.sides = 4; // square
        break;
      case 'phantom':
        this.name = "ファントム";
        this.radius = 9;
        this.speed = 1.0;
        this.maxHp = 35 * scaleMultiplier;
        this.damage = 18;
        this.color = '#e0f0ff'; // neon light white/cyan
        this.expValue = 6;
        this.sides = 8; // octagon
        break;
      case 'slime':
        this.name = "スライム";
        this.radius = 13;
        this.speed = 0.85;
        this.maxHp = 45 * scaleMultiplier;
        this.damage = 12;
        this.color = '#bfff00'; // neon lime green
        this.expValue = 5;
        this.sides = 4; // cube
        break;
      case 'mini-slime':
        this.name = "ミニスライム";
        this.radius = 6;
        this.speed = 1.35;
        this.maxHp = 12 * scaleMultiplier;
        this.damage = 6;
        this.color = '#bfff00'; // neon lime green
        this.expValue = 1;
        this.sides = 4; // small cube
        break;
      case 'boss':
        this.name = "デストロイヤー (BOSS)";
        this.radius = 35;
        this.speed = 0.55;
        this.maxHp = 1000 * scaleMultiplier;
        this.damage = 45;
        this.color = '#fffb00'; // neon yellow
        this.expValue = 100;
        this.sides = 8; // octagon
        break;
      case 'boss2':
        this.name = "ネオ・ネメシス (BOSS v2)";
        this.radius = 55;
        this.speed = 0.75;
        this.maxHp = 3000 * scaleMultiplier;
        this.damage = 50;
        this.color = '#ff00ff'; // neon magenta
        this.expValue = 200;
        this.sides = 6; // hexagram/star
        this.bulletTimer = 0;
        this.chargeTimer = 0;
        this.chargeState = 'idle';
        this.chargeAlertFrames = 0;
        this.chargeDuration = 0;
        this.chargeDirection = { x: 0, y: 0 };
        break;
    }
    
    // Apply Elite Mutation buffs
    if (this.isElite) {
      this.name = "★" + this.name + " (ELITE)";
      this.radius *= 1.4;
      this.speed *= 1.25;
      this.maxHp *= 3.5;
      this.damage *= 1.5;
      this.color = '#ffe600'; // Neon Gold/Yellow for Elites
      this.expValue *= 5;
    }
    
    this.hp = this.maxHp;
    this.active = true;
  }

  takeDamage(amount, applyKnockback = false) {
    if (this.hp <= 0) return 0;

    // Relic: Prismatic Lens synergy
    if (window.gameEngine && window.gameEngine.player) {
      const player = window.gameEngine.player;
      if (player.relics && player.relics.includes('PrismaticLens') && (player.stats.areaMultiplier || 1.0) >= 1.30) {
        const dist = getDistance(player.x, player.y, this.x, this.y);
        const lensRadius = 150 * (player.stats.areaMultiplier || 1.0);
        if (dist <= lensRadius) {
          amount *= 1.15;
        }
      }
    }
    
    // Melt Aura synergy: +30% damage taken
    if (this.meltTimer > 0) {
      amount *= 1.30;
    }
    
    this.hp -= amount;
    this.hitTimer = 5; // flash white for 5 frames

    if (applyKnockback) {
      this.isKnockedBack = true;
      this.knockbackTimer = 15;
      this.lastHitDamage = amount;
    }
    
    if (this.hp <= 0) {
      this.hp = 0;
      this.active = false;
    }
    return amount;
  }

  getKnockbackMultiplier() {
    if (!window.gameEngine || !window.gameEngine.hellMode) {
      return 1.0;
    }
    const hellTimeSecs = (window.gameEngine.elapsedTime - window.gameEngine.hellModeStartTime) / 1000;
    return 0.8 * Math.exp(-hellTimeSecs * 0.02);
  }

  update(player, enemies, width = 900, height = 600) {
    if (this.hitTimer > 0) this.hitTimer--;
    
    if (this.slowTimer > 0) {
      this.slowTimer--;
    } else {
      this.slowRatio = null;
    }

    if (this.knockbackTimer > 0) {
      this.knockbackTimer--;
      if (this.knockbackTimer <= 0) {
        this.isKnockedBack = false;
      }
    }
    
    if (this.burnTimer > 0) {
      this.burnTimer--;
      // Deal small tick damage every 15 frames
      if (this.burnTimer % 15 === 0) {
        this.takeDamage(2); // 2 points of fire damage
        if (player.damageNumbersRef) {
          player.damageNumbersRef.push(new DamageNumber(this.x, this.y, 2, false, '#ff007f', 10));
        }
      }
      if (Math.random() < 0.15 && player.particlesRef) {
        player.spawnParticles(this.x, this.y, '#ff007f', 0.4, 1); // Red/pink fire sparks
      }
    }

    if (this.meltTimer > 0) {
      this.meltTimer--;
      if (Math.random() < 0.12 && player.particlesRef) {
        player.spawnParticles(this.x, this.y, '#39ff14', 0.3, 1); // Green acid sparks
      }
    }

    // Update animations timer
    if (this.animationTimer === undefined) this.animationTimer = Math.random() * 100;
    this.animationTimer += this.speed * 0.07;

    // Fixed DT estimation (16.6ms per frame)
    const dt = 16.6;

    this._updatePosition(player, enemies, dt);

    // Clamp inside screen bounds
    this.x = Math.max(this.radius, Math.min(width - this.radius, this.x));
    this.y = Math.max(this.radius, Math.min(height - this.radius, this.y));
  }

  _updatePosition(player, enemies, dt) {
    // Special Boss v2 attack behaviors
    if (this.type === 'boss2') {
      if (this.bulletTimer === undefined) {
        this.bulletTimer = 0;
        this.chargeTimer = 0;
        this.chargeState = 'idle';
        this.chargeAlertFrames = 0;
        this.chargeDuration = 0;
        this.chargeDirection = { x: 0, y: 0 };
      }

      // 1. Bullet ring attack (every 3.2s)
      this.bulletTimer += dt;
      if (this.bulletTimer >= 3200) {
        this.bulletTimer = 0;
        const count = 12;
        const bulletSpeed = 4.0;
        const bulletDamage = 18;
        for (let i = 0; i < count; i++) {
          const angle = (i / count) * Math.PI * 2;
          if (window.gameEngine && window.gameEngine.projectiles) {
            window.gameEngine.projectiles.push(new Projectile(
              this.x,
              this.y,
              angle,
              bulletSpeed,
              bulletDamage,
              4,
              '#ff00ff',
              1,
              true
            ));
          }
        }
        gameAudio.playShoot();
        if (window.gameEngine) window.gameEngine.triggerScreenShake(8, 4.0);
      }

      // 2. Speed Charge Attack (every 6s)
      this.chargeTimer += dt;
      if (this.chargeState === 'idle') {
        if (this.chargeTimer >= 6000) {
          this.chargeState = 'alert';
          this.chargeTimer = 0;
          this.chargeAlertFrames = 45; // 45 frames warning
        }
      } else if (this.chargeState === 'alert') {
        this.chargeAlertFrames--;
        this.hitTimer = 3; // flash alert
        if (this.chargeAlertFrames <= 0) {
          this.chargeState = 'charging';
          this.chargeDuration = 70; // charge duration
          const cDx = player.x - this.x;
          const cDy = player.y - this.y;
          const cLen = Math.sqrt(cDx * cDx + cDy * cDy);
          if (cLen > 0) {
            this.chargeDirection = { x: cDx / cLen, y: cDy / cLen };
          } else {
            this.chargeDirection = { x: 1, y: 0 };
          }
        }
      } else if (this.chargeState === 'charging') {
        this.chargeDuration--;
        const chargeSpeed = this.speed * 3.5;
        this.x += this.chargeDirection.x * chargeSpeed;
        this.y += this.chargeDirection.y * chargeSpeed;

        if (window.gameEngine && Math.random() < 0.45) {
          player.spawnParticles(this.x, this.y, '#ff00ff', 0.5, 2);
        }

        if (this.chargeDuration <= 0) {
          this.chargeState = 'idle';
          this.chargeTimer = 0;
        }
        return; // Skip normal pursuit/separation when charging!
      }
    }

    // Slow logic (from Level 5 Garlic)
    const currentSpeed = this.slowTimer > 0 ? this.speed * (this.slowRatio || 0.65) : this.speed;

    // Movement: Move towards player
    const dx = player.x - this.x;
    const dy = player.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    let moveX = 0;
    let moveY = 0;
    
    if (dist > 0) {
      moveX = (dx / dist) * currentSpeed;
      moveY = (dy / dist) * currentSpeed;

      if (this.type === 'phantom') {
        this.phantomTime += 0.07;
        // Perpendicular vector
        const perpX = -moveY;
        const perpY = moveX;
        moveX += perpX * Math.sin(this.phantomTime) * 1.4;
        moveY += perpY * Math.sin(this.phantomTime) * 1.4;
      }
    }

    // Separation: push away from neighboring enemies to prevent stacking
    let sepX = 0;
    let sepY = 0;
    let sepCount = 0;
    
    enemies.forEach(other => {
      if (other.id === this.id || !other.active) return;
      const d = getDistance(this.x, this.y, other.x, other.y);
      const minDist = this.radius + other.radius + 3; // buffer
      
      if (d < minDist && d > 0) {
        // push away
        sepX += (this.x - other.x) / d;
        sepY += (this.y - other.y) / d;
        sepCount++;

        // Relic: Tactical Coil synergy (Billiard effect)
        if (this.isKnockedBack && this.knockbackTimer > 0 && player.relics && player.relics.includes('TacticalCoil')) {
          const billiardDmg = Math.round(this.lastHitDamage * 0.8);
          if (billiardDmg > 0) {
            other.takeDamage(billiardDmg);
            if (player.damageNumbersRef) {
              player.damageNumbersRef.push(new DamageNumber(other.x, other.y, billiardDmg, false, '#00ffcc', 11));
            }
            player.spawnParticles(other.x, other.y, '#00ffcc', 0.8, 3);
            
            // Billiard transfer
            other.isKnockedBack = true;
            other.knockbackTimer = 10;
            other.lastHitDamage = billiardDmg;
            
            const pushForce = 8 * other.getKnockbackMultiplier();
            other.x += ((other.x - this.x) / d) * pushForce;
            other.y += ((other.y - this.y) / d) * pushForce;
          }
          this.isKnockedBack = false;
          this.knockbackTimer = 0;
        }
      }
    });

    if (sepCount > 0) {
      sepX /= sepCount;
      sepY /= sepCount;
      // blend pursuit movement with separation
      this.x += moveX * 0.85 + sepX * 0.35;
      this.y += moveY * 0.85 + sepY * 0.35;
    } else {
      this.x += moveX;
      this.y += moveY;
    }
  }

  draw(ctx) {
    ctx.save();
    
    // Shiver effect when hit
    let offsetX = 0;
    let offsetY = 0;
    if (this.hitTimer > 0) {
      offsetX = (Math.random() - 0.5) * 5;
      offsetY = (Math.random() - 0.5) * 5;
    }
    ctx.translate(this.x + offsetX, this.y + offsetY);

    // Elite Aura / Waves (Drawn in background behind the enemy body)
    if (this.isElite) {
      ctx.save();
      const time = Date.now() / 200;
      
      // 1. Spinning golden spikes/halo aura
      ctx.beginPath();
      const spikeCount = 12;
      for (let i = 0; i < spikeCount * 2; i++) {
        const angle = (i * Math.PI) / spikeCount + time * 0.12;
        const pulse = 1.0 + Math.sin(time + i) * 0.1;
        const r = i % 2 === 0 ? this.radius * 1.75 * pulse : this.radius * 1.25 * pulse;
        const px = Math.cos(angle) * r;
        const py = Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(255, 230, 0, 0.55)';
      ctx.lineWidth = 2.0;
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#ffe600';
      ctx.stroke();
      
      // 2. Outward expanding shockwaves (ripples)
      const waveCount = 2;
      for (let w = 0; w < waveCount; w++) {
        const progress = ((time * 0.35) + (w / waveCount)) % 1.0;
        const waveRadius = this.radius * (1.15 + progress * 0.95);
        const waveAlpha = (1 - progress) * 0.65;
        
        ctx.beginPath();
        ctx.arc(0, 0, waveRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 230, 0, ${waveAlpha})`;
        ctx.lineWidth = 1.8;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ffe600';
        ctx.stroke();
      }
      ctx.restore();
    }

    // Procedural Walking Animation: Squish, Stretch and Wobble
    if (this.animationTimer === undefined) this.animationTimer = Math.random() * 100;
    const wobble = Math.sin(this.animationTimer) * 0.15;
    ctx.rotate(wobble);
    
    const squash = 1 + Math.sin(this.animationTimer) * 0.08;
    const stretch = 1 - Math.sin(this.animationTimer) * 0.08;
    ctx.scale(squash, stretch);
    
    let strokeStyle = this.hitTimer > 0 ? '#ffffff' : this.color;
    if (this.type === 'boss2' && this.hitTimer <= 0) {
      const hue = (this.animationTimer * 20) % 360;
      strokeStyle = `hsl(${hue}, 100%, 50%)`;
      this.color = strokeStyle;
    }
    
    // Draw custom image for minor enemies if active, otherwise fallback to polygon shapes
    if (this.useImage && Enemy.huttyImg && Enemy.huttyImg.complete) {
      const size = this.radius * 2.5;
      
      // Draw neon shadow/glow for the image
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      
      ctx.drawImage(Enemy.huttyImg, -size / 2, -size / 2, size, size);
      
      // If hit, draw a white glowing border
      if (this.hitTimer > 0) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#ffffff';
        ctx.strokeRect(-size / 2, -size / 2, size, size);
      }
    } else {
      // Draw hexagram shape for BOSS v2, standard polygons for others
      if (this.type === 'boss2') {
        ctx.beginPath();
        // Triangle 1
        for (let i = 0; i < 3; i++) {
          const angle = -Math.PI / 2 + (i * Math.PI * 2 / 3);
          const px = Math.cos(angle) * this.radius;
          const py = Math.sin(angle) * this.radius;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = 4;
        ctx.shadowBlur = 20;
        ctx.shadowColor = strokeStyle;
        ctx.stroke();

        // Triangle 2 (Inverted)
        ctx.beginPath();
        for (let i = 0; i < 3; i++) {
          const angle = -Math.PI / 2 + (i * Math.PI * 2 / 3) + Math.PI;
          const px = Math.cos(angle) * this.radius;
          const py = Math.sin(angle) * this.radius;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      } else {
        ctx.beginPath();
        const angleStep = (Math.PI * 2) / this.sides;
        ctx.moveTo(0, -this.radius);
        
        for (let i = 1; i < this.sides; i++) {
          const angle = -Math.PI / 2 + i * angleStep;
          ctx.lineTo(Math.cos(angle) * this.radius, Math.sin(angle) * this.radius);
        }
        ctx.closePath();
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = this.type === 'boss' ? 4 : 2;
        ctx.shadowBlur = this.type === 'boss' ? 18 : 8;
        ctx.shadowColor = this.color;
        ctx.stroke();
      }

      // Dark semi-transparent fill
      ctx.fillStyle = 'rgba(6, 7, 13, 0.7)';
      ctx.fill();
    }

    // Draw health bar for boss or damaged elites
    if (this.hp < this.maxHp) {
      const barW = this.radius * 2;
      const barH = 3;
      const hpPercent = this.hp / this.maxHp;
      
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(-this.radius, -this.radius - 8, barW, barH);
      
      ctx.fillStyle = hpPercent > 0.4 ? '#39ff14' : '#ff007f';
      ctx.fillRect(-this.radius, -this.radius - 8, barW * hpPercent, barH);
    }

    ctx.restore();
  }
}

// Load image resource for minor enemies (20% chance spawn)
Enemy.huttyImg = new Image();
Enemy.huttyImg.src = 'img/hutty.png';
