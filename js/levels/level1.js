/**
 * Creates and initializes Level 1 of the game, including the player character, enemies, assets, and collectables.
 * @param {World} world - The world object to assign to all entities in this level.
 * @returns {Level} The initialized Level 1 object.
 */
function getLevel1(world) {
	const characterLv1 = new Character({ x: 300, y: 200 });
	characterLv1.world = world;

	const enemiesScreenOneAndTwo = createEnemiesFirstAndSecondScreen();
	const enemiesScreenThree = createEnemiesThirdScreen();
	const enemiesLv1 = [...enemiesScreenOneAndTwo, ...enemiesScreenThree];
	const assetsLv1 = createAssets();
	const collectablesLv1 = createCollectables();

	setWorldOnEntities([...enemiesLv1, ...assetsLv1, ...collectablesLv1], world);

	const level = new Level(1, characterLv1, enemiesLv1, assetsLv1, collectablesLv1);
	levels[1] = level;

	return level;
}

/**
 * Assigns the given world to all entities in the provided array.
 * @param {Object[]} entities - The list of entities to update.
 * @param {World} world - The world to assign to each entity.
 */
function setWorldOnEntities(entities, world) {
	for (const entity of entities) {
		entity.world = world;
	}
}

/**
 * Creates background asset entities for the level.
 * @returns {Entity[]} An array of background asset entities.
 */
function createAssets() {
	return [
		new Entity(0, 0, 3840, 1080, "assets/used/background/completo.png"),
		new Entity(3840, 0, 3840, 1080, "assets/used/background/completo.png"),
	];
}

/**
 * Creates all collectable items for the level, including coins and poison items.
 * @returns {Object[]} An array containing all collectable entities.
 */
function createCollectables() {
	const coins = createCoins();
	const poison = createPoisonCollectables();
	return [...coins, ...poison];
}

/**
 * Creates coin collectables for the level.
 * @returns {Coin[]} An array of Coin objects placed at predefined coordinates.
 */
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

/**
 * Creates poison collectables for the level.
 * @returns {PoisonCollectable[]} An array of PoisonCollectable objects placed at predefined coordinates.
 */
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

/**
 * Creates enemy entities for the first and second screens.
 * @returns {Object[]} An array containing puffer fishes and jelly fishes for the first two screens.
 */
function createEnemiesFirstAndSecondScreen() {
	const pufferFishesFirstAndSecond = createPufferFishesFirstAndSecondScreen();
	const jellyFishes = createJellyFishesFirstAndSecondScreen();

	return [...pufferFishesFirstAndSecond, ...jellyFishes];
}

/**
 * Creates enemy entities for the third screen.
 * @returns {Object[]} An array containing puffer fishes and jelly fishes for the third screen.
 */
function createEnemiesThirdScreen() {
	const pufferFishesThird = createPufferFishesThirdScreen();
	const jellyFishes = createJellyFishesThirdScreen();

	return [...pufferFishesThird, ...jellyFishes];
}

/**
 * Creates puffer fish enemies for the first and second screens with random positions and colors.
 * @returns {PufferFish[]} An array of PufferFish objects.
 */
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

/**
 * Creates puffer fish enemies for the third screen with random positions and colors.
 * @returns {PufferFish[]} An array of PufferFish objects.
 */
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

/**
 * Creates jelly fish enemies for the first and second screens with random positions and colors.
 * @returns {JellyFish[]} An array of JellyFish objects.
 */
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

/**
 * Creates jelly fish enemies for the third screen with random positions and colors.
 * @returns {JellyFish[]} An array of JellyFish objects.
 */
function createJellyFishesThirdScreen() {
	return [
		new JellyFish({ x: randomizeThirdScreen(), y: Math.random() * (1080 - 50) }, "purple"),
		new JellyFish({ x: randomizeThirdScreen(), y: Math.random() * (1080 - 50) }),
		new JellyFish({ x: randomizeThirdScreen(), y: Math.random() * (1080 - 50) }, "purple"),
		new JellyFish({ x: randomizeThirdScreen(), y: Math.random() * (1080 - 50) }),
	];
}
