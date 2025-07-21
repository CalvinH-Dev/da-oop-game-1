class MoveableObject extends Object {
	horizontalSpeed = 20;
	verticalSpeed = 20;
	state = 1;
	currentAnimation;
	lastInterval;

	constructor(position, size, speed, imgSrc) {
		super(position.x, position.y, size.width, size.height, imgSrc);
		this.horizontalSpeed = speed.horizontal;
		this.verticalSpeed = speed.vertical;
		this.lastInterval = this.defaultAnimation();
	}

	moveRight() {
		this.x += this.horizontalSpeed;
	}

	moveLeft() {
		this.x -= this.horizontalSpeed;
	}

	moveDown() {
		this.y += this.verticalSpeed;
	}

	moveUp() {
		this.y -= this.verticalSpeed;
	}

	defaultAnimation() {}

	animate(name, callback) {
		if (this.currentAnimation === name) return;
		this.state = 1;
		clearInterval(this.lastInterval);
		this.currentAnimation = name;
		this.lastInterval = callback();
	}
}
