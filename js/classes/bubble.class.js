class Bubble extends Projectile {
	maxLifeTimeInSec = 10;

	constructor(castedBy, position, direction, damage = 15) {
		const size = { width: 50, height: 50 };
		const velocity = { y: 100, x: 100 };
		const imgSrc = ImageHub.getBubbleImage();
		const acceleration = { y: 0, x: 15 };
		super(castedBy, position, size, velocity, imgSrc, acceleration, direction, damage);
	}

	calcMovement(ft) {
		this.acceleration.x -= this.waterFriction * ft;
		this.velocity.x += this.acceleration.x;
		if (this.direction === "L") {
			this.x -= this.velocity.x * ft;
		} else {
			this.x += this.velocity.x * ft;
		}
	}

	effectOnHit(obj) {
		obj.onGettingHit(this.damage);
		if (obj instanceof PufferFish) {
			obj.wasHit = true;
		}
	}
}
