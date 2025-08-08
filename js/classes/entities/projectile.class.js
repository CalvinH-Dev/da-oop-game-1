class Projectile extends MovableEntity {
	waterFriction = 10;
	velocity = {};
	gravity;
	maxLifeTimeInSec = 10;
	livedInSec = 0;
	direction;
	castedBy = {};
	damage;

	constructor(
		castedBy,
		position,
		size,
		speed,
		imgSrc,
		acceleration,
		direction,
		damage = 0,
		gravity = 9.81,
	) {
		super(position, size, speed, imgSrc);
		this.castedBy = castedBy;
		this.acceleration.x = acceleration.x;
		this.acceleration.y = acceleration.y;
		this.gravity = gravity;
		this.velocity.x = this.speedX;
		this.velocity.y = this.speedY;
		this.hitbox.width = this.width;
		this.hitbox.height = this.height;
		this.direction = direction;
		this.collision = true;
		this.damage = damage;
	}

	/**
	 * Removes this projectile from the world's projectile list.
	 */
	despawn() {
		this.world.projectiles = this.world.projectiles.filter((projectile) => projectile !== this);
	}

	/**
	 * Checks whether the projectile is out of the world boundaries and should despawn.
	 * @returns {boolean} True if the projectile is outside the boundaries, false otherwise.
	 */
	shouldDespawn() {
		const xValueLeft = this.x;
		const xValueRight = this.x + this.hitbox.width;
		const yValueTop = this.y;
		const yValueBot = this.y + this.hitbox.height;

		return !CalcFunctions.isWithingBoundaries(
			this.world,
			xValueLeft,
			xValueRight,
			yValueTop,
			yValueBot,
		);
	}

	/**
	 * Updates the projectile state, including its lifetime, movement, collision checks, and despawning.
	 * @param {number} ft - Frame time delta in seconds.
	 */
	update(ft) {
		this.livedInSec += ft;

		this.calcMovement(ft);

		CalcFunctions.checkHitByProjectile(this, this.castedBy.isFriendly, this.x, this.y);

		if (this.velocity.x <= 5 || this.shouldDespawn() || this.livedInSec >= this.maxLifeTimeInSec)
			this.despawn();
	}

	/**
	 * Calculates the projectile's movement considering acceleration and water friction.
	 * @param {number} ft - Frame time delta in seconds.
	 */
	calcMovement(ft) {
		this.acceleration.x -= this.waterFriction * ft;
		this.velocity.x += this.acceleration.x;
		this.x += this.velocity.x * ft;
	}
}
