class PufferFish extends MoveableObject {
	defaultDirection = "L";
	color = "green";

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
	}

	defaultAnimation() {
		this.animate("swim");
	}

	applyColor() {
		this.stopAnimation();
		this.animate("swim");
	}

	swim() {
		if (this.color === "orange") {
			return this.buildAnimation(this.swimImagesOrange, this.moveRandom.bind(this));
		} else if (this.color === "red") {
			return this.buildAnimation(this.swimImagesRed, this.moveRandom.bind(this));
		} else {
			return this.buildAnimation(this.swimImagesGreen, this.moveRandom.bind(this));
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
