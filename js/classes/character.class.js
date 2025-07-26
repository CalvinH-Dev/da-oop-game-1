class Character extends MoveableEntity {
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
				this.idleAfterAnimation();
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

	idleAfterAnimation() {
		this.world.keyboard.enabled = true;
		this.idle();
		const bubbleProj = new Projectile(
			{
				x: this.x + this.hitbox.offsetX + this.hitbox.width,
				y: this.y + this.hitbox.offsetY + this.hitbox.height / 2 + -25,
			},
			{ width: 50, height: 50 },
			{ y: 200, x: 1000 },
			"assets/used/character/attacks/Bubble.png",
			{ y: 0, x: 50 },
			this.direction === "L" ? "L" : "R",
		);
		bubbleProj.world = this.world;
		bubbleProj.collision = false;
		this.world.projectiles.push(bubbleProj);
	}

	trackIdleTime() {
		if (this.animationCount > 2) {
			this.longIdle();
		}
	}

	moveRight(dt) {
		super.moveRight(dt);
		this.animate("swim");
	}

	moveLeft(dt) {
		super.moveLeft(dt);
		this.animate("swim");
	}

	moveDown(dt) {
		super.moveDown(dt);
		this.animate("swim");
	}

	moveUp(dt) {
		super.moveUp(dt);
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

		super.cacheImages(this.swimImages);
		super.cacheImages(this.idleImages);
		super.cacheImages(this.longIdleImages);
		super.cacheImages(this.longIdleRepeatImages);
		super.cacheImages(this.bubbleImages);
	}
}
