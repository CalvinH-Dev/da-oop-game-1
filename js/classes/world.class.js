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
		this.canvasCtx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
		for (const asset of this.assets) {
			this.drawObject(asset);
		}
		this.drawObject(this.characterRef);
		for (const enemy of this.enemies) {
			this.drawObject(enemy);
		}
		requestAnimationFrame(this.draw.bind(this));
	}

	drawObject(obj) {
		this.canvasCtx.drawImage(obj.imgRef, obj.x, obj.y, obj.width, obj.height);
	}
}
