class World {
	canvasRef;
	canvasCtx;
	characterRef;
	enemies = [];
	assets = [];
	scrollX = 0;
	maxScrollLeft = 0;
	maxScrollRight = BOARD_WIDTH * 1;
	keyboard;
	levelId;
	showBoxes = false;

	constructor(keyboard, canvasRef, levelId) {
		this.levelId = levelId;
		this.initLevel();
		this.canvasRef = canvasRef;
		this.canvasCtx = this.canvasRef.getContext("2d");
		this.keyboard = keyboard;
		this.showBoxes = true;
	}

	initLevel() {
		this.characterRef = levels[this.levelId].character;
		this.enemies = levels[this.levelId].enemies;
		this.assets = levels[this.levelId].assets;
	}

	update() {
		this.draw();
		requestAnimationFrame(this.update.bind(this));
	}

	draw() {
		this.canvasCtx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
		this.drawObjects(this.assets);
		this.characterRef.drawObject(this.canvasCtx, this.showBoxes);
		this.characterRef.checkState();
		this.drawObjects(this.enemies);
	}

	drawObjects(objects) {
		for (const obj of objects) {
			obj.drawObject(this.canvasCtx, this.showBoxes);
			obj.checkState();
		}
	}

	scrollRight() {
		if (this.scrollX > -this.maxScrollRight) {
			const amountScroll = this.characterRef.horizontalSpeed;
			this.canvasCtx.translate(-amountScroll, 0);
			this.scrollX -= amountScroll;
		}
	}

	scrollLeft() {
		if (this.scrollX < this.maxScrollLeft) {
			const amountScroll = this.characterRef.horizontalSpeed;
			this.canvasCtx.translate(amountScroll, 0);
			this.scrollX += amountScroll;
		}
	}
}
