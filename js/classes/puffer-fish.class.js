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
			speed = { x: 10, y: 10 };
		}
		super(position, size, speed, imgSrc);
		this.direction = "L";
		this.color = color;
		this.applyColor();
		// this.collision = true;

		this.changeSize();
		this.move();
	}

	defaultAnimation() {}

	applyColor() {
		this.stopAnimation();
		this.getColorImages();
		this.animate("swim");
	}

	move() {
		setInterval(() => {
			this.moveRandom();
		}, 500 + Math.floor(Math.random() * 10) * 20);
	}

	swim() {
		return this.buildBasicAnimation(this.swimImages);
	}

	moveRandom() {
		const number = Math.floor(Math.random() * 4);
		if (number === 0) {
			this.moveRight([this.world.characterRef]);
		} else if (number === 1) {
			this.moveLeft([this.world.characterRef]);
		} else if (number === 2) {
			this.moveUp([this.world.characterRef]);
		} else {
			this.moveDown([this.world.characterRef]);
		}
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
		const keys = Object.keys(this.cachedImages);
		let images = [];

		for (const key of keys) {
			if (key.includes(`${this.color}/swim`)) {
				images.push(key);
			}
		}
		this.swimImages = images;
	}

	cacheAllImages() {
		const colors = ["red", "orange", "green"];
		for (const color of colors) {
			const images = ImageHub.getPufferFishSwimImages(color);
			this.swimImages = images;
			this.cacheImages(images);
		}
	}
}
