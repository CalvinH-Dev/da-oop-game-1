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

	static isWithingBoundaries(world, xValueLeft, xValueRight, yValueTop, yValueBot) {
		return (
			this.isWithinBoundaryTop(yValueTop) &&
			this.isWithinBoundaryBottom(yValueBot) &&
			this.isWithinBoundaryLeft(world, xValueLeft) &&
			this.isWithinBoundaryRight(world, xValueRight)
		);
	}

	static isWithinBoundaryTop(yValueTop) {
		return yValueTop >= 0;
	}

	static isWithinBoundaryBottom(yValueBot) {
		return yValueBot <= BOARD_HEIGHT;
	}

	static isWithinBoundaryLeft(world, xValueLeft) {
		return xValueLeft >= world.maxScrollLeft;
	}

	static isWithinBoundaryRight(world, xValueRight) {
		return xValueRight <= BOARD_WIDTH + world.maxScrollRight;
	}

	static checkCollision(obj, x, y) {
		const world = obj.world;
		let isColliding = false;

		const aBox = CalcFunctions.calcCollisionBox(x, y, obj.hitbox);

		for (const enemy of world.enemies) {
			const bBox = enemy.getHitbox();
			const collided = CalcFunctions.hitboxesColliding(aBox, bBox);
			if (collided && obj.isFriendly) {
				obj.effectOnCollision(enemy);
			}

			if (!obj.collision || !enemy.collision || isColliding || obj === enemy) continue;
			isColliding = collided;
		}

		for (const asset of world.assets) {
			const bBox = asset.getHitbox();
			const collided = CalcFunctions.hitboxesColliding(aBox, bBox);
			if (collided && obj.isFriendly) {
				obj.effectOnCollision(asset);
			}

			if (!obj.collision || !asset.collision || isColliding || obj === asset) continue;
			isColliding = collided;
		}

		if (obj != world.characterRef) {
			const bBox = world.characterRef.getHitbox();
			const collided = CalcFunctions.hitboxesColliding(aBox, bBox);
			if (collided && !obj.isFriendly) {
				obj.effectOnCollision(world.characterRef);
			}

			if (obj.collision && world.characterRef.collision) {
				isColliding = collided;
			}
		}

		return isColliding;
	}

	static checkHitByProjectile(projectile, isFriendly, x, y) {
		const world = projectile.world;

		const aBox = CalcFunctions.calcCollisionBox(x, y, projectile.hitbox);

		if (isFriendly) {
			for (const enemy of world.enemies) {
				const bBox = enemy.getHitbox();
				if (CalcFunctions.hitboxesColliding(aBox, bBox)) {
					projectile.effectOnHit(enemy);
					if (projectile.collision) {
						return projectile.despawn();
					}
				}
			}
		}
	}

	static getMiddleOfBoardX(world) {
		return BOARD_WIDTH / 2 - world.scrollX;
	}

	static getMiddleOfBoardY(world) {
		return BOARD_HEIGHT / 2;
	}
}
