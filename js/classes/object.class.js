class Object {
	width;
	height;
	x;
	y;
	imgRef;
	collision = false;
	cachedImages = {};
	hitbox = {
		offsetX: 0,
		offsetY: 0,
		width: 0,
		height: 0,
	};

	constructor(x, y, width, height, imgSrc) {
		this.loadImage(imgSrc);
		this.width = width;
		this.height = height;

		this.x = x;
		this.y = y;
	}

	loadImage(src) {
		const image = new Image();
		image.src = src;
		this.imgRef = image;
	}

	drawObject(ctx, showBox = false) {
		ctx.drawImage(this.imgRef, this.x, this.y, this.width, this.height);
		if (showBox) {
			this.showHitBox(ctx);
		}
	}

	drawFlippedObject(ctx, showBox = false, boxColor = "red") {
		ctx.save();
		ctx.translate(this.x + this.width, this.y);
		ctx.scale(-1, 1);
		ctx.drawImage(this.imgRef, 0, 0, this.width, this.height);
		ctx.restore();
		if (showBox) {
			this.showHitBox(ctx);
		}
	}

	drawRotatedObject(ctx, degree, showBox = false, boxColor = "red") {
		ctx.save();
		ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
		ctx.rotate((degree * Math.PI) / 180);
		ctx.drawImage(this.imgRef, -this.width / 2, -this.height / 2, this.width, this.height);
		ctx.restore();
		if (showBox) {
			this.showHitBox(ctx);
		}
	}

	getBigger(options = {}, callbacks = {}) {
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

	checkState() {}
}
