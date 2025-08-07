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

	static collideEffect(obj, objBox, otherObj, isFriendly) {
		const bBox = otherObj.getHitbox();
		const collided = CalcFunctions.hitboxesColliding(objBox, bBox);
		if (collided && isFriendly) {
			obj.effectOnCollision(otherObj);
			otherObj.effectOnCollision(obj);
		}

		return collided;
	}

	static checkCollisionMovableEntities(world, obj, objBox) {
		for (const enemy of world.enemies) {
			const collided = this.collideEffect(obj, objBox, enemy, obj.isFriendly);

			if (!obj.collision || !enemy.collision || isColliding || obj === enemy) continue;
			isColliding = collided;
		}

		if (obj != world.characterRef) {
			const collided = this.collideEffect(obj, objBox, world.characterRef, !obj.isFriendly);

			if (obj.collision && world.characterRef.collision) {
				isColliding = collided;
			}
		}
	}

	static collectableCollision(character, characterBox, collectable) {
		const bBox = collectable.getHitbox();
		const collided = CalcFunctions.hitboxesColliding(characterBox, bBox);
		if (collided) {
			collectable.onCollected(character);
		}
	}

	static checkCollision(obj, x, y) {
		const world = obj.world;
		const character = world.characterRef;
		let isColliding = false;

		const aBox = CalcFunctions.calcCollisionBox(x, y, obj.hitbox);

		this.checkCollisionMovableEntities(world, obj, aBox);

		if (obj === character) {
			for (const collectable of world.collectables) {
				this.collectableCollision(character, aBox, collectable);
			}
		}

		return isColliding;
	}

	static projectileHitEffect(world, projectile, projectileBox) {
		for (const enemy of world.enemies) {
			if (!enemy.hittable) continue;
			const bBox = enemy.getHitbox();
			if (CalcFunctions.hitboxesColliding(projectileBox, bBox)) {
				projectile.effectOnHit(enemy);
				if (projectile.collision) {
					return projectile.despawn();
				}
			}
		}
	}

	static checkHitByProjectile(projectile, isFriendly, x, y) {
		const world = projectile.world;

		const aBox = CalcFunctions.calcCollisionBox(x, y, projectile.hitbox);

		if (!isFriendly) return;
		return this.projectileHitEffect(world, projectile, aBox);
	}

	static getMiddleOfBoardX(world) {
		return BOARD_WIDTH / 2 - world.scrollX;
	}

	static getMiddleOfBoardY(world) {
		return BOARD_HEIGHT / 2;
	}

	static changeSizeEffect() {

	}
}
