class Endboss extends MovableEntity {
	defaultDirection = "L";
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

	animate(name) {
		switch (name) {
			case "spawn":
				super.animate("spawn", ImageHub.getSpawnWhaleImages());
				break;
		}
	}

	cacheAllImages() {
		this.spawnImages = ImageHub.getSpawnWhaleImages();

		super.cacheImages(this.spawnImages);
	}

	animationTick() {
		this.imgRef = this.cachedImages[this.frames[this.animationState]];
		this.animationState = (this.animationState + 1) % this.frames.length;

		if (this.animationState === 0) {
			if (this.currentAnimation === "spawn") {
				this.collision = true;
			}
		}
	}
}
