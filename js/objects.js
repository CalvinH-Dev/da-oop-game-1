const character = new Character({ x: 1000, y: 200 });

const canvas = document.getElementById("mainCanvas");
canvas.width = BOARD_WIDTH;
canvas.height = BOARD_HEIGHT;

const pfColors = ["green", "orange", "red"];

const enemies = [
	new PufferFish(
		{ x: Math.random() * 3840, y: Math.random() * 1080 },
		pfColors[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * 3840, y: Math.random() * 1080 },
		pfColors[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * 3840, y: Math.random() * 1080 },
		pfColors[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * 3840, y: Math.random() * 1080 },
		pfColors[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * 3840, y: Math.random() * 1080 },
		pfColors[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * 3840, y: Math.random() * 1080 },
		pfColors[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * 3840, y: Math.random() * 1080 },
		pfColors[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * 3840, y: Math.random() * 1080 },
		pfColors[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * 3840, y: Math.random() * 1080 },
		pfColors[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * 3840, y: Math.random() * 1080 },
		pfColors[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * 3840, y: Math.random() * 1080 },
		pfColors[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * 3840, y: Math.random() * 1080 },
		pfColors[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * 3840, y: Math.random() * 1080 },
		pfColors[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * 3840, y: Math.random() * 1080 },
		pfColors[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * 3840, y: Math.random() * 1080 },
		pfColors[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * 3840, y: Math.random() * 1080 },
		pfColors[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * 3840, y: Math.random() * 1080 },
		pfColors[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * 3840, y: Math.random() * 1080 },
		pfColors[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * 3840, y: Math.random() * 1080 },
		pfColors[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * 3840, y: Math.random() * 1080 },
		pfColors[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * 3840, y: Math.random() * 1080 },
		pfColors[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * 3840, y: Math.random() * 1080 },
		pfColors[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * 3840, y: Math.random() * 1080 },
		pfColors[Math.floor(Math.random() * 3)],
	),
];

const assets = [
	new Object(0, 0, 3840, 1080, "/assets/used/background/completo.png"),
	new Object(3840, 0, 3840, 1080, "/assets/used/background/completo.png"),
];

const keyboard = new Keyboard();

const world = new World(keyboard, canvas, character, enemies, assets);
character.world = world;

enemies.forEach((enemy) => {
	enemy.world = world;
});
