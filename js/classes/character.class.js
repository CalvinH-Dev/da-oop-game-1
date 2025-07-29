class Character extends MoveableEntity {
	defaultDirection = "R";
	hitbox = {
		offsetX: 30,
		offsetY: 90,
		width: 100,
		height: 75,
	};

	isFriendly = true;

	constructor(position, size, speed) {
		const scale = 1;
		const imgSrc = "/assets/used/character/idle/1.png";
		if (!size) {
			size = { width: 163 * scale, height: 200 * scale };
		}

		if (!speed) {
			speed = { x: 400, y: 300 };
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
		}, ANIMATION_INTERVAL);
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
		}, ANIMATION_INTERVAL * 3);
	}

	animateBubble() {
		return setInterval(() => {
			this.imgRef = this.cachedImages[this.bubbleImages[this.animationState]];
			if (this.animationState >= this.bubbleImages.length - 1) {
				this.resetAnimationState();
				this.shootBubble();
			} else {
				this.animationState++;
			}
		}, 100);
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

	bubblePosition() {
		if (this.direction === "L") {
			return {
				x: this.x + this.hitbox.offsetX - this.hitbox.width / 2,
				y: this.y + this.hitbox.offsetY + this.hitbox.height / 2 + -25,
			};
		} else {
			return {
				x: this.x + this.hitbox.offsetX + this.hitbox.width,
				y: this.y + this.hitbox.offsetY + this.hitbox.height / 2 + -25,
			};
		}
	}

	shootBubble() {
		this.world.keyboard.enabled = true;
		this.idle();
		const direction = this.direction === "L" ? "L" : "R";
		const bubbleProj = new Bubble(this, this.bubblePosition(), direction);
		bubbleProj.world = this.world;
		this.world.projectiles.push(bubbleProj);
		this.animate("idle");
	}

	trackIdleTime() {
		if (this.animationCount > 2) {
			this.longIdle();
		}
	}

	moveRight(dt) {
		super.moveRight(dt);
		if (this.status === "normal") {
			this.animate("swim");
		}
	}

	moveLeft(dt) {
		super.moveLeft(dt);
		if (this.status === "normal") {
			this.animate("swim");
		}
	}

	moveDown(dt) {
		super.moveDown(dt);
		if (this.status === "normal") {
			this.animate("swim");
		}
	}

	moveUp(dt) {
		super.moveUp(dt);
		if (this.status === "normal") {
			this.animate("swim");
		}
	}

	animate(name) {
		switch (name) {
			case "idle":
				super.animate("idle", this.animateIdle.bind(this));

				break;
			case "swim":
				if (this.currentAnimation === "poisoned") {
					console.log("hier");
				}
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

	render(ctx, showBox) {
		if (
			this.direction === this.defaultDirection ||
			this.direction === "U" ||
			this.direction === "D"
		) {
			super.render(ctx, showBox);
		} else {
			super.renderFlipped(ctx, showBox);
		}
	}

	cacheAllImages() {
		this.swimImages = ImageHub.getCharacterSwimImages();
		this.idleImages = ImageHub.getCharacterIdleImages();
		this.longIdleImages = ImageHub.getCharacterLongIdleImages();
		this.longIdleRepeatImages = ImageHub.getCharacterLongIdleRepeatImages();
		this.bubbleImages = ImageHub.getCharacterBubbleImages();
		this.poisonedImages = ImageHub.getCharacterPoisonedImages();

		super.cacheImages(this.swimImages);
		super.cacheImages(this.idleImages);
		super.cacheImages(this.longIdleImages);
		super.cacheImages(this.longIdleRepeatImages);
		super.cacheImages(this.bubbleImages);
		super.cacheImages(this.poisonedImages);
	}

	update(ft) {
		if (this.status === "poisoned" && !this.imgRef.src.includes("poisoned")) {
			this.imgRef = this.cachedImages[this.poisonedImages[0]];
			console.log(this.imgRef.src);
			console.log("SPieler ist vergiftet!");
			this.currentAnimation = "poisoned";
			const poisonedInterval = setInterval(() => {
				this.imgRef = this.cachedImages[this.poisonedImages[this.animationState]];
				if (this.animationState >= this.poisonedImages.length - 1) {
					this.status = "normal";
					this.stopAnimation();
					this.idle();
				} else {
					this.animationState++;
				}
			}, ANIMATION_INTERVAL);
			this.lastAnimationInterval = poisonedInterval;
		}
	}
}
