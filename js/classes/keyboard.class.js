class Keyboard {
	LEFT = false;
	RIGHT = false;
	UP = false;
	DOWN = false;
	D = false;
	enabled = true;

	action(world, dt) {
		const character = world.characterRef;
		if (!this.enabled) return;
		if (this.LEFT) {
			character.moveLeft(dt);
			if (character.x <= CalcFunctions.getMiddleOfBoardX(world)) {
				world.scrollLeft(dt);
			}
		} else if (this.RIGHT) {
			character.moveRight(dt);
			if (character.x >= CalcFunctions.getMiddleOfBoardX(world)) {
				world.scrollRight(dt);
			}
		} else if (this.UP) {
			character.moveUp(dt);
		} else if (this.DOWN) {
			character.moveDown(dt);
		} else if (this.D) {
			character.bubble();
		} else {
			character.idle();
		}
	}
}
