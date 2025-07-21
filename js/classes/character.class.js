class Character extends MoveableObject {
	state = 2;
	constructor(position, size, speed) {
		const imgSrc = "/assets/sharkie/1.Sharkie/1.IDLE/1.png";
		if (!size) {
			size = { width: 100, height: 100 };
		}

		if (!speed) {
			speed = { horizontal: 20, vertical: 20 };
		}
		super(position, size, speed, imgSrc);
	}

	defaultAnimation() {
		this.idle();
	}

	idle() {
		setInterval(() => {
			this.imgRef.src = `/assets/sharkie/1.Sharkie/1.IDLE/${this.state++}.png`;
			if (this.state > 18) {
				this.state = 1;
			}
		}, ANIMATION_TIME_NORMAL);
	}
}
