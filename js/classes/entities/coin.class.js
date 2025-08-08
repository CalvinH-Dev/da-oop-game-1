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
		const imgSrc = "assets/used/collectables/coin/1.png";
		super(x, y, width, height, imgSrc);
	}

	/**
	 * Animates the coin based on the given animation name.
	 * Currently supports "float" animation.
	 *
	 * @param {string} name - The name of the animation to play.
	 */
	animate(name) {
		switch (name) {
			case "float":
				super.animate("float", ImageHub.getCoinImages());
				break;
		}
	}

	/**
	 * Caches all coin images for smooth animation.
	 */
	cacheAllImages() {
		this.cacheImages(ImageHub.getCoinImages());
	}

	/**
	 * Handles logic when the coin is collected.
	 * Increases the character's coin count (max 100) and plays a collection sound.
	 */
	onCollected() {
		const character = this.world.characterRef;
		character.coins = Math.min(100, character.coins + 20);
		SoundHub.play(SoundHub.coinCollect);
		super.onCollected();
	}
}
