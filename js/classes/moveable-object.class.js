class MoveableObject extends Object {
	horizontalSpeed = 20;
	verticalSpeed = 20;
	animationState = 1;
	currentAnimation;
	lastAnimationInterval;
	world;
	direction;

	constructor(position, size, speed, imgSrc) {
		super(position.x, position.y, size.width, size.height, imgSrc);
		this.horizontalSpeed = speed.horizontal;
		this.verticalSpeed = speed.vertical;
		this.cacheImages();
		this.defaultAnimation();
	}

	moveRight() {
		this.direction = "R";
		const newX = this.x + this.horizontalSpeed;
		if (newX <= BOARD_WIDTH + this.world.maxScrollRight - this.width) {
			this.x = newX;
		}
	}

	moveLeft() {
		this.direction = "L";
		const newX = this.x - this.horizontalSpeed;
		if (newX >= this.world.maxScrollLeft) {
			this.x = newX;
		}
	}

	moveDown() {
		this.direction = "D";
		const newY = this.y + this.verticalSpeed;
		if (newY <= BOARD_HEIGHT - this.height) {
			this.y = newY;
		}
	}

	moveUp() {
		this.direction = "U";
		const newY = this.y - this.verticalSpeed;
		if (newY >= 0) {
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

	buildAnimation(imgArr, additionalMovement = () => {}) {
		return setInterval(() => {
			additionalMovement();
			this.imgRef = this.cachedImages[imgArr[this.animationState++]];
			if (this.animationState >= imgArr.length) {
				this.resetAnimationState();
			}
		}, ANIMATION_TIME_NORMAL);
	}
}
