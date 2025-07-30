class MoveableEntity extends Entity {
	direction;
	speedY = 20;
	speedX = 20;
	acceleration = { x: 0, y: 0 };
	currentMovementInterval;
	dead = false;

	constructor(position, size, speed, imgSrc) {
		super(position.x, position.y, size.width, size.height, imgSrc);
		this.speedX = speed.x;
		this.speedY = speed.y;
	}

	applyGravity() {
		this.speedY += 5;
		setInterval(() => {
			if (CalcFunctions.isWithinBoundaryBottom(this.y + this.acceleration.y + this.height)) {
				this.acceleration.y += this.speedY;
				this.y += this.acceleration.y;
			}
		}, ANIMATION_INTERVAL * 5);
	}

	moveRight(dt) {
		this.direction = "R";
		const newX = this.x + this.speedX * dt;
		const rightX = newX + this.hitbox.width + this.hitbox.offsetX;
		const canMoveRight = CalcFunctions.isWithinBoundaryRight(this.world, rightX);

		if (canMoveRight && !CalcFunctions.checkCollision(this, newX, this.y)) {
			this.x = newX;
		}

		return canMoveRight;
	}

	moveLeft(dt) {
		this.direction = "L";
		const newX = this.x - this.speedX * dt;
		const leftX = newX + this.hitbox.offsetX;
		const canMoveLeft = CalcFunctions.isWithinBoundaryLeft(this.world, leftX);

		if (canMoveLeft && !CalcFunctions.checkCollision(this, newX, this.y)) {
			this.x = newX;
		}

		return canMoveLeft;
	}

	moveDown(dt) {
		this.direction = "D";
		const newY = this.y + this.speedY * dt;
		const botY = newY + this.hitbox.height + this.hitbox.offsetY;
		const canMoveBottom = CalcFunctions.isWithinBoundaryBottom(botY);

		if (canMoveBottom && !CalcFunctions.checkCollision(this, this.x, newY)) {
			this.y = newY;
		}

		return canMoveBottom;
	}

	moveUp(dt) {
		this.direction = "U";
		const newY = this.y - this.speedY * dt;
		const topY = newY + this.hitbox.offsetY;
		const canMoveTop = CalcFunctions.isWithinBoundaryTop(topY);

		if (canMoveTop && !CalcFunctions.checkCollision(this, this.x, newY)) {
			this.y = newY;
		}

		return canMoveTop;
	}

	onDead() {}

	onGettingHit() {}
}
