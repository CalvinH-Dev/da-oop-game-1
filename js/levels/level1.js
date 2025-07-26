const characterLv1 = new Character({ x: 1000, y: 200 });
characterLv1.world = world;

const pfColorsLv1 = ["green", "orange", "red"];

const enemiesLv1 = [
	new PufferFish(
		{ x: Math.random() * (3840 - 50), y: Math.random() * (1080 - 50) },
		pfColorsLv1[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * (3840 - 50), y: Math.random() * (1080 - 50) },
		pfColorsLv1[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * (3840 - 50), y: Math.random() * (1080 - 50) },
		pfColorsLv1[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * (3840 - 50), y: Math.random() * (1080 - 50) },
		pfColorsLv1[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * (3840 - 50), y: Math.random() * (1080 - 50) },
		pfColorsLv1[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * (3840 - 50), y: Math.random() * (1080 - 50) },
		pfColorsLv1[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * (3840 - 50), y: Math.random() * (1080 - 50) },
		pfColorsLv1[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * (3840 - 50), y: Math.random() * (1080 - 50) },
		pfColorsLv1[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * (3840 - 50), y: Math.random() * (1080 - 50) },
		pfColorsLv1[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * (3840 - 50), y: Math.random() * (1080 - 50) },
		pfColorsLv1[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * (3840 - 50), y: Math.random() * (1080 - 50) },
		pfColorsLv1[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * (3840 - 50), y: Math.random() * (1080 - 50) },
		pfColorsLv1[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * (3840 - 50), y: Math.random() * (1080 - 50) },
		pfColorsLv1[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * (3840 - 50), y: Math.random() * (1080 - 50) },
		pfColorsLv1[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * (3840 - 50), y: Math.random() * (1080 - 50) },
		pfColorsLv1[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * (3840 - 50), y: Math.random() * (1080 - 50) },
		pfColorsLv1[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * (3840 - 50), y: Math.random() * (1080 - 50) },
		pfColorsLv1[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * (3840 - 50), y: Math.random() * (1080 - 50) },
		pfColorsLv1[Math.floor(Math.random() * 3)],
	),
	new PufferFish(
		{ x: Math.random() * (3840 - 50), y: Math.random() * (1080 - 50) },
		pfColorsLv1[Math.floor(Math.random() * 3)],
	),
];

const assetsLv1 = [
	new Entity(0, 0, 3840, 1080, "/assets/used/background/completo.png"),
	new Entity(3840, 0, 3840, 1080, "/assets/used/background/completo.png"),
];

for (const enemy of enemiesLv1) {
	enemy.world = world;
}

for (const asset of assetsLv1) {
	asset.world = world;
}

const level1 = new Level(1, characterLv1, enemiesLv1, assetsLv1);
levels[1] = level1;
