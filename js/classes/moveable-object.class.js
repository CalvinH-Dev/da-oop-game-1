class MoveableObject extends Object {
	horizontalSpeed = 20;
	verticalSpeed = 20;
	animationState = 1;
	currentAnimation;
	lastAnimationInterval;
	world;
	direction;
	speedY = 0;
	speedX = 0;
	accelerationY = 0;
	accelerationX = 0;

	constructor(position, size, speed, imgSrc) {
		super(position.x, position.y, size.width, size.height, imgSrc);
		this.horizontalSpeed = speed.horizontal;
		this.verticalSpeed = speed.vertical;
		this.cacheImages();
		this.defaultAnimation();
	}

	applyGravity() {
		this.speedY += 5;
		setInterval(() => {
			if (this.isWithinBoundaryBottom(this.y + this.accelerationY + this.height)) {
				this.accelerationY += this.speedY;
				this.y += this.accelerationY;
			}
		}, ANIMATION_TIME_NORMAL * 5);
	}

	isWithinBoundaryTop(yValue) {
		return yValue >= 0;
	}

	isWithinBoundaryBottom(yValue) {
		return yValue <= BOARD_HEIGHT;
	}

	isWithinBoundaryLeft(xValue) {
		return xValue >= this.world.maxScrollLeft;
	}

	isWithinBoundaryRight(xValue) {
		return xValue <= BOARD_WIDTH + this.world.maxScrollRight;
	}

	moveRight() {
		this.direction = "R";
		const newX = this.x + this.horizontalSpeed;
		if (this.isWithinBoundaryRight(newX + this.width)) {
			this.x = newX;
		}
	}

	moveLeft() {
		this.direction = "L";
		const newX = this.x - this.horizontalSpeed;
		if (this.isWithinBoundaryLeft(newX)) {
			this.x = newX;
		}
	}

	moveDown() {
		this.direction = "D";
		const newY = this.y + this.verticalSpeed;
		if (this.isWithinBoundaryBottom(newY + this.height)) {
			this.y = newY;
		}
	}

	moveUp() {
		this.direction = "U";
		const newY = this.y - this.verticalSpeed;
		if (this.isWithinBoundaryTop(newY)) {
			this.y = newY;
		}
	}

	defaultAnimation() {}

	animate(name, callback) {
		if (this.currentAnimation === name) return;
		this.stopAnimation();
		this.currentAnimation = name;
		this.lastAnimationInterval = callback();
	}

	stopAnimation() {
		this.currentAnimation = undefined;
		clearInterval(this.lastAnimationInterval);
		this.resetAnimationState();
	}

	cacheImages(images) {
		images.forEach((imagePath) => {
			const img = new Image();
			img.src = imagePath;
			this.cachedImages[imagePath] = img;
		});
	}

	resetAnimationState() {
		this.animationState = 0;
	}

	buildAnimation(imgArr, additionalEffect = () => {}) {
		return setInterval(() => {
			additionalEffect();
			this.imgRef = this.cachedImages[imgArr[this.animationState++]];
			if (this.animationState >= imgArr.length) {
				this.resetAnimationState();
			}
		}, ANIMATION_TIME_NORMAL);
	}

	isColliding(a, b) {
		const aBox = {
			x: a.x + (a.hitbox?.offsetX || 0),
			y: a.y + (a.hitbox?.offsetY || 0),
			width: a.hitbox?.width || a.width,
			height: a.hitbox?.height || a.height,
		};

		const bBox = {
			x: b.x + (b.hitbox?.offsetX || 0),
			y: b.y + (b.hitbox?.offsetY || 0),
			width: b.hitbox?.width || b.width,
			height: b.hitbox?.height || b.height,
		};

		return (
			aBox.x < bBox.x + bBox.width &&
			aBox.x + aBox.width > bBox.x &&
			aBox.y < bBox.y + bBox.height &&
			aBox.y + aBox.height > bBox.y
		);
	}

	checkWouldCollide(nextHitboxX, nextHitboxY, objects = this.world.enemies) {
		const hitboxWidth = this.hitbox.width;
		const hitboxHeight = this.hitbox.height;
		let isColliding = false;

		const aBox = {
			x: nextHitboxX,
			y: nextHitboxY,
			width: hitboxWidth,
			height: hitboxHeight,
		};

		objects.forEach((enemy) => {
			if (isColliding) return;

			const bBox = {
				x: enemy.x + enemy.hitbox.offsetX,
				y: enemy.y + enemy.hitbox.offsetY,
				width: enemy.hitbox.width,
				height: enemy.hitbox.height,
			};

			isColliding =
				aBox.x < bBox.x + bBox.width &&
				aBox.x + aBox.width > bBox.x &&
				aBox.y < bBox.y + bBox.height &&
				aBox.y + aBox.height > bBox.y;
		});

		return isColliding;
	}

	checkisCollidingEnemies() {
		this.world.enemies.forEach((enemy) => {
			if (this.isColliding(this, enemy)) {
				console.log("Kollidiert mit Gegner!");
			}
		});
	}

	checkisCollidingPlayer() {
		if (this.isColliding(this, this.world.characterRef)) {
			console.log("Kollidiert mit Spieler!");
		}
	}
}
