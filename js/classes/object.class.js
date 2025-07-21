class Object {
	width;
	height;
	x;
	y;
	imgRef;

	constructor(x, y, width, height) {
		this.width = width;
		this.height = height;

		this.x = x;
		this.y = y;
	}

	loadImage(src) {
		const image = new Image();
		image.src = src;
		this.imgRef = image;
	}
}
