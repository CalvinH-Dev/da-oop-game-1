class Bubble extends Projectile {
	maxLifeTimeInSec = 10;

	constructor(position, direction) {
		const size = { width: 50, height: 50 };
		const velocity = { y: 100, x: 100 };
		const imgSrc = ImageHub.getBubbleImage();
		const acceleration = { y: 0, x: 15 };
		super(position, size, velocity, imgSrc, acceleration, direction);
	}

	calcMovement(ft) {
		console.log("test");
		this.acceleration.x -= this.waterFriction * ft;
		this.velocity.x += this.acceleration.x;
		if (this.direction === "L") {
			this.x -= this.velocity.x * ft;
		} else {
			this.x += this.velocity.x * ft;
		}
	}
}
