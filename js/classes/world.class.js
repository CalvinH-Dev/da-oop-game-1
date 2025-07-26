class World {
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

	update(elapsed) {
		console.log(elapsed);
		this.draw();
		requestAnimationFrame(this.update.bind(this));
	}

	draw() {
		this.canvasCtx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
		this.drawObjects(this.assets);
		this.characterRef.drawObject(this.canvasCtx, this.showBoxes);
		this.characterRef.checkState();
		this.drawObjects(this.enemies);
		this.drawObjects(this.projectiles);
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
