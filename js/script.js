function startLevel(levelId) {
	world.canvasCtx.translate(0, 0);
	getLevel1(world);
	const character = levels[levelId].character;
	const enemies = levels[levelId].enemies;
	const assets = levels[levelId].assets;
	const collectables = levels[levelId].collectables;

	world.setLevel(levelId, character, enemies, assets, collectables);
	world.keyboard = new Keyboard();

	const translateX = -1 * world.scrollX;
	world.startGame(translateX);
}

const keyboard = new Keyboard();
const world = new World(keyboard, canvas);
let levelId = 1;

startLevel(1);
