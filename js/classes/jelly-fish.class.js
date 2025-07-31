class JellyFish extends MoveableEntity {
	defaultDirection = "U";
	color = "green";
	hitbox = {
		offsetX: 0,
		offsetY: 10,
		width: 100,
		height: 80,
	};
	maxCollisionDamageCooldownInSec = 3;

	wasHit = false;
	hp = 35;
	maxHP = 35;

	isFriendly = false;

	constructor(position, color = "yellow", size, speed) {
		const imgSrc = `/assets/used/enemies/jelly-fish/${color}/swim/1.png`;
		if (!size) {
			size = { width: 100, height: 100 };
		}

		if (!speed) {
			speed = { x: 250, y: 250 };
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

	cacheAllImages() {
		const colors = ["yellow", "purple"];
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

		this.move(ft * JELLYFISH_MOVEMENT_MULTIPLIER);
	}

	animationTick(ft) {
		this.imgRef = this.cachedImages[this.frames[this.animationState]];
		this.animationState = (this.animationState + 1) % this.frames.length;
	}

	onDead(ft) {
		this.dead = true;
		this.animate("dead");
		const canMoveUp = this.moveUp(ft);
		if (!canMoveUp) {
			this.despawn();
		}
	}

	onGettingHit(damage) {
		if (this.dead) return;
		if (Number(damage)) {
			this.hp -= damage;
		}
	}

	effectOnCollision(obj) {
		if (this.dead) return;
		if (obj.isFriendly == this.isFriendly) return;

		if (this.collisionDamageCooldownInSec === 0) {
			if (this.color === "purple") {
				obj.onGettingHit(20);
			} else {
				if (!obj.statuses.includes("electrified")) {
					obj.statuses.push("electrified");
				}
				obj.onGettingHit(5);
			}
			this.collisionDamageCooldownInSec = this.maxCollisionDamageCooldownInSec;
		}
	}
}
