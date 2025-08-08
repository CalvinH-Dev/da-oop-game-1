class Character extends MovableEntity {
	defaultDirection = "R";
	hitbox = {
		offsetX: 40,
		offsetY: 100,
		width: 90,
		height: 50,
	};
	willAttackWithFin = false;
	immune = false;

	isFriendly = true;
	maxHP = 100;
	hp = 100;
	finDirection = "R";

	poisonDoT = {
		lastTick: 0,
		applied: 0,
	};
	poison = 20;
	coins = 0;
	snoreInterval;

	constructor(position, size, speed) {
		const scale = 1;
		const imgSrc = "assets/used/character/idle/1.png";
		if (!size) {
			size = { width: 163 * scale, height: 200 * scale };
		}

		if (!speed) {
			speed = { x: 600, y: 200 };
		}
		super(position, size, speed, imgSrc);
		this.direction = "R";
		this.collision = true;
	}

	defaultAnimation() {
		this.idle();
	}

	swim() {
		this.animate("swim");
	}

	idle() {
		this.animate("idle");
	}

	longIdle() {
		this.animate("longIdle");
	}

	bubble() {
		this.immune = true;
		if (this.poison >= 20) {
			this.world.keyboard.enabled = false;
			this.animate("bubble");
		}
	}

	finAttack() {
		this.immune = true;
		this.animate("fin");
	}

	repeatLongIdle() {
		if (this.animationCount >= 1) {
			this.animate("repeatLongIdle");
		}
	}

	attackPosition(height) {
		const hitboxX = this.x + this.hitbox.offsetX;
		const hitboxY = this.y + this.hitbox.offsetY;
		if (this.direction === "L") {
			return {
				x: hitboxX - this.hitbox.width / 2,
				y: hitboxY + this.hitbox.height / 2 + (-1 * height) / 2,
			};
		} else {
			return {
				x: hitboxX + this.hitbox.width,
				y: hitboxY + this.hitbox.height / 2 + (-1 * height) / 2,
			};
		}
	}

	shootBubble() {
		const shootDirection = this.direction === "L" ? "L" : "R";
		const bubbleProj = new Bubble(this, this.attackPosition(50), shootDirection);
		bubbleProj.world = this.world;
		this.world.projectiles.push(bubbleProj);
		this.world.keyboard.enabled = true;
		this.poison -= 20;
		this.idle();
	}

	attackWithFin() {
		this.finDirection = this.direction === "L" ? "L" : "R";
		const attackCoords = this.attackPosition(this.hitbox.height);

		const aBox = { x: attackCoords.x, y: attackCoords.y, width: 60, height: this.hitbox.height };
		const collided = this.checkFinHitEnemy(aBox);

		if (!collided) SoundHub.play(SoundHub.charFinSlapMiss);

		this.world.keyboard.enabled = true;
		this.idle();
	}

	checkFinHitEnemy(aBox) {
		let collided = false;

		for (const enemy of this.world.enemies) {
			const bBox = enemy.getHitbox();

			const colliding = CalcFunctions.hitboxesColliding(aBox, bBox);

			if (colliding) {
				collided = true;
				SoundHub.play(SoundHub.charFinSlap);
				enemy.onGettingHit(COLLISION_DAMAGE);
			}
		}
		return collided;
	}

	trackIdleTime() {}

	moveRight(dt) {
		super.moveRight(dt);
		this.swim();
	}

	moveLeft(dt) {
		super.moveLeft(dt);

		this.swim();
	}

	moveDown(dt) {
		super.moveDown(dt);
		this.swim();
	}

	moveUp(dt) {
		super.moveUp(dt);
		this.swim();
	}

	_animationsWhenLocked(name) {
		if (name === "electrified") {
			this.animationLocked = true;
			this.world.keyboard.enabled = false;
			super.animate("electrified", ImageHub.getCharacterElectrifiedImages());
			return;
		}
	}

	_animateStatuses(name) {
		if (name === "poisoned") {
			this.animationLocked = true;
			super.animate("poisoned", ImageHub.getCharacterPoisonedImages());
		} else if (name === "electrified") {
			this.animationLocked = true;
			this.world.keyboard.enabled = false;
			super.animate("electrified", ImageHub.getCharacterElectrifiedImages());
		} else if (name === "hurt") {
			this.animationLocked = true;
			super.animate("hurt", ImageHub.getCharacterIsHurtImages());
		} else if (name === "dead") {
			this.animationLocked = true;
			super.animate("dead", ImageHub.getCharacterIsDeadImages());
		}
	}

	_animateAttacks(name) {
		if (name === "bubble") {
			this.animationLocked = true;

			this.world.keyboard.enabled = false;
			super.animate("bubble", ImageHub.getCharacterBubbleImages());
		} else if (name === "fin") {
			this.animationLocked = true;

			// this.world.keyboard.enabled = false;
			this.willAttackWithFin = true;
			super.animate("fin", ImageHub.getCharacterFinImages());
		}
	}

	_animateMovements(name) {
		if (name === "idle") {
			super.animate("idle", ImageHub.getCharacterIdleImages());
		} else if (name === "swim") {
			super.animate("swim", ImageHub.getCharacterSwimImages());
		} else if (name === "longIdle") {
			this.snoreInterval = setInterval(() => {
				SoundHub.play(SoundHub.charSnore);
			}, 2000);
			super.animate("longIdle", ImageHub.getCharacterLongIdleImages());
		}
	}

	animate(name) {
		if (this.animationLocked) {
			return this._animationsWhenLocked(name);
		}

		if (this.snoreInterval) clearInterval(this.snoreInterval);

		this._animateMovements(name);

		this._animateAttacks(name);

		this._animateStatuses(name);
	}

	render(ctx, showBox) {
		if (this.currentAnimation === "fin") {
			if (this.finDirection === "R") {
				return super.render(ctx, showBox);
			} else {
				return super.renderFlipped(ctx, showBox);
			}
		}

		if (
			this.direction === this.defaultDirection ||
			this.direction === "U" ||
			this.direction === "D"
		) {
			return super.render(ctx, showBox);
		} else {
			return super.renderFlipped(ctx, showBox);
		}
	}

	cacheAllImages() {
		super.cacheImages(ImageHub.getCharacterSwimImages());
		super.cacheImages(ImageHub.getCharacterIdleImages());
		super.cacheImages(ImageHub.getCharacterLongIdleImages());
		super.cacheImages(ImageHub.getCharacterLongIdleRepeatImages());
		super.cacheImages(ImageHub.getCharacterBubbleImages());
		super.cacheImages(ImageHub.getCharacterFinImages());
		super.cacheImages(ImageHub.getCharacterPoisonedImages());
		super.cacheImages(ImageHub.getCharacterIsHurtImages());
		super.cacheImages(ImageHub.getCharacterIsDeadImages());
		super.cacheImages(ImageHub.getCharacterElectrifiedImages());
	}

	update(ft) {
		if (this.hp <= 0) this.dead = true;
		if (this.statuses.includes("poisoned")) {
			this.onPoisoned();
		}
	}

	onPoisoned() {
		const now = new Date().getTime() / 1000;
		if (now - this.poisonDoT.lastTick >= POISON_TICK_TIME_IN_SEC) {
			this.hp -= COLLISION_DAMAGE;
			this.poisonDoT.lastTick = now;
			this.animate("poisoned");
		}

		if (now - this.poisonDoT.applied >= POISON_TICK_TIME_IN_SEC * 2) {
			this.statuses = this.statuses.filter((status) => status != "poisoned");
		}
	}

	animationTick(ft) {
		this.imgRef = this.cachedImages[this.frames[this.animationState]];
		this.animationState = (this.animationState + 1) % this.frames.length;

		if (this.animationState === 0) {
			this._endOfCurrentAnimation();
			this.animationLocked = false;
			this.world.keyboard.enabled = true;
			this.willAttackWithFin = false;
			this.immune = false;
		}
	}

	_endOfCurrentAnimation() {
		if (this.currentAnimation === "bubble") {
			this.shootBubble();
		} else if (this.currentAnimation === "fin" || this.willAttackWithFin) {
			this.attackWithFin();
		} else if (this.currentAnimation === "hurt") {
			this.idle();
		} else if (this.currentAnimation === "swim") {
			SoundHub.play(SoundHub.charSwim);
		} else if (this.currentAnimation === "poisoned") {
			this.idle();
		} else if (this.currentAnimation === "electrified") {
			this.statuses = this.statuses.filter((status) => status != "electrified");
			this.idle();
		} else if (this.currentAnimation === "idle" && this.animationCount > 1) {
			this.longIdle();
		} else if (this.currentAnimation === "longIdle") {
			this.animationState = this.frames.length - 1;
		} else {
			this.animationCount++;
		}
	}

	onDead() {
		this.animationLocked = false;
		this.animate("dead");
		this._onDeadSound();

		this._onDeadAnimation();
		setTimeout(() => {
			gameFinished(false);
		}, 4000);
	}

	_onDeadSound() {
		SoundHub.play(SoundHub.charDeath);
		setTimeout(() => {
			SoundHub.play(SoundHub.charDeathBell);
		}, 1500);
	}

	_onDeadAnimation() {
		const deadInterval = setInterval(() => {
			this.animationTick(ANIMATION_IN_SEC);
			this.world.render();
			if (this.animationState == 0) {
				clearInterval(deadInterval);
			}
		}, ANIMATION_IN_SEC * 1000);
	}

	onGettingHit(damage) {
		if (this.immune) return;
		if (Number(damage)) {
			this.hp = Math.max(0, this.hp - damage);
		}

		SoundHub.play(SoundHub.charGettingHit);

		if (this.statuses.includes("electrified")) {
			return this.animate("electrified");
		}

		this.animate("hurt");
		this.animationLocked = true;
	}

	heal(amount) {
		if (Number(amount)) {
			this.hp = Math.min(this.maxHP, this.hp + amount);
		}
	}
}
