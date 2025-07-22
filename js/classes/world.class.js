class World {
	canvasRef;
	canvasCtx;
	characterRef;
	enemies = [];
	assets = [];
	scrollX = 0;
	maxScrollLeft = 0;
	maxScrollRight = BOARD_WIDTH * 1;

	constructor(canvasRef, characterRef, enemies, assets) {
		this.canvasRef = canvasRef;
		this.canvasCtx = this.canvasRef.getContext("2d");
		this.characterRef = characterRef;
		this.enemies = enemies;
		this.assets = assets;
	}

	update() {
		this.draw();
		requestAnimationFrame(this.update.bind(this));
	}

	draw() {
		this.canvasCtx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
		this.drawObjects(this.assets);
		this.characterRef.drawObject(this.canvasCtx);
		this.drawObjects(this.enemies);
	}

	drawObjects(objects) {
		for (const obj of objects) {
			obj.drawObject(this.canvasCtx);
		}
	}

	// drawObject(obj) {
	// 	this.canvasCtx.drawImage(obj.imgRef, obj.x, obj.y, obj.width, obj.height);
	// }

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
