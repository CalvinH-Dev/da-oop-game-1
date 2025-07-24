class Character extends MoveableObject {
	defaultDirection = "R";
	idleTime = 0;
	hitbox = {
		offsetX: 30,
		offsetY: 90,
		width: 100,
		height: 75,
	};

	constructor(position, size, speed) {
		const scale = 1;
		const imgSrc = "/assets/used/character/idle/1.png";
		if (!size) {
			size = { width: 163 * scale, height: 200 * scale };
		}

		if (!speed) {
			speed = { horizontal: 20, vertical: 20 };
		}
		super(position, size, speed, imgSrc);
		this.direction = "R";
		this.collision = true;
		// this.applyGravity();
	}

	defaultAnimation() {
		this.animate("idle");
	}

	swim() {
		return this.buildAnimation(this.swimImages);
	}

	idle() {
		this.idleTime = 0;
		return this.buildAnimation(this.idleImages, this.trackIdleTime.bind(this));
	}

	longIdle() {
		return this.buildAnimation(this.longIdleImages, () => {}, false);
	}

	trackIdleTime() {
		this.idleTime += 1;
		if (this.idleTime > 50) {
			this.animate("longIdle");
		}
	}

	moveRight() {
		super.moveRight();
		this.animate("swim");
	}

	moveLeft() {
		super.moveLeft();
		this.animate("swim");
	}

	moveDown() {
		super.moveDown();
		this.animate("swim");
	}

	moveUp() {
		super.moveUp();
		this.animate("swim");
	}

	animate(name) {
		switch (name) {
			case "idle":
				super.animate("idle", this.idle.bind(this));

				break;
			case "swim":
				super.animate("swim", this.swim.bind(this));

				break;
			case "longIdle":
				super.animate("longIdle", this.longIdle.bind(this));

				break;
		}
	}

	drawObject(ctx, showBox) {
		if (
			this.direction === this.defaultDirection ||
			this.direction === "U" ||
			this.direction === "D"
		) {
			super.drawObject(ctx, showBox);
		} else {
			super.drawFlippedObject(ctx, showBox);
		}
	}

	cacheImages() {
		this.swimImages = [
			"/assets/used/character/swim/1.png",
			"/assets/used/character/swim/2.png",
			"/assets/used/character/swim/3.png",
			"/assets/used/character/swim/4.png",
			"/assets/used/character/swim/5.png",
			"/assets/used/character/swim/6.png",
		];

		this.idleImages = [
			"/assets/used/character/idle/1.png",
			"/assets/used/character/idle/2.png",
			"/assets/used/character/idle/3.png",
			"/assets/used/character/idle/4.png",
			"/assets/used/character/idle/5.png",
			"/assets/used/character/idle/6.png",
			"/assets/used/character/idle/7.png",
			"/assets/used/character/idle/8.png",
			"/assets/used/character/idle/9.png",
			"/assets/used/character/idle/10.png",
			"/assets/used/character/idle/11.png",
			"/assets/used/character/idle/12.png",
			"/assets/used/character/idle/13.png",
			"/assets/used/character/idle/14.png",
			"/assets/used/character/idle/15.png",
			"/assets/used/character/idle/16.png",
			"/assets/used/character/idle/17.png",
			"/assets/used/character/idle/18.png",
		];

		this.longIdleImages = [
			"/assets/used/character/long-idle/1.png",
			"/assets/used/character/long-idle/2.png",
			"/assets/used/character/long-idle/3.png",
			"/assets/used/character/long-idle/4.png",
			"/assets/used/character/long-idle/5.png",
			"/assets/used/character/long-idle/6.png",
			"/assets/used/character/long-idle/7.png",
			"/assets/used/character/long-idle/8.png",
			"/assets/used/character/long-idle/9.png",
			"/assets/used/character/long-idle/10.png",
			"/assets/used/character/long-idle/11.png",
			"/assets/used/character/long-idle/12.png",
			"/assets/used/character/long-idle/13.png",
			"/assets/used/character/long-idle/14.png",
		];

		super.cacheImages(this.swimImages);
		super.cacheImages(this.idleImages);
		super.cacheImages(this.longIdleImages);
	}

	checkState() {
		// this.checkisCollidingEnemies();
	}
}
