class Entity {
	world;

	imgRef;
	cachedImages = {};
	animationState = 0;
	currentAnimation;
	lastAnimationInterval;
	animationCount;
	animationLocked = false;
	frames;
	changeSizeInterval;

	collisionDamageCooldownInSec = 0;

	isFriendly = false;

	width;
	height;
	x;
	y;
	hp = 50;
	maxHP = 50;

	collision = false;
	hittable = false;

	hitbox = {
		offsetX: 0,
		offsetY: 0,
		width: 0,
		height: 0,
	};

	statuses = [];

	constructor(x, y, width, height, imgSrc) {
		this.setImage(imgSrc);

		this.width = width;
		this.height = height;

		this.x = x;
		this.y = y;
		this.cacheAllImages();
		this.defaultAnimation();
	}

	cacheAllImages() {}

	checkState() {}

	defaultAnimation() {}

	setImage(src) {
		const image = new Image();
		image.src = src;
		this.imgRef = image;
	}

	cacheImages(images) {
		images.forEach((imagePath) => {
			const img = new Image();
			img.src = imagePath;
			this.cachedImages[imagePath] = img;
		});

		return images;
	}

	render(ctx, showBox = false) {
		ctx.drawImage(this.imgRef, this.x, this.y, this.width, this.height);
		if (showBox) {
			this.showHitBox(ctx);
		}
	}

	renderFlipped(ctx, showBox = false) {
		ctx.save();
		ctx.translate(this.x + this.width, this.y);
		ctx.scale(-1, 1);
		ctx.drawImage(this.imgRef, 0, 0, this.width, this.height);
		ctx.restore();
		if (showBox) {
			this.showHitBox(ctx);
		}
	}

	renderRotated(ctx, degree, showBox = false) {
		ctx.save();
		ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
		ctx.rotate((degree * Math.PI) / 180);
		ctx.drawImage(this.imgRef, -this.width / 2, -this.height / 2, this.width, this.height);
		ctx.restore();
		if (showBox) {
			this.showHitBox(ctx);
		}
	}

	getHitbox() {
		return {
			x: this.x + this.hitbox.offsetX,
			y: this.y + this.hitbox.offsetY,
			width: this.hitbox.width,
			height: this.hitbox.height,
		};
	}

	showHitBox(ctx) {
		ctx.strokeStyle = "red";
		ctx.lineWidth = 2;
		ctx.strokeRect(
			this.x + this.hitbox.offsetX,
			this.y + this.hitbox.offsetY,
			this.hitbox.width,
			this.hitbox.height,
		);
	}

	animate(name, frames) {
		if (this.currentAnimation === name) return;
		this.stopAnimation();
		this.currentAnimation = name;
		this.frames = frames;
		this.animationCount = 0;
	}

	stopAnimation() {
		this.currentAnimation = undefined;
		this.resetAnimationState();
	}

	resetAnimationState() {
		this.animationState = 0;
	}

	update(ft) {}

	animationTick(ft) {}

	effectOnCollision() {}
}
