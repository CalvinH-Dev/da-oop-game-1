const cha = new Character({ x: 20, y: 30 });

const canvas = document.getElementById("mainCanvas");

const enemies = [
	new PufferFish({ x: Math.random() * 1920, y: Math.random() * 1080 }),
	new PufferFish({ x: Math.random() * 1920, y: Math.random() * 1080 }),
	new PufferFish({ x: Math.random() * 1920, y: Math.random() * 1080 }),
	new PufferFish({ x: Math.random() * 1920, y: Math.random() * 1080 }),
	new PufferFish({ x: Math.random() * 1920, y: Math.random() * 1080 }),
	new PufferFish({ x: Math.random() * 1920, y: Math.random() * 1080 }),
	new PufferFish({ x: Math.random() * 1920, y: Math.random() * 1080 }),
];

const assets = [new Object(0, 0, 1920, 1080, "/assets/sharkie/3. Background/Dark/1.png")];

const world = new World(canvas, cha, enemies, assets);
