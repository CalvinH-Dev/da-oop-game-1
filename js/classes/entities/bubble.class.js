class Bubble extends Projectile {
	maxLifeTimeInSec = 10;

	constructor(castedBy, position, direction, damage = COLLISION_DAMAGE) {
		const size = { width: 50, height: 50 };
		const velocity = { y: 100, x: 100 };
		const imgSrc = ImageHub.getBubbleImage();
		const acceleration = { y: 0, x: 15 };
		super(castedBy, position, size, velocity, imgSrc, acceleration, direction, damage);
		SoundHub.play(SoundHub.charBubbleShoot);
	}

	/**
	 * Calculates the movement of the bubble based on the elapsed time.
	 * Adjusts acceleration and velocity, and moves the bubble left or right.
	 *
	 * @param {number} ft - The elapsed frame time in seconds.
	 */
	calcMovement(ft) {
		this.acceleration.x -= this.waterFriction * ft;
		this.velocity.x += this.acceleration.x;
		if (this.direction === "L") {
			this.x -= this.velocity.x * ft;
		} else {
			this.x += this.velocity.x * ft;
		}
	}

	/**
	 * Applies effects when the bubble hits an object.
	 * Plays a sound and triggers the hit effect on the target object.
	 *
	 * @param {Object} obj - The object that was hit. Must have an onGettingHit method.
	 */
	effectOnHit(obj) {
		SoundHub.play(SoundHub.charBubbleHit);
		obj.onGettingHit(this.damage);
	}
}
