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
		const direction = this.direction === "L" ? "L" : "R";
		const bubbleProj = new Bubble(this, this.bubblePosition(), direction);
		bubbleProj.world = this.world;
		this.world.projectiles.push(bubbleProj);
		this.idle();
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
				super.animate("idle", ImageHub.getCharacterIdleImages());

				break;
			case "swim":
				super.animate("swim", ImageHub.getCharacterSwimImages());

				break;
			case "longIdle":
				super.animate("longIdle", ImageHub.getCharacterLongIdleImages());

				break;

			case "bubble":
				this.world.keyboard.enabled = false;
				super.animate("bubble", ImageHub.getCharacterBubbleImages());
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
		// if (this.status === "poisoned" && !this.imgRef.src.includes("poisoned")) {
		// 	this.imgRef = this.cachedImages[this.poisonedImages[0]];
		// 	console.log(this.imgRef.src);
		// 	console.log("SPieler ist vergiftet!");
		// 	this.currentAnimation = "poisoned";
		// 	const poisonedInterval = setInterval(() => {
		// 		this.imgRef = this.cachedImages[this.poisonedImages[this.animationState]];
		// 		if (this.animationState >= this.poisonedImages.length - 1) {
		// 			this.status = "normal";
		// 			this.stopAnimation();
		// 			this.idle();
		// 		} else {
		// 			this.animationState++;
		// 		}
		// 	}, ANIMATION_INTERVAL);
		// 	this.lastAnimationInterval = poisonedInterval;
		// }
	}

	animationTick(ft) {
		this.imgRef = this.cachedImages[this.frames[this.animationState]];
		this.animationState = (this.animationState + 1) % this.frames.length;

		if (this.animationState === 0) {
			if (this.currentAnimation === "bubble") {
				this.shootBubble();
			}
		}
	}
}
