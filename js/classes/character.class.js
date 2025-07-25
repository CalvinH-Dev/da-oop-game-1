class Character extends MoveableObject {
	defaultDirection = "R";
	hitbox = {
		offsetX: 30,
		offsetY: 90,
		width: 100,
		height: 75,
	};

	constructor(position, size, speed) {
		const scale = 1;
		const imgSrc = "/assets/used/character/idle/1.png";
		if (!size) {
			size = { width: 163 * scale, height: 200 * scale };
		}

		if (!speed) {
			speed = { horizontal: 20, vertical: 20 };
		}
		super(position, size, speed, imgSrc);
		this.direction = "R";
		this.collision = true;
		// this.applyGravity();
	}

	defaultAnimation() {
		this.idle();
	}

	animateSwim() {
		return this.buildBasicAnimation(this.swimImages);
	}

	animateIdle() {
		return this.buildBasicAnimation(this.idleImages, this.trackIdleTime.bind(this));
	}

	animateLongIdle() {
		const imgArr = this.longIdleImages;
		this.animationCount = 0;
		return setInterval(() => {
			this.imgRef = this.cachedImages[imgArr[this.animationState]];
			if (this.animationState >= imgArr.length - 1) {
				this.animate("repeatLongIdle");
				this.animationCount++;
				this.resetAnimationState();
			} else {
				this.animationState++;
			}
		}, ANIMATION_TIME_NORMAL);
	}

	animateRepeatLongIdle() {
		const imgArr = this.longIdleRepeatImages;
		this.animationCount = 0;
		return setInterval(() => {
			this.imgRef = this.cachedImages[imgArr[this.animationState]];
			if (this.animationState >= imgArr.length - 1) {
				this.animationCount++;
				this.resetAnimationState();
			} else {
				this.animationState++;
			}
		}, ANIMATION_TIME_NORMAL * 3);
	}

	animateBubble() {
		return this.buildBasicAnimation(this.bubbleImages, this.idleAfterAnimation.bind(this));
	}

	swim() {
		this.animate("swim");
	}

	idle() {
		this.animate("idle");
	}

	longIdle() {
		this.animate("longIdle");
	}

	bubble() {
		this.world.keyboard.enabled = false;
		this.animate("bubble");
	}

	repeatLongIdle() {
		if (this.animationCount >= 1) {
			this.animate("repeatLongIdle");
		}
	}

	idleAfterAnimation() {
		this.world.keyboard.enabled = true;
		this.idle();
	}

	trackIdleTime() {
		if (this.animationCount > 2) {
			this.longIdle();
		}
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
				super.animate("idle", this.animateIdle.bind(this));

				break;
			case "swim":
				super.animate("swim", this.animateSwim.bind(this));

				break;
			case "longIdle":
				super.animate("longIdle", this.animateLongIdle.bind(this));

				break;
			case "repeatLongIdle":
				super.animate("repeatLongIdle", this.animateRepeatLongIdle.bind(this));

				break;
			case "bubble":
				super.animate("bubble", this.animateBubble.bind(this));
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

	cacheAllImages() {
		this.swimImages = ImageHub.getCharacterSwimImages();
		this.idleImages = ImageHub.getCharacterIdleImages();
		this.longIdleImages = ImageHub.getCharacterLongIdleImages();
		this.longIdleRepeatImages = ImageHub.getCharacterLongIdleRepeatImages();
		this.bubbleImages = ImageHub.getCharacterBubbleImages();

		super.cacheImages(this.swimImages);
		super.cacheImages(this.idleImages);
		super.cacheImages(this.longIdleImages);
		super.cacheImages(this.longIdleRepeatImages);
		super.cacheImages(this.bubbleImages);
	}

	checkState() {}
}
