const canvas = document.getElementById("mainCanvas");
canvas.width = BOARD_WIDTH;
canvas.height = BOARD_HEIGHT;

function loadLocalStorage() {
	const volume = Number(JSON.parse(localStorage.getItem("sound-volume")));
	const isSoundEnabled = JSON.parse(localStorage.getItem("sound-enabled"));
	const volumeInputRef = document.getElementById("volume");

	if (!isSoundEnabled) {
		muteSounds();
	}

	if (volume) {
		volumeInputRef.value = volume;
	}
}

loadLocalStorage();

SoundHub.setVolume();

function initMenu() {
	const menu = document.querySelector(".menu");
	menu.classList.remove("d-none");
	menu.innerHTML = renderMenu();
}

window.screen.orientation.addEventListener("change", () => {
	if (window.screen.orientation.type.startsWith("portrait")) {
		if (world.playState !== "paused") {
			openMenu();
		}
	}
});

initMenu();
