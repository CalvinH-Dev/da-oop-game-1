class World {
	canvasRef;
	canvasCtx;
	characterRef;
	enemies = [];
	assets = [];

	constructor(canvasRef, characterRef, enemies, assets) {
		this.canvasRef = canvasRef;
		this.canvasCtx = this.canvasRef.getContext("2d");
		this.characterRef = characterRef;
		this.enemies = enemies;
		this.assets = assets;
	}

	draw() {
		this.canvasCtx.clearRect(0, 0, 1920, this.canvasRef.height);
		this.drawObjects(this.assets);
		this.drawObject(this.characterRef);
		this.drawObjects(this.enemies);
		requestAnimationFrame(this.draw.bind(this));
	}

	drawObjects(objects) {
		for (const obj of objects) {
			this.drawObject(obj);
		}
	}

	drawObject(obj) {
		this.canvasCtx.drawImage(obj.imgRef, obj.x, obj.y, obj.width, obj.height);
	}

	scroll() {
		this.canvasCtx.translate(-20, 0);
	}
}
