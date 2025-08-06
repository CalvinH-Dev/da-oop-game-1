function setLevel(levelId) {
	world.canvasCtx.translate(0, 0);

	const level = getLevel1(world);
	const character = level.character;
	const enemies = level.enemies;
	const assets = level.assets;
	const collectables = level.collectables;

	let statusBars = [
		new StatusBar(20, 0, "health"),
		new StatusBar(20, 60, "coins"),
		new StatusBar(20, 120, "poison"),
	];

	const translateX = -1 * world.scrollX;
	world.setLevel(levelId, character, enemies, assets, collectables, translateX);
	world.keyboard = new Keyboard();
	world.statusBars = statusBars;

	for (const bar of statusBars) {
		bar.world = world;
	}
}

const keyboard = new Keyboard();
const world = new World(keyboard, canvas);
let levelId = 1;

setLevel(1);
