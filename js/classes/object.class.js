class Object {
	width;
	height;
	x;
	y;
	imgRef;
	cachedImages = {};

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

	drawObject(ctx) {
		ctx.drawImage(this.imgRef, this.x, this.y, this.width, this.height);
	}

	drawFlippedObject(ctx) {
		ctx.save();
		ctx.translate(this.x + this.width, this.y);
		ctx.scale(-1, 1);
		ctx.drawImage(this.imgRef, 0, 0, this.width, this.height);
		ctx.restore();
	}

	drawRotatedObject(ctx, degree) {
		ctx.save();
		ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
		ctx.rotate((degree * Math.PI) / 180);
		ctx.drawImage(this.imgRef, -this.width / 2, -this.height / 2, this.width, this.height);
		ctx.restore();
	}

	getBigger(options = {}, callbacks = {}) {
		const { callbackMin = () => {}, callbackMax = () => {} } = callbacks;
		const { minSize = 1, maxSize = 2.5, changeRatio = 0.1, randomSign = 25 } = options;
		let multiplier = 1 + changeRatio;
		let applied = 1;

		setInterval(() => {
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
