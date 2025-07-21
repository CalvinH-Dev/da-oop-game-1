class World {
	canvasRef;
	canvasCtx;
	characterRef;
	enemies = [
		new PufferFish({ x: Math.random() * 1920, y: Math.random() * 1080 }),
		new PufferFish({ x: Math.random() * 1920, y: Math.random() * 1080 }),
		new PufferFish({ x: Math.random() * 1920, y: Math.random() * 1080 }),
		new PufferFish({ x: Math.random() * 1920, y: Math.random() * 1080 }),
		new PufferFish({ x: Math.random() * 1920, y: Math.random() * 1080 }),
		new PufferFish({ x: Math.random() * 1920, y: Math.random() * 1080 }),
		new PufferFish({ x: Math.random() * 1920, y: Math.random() * 1080 }),
	];
	background = new Background();

	constructor(canvasRef, characterRef) {
		this.canvasRef = canvasRef;
		this.canvasCtx = this.canvasRef.getContext("2d");

		this.characterRef = characterRef;
	}

	draw() {
		this.canvasCtx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
		this.drawObject(this.background);
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
