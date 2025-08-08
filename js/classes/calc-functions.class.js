class CalcFunctions {
	constructor() {}

	/**
	 * Calculates the collision box based on position and hitbox offsets.
	 * @param {number} x - X position of the object.
	 * @param {number} y - Y position of the object.
	 * @param {object} hitbox - Hitbox object with offsetX, offsetY, width, height.
	 * @returns {object} Collision box with x, y, width, and height.
	 */
	static calcCollisionBox(x, y, hitbox) {
		return {
			x: x + hitbox.offsetX,
			y: y + hitbox.offsetY,
			width: hitbox.width,
			height: hitbox.height,
		};
	}

	/**
	 * Checks if two hitboxes are colliding.
	 * @param {object} aBox - First collision box.
	 * @param {object} bBox - Second collision box.
	 * @returns {boolean} True if the boxes overlap, false otherwise.
	 */
	static hitboxesColliding(aBox, bBox) {
		return (
			aBox.x < bBox.x + bBox.width &&
			aBox.x + aBox.width > bBox.x &&
			aBox.y < bBox.y + bBox.height &&
			aBox.y + aBox.height > bBox.y
		);
	}

	/**
	 * Checks if a given area is within the boundaries of the world.
	 * @param {object} world - The world object with maxScrollLeft and maxScrollRight.
	 * @param {number} xValueLeft - Left boundary X value.
	 * @param {number} xValueRight - Right boundary X value.
	 * @param {number} yValueTop - Top boundary Y value.
	 * @param {number} yValueBot - Bottom boundary Y value.
	 * @returns {boolean} True if within all boundaries, false otherwise.
	 */
	static isWithingBoundaries(world, xValueLeft, xValueRight, yValueTop, yValueBot) {
		return (
			this.isWithinBoundaryTop(yValueTop) &&
			this.isWithinBoundaryBottom(yValueBot) &&
			this.isWithinBoundaryLeft(world, xValueLeft) &&
			this.isWithinBoundaryRight(world, xValueRight)
		);
	}

	/**
	 * Checks if a Y value is within the top boundary (>= 0).
	 * @param {number} yValueTop
	 * @returns {boolean}
	 */
	static isWithinBoundaryTop(yValueTop) {
		return yValueTop >= 0;
	}

	/**
	 * Checks if a Y value is within the bottom boundary (<= BOARD_HEIGHT).
	 * @param {number} yValueBot
	 * @returns {boolean}
	 */
	static isWithinBoundaryBottom(yValueBot) {
		return yValueBot <= BOARD_HEIGHT;
	}

	/**
	 * Checks if an X value is within the world's left boundary.
	 * @param {object} world
	 * @param {number} xValueLeft
	 * @returns {boolean}
	 */
	static isWithinBoundaryLeft(world, xValueLeft) {
		return xValueLeft >= world.maxScrollLeft;
	}

	/**
	 * Checks if an X value is within the world's right boundary.
	 * @param {object} world
	 * @param {number} xValueRight
	 * @returns {boolean}
	 */
	static isWithinBoundaryRight(world, xValueRight) {
		return xValueRight <= BOARD_WIDTH + world.maxScrollRight;
	}

	/**
	 * Executes collision effects between two objects if they collide.
	 * @param {object} obj - The first object.
	 * @param {object} objBox - Collision box of the first object.
	 * @param {object} otherObj - The second object.
	 * @param {boolean} isFriendly - Whether the first object is friendly (for logic).
	 * @returns {boolean} True if collision was detected, false otherwise.
	 */
	static collideEffect(obj, objBox, otherObj, isFriendly) {
		const bBox = otherObj.getHitbox();
		const collided = CalcFunctions.hitboxesColliding(objBox, bBox);
		if (collided && isFriendly) {
			obj.effectOnCollision(otherObj);
			otherObj.effectOnCollision(obj);
		}

		return collided;
	}

	/**
	 * Checks collisions between an object and all movable enemies in the world.
	 * @param {object} world - World containing enemies and character.
	 * @param {object} obj - Object to check.
	 * @param {object} objBox - Collision box of the object.
	 * @returns {boolean} True if a collision was found.
	 */
	static checkCollisionMovableEntities(world, obj, objBox) {
		let isColliding = false;

		for (const enemy of world.enemies) {
			if (!obj.collision || !enemy.collision || obj === enemy) continue;
			const collided = this.collideEffect(obj, objBox, enemy, obj.isFriendly);
			if (collided) {
				isColliding = true;
			}
		}

		if (obj !== world.characterRef) {
			const collided = this.collideEffect(obj, objBox, world.characterRef, !obj.isFriendly);
			if (obj.collision && world.characterRef.collision && collided) {
				isColliding = true;
			}
		}

		return isColliding;
	}

	/**
	 * Checks if the character collides with a collectable and triggers its collection.
	 * @param {object} character - The character.
	 * @param {object} characterBox - Collision box of the character.
	 * @param {object} collectable - The collectable item.
	 */
	static collectableCollision(character, characterBox, collectable) {
		const bBox = collectable.getHitbox();
		const collided = CalcFunctions.hitboxesColliding(characterBox, bBox);
		if (collided) {
			collectable.onCollected(character);
		}
	}

	/**
	 * Checks collisions of an object with other objects in the world (enemies, collectables).
	 * @param {object} obj - The moving object.
	 * @param {number} x - New X position.
	 * @param {number} y - New Y position.
	 * @returns {boolean} True if collision is detected.
	 */
	static checkCollision(obj, x, y) {
		const world = obj.world;
		const character = world.characterRef;

		const aBox = CalcFunctions.calcCollisionBox(x, y, obj.hitbox);

		const isColliding = this.checkCollisionMovableEntities(world, obj, aBox);

		if (obj === character) {
			for (const collectable of world.collectables) {
				this.collectableCollision(character, aBox, collectable);
			}
		}

		return isColliding;
	}

	/**
	 * Checks if a projectile hits an enemy object and triggers effects.
	 * @param {object} world - The world.
	 * @param {object} projectile - The projectile.
	 * @param {object} projectileBox - Collision box of the projectile.
	 */
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

	/**
	 * Checks if a projectile hits enemies when it is friendly.
	 * @param {object} projectile - The projectile.
	 * @param {boolean} isFriendly - Whether the projectile is friendly.
	 * @param {number} x - X position of the projectile.
	 * @param {number} y - Y position of the projectile.
	 */
	static checkHitByProjectile(projectile, isFriendly, x, y) {
		if (!isFriendly) return;
		const world = projectile.world;
		const aBox = CalcFunctions.calcCollisionBox(x, y, projectile.hitbox);
		return this.projectileHitEffect(world, projectile, aBox);
	}

	/**
	 * Returns the X coordinate of the center of the board relative to the world scroll.
	 * @param {object} world - The world.
	 * @returns {number} X coordinate of the board center.
	 */
	static getMiddleOfBoardX(world) {
		return BOARD_WIDTH / 2 - world.scrollX;
	}

	/**
	 * Returns the Y coordinate of the center of the board.
	 * @param {object} world - The world.
	 * @returns {number} Y coordinate of the board center.
	 */
	static getMiddleOfBoardY(world) {
		return BOARD_HEIGHT / 2;
	}

	/**
	 * Placeholder for effects applied during size changes.
	 */
	static changeSizeEffect() {}
}
