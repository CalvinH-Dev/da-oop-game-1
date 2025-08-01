let state;

window.addEventListener("keydown", (event) => {
	const keyboard = world.keyboard;
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
	const keyboard = world.keyboard;

	// if (
	// 	(event.key === "ArrowLeft" ||
	// 		event.key === "ArrowRight" ||
	// 		event.key === "ArrowUp" ||
	// 		event.key === "ArrowDown") &&
	// 	keyboard.enabled &&
	// 	world.characterRef.status === "normal"
	// ) {
	// 	world.characterRef.animate("idle");
	// }
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

window.addEventListener("blur", () => {
	keyboard.LEFT = false;
	keyboard.RIGHT = false;
	keyboard.UP = false;
	keyboard.DOWN = false;
	keyboard.D = false;
});

window.addEventListener("contextmenu", () => {
	keyboard.LEFT = false;
	keyboard.RIGHT = false;
	keyboard.UP = false;
	keyboard.DOWN = false;
	keyboard.D = false;
});
