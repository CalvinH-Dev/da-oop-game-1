class MoveableObject extends Object {
	horizontalSpeed = 20;
	verticalSpeed = 20;

	constructor(position, size, speed, imgSrc) {
		super(position.x, position.y, size.width, size.height, imgSrc);
		this.horizontalSpeed = speed.horizontal;
		this.verticalSpeed = speed.vertical;
		this.defaultAnimation();
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
}
