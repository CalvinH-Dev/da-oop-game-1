class JellyFish extends MovableEntity {
	defaultDirection = "U";
	color = "green";
	hitbox = {
		offsetX: 15,
		offsetY: 15,
		width: 70,
		height: 70,
	};
	maxCollisionDamageCooldownInSec = 3;

	wasHit = false;
	hp = 35;
	maxHP = 35;
	hittable = true;

	isFriendly = false;

	constructor(position, color = "yellow", size, speed) {
		const imgSrc = `assets/used/enemies/jelly-fish/${color}/swim/1.png`;
		if (!size) {
			size = { width: 100, height: 100 };
		}

		if (!speed) {
			speed = { x: 150, y: 150 };
		}
		super(position, size, speed, imgSrc);
		this.direction = "U";
		this.color = color;
		this.applyColor();
		this.swim();
	}

	/** Applies the color by loading related images. */
	applyColor() {
		this.getColorImages();
	}

	/** Starts swimming animation. */
	swim() {
		this.animate("swim");
	}

	/**
	 * Moves the jellyfish up or down depending on direction.
	 * @param {number} dt - Delta time.
	 */
	move(dt) {
		if (this.direction === "U") {
			if (!this.moveUp(dt)) {
				this.direction = "D";
			}
		} else if (this.direction === "D") {
			if (!this.moveDown(dt)) {
				this.direction = "U";
			}
		}
	}

	/**
	 * Animates jellyfish with given animation name.
	 * @param {string} name - Animation name ("swim" or "dead").
	 */
	animate(name) {
		switch (name) {
			case "swim":
				super.animate("swim", this.swimImages);
				break;

			case "dead":
				super.animate("dead", this.deadImages);
				break;
		}
	}

	/** Gathers swim and dead images based on color. */
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

	/**
	 * Renders the jellyfish, flipped if direction differs from default.
	 * @param {CanvasRenderingContext2D} ctx - Canvas context.
	 * @param {boolean} showBox - Whether to show hitbox.
	 */
	render(ctx, showBox) {
		if (this.direction === this.defaultDirection) {
			super.render(ctx, showBox);
		} else {
			super.renderRotated(ctx, 180, showBox);
		}
	}

	/** Caches all swim and dead images for all colors. */
	cacheAllImages() {
		const colors = ["yellow", "purple", "green", "pink"];
		for (const color of colors) {
			this.cacheImages(ImageHub.getJellyFishSwimImages(color));
			this.cacheImages(ImageHub.getJellyFishDeadImages(color));
		}
	}

	/** Removes this jellyfish from the world enemies. */
	despawn() {
		this.world.enemies = this.world.enemies.filter((fish) => fish !== this);
	}

	/**
	 * Updates jellyfish status each frame.
	 * @param {number} ft - Frame time or delta time.
	 */
	update(ft) {
		this.collisionDamageCooldownInSec = Math.max(0, this.collisionDamageCooldownInSec - ft);
		if (this.hp <= 0) this.onDead(ft);

		this.move(ft);
	}

	/**
	 * Updates animation frame.
	 * @param {number} ft - Frame time.
	 */
	animationTick(ft) {
		if (!this.wasHit || this.dead) {
			this.imgRef = this.cachedImages[this.frames[this.animationState]];
		} else {
			const newColor = this.color === "yellow" ? "green" : "pink";
			this.imgRef =
				this.cachedImages[this.frames[this.animationState].replace(`${this.color}`, newColor)];

			this.wasHit = false;
		}
		this.animationState = (this.animationState + 1) % this.frames.length;
	}

	/**
	 * Handles death logic and animation.
	 * @param {number} ft - Frame time.
	 */
	onDead(ft) {
		this.dead = true;
		this.animate("dead");
		const canMoveUp = this.moveUp(ft);
		if (!canMoveUp) {
			SoundHub.play(SoundHub.fishLeaves);
			this.despawn();
		}
	}

	/**
	 * Applies damage to jellyfish.
	 * @param {number} damage - Damage amount.
	 */
	onGettingHit(damage) {
		if (this.dead) return;
		this.wasHit = true;
		if (Number(damage)) {
			this.hp -= damage;
		}
	}

	/**
	 * Effect when colliding with another object.
	 * @param {object} obj - The other object collided with.
	 */
	effectOnCollision(obj) {
		if (this.dead || obj.isFriendly == this.isFriendly || this.collisionDamageCooldownInSec !== 0) {
			return;
		}

		if (this.color === "purple") {
			obj.onGettingHit(COLLISION_DAMAGE);
		} else {
			if (!obj.statuses.includes("electrified")) {
				obj.statuses.push("electrified");
			}
			obj.onGettingHit(COLLISION_DAMAGE);
		}
		this.collisionDamageCooldownInSec = this.maxCollisionDamageCooldownInSec;
	}
}
