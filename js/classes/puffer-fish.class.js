class PufferFish extends MoveableObject {
	defaultDirection = "L";
	constructor(position, size, speed) {
		const imgSrc = "/assets/used/enemies/puffer-fish/green/swim/1.png";
		if (!size) {
			size = { width: 50, height: 50 };
		}

		if (!speed) {
			speed = { horizontal: 50, vertical: 50 };
		}
		super(position, size, speed, imgSrc);
		this.direction = "L";
	}

	defaultAnimation() {
		this.swim();
	}

	swim() {
		setInterval(() => {
			this.float();
			this.imgRef.src = `/assets/used/enemies/puffer-fish/green/swim/${this.animationState++}.png`;
			if (this.animationState > 5) {
				this.animationState = 1;
			}
		}, ANIMATION_TIME_NORMAL);
	}

	float() {
		this.y = Math.min(
			this.world.canvasRef.height - this.height,
			this.y + (0.5 - Math.random()) * 15,
		);
		this.y = Math.max(0, this.y);
	}

	drawObject(ctx) {
		if (this.direction === this.defaultDirection) {
			super.drawObject(ctx);
		} else if (this.direction === "U") {
			super.drawRotatedObject(ctx, 90);
		} else if (this.direction === "D") {
			super.drawRotatedObject(ctx, -90);
		} else {
			super.drawFlippedObject(ctx);
		}
	}
}
