class PufferFish extends MovableEntity {
	defaultDirection = "L";
	color = "green";
	hitbox = {
		offsetX: 5,
		offsetY: 5,
		width: 40,
		height: 30,
	};
	maxCollisionDamageCooldownInSec = 2;
	originalSize = { width: 0, height: 0 };
	originalHitbox = {
		offsetX: 5,
		offsetY: 5,
		width: 40,
		height: 30,
	};

	wasHit = false;
	hp = 20;
	maxHP = 20;
	hittable = true;

	isFriendly = false;

	constructor(position, color = "green", size, speed) {
		const imgSrc = `assets/used/enemies/puffer-fish/${color}/swim/1.png`;
		if (!size) {
			size = { width: 50, height: 50 };
		}

		if (!speed) {
			speed = { x: 100, y: 100 };
		}
		super(position, size, speed, imgSrc);
		this.originalSize.width = this.width;
		this.originalSize.height = this.height;
		this.direction = "L";
		this.color = color;

		this.applyColor();
		this.swim();
	}

	/**
	 * Starts size change animation with options.
	 * @param {object} options - Options for size change.
	 * @param {number} [options.minSize=1] - Minimum scale multiplier.
	 * @param {number} [options.maxSize=2.5] - Maximum scale multiplier.
	 * @param {number} [options.changeRatio=0.1] - Ratio of size change per interval.
	 */
	changeSize(options = {}) {
		const { minSize = 1, maxSize = 2.5, changeRatio = 0.1 } = options;
		let multiplier = 1 + changeRatio;
		let applied = 1;
		this._resetSizes();
		this.changeSizeInterval = setInterval(() => {
			this._changeSizes(multiplier);
			applied *= multiplier;
			CalcFunctions.checkCollision(this, this.x, this.y);
			if (applied <= minSize) {
				multiplier += 2 * changeRatio;
			}
			if (applied >= maxSize) {
				multiplier -= 2 * changeRatio;
			}
		}, ANIMATION_INTERVAL * 2 + Math.random() * 25 * 10);
	}

	/**
	 * Multiplies current sizes by given multiplier.
	 * @param {number} multiplier - Scale multiplier.
	 */
	_changeSizes(multiplier) {
		this.hitbox.width *= multiplier;
		this.hitbox.height *= multiplier;
		this.height *= multiplier;
		this.width *= multiplier;
	}

	/** Resets sizes and hitbox to original values. */
	_resetSizes() {
		this.hitbox = { ...this.originalHitbox };
		this.height = this.originalSize.height;
		this.width = this.originalSize.width;
	}

	/** Applies color by loading color-specific images. */
	applyColor() {
		this.getColorImages();
	}

	/** Starts swimming animation. */
	swim() {
		this.animate("swim");
	}

	/**
	 * Animates with given animation name.
	 * @param {string} name - Animation name ("swim" or "dead").
	 */
	animate(name) {
		switch (name) {
			case "swim":
				super.animate("swim", this.swimImages);
				break;

			case "dead":
				super.animate("dead", this.deadImages);
		}
	}

	/**
	 * Renders the pufferfish, flipped if direction is not left/up/down.
	 * @param {CanvasRenderingContext2D} ctx - Canvas context.
	 * @param {boolean} showBox - Whether to show hitbox.
	 */
	render(ctx, showBox) {
		if (
			this.direction === this.defaultDirection ||
			this.direction === "U" ||
			this.direction === "D"
		) {
			super.render(ctx, showBox);
		} else {
			super.renderFlipped(ctx, showBox);
		}
	}

	/** Loads swim and dead images based on color. */
	getColorImages() {
		const keys = Object.keys(this.cachedImages);
		let images = [];
		let deadImages = [];

		for (const key of keys) {
			if (key.includes(`${this.color}/swim`)) {
				images.push(key);
			} else if (key.includes(`${this.color}/dead`)) {
				deadImages.push(key);
			}
		}

		this.swimImages = images;
		this.deadImages = deadImages;
	}

	/** Caches all swim and dead images for colors. */
	cacheAllImages() {
		const colors = ["red", "orange", "green"];
		for (const color of colors) {
			const images = ImageHub.getPufferFishSwimImages(color);
			this.swimImages = images;
			this.cacheImages(images);
			const deadImages = ImageHub.getPufferFishDeadImages(color);
			this.cacheImages(deadImages);
		}
	}

	/** Removes this pufferfish from the world and clears size change interval. */
	despawn() {
		this.world.enemies = this.world.enemies.filter((fish) => fish !== this);
		clearInterval(this.changeSizeInterval);
	}

	/**
	 * Updates pufferfish state each frame.
	 * @param {number} ft - Frame time or delta time.
	 */
	update(ft) {
		this.collisionDamageCooldownInSec = Math.max(0, this.collisionDamageCooldownInSec - ft);

		if (this.hp <= 0) return this.onDead(ft);

		if (!this.changeSizeInterval) {
			this.changeSize();
		}

		this._moveUpdate(ft);
	}

	/**
	 * Handles movement update and target setting.
	 * @param {number} ft - Frame time.
	 */
	_moveUpdate(ft) {
		if (!this.target) {
			const maxX = BOARD_WIDTH * 3 - this.hitbox.width;
			const maxY = BOARD_HEIGHT - this.hitbox.height;
			this.setRandomTarget(0, maxX, maxY);
		}
		if (this.target.x >= this.x) {
			this.direction = "R";
		} else {
			this.direction = "L";
		}

		this.moveToTarget(ft);
	}

	/**
	 * Effect on collision with another object.
	 * @param {object} obj - The other object collided with.
	 */
	effectOnCollision(obj) {
		if (this.dead || obj.isFriendly == this.isFriendly || this.collisionDamageCooldownInSec !== 0) {
			return;
		}

		if (this.color === "orange") {
			obj.onGettingHit(COLLISION_DAMAGE * 2);
		} else {
			if (!obj.statuses.includes("poisoned")) {
				obj.statuses.push("poisoned");
			}
			obj.poisonDoT.applied = new Date().getTime() / 1000;
			obj.onGettingHit(COLLISION_DAMAGE);
		}
		this.collisionDamageCooldownInSec = this.maxCollisionDamageCooldownInSec;
	}

	/**
	 * Updates animation frame.
	 * @param {number} ft - Frame time.
	 */
	animationTick(ft) {
		if (!this.wasHit) {
			this.imgRef = this.cachedImages[this.frames[this.animationState]];
		} else {
			this.imgRef =
				this.cachedImages[this.frames[this.animationState].replace(`${this.color}`, "red")];

			this.wasHit = false;
		}
		this.animationState = (this.animationState + 1) % this.frames.length;
	}

	/**
	 * Handles death animation and cleanup.
	 * @param {number} ft - Frame time.
	 */
	onDead(ft) {
		this.dead = true;
		clearInterval(this.changeSizeInterval);
		this.width = this.originalSize.width;
		this.height = this.originalSize.height;
		this.animate("dead");
		const canMoveUp = this.moveUp(ft);
		if (!canMoveUp) {
			SoundHub.play(SoundHub.fishLeaves);
			this.despawn();
		}
	}

	/**
	 * Applies damage to the pufferfish.
	 * @param {number} damage - Damage amount.
	 */
	onGettingHit(damage) {
		if (this.dead) return;
		this.wasHit = true;
		if (Number(damage)) {
			this.hp -= damage;
		}
	}
}
