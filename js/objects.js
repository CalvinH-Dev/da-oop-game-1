const character = new Character({ x: 1000, y: 200 });

const canvas = document.getElementById("mainCanvas");
canvas.width = BOARD_WIDTH;
canvas.height = BOARD_HEIGHT;

const enemies = [
	new PufferFish({ x: Math.random() * 3840, y: Math.random() * 1080 }),
	new PufferFish({ x: Math.random() * 3840, y: Math.random() * 1080 }),
	new PufferFish({ x: Math.random() * 3840, y: Math.random() * 1080 }),
	new PufferFish({ x: Math.random() * 3840, y: Math.random() * 1080 }),
	new PufferFish({ x: Math.random() * 3840, y: Math.random() * 1080 }),
	new PufferFish({ x: Math.random() * 3840, y: Math.random() * 1080 }),
	new PufferFish({ x: Math.random() * 3840, y: Math.random() * 1080 }),
	new PufferFish({ x: Math.random() * 3840, y: Math.random() * 1080 }),
	new PufferFish({ x: Math.random() * 3840, y: Math.random() * 1080 }),
	new PufferFish({ x: Math.random() * 3840, y: Math.random() * 1080 }),
	new PufferFish({ x: Math.random() * 3840, y: Math.random() * 1080 }),
	new PufferFish({ x: Math.random() * 3840, y: Math.random() * 1080 }),
	new PufferFish({ x: Math.random() * 3840, y: Math.random() * 1080 }),
	new PufferFish({ x: Math.random() * 3840, y: Math.random() * 1080 }),
	new PufferFish({ x: Math.random() * 3840, y: Math.random() * 1080 }),
	new PufferFish({ x: Math.random() * 3840, y: Math.random() * 1080 }),
	new PufferFish({ x: Math.random() * 3840, y: Math.random() * 1080 }),
	new PufferFish({ x: Math.random() * 3840, y: Math.random() * 1080 }),
];

const assets = [
	new Object(0, 0, 3840, 1080, "/assets/used/background/completo.png"),
	new Object(3840, 0, 3840, 1080, "/assets/used/background/completo.png"),
];

const world = new World(canvas, character, enemies, assets);
character.world = world;

enemies.forEach((enemy) => {
	enemy.world = world;
});
