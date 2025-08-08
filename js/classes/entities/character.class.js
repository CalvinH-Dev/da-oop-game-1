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

	/** Plays the default idle animation. */
	defaultAnimation() {
		this.idle();
	}

	/** Plays the swim animation. */
	swim() {
		this.animate("swim");
	}

	/** Plays the idle animation. */
	idle() {
		this.animate("idle");
	}

	/** Plays the long idle animation. */
	longIdle() {
		this.animate("longIdle");
	}

	/** Plays the bubble animation, making the character immune while animation plays. */
	bubble() {
		this.immune = true;
		if (this.poison >= 20) {
			this.world.keyboard.enabled = false;
			this.animate("bubble");
		}
	}

	/** Plays the fin slap animation, making the character immune while animation plays. */
	finAttack() {
		this.finDirection = this.direction === "L" ? "L" : "R";
		this.immune = true;
		this.animate("fin");
	}

	/** Repeats the long idle animation if the count condition is met. */
	repeatLongIdle() {
		if (this.animationCount >= 1) {
			this.animate("repeatLongIdle");
		}
	}

	/**
	 * Calculates the attack position based on height and direction.
	 * @param {number} height - Height of the attack hitbox.
	 * @returns {{x: number, y: number}} - Coordinates for the attack.
	 */
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

	/**
	 * Calculates the attack position based on height and direction.
	 * @param {number} height - Height of the attack hitbox.
	 * @returns {{x: number, y: number}} - Coordinates for the attack.
	 */
	attackPositionFin(height) {
		const hitboxX = this.x + this.hitbox.offsetX;
		const hitboxY = this.y + this.hitbox.offsetY;
		if (this.finDirection === "L") {
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

	/** Shoots a bubble projectile and decreases poison level. */
	shootBubble() {
		const shootDirection = this.direction === "L" ? "L" : "R";
		const bubbleProj = new Bubble(this, this.attackPosition(50), shootDirection);
		bubbleProj.world = this.world;
		this.world.projectiles.push(bubbleProj);
		this.world.keyboard.enabled = true;
		this.poison -= 20;
		this.idle();
	}

	/** Performs a fin attack, checks for enemy collision and plays sounds accordingly. */
	attackWithFin() {
		const attackCoords = this.attackPositionFin(this.hitbox.height);
		const aBox = { x: attackCoords.x, y: attackCoords.y, width: 75, height: this.hitbox.height };
		const collided = this.checkFinHitEnemy(aBox);

		if (!collided) SoundHub.play(SoundHub.charFinSlapMiss);
		else SoundHub.play(SoundHub.charFinSlap);

		this.world.keyboard.enabled = true;
		this.idle();
	}

	/**
	 * Checks if fin attack hit any enemies.
	 * @param {{x: number, y: number, width: number, height: number}} aBox - Attack hitbox.
	 * @returns {boolean} - True if any enemy was hit.
	 */
	checkFinHitEnemy(aBox) {
		let collided = false;

		for (const enemy of this.world.enemies) {
			const bBox = enemy.getHitbox();
			const colliding = CalcFunctions.hitboxesColliding(aBox, bBox);

			if (colliding) {
				collided = true;
				enemy.onGettingHit(COLLISION_DAMAGE);
			}
		}
		return collided;
	}

	/** Placeholder for idle time tracking. */
	trackIdleTime() {}

	/** Moves character right and plays swim animation. */
	moveRight(dt) {
		super.moveRight(dt);
		this.swim();
	}

	/** Moves character left and plays swim animation. */
	moveLeft(dt) {
		super.moveLeft(dt);
		this.swim();
	}

	/** Moves character down and plays swim animation. */
	moveDown(dt) {
		super.moveDown(dt);
		this.swim();
	}

	/** Moves character up and plays swim animation. */
	moveUp(dt) {
		super.moveUp(dt);
		this.swim();
	}

	/**
	 * Handles animations when the character is locked.
	 * @param {string} name - Animation name.
	 */
	_animationsWhenLocked(name) {
		if (name === "electrified") {
			this.animationLocked = true;
			this.world.keyboard.enabled = false;
			super.animate("electrified", ImageHub.getCharacterElectrifiedImages());
			return;
		}
	}

	/**
	 * Animates status effects.
	 * @param {string} name - Status name.
	 */
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

	/**
	 * Animates attack actions.
	 * @param {string} name - Attack name.
	 */
	_animateAttacks(name) {
		if (name === "bubble") {
			this.animationLocked = true;
			this.world.keyboard.enabled = false;
			super.animate("bubble", ImageHub.getCharacterBubbleImages());
		} else if (name === "fin") {
			this.animationLocked = true;
			this.willAttackWithFin = true;
			super.animate("fin", ImageHub.getCharacterFinImages());
		}
	}

	/**
	 * Animates movement actions.
	 * @param {string} name - Movement name.
	 */
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

	/**
	 * Controls animation flow based on lock state and animation name.
	 * @param {string} name - Animation name.
	 */
	animate(name) {
		if (this.animationLocked) {
			return this._animationsWhenLocked(name);
		}

		if (this.snoreInterval) clearInterval(this.snoreInterval);

		this._animateMovements(name);
		this._animateAttacks(name);
		this._animateStatuses(name);
	}

	/**
	 * Renders the character on the canvas context, optionally showing the hitbox.
	 * Flips rendering based on direction and current animation.
	 *
	 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
	 * @param {boolean} showBox - Whether to show the hitbox.
	 * @returns {void}
	 */
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

	/** Caches all character related images to improve performance. */
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

	/**
	 * Updates character state every frame.
	 * Handles death and poison status effects.
	 *
	 * @param {number} ft - Frame time or delta time.
	 */
	update(ft) {
		if (this.hp <= 0) this.dead = true;
		if (this.statuses.includes("poisoned")) {
			this.onPoisoned();
		}
	}

	/** Handles poison damage over time and status removal. */
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

	/** Advances the animation by one frame and handles animation end events. */
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

	/** Logic executed when the current animation finishes. */
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

	/** Handles the character death sequence including animation and sounds. */
	onDead() {
		this.animationLocked = false;
		this.animate("dead");
		this._onDeadSound();
		this._onDeadAnimation();

		setTimeout(() => {
			gameFinished(false);
		}, 4000);
	}

	/** Plays death-related sounds with a delay between them. */
	_onDeadSound() {
		SoundHub.play(SoundHub.charDeath);
		setTimeout(() => {
			SoundHub.play(SoundHub.charDeathBell);
		}, 1500);
	}

	/** Runs the death animation with timed intervals until it finishes. */
	_onDeadAnimation() {
		const deadInterval = setInterval(() => {
			this.animationTick(ANIMATION_IN_SEC);
			this.world.render();
			if (this.animationState == 0) {
				clearInterval(deadInterval);
			}
		}, ANIMATION_IN_SEC * 1000);
	}

	/**
	 * Called when the character gets hit by damage.
	 * Applies damage, checks immunity and plays hit animations and sounds.
	 *
	 * @param {number} damage - Amount of damage received.
	 */
	onGettingHit(damage) {
		if (this.immune) return;
		if (Number(damage)) {
			this.hp = Math.max(0, this.hp - damage);
		}

		if (this.statuses.includes("electrified")) {
			SoundHub.play(SoundHub.jellyElectrified);
			return this.animate("electrified");
		}

		SoundHub.play(SoundHub.charGettingHit);
		this.animate("hurt");
	}

	/**
	 * Heals the character by a given amount up to maxHP.
	 *
	 * @param {number} amount - The amount to heal.
	 */
	heal(amount) {
		if (Number(amount)) {
			this.hp = Math.min(this.maxHP, this.hp + amount);
		}
	}
}
