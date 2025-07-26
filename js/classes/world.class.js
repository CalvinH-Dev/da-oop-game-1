class World {
	stop;
	accumulator = 0;
	before = 0;
	canvasRef;
	canvasCtx;
	characterRef;
	enemies = [];
	assets = [];
	projectiles = [];
	scrollX = 0;
	maxScrollLeft = 0;
	maxScrollRight = BOARD_WIDTH * 1;
	keyboard;
	levelId;
	showBoxes = false;

	constructor(keyboard, canvasRef) {
		this.canvasRef = canvasRef;
		this.canvasCtx = this.canvasRef.getContext("2d");
		this.keyboard = keyboard;
		this.showHitboxes();
	}

	setLevel(levelId, character, enemies, assets) {
		this.levelId = levelId;
		this.characterRef = character;
		this.enemies = enemies;
		this.assets = assets;
	}

	showHitboxes(bool = true) {
		this.showBoxes = bool;
	}

	stopGame() {
		cancelAnimationFrame(this.stop);
	}

	startGame() {
		const now = performance.now();
		this.before = now;
		this.accumulator = 0;

		requestAnimationFrame(this.gameLoop.bind(this));
	}

	gameLoop(tFrame) {
		this.stop = requestAnimationFrame(this.gameLoop.bind(this));

		const now = tFrame;
		const dt = now - this.before;

		this.before = now;

		this.accumulator += dt;
		const dtInSec = dt / 1000;

		if (!dtInSec) {
			console.log(dt);
		}

		while (this.accumulator >= FPS_INTERVAL) {
			this.update(dtInSec);
			this.accumulator -= FPS_INTERVAL;
		}
		this.render();
	}

	update(dt) {
		this.updateAll(dt);
	}

	updateAll(dt) {
		const updateFns = [
			this.updateProjectiles.bind(this),
			this.updateCharacter.bind(this),
			this.updateEnemies.bind(this),
			this.updateAssets.bind(this),
		];

		for (const updateFn of updateFns) {
			updateFn(dt);
		}
	}

	updateCharacter(dt) {
		this.characterRef.update(dt);
	}

	updateProjectiles(dt) {
		for (const projectile of this.projectiles) {
			projectile.update(dt);
		}
	}

	updateEnemies(dt) {
		for (const enemy of this.enemies) {
			enemy.update(dt);
		}
	}

	updateAssets(dt) {
		for (const asset of this.assets) {
			asset.update(dt);
		}
	}

	render() {
		this.canvasCtx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
		this.renderAll();
	}

	renderAll() {
		const renderFns = [
			this.renderAssets.bind(this),
			this.renderEnemies.bind(this),
			this.renderProjectiles.bind(this),
			this.renderCharacter.bind(this),
		];

		for (const renderFn of renderFns) {
			renderFn();
		}
	}

	renderCharacter() {
		this.characterRef.render(this.canvasCtx, this.showBoxes);
	}

	renderProjectiles() {
		for (const projectile of this.projectiles) {
			projectile.render(this.canvasCtx, this.showBoxes);
		}
	}

	renderEnemies() {
		for (const enemy of this.enemies) {
			enemy.render(this.canvasCtx, this.showBoxes);
		}
	}

	renderAssets() {
		for (const asset of this.assets) {
			asset.render(this.canvasCtx, this.showBoxes);
		}
	}

	drawObjects(objects) {
		for (const obj of objects) {
			obj.drawObject(this.canvasCtx, this.showBoxes);
			obj.checkState();
		}
	}

	scrollRight() {
		if (this.scrollX > -this.maxScrollRight) {
			const amountScroll = this.characterRef.speedX;
			this.canvasCtx.translate(-amountScroll, 0);
			this.scrollX -= amountScroll;
		}
	}

	scrollLeft() {
		if (this.scrollX < this.maxScrollLeft) {
			const amountScroll = this.characterRef.speedX;
			this.canvasCtx.translate(amountScroll, 0);
			this.scrollX += amountScroll;
		}
	}
}
