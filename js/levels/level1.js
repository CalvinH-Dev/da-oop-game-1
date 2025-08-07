function getLevel1(world) {
	const characterLv1 = new Character({ x: 300, y: 200 });
	characterLv1.world = world;

	const enemiesScreenOneAndTwo = createEnemiesFirstAndSecondScreen();

	const enemiesScreenThree = createEnemiesThirdScreen();

	const enemiesLv1 = [...enemiesScreenOneAndTwo, ...enemiesScreenThree];

	const assetsLv1 = [
		new Entity(0, 0, 3840, 1080, "/assets/used/background/completo.png"),
		new Entity(3840, 0, 3840, 1080, "/assets/used/background/completo.png"),
	];

	const collectablesLv1 = createCollectables();

	for (const enemy of enemiesLv1) {
		enemy.world = world;
	}

	for (const asset of assetsLv1) {
		asset.world = world;
	}

	for (const collectable of collectablesLv1) {
		collectable.world = world;
	}

	world.projectiles = [];

	const level = new Level(1, characterLv1, enemiesLv1, assetsLv1, collectablesLv1);
	levels[1] = level;

	return level;
}

function createCollectables() {
	const coins = createCoins();
	const poison = createPoisonCollectables();
	return [...coins, ...poison];
}

function createCoins() {
	return [
		new Coin(1000, 100),
		new Coin(2300, 800),
		new Coin(2700, 900),
		new Coin(3500, 80),
		new Coin(2000, 500),
		new Coin(5000, 700),
		new Coin(5500, 200),
		new Coin(3000, 100),
	];
}

function createPoisonCollectables() {
	return [
		new PoisonCollectable(500, 800),
		new PoisonCollectable(900, 100),
		new PoisonCollectable(1500, 500),
		new PoisonCollectable(2800, 200),
		new PoisonCollectable(3500, 400),
		new PoisonCollectable(4100, 800),
		new PoisonCollectable(5100, 100),
		new PoisonCollectable(5300, 500),
	];
}

function createEnemiesFirstAndSecondScreen() {
	const pufferFishesFirstAndSecond = createPufferFishesFirstAndSecondScreen();
	const jellyFishes = createJellyFishesFirstAndSecondScreen();

	return [...pufferFishesFirstAndSecond, ...jellyFishes];
}

function createEnemiesThirdScreen() {
	const pufferFishesThird = createPufferFishesThirdScreen();
	const jellyFishes = createJellyFishesThirdScreen();

	return [...pufferFishesThird, ...jellyFishes];
}

function createPufferFishesFirstAndSecondScreen() {
	const pfColorsLv1 = ["green", "orange"];

	const pufferFishes = [];

	const count = Math.floor(Math.random() * (16 - 12 + 1)) + 12;

	for (let i = 0; i < count; i++) {
		pufferFishes.push(
			new PufferFish(
				{ x: randomizeFirstAndSecondScreen(50), y: Math.random() * (1080 - 50) },
				pfColorsLv1[Math.floor(Math.random() * 2)],
			),
		);
	}

	return pufferFishes;
}

function createPufferFishesThirdScreen() {
	const pfColorsLv1 = ["green", "orange"];

	const pufferFishes = [];

	const count = Math.floor(Math.random() * (16 - 12 + 1)) + 12;

	for (let i = 0; i < count; i++) {
		pufferFishes.push(
			new PufferFish(
				{ x: randomizeThirdScreen(), y: Math.random() * (1080 - 50) },
				pfColorsLv1[Math.floor(Math.random() * 2)],
			),
		);
	}

	return pufferFishes;
}

function createJellyFishesFirstAndSecondScreen() {
	return [
		new JellyFish({ x: randomizeFirstAndSecondScreen(50), y: Math.random() * (1080 - 50) }),
		new JellyFish(
			{ x: randomizeFirstAndSecondScreen(50), y: Math.random() * (1080 - 50) },
			"purple",
		),
		new JellyFish({ x: randomizeFirstAndSecondScreen(50), y: Math.random() * (1080 - 50) }),
		new JellyFish(
			{ x: randomizeFirstAndSecondScreen(50), y: Math.random() * (1080 - 50) },
			"purple",
		),
	];
}

function createJellyFishesThirdScreen() {
	return [
		new JellyFish({ x: randomizeThirdScreen(), y: Math.random() * (1080 - 50) }, "purple"),
		new JellyFish({ x: randomizeThirdScreen(), y: Math.random() * (1080 - 50) }),
		new JellyFish({ x: randomizeThirdScreen(), y: Math.random() * (1080 - 50) }, "purple"),
		new JellyFish({ x: randomizeThirdScreen(), y: Math.random() * (1080 - 50) }),
	];
}
