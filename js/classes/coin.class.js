class Coin extends Collectable {
	hitbox = {
		offsetX: 0,
		offsetY: 0,
		width: 50,
		height: 50,
	};

	constructor(x, y) {
		const width = 50;
		const height = 50;
		const imgSrc = "/assets/used/collectables/coin/1.png";
		super(x, y, width, height, imgSrc);
	}

	animate(name) {
		switch (name) {
			case "float":
				super.animate("float", ImageHub.getCoinImages());
				break;
		}
	}

	cacheAllImages() {
		this.cacheImages(ImageHub.getCoinImages());
	}

	onCollected() {
		const character = this.world.characterRef;
		character.coins += 1;
		character.heal(10);
		console.log(this.world.characterRef.coins);
		super.onCollected();
	}
}
