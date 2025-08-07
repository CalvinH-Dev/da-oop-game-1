class MovableEntity extends Entity {
	direction;
	speedY = 20;
	speedX = 20;
	acceleration = { x: 0, y: 0 };
	dead = false;

	target = null;

	constructor(position, size, speed, imgSrc) {
		super(position.x, position.y, size.width, size.height, imgSrc);
		this.speedX = speed.x;
		this.speedY = speed.y;
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

	setTarget(position) {
		this.target = position;
	}

	clearTarget() {
		this.target = null;
	}

	moveToTarget(dt) {
		if (!this.target) return;

		const dx = this.target.x - this.x;
		const dy = this.target.y - this.y;
		const distance = Math.sqrt(dx * dx + dy * dy);
		const threshold = Math.max(this.speedX, this.speedY) * dt;

		if (distance < threshold) {
			this.clearTarget();
			return;
		}

		this._moveToPosition(dx, dy, distance, dt);

		this._updateDirection(dx, dy);
	}

	_moveToPosition(dx, dy, distance, dt) {
		const moveX = (dx / distance) * this.speedX * dt;
		const moveY = (dy / distance) * this.speedY * dt;

		const nextX = this.x + moveX;
		const nextY = this.y + moveY;

		const canMoveX = !CalcFunctions.checkCollision(this, nextX, this.y);
		const canMoveY = !CalcFunctions.checkCollision(this, this.x, nextY);

		if (canMoveX) this.x = nextX;
		if (canMoveY) this.y = nextY;
	}

	_updateDirection(dx, dy) {
		if (Math.abs(dx) > Math.abs(dy)) {
			if (dx > 0) {
				this.direction = "R";
			} else {
				this.direction = "L";
			}
		} else {
			if (dy > 0) {
				this.direction = "D";
			} else {
				this.direction = "U";
			}
		}
	}

	setRandomTarget(minX, maxX, maxY) {
		const targetX = Math.floor(minX + Math.random() * (maxX - minX));
		const targetY = Math.floor(Math.random() * maxY);

		this.setTarget({ x: targetX, y: targetY });
	}
}
