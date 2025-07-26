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

		while (this.accumulator >= FPS_INTERVAL) {
			this.update();
			this.accumulator -= FPS_INTERVAL;
		}
		this.render();
	}

	render() {
		this.canvasCtx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
		this.renderAll();
	}

	update() {
		console.log("hier würde jetzt gecheckt werden");
	}

	renderAll() {
		const renderFns = [
			this.renderAssets.bind(this),
			this.renderCharacter.bind(this),
			this.renderEnemies.bind(this),
		];

		for (const renderFn of renderFns) {
			renderFn();
		}
	}

	renderAssets() {
		for (const asset of this.assets) {
			asset.render(this.canvasCtx, this.showBoxes);
		}
	}

	renderEnemies() {
		for (const enemy of this.enemies) {
			enemy.render(this.canvasCtx, this.showBoxes);
		}
	}

	renderCharacter() {
		this.characterRef.render(this.canvasCtx, this.showBoxes);
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
