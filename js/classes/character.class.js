class Character extends MoveableObject {
	defaultDirection = "R";

	constructor(position, size, speed) {
		const imgSrc = "/assets/used/character/idle/1.png";
		if (!size) {
			size = { width: 200, height: 200 };
		}

		if (!speed) {
			speed = { horizontal: 20, vertical: 20 };
		}
		super(position, size, speed, imgSrc);
		this.direction = "R";
		// this.applyGravity();
	}

	defaultAnimation() {
		this.animate("idle");
	}

	swim() {
		return this.buildAnimation(this.swimImages);
	}

	idle() {
		return this.buildAnimation(this.idleImages);
	}

	moveRight() {
		super.moveRight();
		this.animate("swim");
	}

	moveLeft() {
		super.moveLeft();
		this.animate("swim");
	}

	moveDown() {
		super.moveDown();
		this.animate("swim");
	}

	moveUp() {
		super.moveUp();
		this.animate("swim");
	}

	animate(name) {
		switch (name) {
			case "idle":
				super.animate("idle", this.idle.bind(this));

				break;
			case "swim":
				super.animate("swim", this.swim.bind(this));

				break;
		}
	}

	drawObject(ctx) {
		if (
			this.direction === this.defaultDirection ||
			this.direction === "U" ||
			this.direction === "D"
		) {
			super.drawObject(ctx);
		} else {
			super.drawFlippedObject(ctx);
		}
	}

	cacheImages() {
		this.swimImages = [
			"/assets/used/character/swim/1.png",
			"/assets/used/character/swim/2.png",
			"/assets/used/character/swim/3.png",
			"/assets/used/character/swim/4.png",
			"/assets/used/character/swim/5.png",
			"/assets/used/character/swim/6.png",
		];

		this.idleImages = [
			"/assets/used/character/idle/1.png",
			"/assets/used/character/idle/2.png",
			"/assets/used/character/idle/3.png",
			"/assets/used/character/idle/4.png",
			"/assets/used/character/idle/5.png",
			"/assets/used/character/idle/6.png",
			"/assets/used/character/idle/7.png",
			"/assets/used/character/idle/8.png",
			"/assets/used/character/idle/9.png",
			"/assets/used/character/idle/10.png",
			"/assets/used/character/idle/11.png",
			"/assets/used/character/idle/12.png",
			"/assets/used/character/idle/13.png",
			"/assets/used/character/idle/14.png",
			"/assets/used/character/idle/15.png",
			"/assets/used/character/idle/16.png",
			"/assets/used/character/idle/17.png",
			"/assets/used/character/idle/18.png",
		];

		super.cacheImages(this.swimImages);
		super.cacheImages(this.idleImages);
	}
}
