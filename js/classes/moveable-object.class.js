class MoveableObject extends Object {
	horizontalSpeed = 20;
	verticalSpeed = 20;
	direction;
	speedY = 0;
	speedX = 0;
	accelerationY = 0;
	accelerationX = 0;

	constructor(position, size, speed, imgSrc) {
		super(position.x, position.y, size.width, size.height, imgSrc);
		this.horizontalSpeed = speed.horizontal;
		this.verticalSpeed = speed.vertical;
	}

	applyGravity() {
		this.speedY += 5;
		setInterval(() => {
			if (CalcFunctions.isWithinBoundaryBottom(this.y + this.accelerationY + this.height)) {
				this.accelerationY += this.speedY;
				this.y += this.accelerationY;
			}
		}, ANIMATION_TIME_NORMAL * 5);
	}

	moveRight(checkFor = this.world.enemies) {
		this.direction = "R";
		const newX = this.x + this.horizontalSpeed;
		const rightX = newX + this.hitbox.width + this.hitbox.offsetX;
		if (
			CalcFunctions.isWithinBoundaryRight(this.world, rightX) &&
			!CalcFunctions.checkCollision(this, checkFor, newX, this.y)
		) {
			this.x = newX;
		}
	}

	moveLeft(checkFor = this.world.enemies) {
		this.direction = "L";
		const newX = this.x - this.horizontalSpeed;
		const leftX = newX + this.hitbox.offsetX;

		if (
			CalcFunctions.isWithinBoundaryLeft(this.world, leftX) &&
			!CalcFunctions.checkCollision(this, checkFor, newX, this.y)
		) {
			this.x = newX;
		}
	}

	moveDown(checkFor = this.world.enemies) {
		this.direction = "D";
		const newY = this.y + this.verticalSpeed;
		const botY = newY + this.hitbox.height + this.hitbox.offsetY;
		if (
			CalcFunctions.isWithinBoundaryBottom(botY) &&
			!CalcFunctions.checkCollision(this, checkFor, this.x, newY)
		) {
			this.y = newY;
		}
	}

	moveUp(checkFor = this.world.enemies) {
		this.direction = "U";
		const newY = this.y - this.verticalSpeed;
		const topY = newY + this.hitbox.offsetY;

		if (
			CalcFunctions.isWithinBoundaryTop(topY) &&
			!CalcFunctions.checkCollision(this, checkFor, this.x, newY)
		) {
			this.y = newY;
		}
	}
}
