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

			break;
		case "ArrowDown":
			keyboard.DOWN = true;

			// world.characterRef.moveDown();

			break;
		case "ArrowRight":
			keyboard.RIGHT = true;

			// world.characterRef.moveRight();

			break;

		case "d":
			keyboard.D = true;
			// world.characterRef.bubble();

			break;
	}
});

window.addEventListener("keyup", (event) => {
	if (
		(event.key === "ArrowLeft" ||
			event.key === "ArrowRight" ||
			event.key === "ArrowUp" ||
			event.key === "ArrowDown") &&
		keyboard.enabled
	) {
		world.characterRef.animate("idle");
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
		case "d":
			keyboard.D = false;

			break;
	}
});
