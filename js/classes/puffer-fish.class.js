class PufferFish extends MoveableObject {
	state = 2;
	constructor(position, size, speed) {
		const imgSrc = "/assets/sharkie/2.Enemy/1.PufferFish/1.Swim/1.swim1.png";
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
			this.imgRef.src = `/assets/sharkie/2.Enemy/1.PufferFish/1.Swim/1.swim${this.state++}.png`;
			if (this.state > 5) {
				this.state = 1;
			}
		}, ANIMATION_TIME_NORMAL);
	}
}
