const canvas = document.getElementById("mainCanvas");
canvas.width = BOARD_WIDTH;
canvas.height = BOARD_HEIGHT;

function init() {
	loadLocalStorage();
	SoundHub.setVolume();
	initMenu();

	const keyboard = new Keyboard();
	window.world = new World(keyboard, canvas);
	let levelId = 1;

	setLevel(levelId);
}

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

function initMenu() {
	const menu = document.querySelector(".menu");
	menu.classList.remove("d-none");
	menu.innerHTML = renderMenu();
}

function setLevel(levelId) {
	initWorld(levelId, world);
	let statusBars = createStatusBars(world);
	world.keyboard = new Keyboard();
	world.statusBars = statusBars;
	world.endbossSpawned = false;
}

function initWorld(levelId, world) {
	world.canvasCtx.translate(0, 0);

	const level = getLevel(levelId, world);
	const character = level.character;
	const enemies = level.enemies;
	const assets = level.assets;
	const collectables = level.collectables;

	const translateX = -1 * world.scrollX;
	world.setLevel(levelId, character, enemies, assets, collectables, translateX);
}

function createStatusBars(world) {
	let statusBars = [
		new StatusBar(20, 0, "health"),
		new StatusBar(20, 60, "coins"),
		new StatusBar(20, 120, "poison"),
		new StatusBar(1900, 0, "boss", false),
	];
	for (const bar of statusBars) {
		bar.world = world;
	}

	return statusBars;
}

function getLevel(levelId, world) {
	if (levelId === 1) {
		return getLevel1(world);
	}
}

init();
