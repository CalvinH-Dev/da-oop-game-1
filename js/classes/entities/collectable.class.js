class Collectable extends Entity {
	constructor(x, y, width, height, imgSrc) {
		super(x, y, width, height, imgSrc);
	}

	/** Starts the default animation (floating). */
	defaultAnimation() {
		this.float();
	}

	/** Plays the float animation. */
	float() {
		this.animate("float");
	}

	/** Removes this collectible from the world's collectible list. */
	despawn() {
		this.world.collectables = this.world.collectables.filter((collectable) => collectable != this);
	}

	/**
	 * Advances the animation frame.
	 * @param {number} ft - Frame time or delta time.
	 */
	animationTick(ft) {
		this.imgRef = this.cachedImages[this.frames[this.animationState]];
		this.animationState = (this.animationState + 1) % this.frames.length;
	}

	/** Handles what happens when the collectible is collected by a player or entity. */
	onCollected() {
		this.despawn();
	}
}
