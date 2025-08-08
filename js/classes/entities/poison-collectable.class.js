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
		const imgSrc = "assets/used/collectables/poison/1.png";
		super(x, y, width, height, imgSrc);
	}

	/**
	 * Animates the collectable with a specified animation.
	 * @param {string} name - The name of the animation to play.
	 */
	animate(name) {
		switch (name) {
			case "float":
				super.animate("float", ImageHub.getPoisonCollectableImages());
				break;
		}
	}

	/**
	 * Caches all relevant images for this collectable.
	 */
	cacheAllImages() {
		this.cacheImages(ImageHub.getPoisonCollectableImages());
	}

	/**
	 * Handles the logic when the collectable is collected by the character.
	 * Increases the character's poison level and plays a sound.
	 */
	onCollected() {
		const character = this.world.characterRef;
		character.poison = Math.min(100, character.poison + 20);
		SoundHub.play(SoundHub.poisonCollect);
		super.onCollected();
	}
}
