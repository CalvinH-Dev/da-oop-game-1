class Keyboard {
	LEFT = false;
	RIGHT = false;
	UP = false;
	DOWN = false;
	D = false;
	enabled = true;

	action(world, dt) {
		if (!dt) {
			console.log(dt);
		}
		const character = world.characterRef;
		if (!this.enabled) return;
		if (this.LEFT) {
			character.moveLeft(dt);
		} else if (this.RIGHT) {
			character.moveRight(dt);
		} else if (this.UP) {
			character.moveUp(dt);
		} else if (this.DOWN) {
			character.moveDown(dt);
		} else if (this.D) {
			character.bubble();
		}
	}
}
