class StatusBar extends Entity {
	type = "";
	images = [];
	show = true;

	constructor(x, y, type, show = true) {
		let imgSrc = "";
		if (type === "health") {
			imgSrc = "assets/used/statuses/health/100.png";
		} else if (type === "coins") {
			imgSrc = "assets/used/statuses/coins/0.png";
		} else if (type === "poison") {
			imgSrc = "assets/used/statuses/poison/0.png";
		} else if (type === "boss") {
			imgSrc = "assets/used/statuses/health/100.png";
		}

		const height = 158 / 2;
		const width = 595 / 2;

		super(x, y, width, height, imgSrc);
		this.type = type;
		this.show = show;
		this.cacheAllImages();
	}

	/**
	 * Updates the status bar image based on the current frame/time.
	 * @param {number} ft - Frame time or delta time.
	 */
	update(ft) {
		if (this.type === "health") {
			this.imgRef = this.getHealthStatus();
		} else if (this.type === "coins") {
			this.imgRef = this.getCoinStatus();
		} else if (this.type === "poison") {
			this.imgRef = this.getPoisonStatus();
		} else if (this.type === "boss") {
			this.imgRef = this.getBossHealthStatus();
		}
	}

	/**
	 * Gets the current health status image.
	 * @returns {Image} Current health image.
	 */
	getHealthStatus() {
		return this.cachedImages[
			this.images.filter((img) => img.endsWith(`${this.world.characterRef.hp}.png`))[0]
		];
	}

	/**
	 * Gets the current coin status image.
	 * @returns {Image} Current coin image.
	 */
	getCoinStatus() {
		return this.cachedImages[
			this.images.filter((img) => img.endsWith(`${this.world.characterRef.coins}.png`))[0]
		];
	}

	/**
	 * Gets the current poison status image.
	 * @returns {Image} Current poison image.
	 */
	getPoisonStatus() {
		return this.cachedImages[
			this.images.filter((img) => img.endsWith(`${this.world.characterRef.poison}.png`))[0]
		];
	}

	/**
	 * Gets the boss's current health status image.
	 * @returns {Image} Boss health image or empty Image if boss not spawned.
	 */
	getBossHealthStatus() {
		if (!this.world.endbossSpawned) return new Image();
		return this.cachedImages[
			this.images.filter((img) =>
				img.endsWith(`${this.world.enemies.filter((enemy) => enemy instanceof Endboss)[0].hp}.png`),
			)[0]
		];
	}

	/**
	 * Caches all relevant images for the status bar type.
	 */
	cacheAllImages() {
		if (this.type === "health") {
			this.images = super.cacheImages(ImageHub.getStatusBarHealthImages());
		} else if (this.type === "coins") {
			this.images = super.cacheImages(ImageHub.getStatusBarCoinsImages());
		} else if (this.type === "poison") {
			this.images = super.cacheImages(ImageHub.getStatusBarPoisonImages());
		} else if (this.type === "boss") {
			this.images = super.cacheImages(ImageHub.getStatusBarBossHealthImages());
		}
	}

	/**
	 * Renders the status bar.
	 * @param {CanvasRenderingContext2D} ctx - Canvas context to draw on.
	 * @param {boolean} showBoxes - Whether to show bounding boxes.
	 */
	render(ctx, showBoxes) {
		if (this.type === "boss") {
			this.renderFlipped(ctx, showBoxes);
		} else {
			super.render(ctx, showBoxes);
		}
	}
}
