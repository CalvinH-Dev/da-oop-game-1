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

		const dtInSec = dt / 1000;
		this.accumulator += dtInSec;
		this.animationAccumulator += dtInSec;

		while (this.accumulator >= UPDATE_IN_SEC) {
			this.update(UPDATE_IN_SEC); // pixel pro Sekunde ist velocity eines charakters
			this.accumulator -= UPDATE_IN_SEC;
		}

		if (this.animationAccumulator >= ANIMATION_IN_SEC) {
			this.animationTick(ANIMATION_IN_SEC);
			this.animationAccumulator -= ANIMATION_IN_SEC;
		}

		this.keyboard.action(this, dtInSec);
		this.render();
	}

	update(ft) {
		this.updateAll(ft);
	}

	updateAll(ft) {
		const updateFns = [
			this.updateProjectiles.bind(this),
			this.updateCharacter.bind(this),
			this.updateEnemies.bind(this),
			this.updateAssets.bind(this),
		];

		for (const updateFn of updateFns) {
			updateFn(ft);
		}
	}

	updateCharacter(ft) {
		this.characterRef.update(ft);
	}

	updateProjectiles(ft) {
		for (const projectile of this.projectiles) {
			projectile.update(ft);
		}
	}

	updateEnemies(ft) {
		for (const enemy of this.enemies) {
			enemy.update(ft);
		}
	}

	updateAssets(ft) {
		for (const asset of this.assets) {
			asset.update(ft);
		}
	}

	animationTick(ft) {
		this.animateAll(ft);
	}

	animateAll(ft) {
		const animateFns = [
			this.animateProjectiles.bind(this),
			this.animateCharacter.bind(this),
			this.animateEnemies.bind(this),
			this.animateAssets.bind(this),
		];

		for (const animateFn of animateFns) {
			animateFn(ft);
		}
	}

	animateCharacter(ft) {
		this.characterRef.animationTick(ft);
	}

	animateProjectiles(ft) {
		for (const projectile of this.projectiles) {
			projectile.animationTick(ft);
		}
	}

	animateEnemies(ft) {
		for (const enemy of this.enemies) {
			enemy.animationTick(ft);
		}
	}

	animateAssets(ft) {
		for (const asset of this.assets) {
			asset.animationTick(ft);
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

	scrollRight(dt) {
		if (this.scrollX > -this.maxScrollRight) {
			const amountScroll = this.characterRef.speedX * dt;
			this.canvasCtx.translate(-amountScroll, 0);
			this.scrollX -= amountScroll;
		}
	}

	scrollLeft(dt) {
		if (this.scrollX < this.maxScrollLeft) {
			const amountScroll = this.characterRef.speedX * dt;
			this.canvasCtx.translate(amountScroll, 0);
			this.scrollX += amountScroll;
		}
	}
}
