class Character extends MoveableObject {
	constructor(position, size, speed) {
		const imgSrc = "/assets/used/character/idle/1.png";
		if (!size) {
			size = { width: 100, height: 100 };
		}

		if (!speed) {
			speed = { horizontal: 20, vertical: 20 };
		}
		super(position, size, speed, imgSrc);
	}

	defaultAnimation() {
		return this.idle();
	}

	swim() {
		return setInterval(() => {
			this.imgRef.src = `/assets/used/character/swim/${this.animationState++}.png`;
			if (this.animationState > 6) {
				this.animationState = 1;
			}
		}, ANIMATION_TIME_NORMAL);
	}

	idle() {
		return setInterval(() => {
			this.imgRef.src = `/assets/used/character/idle/${this.animationState++}.png`;
			if (this.animationState > 18) {
				this.animationState = 1;
			}
		}, ANIMATION_TIME_NORMAL);
	}

	moveRight() {
		super.moveRight();
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
}
