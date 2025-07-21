const cha = new Character({ x: 20, y: 30 });

const canvas = document.getElementById("mainCanvas");

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
	new Object(0, 0, 3840, 1080, "/assets/sharkie/3. Background/Dark/completo.png"),
	new Object(0, 0, 3840, 1080, "/assets/sharkie/3. Background/Layers/2. Floor/D.png"),
	new Object(3840, 0, 3840, 1080, "/assets/sharkie/3. Background/Dark/completo.png"),
];

const world = new World(canvas, cha, enemies, assets);
