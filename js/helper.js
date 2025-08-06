function muteSounds() {
	const button = document.getElementById("sound-button");
	const img = button.querySelector("img");
	img.src = "/assets/img/volume-muted.svg";

	SoundHub.muteSounds();
	localStorage.setItem("sound-enabled", JSON.stringify(false));
}

function activateSounds() {
	const button = document.getElementById("sound-button");
	const img = button.querySelector("img");
	img.src = "/assets/img/volume.svg";
	SoundHub.activateSounds();
	localStorage.setItem("sound-enabled", JSON.stringify(true));
}

function openMenu() {
	world.pause();
	muteSounds();
	const menu = document.querySelector(".menu");
	menu.classList.remove("ingame");

	if (world.before !== 0) {
		menu.innerHTML = renderMenuIngame();
		menu.classList.add("ingame");
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
	const menu = document.querySelector(".menu");
	menu.classList.add("d-none");
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
