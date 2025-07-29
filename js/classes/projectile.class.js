class Projectile extends MoveableEntity {
	waterFriction = 10;
	velocity = {};
	gravity;
	maxLifeTimeInSec = 10;
	livedInSec = 0;
	direction;
	castedBy = {};

	constructor(castedBy, position, size, speed, imgSrc, acceleration, direction, gravity = 9.81) {
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
	}

	despawn() {
		this.world.projectiles = this.world.projectiles.filter((projectile) => projectile !== this);
	}

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

	update(ft) {
		this.livedInSec += ft;

		this.calcMovement(ft);

		CalcFunctions.checkHitByProjectile(
			this,
			this.castedBy.isFriendly,
			this.x,
			this.y,
			this.effectOnHit,
		);

		if (this.velocity.x <= 5 || this.shouldDespawn() || this.livedInSec >= this.maxLifeTimeInSec)
			this.despawn();
	}

	effectOnHit(obj) {
		obj.wasHit = true;
	}

	calcMovement(ft) {
		this.acceleration.x -= this.waterFriction * ft;
		this.velocity.x += this.acceleration.x;
		this.x += this.velocity.x * ft;
	}
}
