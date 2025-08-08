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

	/** Caches all relevant images for this entity. Override in subclasses. */
	cacheAllImages() {}

	/** Checks or updates the entity state. Override in subclasses. */
	checkState() {}

	/** Starts the default animation. Override in subclasses. */
	defaultAnimation() {}

	/**
	 * Sets the current image from a source path.
	 * @param {string} src - Image source path.
	 */
	setImage(src) {
		const image = new Image();
		image.src = src;
		this.imgRef = image;
	}

	/**
	 * Caches multiple images for animations.
	 * @param {string[]} images - Array of image source paths.
	 * @returns {string[]} The array of images passed in.
	 */
	cacheImages(images) {
		images.forEach((imagePath) => {
			const img = new Image();
			img.src = imagePath;
			this.cachedImages[imagePath] = img;
		});
		return images;
	}

	/**
	 * Renders the entity on the canvas.
	 * @param {CanvasRenderingContext2D} ctx - The drawing context.
	 * @param {boolean} [showBox=false] - Whether to render the hitbox.
	 */
	render(ctx, showBox = false) {
		ctx.drawImage(this.imgRef, this.x, this.y, this.width, this.height);
		if (showBox) {
			this.showHitBox(ctx);
		}
	}

	/**
	 * Renders the entity flipped horizontally.
	 * @param {CanvasRenderingContext2D} ctx - The drawing context.
	 * @param {boolean} [showBox=false] - Whether to render the hitbox.
	 */
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

	/**
	 * Renders the entity rotated by degrees around its center.
	 * @param {CanvasRenderingContext2D} ctx - The drawing context.
	 * @param {number} degree - Rotation in degrees.
	 * @param {boolean} [showBox=false] - Whether to render the hitbox.
	 */
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

	/**
	 * Returns the current hitbox for collision.
	 * @returns {{x: number, y: number, width: number, height: number}} Hitbox rectangle.
	 */
	getHitbox() {
		return {
			x: this.x + this.hitbox.offsetX,
			y: this.y + this.hitbox.offsetY,
			width: this.hitbox.width,
			height: this.hitbox.height,
		};
	}

	/**
	 * Draws the hitbox on the canvas in red stroke.
	 * @param {CanvasRenderingContext2D} ctx - The drawing context.
	 */
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

	/**
	 * Starts an animation by name and sets frames.
	 * @param {string} name - Animation name.
	 * @param {string[]} frames - Array of frame image paths.
	 */
	animate(name, frames) {
		if (this.currentAnimation === name) return;
		this.stopAnimation();
		this.currentAnimation = name;
		this.frames = frames;
		this.animationCount = 0;
	}

	/** Stops any current animation and resets state. */
	stopAnimation() {
		this.currentAnimation = undefined;
		this.resetAnimationState();
	}

	/** Resets animation frame index to zero. */
	resetAnimationState() {
		this.animationState = 0;
	}

	/**
	 * Updates the entity logic per frame. Override as needed.
	 * @param {number} ft - Frame time or delta time.
	 */
	update(ft) {}

	/**
	 * Advances animation frame. Override for animation logic.
	 * @param {number} ft - Frame time or delta time.
	 */
	animationTick(ft) {}

	/** Effect triggered on collision. Override as needed. */
	effectOnCollision() {}
}
