class BasicObject {
	imgRef;
	cachedImages = {};
	animationState = 1;
	currentAnimation;
	lastAnimationInterval;
	animationCount;

	width;
	height;
	x;
	y;

	collision = false;
	hitbox = {
		offsetX: 0,
		offsetY: 0,
		width: 0,
		height: 0,
	};

	world;

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
	}

	drawObject(ctx, showBox = false) {
		ctx.drawImage(this.imgRef, this.x, this.y, this.width, this.height);
		if (showBox) {
			this.showHitBox(ctx);
		}
	}

	drawFlippedObject(ctx, showBox = false) {
		ctx.save();
		ctx.translate(this.x + this.width, this.y);
		ctx.scale(-1, 1);
		ctx.drawImage(this.imgRef, 0, 0, this.width, this.height);
		ctx.restore();
		if (showBox) {
			this.showHitBox(ctx);
		}
	}

	drawRotatedObject(ctx, degree, showBox = false) {
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

	animate(name, callback) {
		if (this.currentAnimation === name) return;
		this.stopAnimation();
		this.currentAnimation = name;
		this.lastAnimationInterval = callback();
	}

	stopAnimation() {
		this.currentAnimation = undefined;
		clearInterval(this.lastAnimationInterval);
		this.resetAnimationState();
	}

	resetAnimationState() {
		this.animationState = 0;
	}

	buildBasicAnimation(imgArr, callbackEndEffect = () => {}) {
		this.animationCount = 0;
		return setInterval(() => {
			this.imgRef = this.cachedImages[imgArr[this.animationState]];
			if (this.animationState >= imgArr.length - 1) {
				this.resetAnimationState();
				callbackEndEffect();
				this.animationCount++;
			} else {
				this.animationState++;
			}
		}, ANIMATION_TIME_NORMAL);
	}

	changeSize(options = {}, callbacks = {}) {
		const { callbackMin = () => {}, callbackMax = () => {} } = callbacks;
		const { minSize = 1, maxSize = 2.5, changeRatio = 0.1, randomSign = 25 } = options;
		let multiplier = 1 + changeRatio;
		let applied = 1;

		setInterval(() => {
			if (this.hitbox.offsetX !== undefined) {
				this.hitbox.width *= multiplier;
				this.hitbox.height *= multiplier;
			}
			applied *= multiplier;
			this.height *= multiplier;
			this.width *= multiplier;
			if (applied <= minSize) {
				callbackMin();
				multiplier += 2 * changeRatio;
			}

			if (applied >= maxSize) {
				callbackMax();
				multiplier -= 2 * changeRatio;
			}
		}, ANIMATION_TIME_NORMAL * 2 + Math.random() * randomSign * 10);
	}
}
