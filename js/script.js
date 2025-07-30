function startLevel(levelId) {
	const character = levels[levelId].character;
	const enemies = levels[levelId].enemies;
	const assets = levels[levelId].assets;
	const collectables = levels[levelId].collectables;

	world.setLevel(levelId, character, enemies, assets, collectables);

	world.startGame();
}

startLevel(1);
