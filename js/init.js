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

document.querySelector(".fullscreen-button").addEventListener("click", () => {
	const grid = document.querySelector("#mainGrid");

	if (document.fullscreenElement) {
		document.exitFullscreen();
		return;
	}
	grid.requestFullscreen().catch((err) => {
		console.error(`Error enabling fullscreen: ${err.message}`);
	});
});

function initMenu() {
	const menu = document.querySelector(".menu");
	menu.classList.remove("d-none");
	menu.innerHTML = renderMenu();
}

initMenu();
