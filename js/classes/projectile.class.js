class Projectile extends MoveableObject {
	waterFriction = 1;
	constructor(position, size, speed, imgSrc, acceleration, direction) {
		super(position, size, speed, imgSrc);
		this.accelerationX = acceleration.x;
		this.accelerationY = acceleration.y;
		this.direction = direction;
		this.test();
	}

	test() {
		setInterval(() => {
			console.log("speed", this.speedY);
			console.log("acc", this.accelerationY);
			this.speedY = Math.max(0, this.speedY + this.accelerationY - this.waterFriction);
			if (this.speedY === 0) this.despawn();

			this.accelerationY = Math.max(
				0,
				this.accelerationY - this.accelerationY * ANIMATION_TIME_NORMAL,
			);

			this.move();
		}, ANIMATION_TIME_NORMAL);
	}

	despawn() {
		this.world.projectiles = this.world.projectiles.filter((projectile) => projectile !== this);
	}

	move() {
		if (this.direction === "L") {
			this.moveLeft();
		} else if (this.direction === "R") {
			this.moveRight();
		} else if (this.direction === "U") {
			this.moveUp();
		} else if (this.direction === "D") {
			this.moveDown();
		} else console.log("Sollte nicht passieren");
	}
}
