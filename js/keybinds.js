let state;

window.addEventListener("keydown", (event) => {
	if (!keyboard.enabled) return;
	switch (event.key) {
		case "ArrowUp":
			keyboard.UP = true;
			// world.characterRef.moveUp();

			break;
		case "ArrowLeft":
			keyboard.LEFT = true;

			// world.characterRef.moveLeft();
			if (world.characterRef.x <= CalcFunctions.getMiddleOfBoardX(world)) {
				world.scrollLeft();
			}

			break;
		case "ArrowDown":
			keyboard.DOWN = true;

			// world.characterRef.moveDown();

			break;
		case "ArrowRight":
			keyboard.RIGHT = true;

			// world.characterRef.moveRight();
			if (world.characterRef.x >= CalcFunctions.getMiddleOfBoardX(world)) {
				world.scrollRight();
			}

			break;

		case "d":
			keyboard.D = true;
			// world.characterRef.bubble();

			break;
	}
});

window.addEventListener("keyup", (event) => {
	if (!keyboard.enabled) return;
	if (
		event.key === "ArrowLeft" ||
		event.key === "ArrowRight" ||
		event.key === "ArrowUp" ||
		event.key === "ArrowDown"
	) {
		// world.characterRef.animate("idle");
	}
	switch (event.key) {
		case "ArrowLeft":
			keyboard.LEFT = false;
			break;
		case "ArrowUp":
			keyboard.UP = false;
			break;
		case "ArrowDown":
			keyboard.DOWN = false;
			break;
		case "ArrowRight":
			keyboard.RIGHT = false;
			break;
	}
});
