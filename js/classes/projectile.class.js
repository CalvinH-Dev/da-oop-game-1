class Projectile extends MoveableEntity {
	waterFriction = 10;
	constructor(position, size, speed, imgSrc, acceleration, direction) {
		super(position, size, speed, imgSrc);
		this.accelerationX = acceleration.x;
		this.accelerationY = acceleration.y;
		this.direction = direction;
		this.test();
	}

	test() {
		setInterval(() => {
			console.log("speed", this.speedX);
			console.log("acc", this.accelerationX);
			this.speedX = Math.max(0, this.speedX + this.accelerationX - this.waterFriction);
			if (this.speedX <= 10) this.despawn();

			this.accelerationX = Math.max(
				0,
				this.accelerationX - this.accelerationX * ANIMATION_INTERVAL,
			);

			this.move();
		}, ANIMATION_INTERVAL);
	}

	despawn() {
		this.world.projectiles = this.world.projectiles.filter((projectile) => projectile !== this);
	}

	move() {
		if (this.direction === "L") {
			this.moveLeft(FPS_INTERVAL / 1000);
		} else if (this.direction === "R") {
			this.moveRight(FPS_INTERVAL / 1000);
		} else if (this.direction === "U") {
			this.moveUp(FPS_INTERVAL / 1000);
		} else if (this.direction === "D") {
			this.moveDown(FPS_INTERVAL / 1000);
		} else console.log("Sollte nicht passieren");
	}
}
