function startLevel(levelId) {
	const character = levels[levelId].character;
	const enemies = levels[levelId].enemies;
	const assets = levels[levelId].assets;

	world.setLevel(levelId, character, enemies, assets);

	world.startGame();
}

startLevel(1);
