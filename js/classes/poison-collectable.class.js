class PoisonCollectable extends Collectable {
	hitbox = {
		offsetX: 7,
		offsetY: 18,
		width: 40,
		height: 55,
	};

	constructor(x, y) {
		const width = 55;
		const height = 75;
		const imgSrc = "/assets/used/collectables/poison/1.png";
		super(x, y, width, height, imgSrc);
	}

	animate(name) {
		switch (name) {
			case "float":
				super.animate("float", ImageHub.getPoisonCollectableImages());
				break;
		}
	}

	cacheAllImages() {
		this.cacheImages(ImageHub.getPoisonCollectableImages());
	}

	onCollected() {
		const character = this.world.characterRef;
		character.poison = Math.min(100, character.poison + 20);
		super.onCollected();
	}
}
