class Collectable extends Entity {
	constructor(x, y, width, height, imgSrc) {
		super(x, y, width, height, imgSrc);
	}

	defaultAnimation() {
		this.float();
	}

	float() {
		this.animate("float");
	}

	despawn() {
		this.world.collectables = this.world.collectables.filter((collectable) => collectable != this);
	}

	animationTick(ft) {
		this.imgRef = this.cachedImages[this.frames[this.animationState]];
		this.animationState = (this.animationState + 1) % this.frames.length;
	}

	onCollected() {
		this.despawn();
	}
}
