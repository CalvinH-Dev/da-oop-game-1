/** @type {HTMLCanvasElement} The main game canvas element. */
const canvas = document.getElementById("mainCanvas");
/** @type {CanvasRenderingContext2D} The 2D rendering context for the main game canvas. */
const canvasCtx = canvas.getContext("2d");

canvas.width = BOARD_WIDTH;
canvas.height = BOARD_HEIGHT;

/**
 * Initializes the game, including menu setup, local storage loading, sound settings, and the initial level.
 */
function init() {
	initMenu();
	loadLocalStorage();
	SoundHub.setVolume();

	resetLevel();
}

/**
 * Loads saved settings from local storage, such as sound volume and mute status, and applies them to the game.
 */
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

/**
 * Initializes the main menu and displays it on screen.
 */
function initMenu() {
	const menu = document.getElementById("menu");
	menu.classList.remove("d-none");
	menu.innerHTML = renderMenu();
}

/**
 * Resets the current level, creating a new World instance while keeping the scroll position if possible.
 */
function resetLevel() {
	const keyboard = new Keyboard();
	let scrollChange = 0;
	if (window.world) {
		scrollChange = world.scrollX;
	}
	window.world = new World(keyboard, canvas);
	let levelId = 1;

	setLevel(levelId, scrollChange);
}

/**
 * Sets up the specified level in the world and restores scroll position if applicable.
 * @param {number} levelId - The ID of the level to load.
 * @param {number} scrollChange - The previous scroll offset to restore.
 */
function setLevel(levelId, scrollChange) {
	const translateX = -1 * scrollChange;
	canvasCtx.translate(translateX, 0);
	initWorld(levelId, world);
	let statusBars = createStatusBars(world);
	world.keyboard = new Keyboard();
	world.statusBars = statusBars;
	world.endbossSpawned = false;
}

/**
 * Initializes the game world by loading a level's entities and assigning them to the world.
 * @param {number} levelId - The ID of the level to initialize.
 * @param {World} world - The world instance to populate.
 */
function initWorld(levelId, world) {
	const level = getLevel(levelId, world);
	const character = level.character;
	const enemies = level.enemies;
	const assets = level.assets;
	const collectables = level.collectables;

	world.setLevel(levelId, character, enemies, assets, collectables);
}

/**
 * Creates and configures all status bars for the given world.
 * @param {World} world - The world instance to link with the status bars.
 * @returns {StatusBar[]} An array of configured StatusBar instances.
 */
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

/**
 * Retrieves the level instance for the specified level ID.
 * @param {number} levelId - The ID of the level to retrieve.
 * @param {World} world - The world instance to assign to the level.
 * @returns {Level} The corresponding level instance.
 */
function getLevel(levelId, world) {
	if (levelId === 1) {
		return getLevel1(world);
	}
}

/**
 * Initialize the Game.
 */
init();
