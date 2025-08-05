function getLevel1(world) {
	const characterLv1 = new Character({ x: 300, y: 200 });
	characterLv1.world = world;

	const pfColorsLv1 = ["green", "orange"];

	const enemiesLv1 = [
		new PufferFish(
			{ x: Math.random() * (3300 - 50) + 500, y: Math.random() * (1080 - 50) },
			pfColorsLv1[Math.floor(Math.random() * 2)],
		),
		new PufferFish(
			{ x: Math.random() * (3300 - 50) + 500, y: Math.random() * (1080 - 50) },
			pfColorsLv1[Math.floor(Math.random() * 2)],
		),
		new PufferFish(
			{ x: Math.random() * (3300 - 50) + 500, y: Math.random() * (1080 - 50) },
			pfColorsLv1[Math.floor(Math.random() * 2)],
		),
		new PufferFish(
			{ x: Math.random() * (3300 - 50) + 500, y: Math.random() * (1080 - 50) },
			pfColorsLv1[Math.floor(Math.random() * 2)],
		),
		new PufferFish(
			{ x: Math.random() * (3300 - 50) + 500, y: Math.random() * (1080 - 50) },
			pfColorsLv1[Math.floor(Math.random() * 2)],
		),
		new PufferFish(
			{ x: Math.random() * (3300 - 50) + 500, y: Math.random() * (1080 - 50) },
			pfColorsLv1[Math.floor(Math.random() * 2)],
		),
		new PufferFish(
			{ x: Math.random() * (3300 - 50) + 500, y: Math.random() * (1080 - 50) },
			pfColorsLv1[Math.floor(Math.random() * 2)],
		),
		new PufferFish(
			{ x: Math.random() * (3300 - 50) + 500, y: Math.random() * (1080 - 50) },
			pfColorsLv1[Math.floor(Math.random() * 2)],
		),
		new PufferFish(
			{ x: Math.random() * (3300 - 50) + 500, y: Math.random() * (1080 - 50) },
			pfColorsLv1[Math.floor(Math.random() * 2)],
		),
		new PufferFish(
			{ x: Math.random() * (3300 - 50) + 500, y: Math.random() * (1080 - 50) },
			pfColorsLv1[Math.floor(Math.random() * 2)],
		),
		new PufferFish(
			{ x: Math.random() * (3300 - 50) + 500, y: Math.random() * (1080 - 50) },
			pfColorsLv1[Math.floor(Math.random() * 2)],
		),
		new PufferFish(
			{ x: Math.random() * (3300 - 50) + 500, y: Math.random() * (1080 - 50) },
			pfColorsLv1[Math.floor(Math.random() * 2)],
		),
		new JellyFish({ x: Math.random() * (3300 - 50) + 500, y: Math.random() * (1080 - 50) }),
		new JellyFish(
			{ x: Math.random() * (3300 - 50) + 500, y: Math.random() * (1080 - 50) },
			"purple",
		),
		new JellyFish(
			{ x: Math.random() * (3300 - 50) + 500, y: Math.random() * (1080 - 50) },
			"purple",
		),
		new JellyFish({ x: Math.random() * (3300 - 50) + 500, y: Math.random() * (1080 - 50) }),
	];

	const assetsLv1 = [
		new Entity(0, 0, 3840, 1080, "/assets/used/background/completo.png"),
		new Entity(3840, 0, 3840, 1080, "/assets/used/background/completo.png"),
	];

	const collectablesLv1 = [
		new Coin(100, 100),
		new Coin(1000, 100),
		new Coin(1000, 400),
		new Coin(100, 400),
		new PoisonCollectable(200, 500),
		new PoisonCollectable(3000, 500),
		new PoisonCollectable(2500, 1000),
	];

	for (const enemy of enemiesLv1) {
		enemy.world = world;
	}

	for (const asset of assetsLv1) {
		asset.world = world;
	}

	for (const collectable of collectablesLv1) {
		collectable.world = world;
	}

	const level = new Level(1, characterLv1, enemiesLv1, assetsLv1, collectablesLv1);
	levels[1] = level;

	return level;
}
