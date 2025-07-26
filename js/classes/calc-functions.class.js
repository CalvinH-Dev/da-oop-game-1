class CalcFunctions {
	constructor() {}

	static calcCollisionBox(x, y, hitbox) {
		return {
			x: x + hitbox.offsetX,
			y: y + hitbox.offsetY,
			width: hitbox.width,
			height: hitbox.height,
		};
	}

	static hitboxesColliding(aBox, bBox) {
		return (
			aBox.x < bBox.x + bBox.width &&
			aBox.x + aBox.width > bBox.x &&
			aBox.y < bBox.y + bBox.height &&
			aBox.y + aBox.height > bBox.y
		);
	}

	static isWithinBoundaryTop(yValue) {
		return yValue >= 0;
	}

	static isWithinBoundaryBottom(yValue) {
		return yValue <= BOARD_HEIGHT;
	}

	static isWithinBoundaryLeft(world, xValue) {
		return xValue >= world.maxScrollLeft;
	}

	static isWithinBoundaryRight(world, xValue) {
		return xValue <= BOARD_WIDTH + world.maxScrollRight;
	}

	static checkCollision(obj, x, y) {
		const world = obj.world;
		if (obj === world.characterRef) {
			console.log("hier");
		}
		let isColliding = false;

		const aBox = CalcFunctions.calcCollisionBox(x, y, obj.hitbox);

		for (const enemy of world.enemies) {
			if (!obj.collision || !enemy.collision || isColliding || obj === enemy) continue;

			const bBox = enemy.getHitbox();
			isColliding = CalcFunctions.hitboxesColliding(aBox, bBox);
		}

		for (const asset of world.assets) {
			if (!obj.collision || !asset.collision || isColliding || obj === asset) continue;

			const bBox = asset.getHitbox();
			isColliding = CalcFunctions.hitboxesColliding(aBox, bBox);
		}

		if (
			obj.collision &&
			world.characterRef.collision &&
			!isColliding &&
			obj != world.characterRef
		) {
			const bBox = world.characterRef.getHitbox();
			isColliding = CalcFunctions.hitboxesColliding(aBox, bBox);
		}

		return isColliding;
	}

	static getMiddleOfBoardX(world) {
		return BOARD_WIDTH / 2 - world.scrollX;
	}

	static getMiddleOfBoardY(world) {
		return BOARD_HEIGHT / 2;
	}
}
