/**
 * Handles keydown events for controlling the character with the keyboard.
 */
window.addEventListener("keydown", (event) => {
	const keyboard = world.keyboard;
	if (!keyboard.enabled) return;
	if (event.key === "ArrowUp") keyboard.UP = true;
	else if (event.key === "ArrowLeft") keyboard.LEFT = true;
	else if (event.key === "ArrowDown") keyboard.DOWN = true;
	else if (event.key === "ArrowRight") keyboard.RIGHT = true;
	else if (event.key === "d") keyboard.D = true;
	else if (event.key === "f") keyboard.F = true;
});

/**
 * Handles keyup events for stopping character movement when keys are released.
 */
window.addEventListener("keyup", (event) => {
	const keyboard = world.keyboard;
	if (event.key === "ArrowLeft") keyboard.LEFT = false;
	else if (event.key === "ArrowUp") keyboard.UP = false;
	else if (event.key === "ArrowDown") keyboard.DOWN = false;
	else if (event.key === "ArrowRight") keyboard.RIGHT = false;
	else if (event.key === "d") keyboard.D = false;
	else if (event.key === "f") keyboard.F = false;
});

/**
 * Simulates a keydown action for moving the character.
 * @param {Event} event - The triggering event object.
 * @param {string} key - The key identifier (e.g., "ArrowUp", "d").
 */
function keydownMoveCharacter(event, key) {
	const keyboard = world.keyboard;
	if (!keyboard.enabled) return;
	if (key === "ArrowUp") keyboard.UP = true;
	else if (key === "ArrowLeft") keyboard.LEFT = true;
	else if (key === "ArrowDown") keyboard.DOWN = true;
	else if (key === "ArrowRight") keyboard.RIGHT = true;
	else if (key === "d") keyboard.D = true;
	else if (key === "f") keyboard.F = true;
}

/**
 * Simulates a keyup action for stopping the character's movement.
 * @param {Event} event - The triggering event object.
 * @param {string} key - The key identifier (e.g., "ArrowUp", "d").
 */
function keyupMoveCharacter(event, key) {
	const keyboard = world.keyboard;
	if (key === "ArrowLeft") keyboard.LEFT = false;
	else if (key === "ArrowUp") keyboard.UP = false;
	else if (key === "ArrowDown") keyboard.DOWN = false;
	else if (key === "ArrowRight") keyboard.RIGHT = false;
	else if (key === "d") keyboard.D = false;
	else if (key === "f") keyboard.F = false;
}

/**
 * Resets all movement keys when the window loses focus to prevent stuck movement.
 */
window.addEventListener("blur", () => {
	const keyboard = world.keyboard;

	keyboard.LEFT = false;
	keyboard.RIGHT = false;
	keyboard.UP = false;
	keyboard.DOWN = false;
	keyboard.D = false;
});

/**
 * Handles right-click events. On mobile, it prevents the default context menu from appearing
 * and resets movement keys.
 */
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
