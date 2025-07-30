class Level {
	id = 1;
	character;
	enemies;
	assets;
	collectables;

	constructor(id, character, enemies, assets, collectables) {
		this.id = id;
		this.character = character;
		this.enemies = enemies;
		this.assets = assets;
		this.collectables = collectables;
	}
}
