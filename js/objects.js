let levelId = 1;
const world = new World(keyboard, canvas, levelId);
levels[levelId].character.world = world;

levels[levelId].enemies.forEach((enemy) => {
	enemy.world = world;
});
