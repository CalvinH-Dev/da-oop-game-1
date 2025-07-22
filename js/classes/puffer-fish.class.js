class PufferFish extends MoveableObject {
	constructor(position, size, speed) {
		const imgSrc = "/assets/used/enemies/puffer-fish/green/swim/1.png";
		if (!size) {
			size = { width: 50, height: 50 };
		}

		if (!speed) {
			speed = { horizontal: 50, vertical: 50 };
		}
		super(position, size, speed, imgSrc);
	}

	defaultAnimation() {
		this.swim();
	}

	swim() {
		setInterval(() => {
			this.y = Math.min(this.world.canvasRef.height, this.y + (0.5 - Math.random()) * 15);
			this.imgRef.src = `/assets/used/enemies/puffer-fish/green/swim/${this.animationState++}.png`;
			if (this.animationState > 5) {
				this.animationState = 1;
			}
		}, ANIMATION_TIME_NORMAL);
	}
}
