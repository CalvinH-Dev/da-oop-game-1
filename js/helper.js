/**
 * Mutes all game sounds and updates the sound button UI.
 */
function muteSounds() {
	SoundHub.muteSounds();
	setSoundButtons();
}

/**
 * Activates all game sounds and updates the sound button UI.
 */
function activateSounds() {
	SoundHub.activateSounds();
	setSoundButtons();
}

/**
 * Resets the current level and returns to the main menu.
 */
function backToMenu() {
	resetLevel();
	openMenu();
}

/**
 * Toggles the visibility of the main menu.
 */
function toggleMenu() {
	const menu = document.querySelector("#menu");
	if (!menu.classList.contains("d-none")) {
		closeMenu();
	} else {
		openMenu();
	}
}

/**
 * Opens the main menu, pauses the game, and updates the UI.
 */
function openMenu() {
	world.pause();
	const menu = document.querySelector("#menu");
	menu.innerHTML = renderMenu();

	toggleSounds();

	menu.classList.remove("d-none");
}

/**
 * Toggles the sound state (mute/unmute) based on the current mute status.
 */
function toggleSounds() {
	const isSoundMuted = SoundHub.muted;

	if (isSoundMuted) {
		muteSounds();
	} else {
		activateSounds();
	}
}

/**
 * Closes the main menu, resumes the game, and toggles sound settings.
 */
function closeMenu() {
	world.startGame();

	toggleSounds();

	const menu = document.querySelector("#menu");
	menu.classList.add("d-none");
}

/**
 * Resumes the game from the paused state and hides the background overlay in the menu.
 */
function resumeGame() {
	const menu = document.querySelector("#menu");
	menu.classList.remove("with-bg");
	closeMenu();
}

/**
 * Restarts the game by resetting the level and resuming gameplay.
 */
function restartGame() {
	resetLevel();
	resumeGame();
}

/**
 * Handles the end of a game, displaying win or lose menus depending on the outcome.
 * @param {boolean} playerHasWon - Whether the player has won the game.
 */
function gameFinished(playerHasWon) {
	world.pause();
	if (playerHasWon) {
		SoundHub.play(SoundHub.won);
		resetLevel();
		winMenu();
	} else {
		resetLevel();
		loseMenu();
	}
}

/**
 * Displays the "Lose" menu.
 */
function loseMenu() {
	const menu = document.querySelector("#menu");
	menu.classList.remove("d-none");
	menu.innerHTML = renderLoseMenu();
}

/**
 * Displays the "Win" menu.
 */
function winMenu() {
	const menu = document.querySelector("#menu");
	menu.classList.remove("d-none");
	menu.innerHTML = renderWinMenu();
}

/**
 * Generates a random x-coordinate for entities in the first and second screens.
 * @param {number} width - The width offset to avoid entity spawning too close to the edges.
 * @returns {number} A random x-coordinate within the first and second screens.
 */
function randomizeFirstAndSecondScreen(width) {
	return Math.floor(Math.random() * (3300 - width)) + 500;
}

/**
 * Generates a random x-coordinate for entities in the third screen.
 * @param {number} [width] - Optional width offset to avoid entity spawning too close to the edges.
 * @returns {number} A random x-coordinate within the third screen.
 */
function randomizeThirdScreen(width) {
	return Math.floor(Math.random() * (5760 - 3840 + 1)) + 3840;
}

/**
 * Updates the sound button icon and volume slider based on the current sound state.
 */
function setSoundButtons() {
	const soundButtonRef = document.getElementById("sound-button");

	if (SoundHub.muted) {
		const img = soundButtonRef.querySelector("img");
		img.src = "assets/img/volume-muted.svg";
	} else {
		const img = soundButtonRef.querySelector("img");
		img.src = "assets/img/volume.svg";
	}

	document.getElementById("volume").value = SoundHub.volume;
}

// Handle screen orientation changes on mobile
window.screen.orientation.addEventListener("change", () => {
	if (window.screen.orientation.type.startsWith("portrait")) {
		if (world.playState !== "paused") {
			openMenu();
		}
	}
});

/**
 * Toggles fullscreen mode for the main game view.
 */
function toggleFullscreen() {
	if (isFullscreen()) {
		document.exitFullscreen();
	} else {
		const mainView = document.querySelector(".main-view");
		mainView.requestFullscreen();
		openMenu();
	}
}

/**
 * Checks if the game is currently in fullscreen mode.
 * @returns {boolean} True if the main view is in fullscreen, otherwise false.
 */
function isFullscreen() {
	const mainView = document.querySelector(".main-view");
	return document.fullscreenElement === mainView;
}

/**
 * Indicates whether the user is on a mobile device.
 * @type {boolean}
 */
const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
