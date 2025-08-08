class Endboss extends MovableEntity {
	origin;
	state = "idle";
	defaultDirection = "L";
	hitbox = {
		offsetX: 40,
		offsetY: 320,
		width: 400,
		height: 180,
	};
	maxCollisionDamageCooldownInSec = 3;

	wasHit = false;
	hp = 100;
	maxHP = 100;
	collision = false;

	isFriendly = false;

	constructor(position, size, speed) {
		const imgSrc = `assets/used/enemies/whale/spawn/1.png`;
		if (!size) {
			size = { width: 570, height: 608 };
		}

		if (!speed) {
			speed = { x: 400, y: 250 };
		}
		super(position, size, speed, imgSrc);
		this.direction = "U";
		this.origin = position;
		this.animateSpawn();
	}

	animateSpawn() {
		this.animate("spawn");
	}

	idle() {
		this.animate("idle");
	}

	attack() {
		this.animate("attack");
	}

	animate(name) {
		switch (name) {
			case "spawn":
				super.animate("spawn", ImageHub.getWhaleSpawnImages());
				break;
			case "idle":
				super.animate("idle", ImageHub.getWhaleIdleImages());
				break;
			case "attack":
				super.animate("attack", ImageHub.getWhaleAttackImages());
				break;
			case "hurt":
				super.animate("hurt", ImageHub.getWhaleHurtImages());
				break;
			case "dead":
				super.animate("dead", ImageHub.getWhaleDeadImages());
				break;
		}
	}

	cacheAllImages() {
		this.spawnImages = ImageHub.getWhaleSpawnImages();
		this.idleImages = ImageHub.getWhaleIdleImages();
		this.attackImages = ImageHub.getWhaleAttackImages();
		this.hurtImages = ImageHub.getWhaleHurtImages();
		this.deadImages = ImageHub.getWhaleDeadImages();

		super.cacheImages(this.spawnImages);
		super.cacheImages(this.idleImages);
		super.cacheImages(this.attackImages);
		super.cacheImages(this.hurtImages);
		super.cacheImages(this.deadImages);
	}

	update(ft) {
		this.collisionDamageCooldownInSec = Math.max(0, this.collisionDamageCooldownInSec - ft);
		if (this.hp <= 0) this.onDead(ft);
		if (this.state === "hurt" || this.currentAnimation === "spawn") return;

		if (!this.target && this.state === "idle") {
			this.rollAction();
		}

		if (!this.target && this.state === "movingToTarget") {
			this.setTarget(this.origin);
			this.state = "returning";
		} else if (!this.target && this.state === "returning") {
			this.state = "idle";
		} else if ((this.target && this.state === "movingToTarget") || "returning") {
			this.moveToTarget(ft);
		}
	}

	attackPosition(height) {
		const hitboxX = this.x + this.hitbox.offsetX;
		const hitboxY = this.y + this.hitbox.offsetY;

		return {
			x: hitboxX - 60,
			y: hitboxY + this.hitbox.height / 2 + (-1 * height) / 2,
		};
	}

	maul() {
		const attackCoords = this.attackPosition(this.hitbox.height);

		const aBox = { x: attackCoords.x, y: attackCoords.y, width: 60, height: this.hitbox.height };
		let collided = false;
		const character = this.world.characterRef;

		const bBox = character.getHitbox();

		const colliding = CalcFunctions.hitboxesColliding(aBox, bBox);

		if (colliding) {
			collided = true;
			character.onGettingHit(COLLISION_DAMAGE);
		}
	}

	animationTick() {
		if (this.wasHit) {
			this.animate("hurt");
			this.wasHit = false;
		}

		this.imgRef = this.cachedImages[this.frames[this.animationState]];
		this.animationState = (this.animationState + 1) % this.frames.length;

		if (this.animationState === 0) {
			if (this.currentAnimation === "spawn") {
				this.hittable = true;
				this.idle();
			} else if (this.currentAnimation === "hurt" && !this.wasHit) {
				this.animate("idle");
				this.state = "idle";
			} else if (this.currentAnimation === "attack") {
				this.maul();
				this.animate("idle");
				this.state = "idle";
			} else if (this.currentAnimation === "idle" && this.state === "waiting") {
				this.state = "idle";
			} else if (this.currentAnimation === "dead") {
				gameFinished(true);
			}
		}
	}

	effectOnCollision(obj) {
		if (!this.hittable || this.dead) return;

		if (obj.isFriendly == this.isFriendly) return;

		if (this.collisionDamageCooldownInSec === 0) {
			if (!obj.immune) {
				obj.onGettingHit(COLLISION_DAMAGE * 2);
				this.collisionDamageCooldownInSec = this.maxCollisionDamageCooldownInSec;
			}
		}
	}

	onGettingHit(damage) {
		if (this.dead) return;
		this.wasHit = true;
		this.state = "hurt";
		SoundHub.play(SoundHub.whaleHit);
		if (Number(damage)) {
			this.hp -= damage;
		}
	}

	rollAction() {
		const roll = Math.floor(Math.random() * 24);

		if (roll === 0) {
			this.doNothing();
		} else if (roll >= 1 && roll <= 10) {
			this.attackForward();
		} else {
			this.goToRandomTarget();
		}
		return roll;
	}

	attackForward() {
		this.state = "attacking";
		SoundHub.play(SoundHub.whaleAttack);
		this.animate("attack");
	}

	doNothing() {
		this.state = "waiting";
		this.animate("idle");
	}

	goToRandomTarget() {
		const minX = BOARD_WIDTH * 3;
		const maxX = BOARD_WIDTH * 4 - this.hitbox.offsetX - this.hitbox.width;
		const maxY = BOARD_HEIGHT - this.hitbox.offsetY - this.hitbox.height;

		this.setRandomTarget(minX, maxX, maxY);

		this.state = "movingToTarget";
	}

	returnToOrigin() {}

	onDead() {
		this.animate("dead");
		this.dead = true;
	}
}
