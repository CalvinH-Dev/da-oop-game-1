class Character extends MoveableEntity {
	defaultDirection = "R";
	hitbox = {
		offsetX: 30,
		offsetY: 90,
		width: 100,
		height: 75,
	};

	isFriendly = true;
	hp = 100;
	poison = {
		lastTick: 0,
		applied: 0,
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

	trackIdleTime() {}

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
		if (this.animationLocked) return;
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

			case "poisoned":
				this.animationLocked = true;
				super.animate("poisoned", ImageHub.getCharacterPoisonedImages());
				break;
			case "hurt":
				this.animationLocked = true;
				super.animate("hurt", ImageHub.getCharacterIsHurtImages());
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
		this.isHurtImages = ImageHub.getCharacterIsHurtImages();

		super.cacheImages(this.swimImages);
		super.cacheImages(this.idleImages);
		super.cacheImages(this.longIdleImages);
		super.cacheImages(this.longIdleRepeatImages);
		super.cacheImages(this.bubbleImages);
		super.cacheImages(this.poisonedImages);
		super.cacheImages(this.isHurtImages);
	}

	update(ft) {
		if (this.hp <= 0) this.onDead();
		if (this.statuses.includes("poisoned")) {
			this.onPoisoned();
		}
	}

	onPoisoned() {
		const now = new Date().getTime() / 1000;
		if (now - this.poison.lastTick >= POISON_TICK_TIME_IN_SEC) {
			this.poison.lastTick = now;
			this.animate("poisoned");
		}

		if (now - this.poison.applied >= POISON_TICK_TIME_IN_SEC * 5) {
			this.statuses = this.statuses.filter((status) => status != "poisoned");
		}
	}

	animationTick(ft) {
		this.imgRef = this.cachedImages[this.frames[this.animationState]];
		this.animationState = (this.animationState + 1) % this.frames.length;

		if (this.animationState === 0) {
			// End of Animation
			if (this.currentAnimation === "bubble") {
				this.shootBubble();
			} else if (this.currentAnimation === "hurt") {
				this.animationLocked = false;
				this.idle();
			} else if (this.currentAnimation === "poisoned") {
				this.animationLocked = false;
				this.idle();
			} else if (this.currentAnimation === "idle" && this.animationCount > 1) {
				this.longIdle();
			} else if (this.currentAnimation === "longIdle") {
				this.animationState = this.frames.length - 1;
			} else {
				this.animationCount++;
			}
		}
	}

	onDead() {
		console.log("Spieler gestorben!");
		cancelAnimationFrame(this.world.stop);
	}

	onHit(damage) {
		if (Number(damage)) {
			this.hp -= damage;
		}
		this.animate("hurt");
		this.animationLocked = true;
	}
}
