class Endboss extends MovableEntity {
	defaultDirection = "L";
	hitbox = {
		offsetX: 40,
		offsetY: 320,
		width: 400,
		height: 180,
	};
	maxCollisionDamageCooldownInSec = 3;

	wasHit = false;
	hp = 35;
	maxHP = 35;
	collision = false;

	isFriendly = false;

	constructor(position, size, speed) {
		const imgSrc = `/assets/used/enemies/whale/spawn/1.png`;
		if (!size) {
			size = { width: 570, height: 608 };
		}

		if (!speed) {
			speed = { x: 150, y: 150 };
		}
		super(position, size, speed, imgSrc);
		this.direction = "U";
		this.animateSpawn();
	}

	animateSpawn() {
		this.animate("spawn");
	}

	idle() {
		this.animate("idle");
	}

	attack() {
		this.animate("attack");
	}

	animate(name) {
		switch (name) {
			case "spawn":
				super.animate("spawn", ImageHub.getWhaleSpawnImages());
				break;
			case "idle":
				super.animate("idle", ImageHub.getWhaleIdleImages());
				break;
			case "attack":
				super.animate("attack", ImageHub.getWhaleAttackImages());
				break;
			case "hurt":
				super.animate("hurt", ImageHub.getWhaleHurtImages());
				break;
			case "dead":
				super.animate("dead", ImageHub.getWhaleDeadImages());
				break;
		}
	}

	cacheAllImages() {
		this.spawnImages = ImageHub.getWhaleSpawnImages();
		this.idleImages = ImageHub.getWhaleIdleImages();
		this.attackImages = ImageHub.getWhaleAttackImages();
		this.hurtImages = ImageHub.getWhaleHurtImages();
		this.deadImages = ImageHub.getWhaleDeadImages();

		super.cacheImages(this.spawnImages);
		super.cacheImages(this.idleImages);
		super.cacheImages(this.attackImages);
		super.cacheImages(this.hurtImages);
		super.cacheImages(this.deadImages);
	}

	animationTick() {
		if (this.wasHit) {
			this.animate("hurt");
			this.wasHit = false;
		}
		this.imgRef = this.cachedImages[this.frames[this.animationState]];
		this.animationState = (this.animationState + 1) % this.frames.length;

		if (this.animationState === 0) {
			if (this.currentAnimation === "spawn") {
				this.collision = true;
				this.hittable = true;
				this.idle();
			}
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
