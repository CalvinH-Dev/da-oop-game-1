class World {
	stop;
	accumulator = 0;
	animationAccumulator = 0;
	before = 0;
	canvasRef;
	canvasCtx;
	characterRef;
	enemies = [];
	assets = [];
	projectiles = [];
	collectables = [];
	statusBars = [];
	scrollX = 0;
	maxScrollLeft = 0;
	maxScrollRight = (MAP_WIDTH / BOARD_WIDTH - 1) * BOARD_WIDTH;
	keyboard;
	levelId;
	showBoxes = false;
	playState = "paused";
	endbossSpawned = false;

	constructor(keyboard, canvasRef) {
		this.canvasRef = canvasRef;
		this.canvasCtx = this.canvasRef.getContext("2d");
		this.keyboard = keyboard;
		this.showHitboxes(false);
	}

	setLevel(levelId, character, enemies, assets, collectables) {
		this.levelId = levelId;
		this.characterRef = character;
		this.enemies = enemies;
		this.assets = assets;
		this.collectables = collectables;
		this.scrollX = 0;
	}

	/**
	 * Shows or hides hitboxes for debugging purposes.
	 * @param {boolean} [bool=true] - Whether to show hitboxes.
	 */
	showHitboxes(bool = true) {
		this.showBoxes = bool;
	}

	/**
	 * Starts the game loop and initializes timing.
	 */
	startGame() {
		this.playState = "running";
		const now = performance.now();
		this.before = now;
		this.accumulator = 0;

		requestAnimationFrame(this.gameLoop.bind(this));
	}

	/**
	 * Pauses the game loop and stops enemy animations.
	 */
	pause() {
		if (this.playState === "paused") return;
		this.playState = "paused";
		cancelAnimationFrame(this.stop);
		for (const enemy of this.enemies) {
			enemy.changeSizeInterval = clearInterval(enemy.changeSizeInterval);
		}
	}

	/**
	 * Resumes the game loop.
	 */
	unpause() {
		this.playState = "running";
		this.stop = requestAnimationFrame(this.gameLoop.bind(this));
	}

	/**
	 * Main game loop called each animation frame.
	 * @param {DOMHighResTimeStamp} time - Current timestamp.
	 */
	gameLoop(time) {
		this.stop = requestAnimationFrame(this.gameLoop.bind(this));

		const dtInSec = this._trackTimeOfGameLoop(time);

		this.update(UPDATE_IN_SEC);
		this.animationTick(ANIMATION_IN_SEC);
		this.keyboard.action(this, dtInSec);

		this.checkTerminationConditions();

		this.render();
	}

	/**
	 * Tracks the elapsed time between frames.
	 * @param {DOMHighResTimeStamp} time - Current timestamp.
	 * @returns {number} - Delta time in seconds.
	 */
	_trackTimeOfGameLoop(time) {
		const now = time;
		const dt = now - this.before;

		this.before = now;

		const dtInSec = dt / 1000;
		this.accumulator += dtInSec;
		this.animationAccumulator += dtInSec;
		return dtInSec;
	}

	/**
	 * Checks if game termination conditions are met (e.g. character dead).
	 */
	checkTerminationConditions() {
		if (this.characterRef.dead) {
			this.pause();
			return this.characterRef.onDead();
		}
	}

	/**
	 * Renders the UI elements like status bars.
	 */
	renderUI() {
		const x = 20 - this.scrollX;

		for (const bar of this.statusBars) {
			if (!bar.show) continue;

			bar.x = x;
			if (bar.type === "boss") {
				bar.x = BOARD_WIDTH + x - bar.width - 20;
			}
			bar.render(this.canvasCtx, false);
		}
	}

	/**
	 * Calls update logic if enough time has passed.
	 * @param {number} ft - Fixed timestep for update.
	 */
	update(ft) {
		if (this.accumulator >= UPDATE_IN_SEC) {
			this.updateAll(ft);
			this.accumulator = 0;
		}
	}

	/**
	 * Updates all game entities.
	 * @param {number} ft - Fixed timestep.
	 */
	updateAll(ft) {
		const updateFns = [
			this.updateStatusBars.bind(this),
			this.updateCollectables.bind(this),
			this.updateProjectiles.bind(this),
			this.updateCharacter.bind(this),
			this.updateEnemies.bind(this),
			this.updateAssets.bind(this),
		];

		for (const updateFn of updateFns) {
			updateFn(ft);
		}
	}

	/**
	 * Updates status bars.
	 * @param {number} ft - Fixed timestep.
	 */
	updateStatusBars(ft) {
		for (const bar of this.statusBars) {
			if (!bar.show) continue;
			bar.update(ft);
		}
	}

	/**
	 * Updates collectable items.
	 * @param {number} ft - Fixed timestep.
	 */
	updateCollectables(ft) {
		for (const collectable of this.collectables) {
			collectable.update(ft);
		}
	}

	/**
	 * Updates the player character.
	 * @param {number} ft - Fixed timestep.
	 */
	updateCharacter(ft) {
		this.characterRef.update(ft);
	}

	/**
	 * Updates projectiles.
	 * @param {number} ft - Fixed timestep.
	 */
	updateProjectiles(ft) {
		for (const projectile of this.projectiles) {
			projectile.update(ft);
		}
	}

	/**
	 * Updates enemies.
	 * @param {number} ft - Fixed timestep.
	 */
	updateEnemies(ft) {
		for (const enemy of this.enemies) {
			enemy.update(ft);
		}
	}

	/**
	 * Updates assets.
	 * @param {number} ft - Fixed timestep.
	 */
	updateAssets(ft) {
		for (const asset of this.assets) {
			asset.update(ft);
		}
	}

	/**
	 * Calls animation updates if enough time has passed.
	 * @param {number} ft - Fixed timestep.
	 */
	animationTick(ft) {
		if (this.animationAccumulator >= ANIMATION_IN_SEC) {
			this.animateAll(ft);
			this.animationAccumulator = 0;
		}
	}

	/**
	 * Animates all relevant entities.
	 * @param {number} ft - Fixed timestep.
	 */
	animateAll(ft) {
		const animateFns = [
			this.animateCollectables.bind(this),
			this.animateProjectiles.bind(this),
			this.animateCharacter.bind(this),
			this.animateEnemies.bind(this),
			this.animateAssets.bind(this),
		];

		for (const animateFn of animateFns) {
			animateFn(ft);
		}
	}

	/**
	 * Animates collectables.
	 * @param {number} ft - Fixed timestep.
	 */
	animateCollectables(ft) {
		for (const collectable of this.collectables) {
			collectable.animationTick(ft);
		}
	}

	/**
	 * Animates the player character.
	 * @param {number} ft - Fixed timestep.
	 */
	animateCharacter(ft) {
		this.characterRef.animationTick(ft);
	}

	/**
	 * Animates projectiles.
	 * @param {number} ft - Fixed timestep.
	 */
	animateProjectiles(ft) {
		for (const projectile of this.projectiles) {
			projectile.animationTick(ft);
		}
	}

	/**
	 * Animates enemies.
	 * @param {number} ft - Fixed timestep.
	 */
	animateEnemies(ft) {
		for (const enemy of this.enemies) {
			enemy.animationTick(ft);
		}
	}

	/**
	 * Animates assets.
	 * @param {number} ft - Fixed timestep.
	 */
	animateAssets(ft) {
		for (const asset of this.assets) {
			asset.animationTick(ft);
		}
	}

	/**
	 * Renders all entities and UI elements.
	 */
	render() {
		this.renderEntities();
		this.renderUI();
	}

	/**
	 * Clears the canvas and renders all entities.
	 */
	renderEntities() {
		this.canvasCtx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
		this.renderAll();
	}

	/**
	 * Calls render functions of all entity groups.
	 */
	renderAll() {
		const renderFns = [
			this.renderAssets.bind(this),
			this.renderCollectables.bind(this),
			this.renderEnemies.bind(this),
			this.renderProjectiles.bind(this),
			this.renderCharacter.bind(this),
		];

		for (const renderFn of renderFns) {
			renderFn();
		}
	}

	/**
	 * Renders collectable items.
	 */
	renderCollectables() {
		for (const collectable of this.collectables) {
			collectable.render(this.canvasCtx, this.showBoxes);
		}
	}

	/**
	 * Renders the player character.
	 */
	renderCharacter() {
		this.characterRef.render(this.canvasCtx, this.showBoxes);
	}

	/**
	 * Renders projectiles.
	 */
	renderProjectiles() {
		for (const projectile of this.projectiles) {
			projectile.render(this.canvasCtx, this.showBoxes);
		}
	}

	/**
	 * Renders enemies.
	 */
	renderEnemies() {
		for (const enemy of this.enemies) {
			enemy.render(this.canvasCtx, this.showBoxes);
		}
	}

	/**
	 * Renders assets.
	 */
	renderAssets() {
		for (const asset of this.assets) {
			asset.render(this.canvasCtx, this.showBoxes);
		}
	}

	/**
	 * Scrolls the view to the right if possible.
	 * @param {number} dt - Delta time in seconds.
	 */
	scrollRight(dt) {
		if (this.scrollX > -this.maxScrollRight) {
			const amountScroll = this.characterRef.speedX * dt;
			this.canvasCtx.translate(-amountScroll, 0);
			this.scrollX -= amountScroll;
		}
		if (this.characterRef.x > BOARD_WIDTH * 3) {
			this.spawnEndboss();
		}
	}

	/**
	 * Scrolls the view to the left if possible.
	 * @param {number} dt - Delta time in seconds.
	 */
	scrollLeft(dt) {
		if (this.scrollX < this.maxScrollLeft) {
			const amountScroll = this.characterRef.speedX * dt;
			this.canvasCtx.translate(amountScroll, 0);
			this.scrollX += amountScroll;
		}
	}

	/**
	 * Spawns the endboss once the player reaches the right edge.
	 */
	spawnEndboss() {
		if (!this.endbossSpawned) {
			const boss = new Endboss({ x: MAP_WIDTH - 570, y: 0 });
			boss.world = this;
			this.enemies.push(boss);
			this.endbossSpawned = true;
			this.statusBars.filter((bar) => bar.type === "boss")[0].show = true;
		}
	}
}
