let state;

window.addEventListener("keydown", (event) => {
	const keyboard = world.keyboard;
	if (!keyboard.enabled) return;
	switch (event.key) {
		case "ArrowUp":
			keyboard.UP = true;
			break;
		case "ArrowLeft":
			keyboard.LEFT = true;
			break;
		case "ArrowDown":
			keyboard.DOWN = true;
			break;
		case "ArrowRight":
			keyboard.RIGHT = true;
			break;
		case "d":
			keyboard.D = true;
			break;
		case "f":
			keyboard.F = true;
			break;
	}
});

window.addEventListener("keyup", (event) => {
	const keyboard = world.keyboard;
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
		case "f":
			keyboard.F = false;
			break;
	}
});

window.addEventListener("blur", () => {
	const keyboard = world.keyboard;

	keyboard.LEFT = false;
	keyboard.RIGHT = false;
	keyboard.UP = false;
	keyboard.DOWN = false;
	keyboard.D = false;
});

window.addEventListener("contextmenu", (event) => {
	const keyboard = world.keyboard;

	if (isMobile) {
		event.preventDefault();
	}
	keyboard.LEFT = false;
	keyboard.RIGHT = false;
	keyboard.UP = false;
	keyboard.DOWN = false;
	keyboard.D = false;
});

function keydownMoveCharacter(event, key) {
	event.preventDefault();
	const keyboard = world.keyboard;
	if (!keyboard.enabled) return;
	switch (key) {
		case "ArrowUp":
			keyboard.UP = true;
			break;
		case "ArrowLeft":
			keyboard.LEFT = true;
			break;
		case "ArrowDown":
			keyboard.DOWN = true;
			break;
		case "ArrowRight":
			keyboard.RIGHT = true;
			break;
		case "d":
			keyboard.D = true;
			break;
		case "f":
			keyboard.F = true;
			break;
	}
}

function keyupMoveCharacter(event, key) {
	event.preventDefault();
	const keyboard = world.keyboard;
	switch (key) {
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
		case "f":
			keyboard.F = false;
			break;
	}
}
