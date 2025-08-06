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
		const imgSrc = `/assets/used/enemies/jelly-fish/${color}/swim/1.png`;
		if (!size) {
			size = { width: 100, height: 100 };
		}

		if (!speed) {
			speed = { x: 150, y: 150 };
		}
		super(position, size, speed, imgSrc);
		this.direction = "U";
		this.color = color;
		// this.collision = true;
		this.applyColor();
		this.swim();
	}

	applyColor() {
		this.getColorImages();
	}

	swim() {
		this.animate("swim");
	}

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

	render(ctx, showBox) {
		if (this.direction === this.defaultDirection) {
			super.render(ctx, showBox);
		} else {
			super.renderRotated(ctx, 180, showBox);
		}
	}

	cacheAllImages() {
		const colors = ["yellow", "purple", "green", "pink"];
		for (const color of colors) {
			const images = ImageHub.getJellyFishSwimImages(color);
			this.swimImages = images;
			this.cacheImages(images);
			const deadImages = ImageHub.getJellyFishDeadImages(color);
			this.cacheImages(deadImages);
		}
	}

	despawn() {
		this.world.enemies = this.world.enemies.filter((fish) => fish !== this);
		clearInterval(this.currentMovementInterval);
		clearInterval(this.changeSizeInterval);
	}

	update(ft) {
		this.collisionDamageCooldownInSec = Math.max(0, this.collisionDamageCooldownInSec - ft);
		if (this.hp <= 0) this.onDead(ft);
		if (this.currentMovementInterval) return;

		this.move(ft);
	}

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

	onDead(ft) {
		this.dead = true;
		this.animate("dead");
		const canMoveUp = this.moveUp(ft);
		if (!canMoveUp) {
			SoundHub.play(SoundHub.fishLeaves);
			this.despawn();
		}
	}

	onGettingHit(damage) {
		if (this.dead) return;
		this.wasHit = true;
		if (Number(damage)) {
			this.hp -= damage;
		}
	}

	effectOnCollision(obj) {
		if (this.dead) return;
		if (obj.isFriendly == this.isFriendly) return;

		if (this.collisionDamageCooldownInSec === 0) {
			if (this.color === "purple") {
				obj.onGettingHit(COLLISION_DAMAGE);
			} else {
				if (!obj.statuses.includes("electrified")) {
					SoundHub.play(SoundHub.jellyElectrified);
					obj.statuses.push("electrified");
				}
				obj.onGettingHit(COLLISION_DAMAGE);
			}
			this.collisionDamageCooldownInSec = this.maxCollisionDamageCooldownInSec;
		}
	}
}
