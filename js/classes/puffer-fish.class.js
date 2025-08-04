class PufferFish extends MoveableEntity {
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

	wasHit = false;
	hp = 20;
	maxHP = 20;

	isFriendly = false;

	constructor(position, color = "green", size, speed) {
		const imgSrc = `/assets/used/enemies/puffer-fish/${color}/swim/1.png`;
		if (!size) {
			size = { width: 50, height: 50 };
		}

		if (!speed) {
			speed = { x: 250, y: 250 };
		}
		super(position, size, speed, imgSrc);
		this.originalSize.width = this.width;
		this.originalSize.height = this.height;
		this.direction = "L";
		this.color = color;
		// this.collision = true;
		this.applyColor();
		this.swim();

		this.changeSize();
	}

	defaultAnimation() {}

	applyColor() {
		this.getColorImages();
	}

	swim() {
		this.animate("swim");
	}

	moveRandom(ft) {
		const number = Math.floor(Math.random() * 7);
		if (number === 0) {
			this.moveRight(ft);
		} else if (number >= 1 && number < 5) {
			this.moveLeft(ft);
		} else if (number === 5) {
			this.moveUp(ft);
		} else {
			this.moveDown(ft);
		}
	}

	animate(name) {
		switch (name) {
			case "swim":
				super.animate("swim", this.swimImages);
				break;

			case "dead":
				super.animate("dead", this.deadImages);
		}
	}

	render(ctx, showBox) {
		if (
			this.direction === this.defaultDirection ||
			this.direction === "U" ||
			this.direction === "D"
		) {
			super.render(ctx, showBox);
		} else {
			super.render(ctx, showBox);
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

	despawn() {
		this.world.enemies = this.world.enemies.filter((fish) => fish !== this);
		clearInterval(this.currentMovementInterval);
		clearInterval(this.changeSizeInterval);
	}

	update(ft) {
		this.collisionDamageCooldownInSec = Math.max(0, this.collisionDamageCooldownInSec - ft);
		if (this.hp <= 0) this.onDead(ft);
		if (this.currentMovementInterval) return;
		this.currentMovementInterval = setInterval(() => {
			this.moveRandom(ft);
		}, PUFFERFISH_MOVEMENT_INTERVAL);
	}

	effectOnCollision(obj) {
		if (this.dead) {
			return;
		}
		if (obj.isFriendly == this.isFriendly) return;

		if (this.collisionDamageCooldownInSec === 0) {
			if (this.color === "orange") {
				obj.onGettingHit(15);
			} else {
				if (!obj.statuses.includes("poisoned")) {
					obj.statuses.push("poisoned");
				}
				obj.poison.applied = new Date().getTime() / 1000;
				obj.onGettingHit(POISON_TICK_DAMAGE);
			}
			this.collisionDamageCooldownInSec = this.maxCollisionDamageCooldownInSec;
		}
	}

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

	onDead(ft) {
		this.dead = true;
		clearInterval(this.changeSizeInterval);
		this.width = this.originalSize.width;
		this.height = this.originalSize.height;
		this.animate("dead");
		const canMoveUp = this.moveUp(ft);
		if (!canMoveUp) {
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
}
