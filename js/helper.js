function muteSounds() {
	SoundHub.muteSounds();
	setSoundButtons();
}

function activateSounds() {
	SoundHub.activateSounds();
	setSoundButtons();
}

function backToMenu() {
	resetLevel();
	openMenu();
}

function openMenu() {
	world.pause();
	const menu = document.querySelector("#menu");
	menu.innerHTML = renderMenu();

	const isSoundMuted = SoundHub.muted;
	if (isSoundMuted) {
		muteSounds();
	} else {
		activateSounds();
	}

	menu.classList.remove("d-none");
}

function closeMenu() {
	world.unpause();
	if (!SoundHub.muted) {
		activateSounds();
	}
	const menu = document.querySelector(".menu");
	menu.classList.add("d-none");
}

function startGame() {
	const menu = document.querySelector("#menu");
	menu.classList.add("d-none");
	menu.classList.remove("with-bg");
	if (!SoundHub.muted) {
		activateSounds();
	}
	world.startGame();
}

function restartGame() {
	const levelId = world.levelId;
	setLevel(levelId);
	startGame();
}

const isLandscape = () => window.screen.orientation.type.startsWith("landscape");
const isPortrait = () => window.screen.orientation.type.startsWith("portrait");

function gameFinished(playerHasWon) {
	world.pause();
	if (playerHasWon) {
		setLevel(1);
		winMenu();
	} else {
		setLevel(1);
		loseMenu();
	}
}

function loseMenu() {
	const menu = document.querySelector("#menu");
	menu.classList.remove("d-none");
	menu.innerHTML = renderLoseMenu();
}

function winMenu() {
	const menu = document.querySelector("#menu");
	menu.classList.remove("d-none");
	menu.innerHTML = renderWinMenu();
}

function randomizeFirstAndSecondScreen(width) {
	return Math.floor(Math.random() * (3300 - width)) + 500;
}

function randomizeThirdScreen(width) {
	return Math.floor(Math.random() * (5760 - 3840 + 1)) + 3840;
}

function setSoundButtons() {
	const soundButtonRef = document.getElementById("sound-button");

	if (SoundHub.muted) {
		const img = soundButtonRef.querySelector("img");
		img.src = "assets/img/volume-muted.svg";
	} else {
		const img = soundButtonRef.querySelector("img");
		img.src = "assets/img/volume.svg";
	}

	const volume = SoundHub.volume;

	const volumeInputRef = document.getElementById("volume");
	volumeInputRef.value = volume;
}
