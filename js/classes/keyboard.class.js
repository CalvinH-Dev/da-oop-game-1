class Keyboard {
	LEFT = false;
	RIGHT = false;
	UP = false;
	DOWN = false;
	D = false;
	enabled = true;

	start(world) {
		setInterval(() => {
			this.action(world);
		}, ANIMATION_INTERVAL);
	}

	action(world) {
		const character = world.characterRef;
		if (!this.enabled) return;
		if (this.LEFT) {
			// character.moveLeft();
		} else if (this.RIGHT) {
			// character.moveRight();
		} else if (this.UP) {
			// character.moveUp();
		} else if (this.DOWN) {
			// character.moveDown();
		} else if (this.D) {
			// character.bubble();
		}
	}
}
