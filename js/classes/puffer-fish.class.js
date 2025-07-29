class PufferFish extends MoveableEntity {
	defaultDirection = "L";
	color = "green";
	hitbox = {
		offsetX: 0,
		offsetY: 0,
		width: 50,
		height: 40,
	};
	maxCollisionDamageCooldownInSec = 1000;

	wasHit = false;

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
		this.direction = "L";
		this.color = color;
		this.applyColor();
		// this.collision = true;

		this.changeSize();
		this.move();
	}

	defaultAnimation() {}

	applyColor() {
		this.stopAnimation();
		this.getColorImages();
		this.animate("swim");
	}

	move() {
		setInterval(() => {
			this.moveRandom();
		}, 500 + Math.floor(Math.random() * 10) * 20);
	}

	swim() {
		return this.buildBasicAnimation(this.swimImages);
	}

	moveRandom(ft) {
		const number = Math.floor(Math.random() * 4);
		if (number === 0) {
			this.moveRight(ft);
		} else if (number === 1) {
			this.moveLeft(ft);
		} else if (number === 2) {
			this.moveUp(ft);
		} else {
			this.moveDown(ft);
		}
	}

	animate(name) {
		switch (name) {
			case "swim":
				super.animate("swim", this.swim.bind(this));

				break;
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
			super.renderFlipped(ctx, showBox);
		}
	}

	getColorImages() {
		const keys = Object.keys(this.cachedImages);
		let images = [];

		for (const key of keys) {
			if (key.includes(`${this.color}/swim`)) {
				images.push(key);
			}
		}
		this.swimImages = images;
	}

	cacheAllImages() {
		const colors = ["red", "orange", "green"];
		for (const color of colors) {
			const images = ImageHub.getPufferFishSwimImages(color);
			this.swimImages = images;
			this.cacheImages(images);
		}
	}

	despawn() {
		this.world.enemies = this.world.enemies.filter((fish) => fish !== this);
	}

	update(ft) {
		this.collisionDamageCooldownInSec = Math.max(0, this.collisionDamageCooldownInSec - ft);
		if (this.wasHit) this.despawn();
		if (this.currentMovementInterval) return;
		this.currentMovementInterval = setInterval(() => {
			this.moveRandom(ft);
		}, PUFFERFISH_MOVEMENT_INTERVAL);
	}

	effectOnCollision(obj) {
		if (obj.isFriendly == this.isFriendly) return;
		if (this.collisionDamageCooldownInSec === 0) {
			obj.status = "poisoned";
			console.log("Spieler getroffen!");
			this.collisionDamageCooldownInSec = this.maxCollisionDamageCooldownInSec;
		}
	}
}
