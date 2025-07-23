class PufferFish extends MoveableObject {
	defaultDirection = "L";
	color = "green";
	hitbox = {
		offsetX: 0,
		offsetY: 0,
		width: 50,
		height: 40,
	};

	constructor(position, color = "green", size, speed) {
		const imgSrc = `/assets/used/enemies/puffer-fish/${color}/swim/1.png`;
		if (!size) {
			size = { width: 50, height: 50 };
		}

		if (!speed) {
			speed = { horizontal: 10, vertical: 10 };
		}
		super(position, size, speed, imgSrc);
		this.direction = "L";
		this.color = color;
		this.applyColor();
		// this.getBigger();
		this.move();
	}

	defaultAnimation() {
		this.animate("swim");
	}

	applyColor() {
		this.stopAnimation();
		this.animate("swim");
	}

	move() {
		setInterval(() => {
			this.moveRandom();
		}, 500 + Math.floor(Math.random() * 10) * 20);
	}

	swim() {
		if (this.color === "orange") {
			return this.buildAnimation(this.swimImagesOrange);
		} else if (this.color === "red") {
			return this.buildAnimation(this.swimImagesRed);
		} else {
			return this.buildAnimation(this.swimImagesGreen);
		}
	}

	moveRandom() {
		const number = Math.floor(Math.random() * 4);
		if (number === 0) {
			this.moveRight();
		} else if (number === 1) {
			this.moveLeft();
		} else if (number === 2) {
			this.moveUp();
		} else {
			this.moveDown();
		}
	}

	floatHorizontal() {
		this.x = Math.min(
			this.world.canvasRef.width + this.world.maxScrollRight - this.width,
			this.x + (0.5 - Math.random()) * 15,
		);
		this.x = Math.max(0, this.x);
	}

	floatVertical() {
		this.y = Math.min(
			this.world.canvasRef.height - this.height,
			this.y + (0.5 - Math.random()) * 15,
		);
		this.y = Math.max(0, this.y);
	}

	animate(name) {
		switch (name) {
			case "swim":
				super.animate("swim", this.swim.bind(this));

				break;
		}
	}

	drawObject(ctx, showBox) {
		if (
			this.direction === this.defaultDirection ||
			this.direction === "U" ||
			this.direction === "D"
		) {
			super.drawObject(ctx, showBox);
		} else {
			super.drawFlippedObject(ctx, showBox);
		}
	}

	getColorImages() {
		this.swimImages = [
			`/assets/used/enemies/puffer-fish/${this.color}/swim/1.png`,
			`/assets/used/enemies/puffer-fish/${this.color}/swim/2.png`,
			`/assets/used/enemies/puffer-fish/${this.color}/swim/3.png`,
			`/assets/used/enemies/puffer-fish/${this.color}/swim/4.png`,
			`/assets/used/enemies/puffer-fish/${this.color}/swim/5.png`,
		];
		this.cacheImages(this.swimImages);
	}

	cacheImages() {
		this.swimImagesOrange = [
			"/assets/used/enemies/puffer-fish/orange/swim/1.png",
			"/assets/used/enemies/puffer-fish/orange/swim/2.png",
			"/assets/used/enemies/puffer-fish/orange/swim/3.png",
			"/assets/used/enemies/puffer-fish/orange/swim/4.png",
			"/assets/used/enemies/puffer-fish/orange/swim/5.png",
		];

		this.swimImagesGreen = [
			"/assets/used/enemies/puffer-fish/green/swim/1.png",
			"/assets/used/enemies/puffer-fish/green/swim/2.png",
			"/assets/used/enemies/puffer-fish/green/swim/3.png",
			"/assets/used/enemies/puffer-fish/green/swim/4.png",
			"/assets/used/enemies/puffer-fish/green/swim/5.png",
		];

		this.swimImagesRed = [
			"/assets/used/enemies/puffer-fish/red/swim/1.png",
			"/assets/used/enemies/puffer-fish/red/swim/2.png",
			"/assets/used/enemies/puffer-fish/red/swim/3.png",
			"/assets/used/enemies/puffer-fish/red/swim/4.png",
			"/assets/used/enemies/puffer-fish/red/swim/5.png",
		];

		super.cacheImages(this.swimImagesOrange);
		super.cacheImages(this.swimImagesRed);
		super.cacheImages(this.swimImagesGreen);
	}
}
