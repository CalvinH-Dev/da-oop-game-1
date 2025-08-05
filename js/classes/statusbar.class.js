class StatusBar extends Entity {
	type = "";
	images = [];
	constructor(x, y, type) {
		let imgSrc = "";
		if (type === "health") {
			imgSrc = "/assets/used/statuses/health/100.png";
		} else if (type === "coins") {
			imgSrc = "/assets/used/statuses/coins/0.png";
		} else if (type === "poison") {
			imgSrc = "/assets/used/statuses/poison/0.png";
		}

		const height = 158 / 2;
		const width = 595 / 2;

		super(x, y, width, height, imgSrc);
		this.type = type;
		this.cacheAllImages();
	}

	update(ft) {
		if (this.type === "health") {
			this.imgRef = this.getHealthStatus();
		} else if (this.type === "coins") {
			this.imgRef = this.getCoinStatus();
		} else if (this.type === "poison") {
			this.imgRef = this.getPoisonStatus();
		}
	}

	getHealthStatus() {
		return this.cachedImages[
			this.images.filter((img) => img.endsWith(`${this.world.characterRef.hp}.png`))[0]
		];
	}

	getCoinStatus() {
		return this.cachedImages[
			this.images.filter((img) => img.endsWith(`${this.world.characterRef.coins}.png`))[0]
		];
	}

	getPoisonStatus() {
		return this.cachedImages[
			this.images.filter((img) => img.endsWith(`${this.world.characterRef.poison}.png`))[0]
		];
	}

	cacheAllImages() {
		if (this.type === "health") {
			this.images = super.cacheImages(ImageHub.getStatusBarHealthImages());
		} else if (this.type === "coins") {
			this.images = super.cacheImages(ImageHub.getStatusBarCoinsImages());
		} else if (this.type === "poison") {
			this.images = super.cacheImages(ImageHub.getStatusBarPoisonImages());
		}
	}
}
