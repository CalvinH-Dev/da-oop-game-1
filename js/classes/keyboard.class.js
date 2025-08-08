class Keyboard {
	LEFT = false;
	RIGHT = false;
	UP = false;
	DOWN = false;
	D = false;
	F = false;
	enabled = true;

	/**
	 * Executes actions based on current key states.
	 * @param {Object} world - The game world object containing character and scroll logic.
	 * @param {number} dt - Delta time for smooth movement.
	 */
	action(world, dt) {
		const character = world.characterRef;
		if (!this.enabled) return;

		if (this.F) {
			character.finAttack();
		} else if (this.D) {
			character.bubble();
		} else if (this.LEFT) {
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
		} else if (character.currentAnimation !== "longIdle" && !character.animationLocked) {
			character.idle();
		}
	}

	/**
	 * Resets all directional and action keys, and enables input.
	 */
	reset() {
		this.LEFT = false;
		this.RIGHT = false;
		this.UP = false;
		this.DOWN = false;
		this.D = false;
		this.F = false;
		this.enabled = true;
	}
}
