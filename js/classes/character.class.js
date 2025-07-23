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
		return this.buildAnimation(this.longIdleImages);
	}

	trackIdleTime() {
		this.idleTime += 1;
		if (this.idleTime > 50) {
			this.animate("longIdle");
		}
	}

	moveRight() {
		this.direction = "R";
		const newX = this.x + this.horizontalSpeed;
		if (
			this.isWithinBoundaryRight(newX + this.width) &&
			!this.checkWouldCollide(this.hitbox.offsetX + newX, this.y + this.hitbox.offsetY)
		) {
			this.x = newX;
		}
		this.animate("swim");
	}

	moveLeft() {
		this.direction = "L";
		const newX = this.x - this.horizontalSpeed;
		if (
			this.isWithinBoundaryLeft(newX) &&
			!this.checkWouldCollide(this.hitbox.offsetX + newX, this.y + this.hitbox.offsetY)
		) {
			this.x = newX;
		}
		this.animate("swim");
	}

	moveDown() {
		this.direction = "D";
		const newY = this.y + this.verticalSpeed;
		if (
			this.isWithinBoundaryBottom(newY + this.height) &&
			!this.checkWouldCollide(this.x + this.hitbox.offsetX, this.hitbox.offsetY + newY)
		) {
			this.y = newY;
		}
		this.animate("swim");
	}

	moveUp() {
		this.direction = "U";
		const newY = this.y - this.verticalSpeed;
		if (
			this.isWithinBoundaryTop(newY) &&
			!this.checkWouldCollide(this.x + this.hitbox.offsetX, this.hitbox.offsetY + newY)
		) {
			this.y = newY;
		}
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
		this.checkisCollidingEnemies();
	}
}
