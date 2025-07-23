const character = new Character({ x: 1000, y: 200 });

const pfColors = ["green", "orange", "red"];

const enemies = [
	new PufferFish(
		{ x: Math.random() * (3840 - 50), y: Math.random() * (1080 - 50) },
		pfColors[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * (3840 - 50), y: Math.random() * (1080 - 50) },
		pfColors[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * (3840 - 50), y: Math.random() * (1080 - 50) },
		pfColors[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * (3840 - 50), y: Math.random() * (1080 - 50) },
		pfColors[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * (3840 - 50), y: Math.random() * (1080 - 50) },
		pfColors[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * (3840 - 50), y: Math.random() * (1080 - 50) },
		pfColors[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * (3840 - 50), y: Math.random() * (1080 - 50) },
		pfColors[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * (3840 - 50), y: Math.random() * (1080 - 50) },
		pfColors[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * (3840 - 50), y: Math.random() * (1080 - 50) },
		pfColors[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * (3840 - 50), y: Math.random() * (1080 - 50) },
		pfColors[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * (3840 - 50), y: Math.random() * (1080 - 50) },
		pfColors[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * (3840 - 50), y: Math.random() * (1080 - 50) },
		pfColors[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * (3840 - 50), y: Math.random() * (1080 - 50) },
		pfColors[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * (3840 - 50), y: Math.random() * (1080 - 50) },
		pfColors[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * (3840 - 50), y: Math.random() * (1080 - 50) },
		pfColors[Math.floor(Math.random() * 3)],
	),
];

const assets = [
	new Object(0, 0, 3840, 1080, "/assets/used/background/completo.png"),
	new Object(3840, 0, 3840, 1080, "/assets/used/background/completo.png"),
];

const level1 = new Level(1, character, enemies, assets);
levels[1] = level1;
