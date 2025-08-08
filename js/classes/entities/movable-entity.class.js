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

	/**
	 * Moves the entity to the right based on speed and delta time.
	 * @param {number} dt - Delta time.
	 * @returns {boolean} Whether the entity can move right within boundaries and without collision.
	 */
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

	/**
	 * Moves the entity to the left based on speed and delta time.
	 * @param {number} dt - Delta time.
	 * @returns {boolean} Whether the entity can move left within boundaries and without collision.
	 */
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

	/**
	 * Moves the entity down based on speed and delta time.
	 * @param {number} dt - Delta time.
	 * @returns {boolean} Whether the entity can move down within boundaries and without collision.
	 */
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

	/**
	 * Moves the entity up based on speed and delta time.
	 * @param {number} dt - Delta time.
	 * @returns {boolean} Whether the entity can move up within boundaries and without collision.
	 */
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

	/**
	 * Placeholder method called when entity dies.
	 */
	onDead() {}

	/**
	 * Placeholder method called when entity gets hit.
	 */
	onGettingHit() {}

	/**
	 * Sets the movement target position.
	 * @param {{x: number, y: number}} position - Target position.
	 */
	setTarget(position) {
		this.target = position;
	}

	/**
	 * Clears the current movement target.
	 */
	clearTarget() {
		this.target = null;
	}

	/**
	 * Moves the entity towards the target position, if any.
	 * @param {number} dt - Delta time.
	 */
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

	/**
	 * Moves the entity towards a specific position by calculated deltas.
	 * @param {number} dx - Difference in x.
	 * @param {number} dy - Difference in y.
	 * @param {number} distance - Distance to the target.
	 * @param {number} dt - Delta time.
	 * @private
	 */
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

	/**
	 * Updates the entity's direction based on movement deltas.
	 * @param {number} dx - Difference in x.
	 * @param {number} dy - Difference in y.
	 * @private
	 */
	_updateDirection(dx, dy) {
		if (Math.abs(dx) > Math.abs(dy)) {
			this.direction = dx > 0 ? "R" : "L";
		} else {
			this.direction = dy > 0 ? "D" : "U";
		}
	}

	/**
	 * Sets a random target position within given bounds.
	 * @param {number} minX - Minimum x coordinate.
	 * @param {number} maxX - Maximum x coordinate.
	 * @param {number} maxY - Maximum y coordinate.
	 */
	setRandomTarget(minX, maxX, maxY) {
		const targetX = Math.floor(minX + Math.random() * (maxX - minX));
		const targetY = Math.floor(Math.random() * maxY);

		this.setTarget({ x: targetX, y: targetY });
	}
}
