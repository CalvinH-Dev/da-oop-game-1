class ImageHub {
	/**
	 * Returns an array of image paths for character swimming animation.
	 * @returns {string[]}
	 */
	static getCharacterSwimImages() {
		return [
			"assets/used/character/swim/1.png",
			"assets/used/character/swim/2.png",
			"assets/used/character/swim/3.png",
			"assets/used/character/swim/4.png",
			"assets/used/character/swim/5.png",
			"assets/used/character/swim/6.png",
		];
	}

	/**
	 * Returns an array of image paths for character idle animation.
	 * @returns {string[]}
	 */
	static getCharacterIdleImages() {
		return [
			"assets/used/character/idle/1.png",
			"assets/used/character/idle/2.png",
			"assets/used/character/idle/3.png",
			"assets/used/character/idle/4.png",
			"assets/used/character/idle/5.png",
			"assets/used/character/idle/6.png",
			"assets/used/character/idle/7.png",
			"assets/used/character/idle/8.png",
			"assets/used/character/idle/9.png",
			"assets/used/character/idle/10.png",
			"assets/used/character/idle/11.png",
			"assets/used/character/idle/12.png",
			"assets/used/character/idle/13.png",
			"assets/used/character/idle/14.png",
			"assets/used/character/idle/15.png",
			"assets/used/character/idle/16.png",
			"assets/used/character/idle/17.png",
			"assets/used/character/idle/18.png",
		];
	}

	/**
	 * Returns an array of image paths for character long idle animation.
	 * @returns {string[]}
	 */
	static getCharacterLongIdleImages() {
		return [
			"assets/used/character/long-idle/1.png",
			"assets/used/character/long-idle/2.png",
			"assets/used/character/long-idle/3.png",
			"assets/used/character/long-idle/4.png",
			"assets/used/character/long-idle/5.png",
			"assets/used/character/long-idle/6.png",
			"assets/used/character/long-idle/7.png",
			"assets/used/character/long-idle/8.png",
			"assets/used/character/long-idle/9.png",
			"assets/used/character/long-idle/10.png",
			"assets/used/character/long-idle/11.png",
			"assets/used/character/long-idle/12.png",
			"assets/used/character/long-idle/13.png",
			"assets/used/character/long-idle/14.png",
		];
	}

	/**
	 * Returns an array of image paths for repeated character long idle animation (reverse).
	 * @returns {string[]}
	 */
	static getCharacterLongIdleRepeatImages() {
		return [
			"assets/used/character/long-idle/14.png",
			"assets/used/character/long-idle/13.png",
			"assets/used/character/long-idle/12.png",
			"assets/used/character/long-idle/11.png",
			"assets/used/character/long-idle/10.png",
			"assets/used/character/long-idle/9.png",
			"assets/used/character/long-idle/8.png",
		];
	}

	/**
	 * Returns an array of image paths for character bubble animation.
	 * @returns {string[]}
	 */
	static getCharacterBubbleImages() {
		return [
			"assets/used/character/bubble/1.png",
			"assets/used/character/bubble/2.png",
			"assets/used/character/bubble/3.png",
			"assets/used/character/bubble/4.png",
			"assets/used/character/bubble/5.png",
			"assets/used/character/bubble/6.png",
			"assets/used/character/bubble/7.png",
			"assets/used/character/bubble/8.png",
		];
	}

	/**
	 * Returns an array of image paths for character fin animation.
	 * @returns {string[]}
	 */
	static getCharacterFinImages() {
		return [
			"assets/used/character/fin/1.png",
			"assets/used/character/fin/4.png",
			"assets/used/character/fin/5.png",
			"assets/used/character/fin/6.png",
			"assets/used/character/fin/7.png",
			"assets/used/character/fin/8.png",
		];
	}

	/**
	 * Returns an array of image paths for character poisoned status animation.
	 * @returns {string[]}
	 */
	static getCharacterPoisonedImages() {
		return [
			"assets/used/character/statuses/poisoned/1.png",
			"assets/used/character/statuses/poisoned/2.png",
			"assets/used/character/statuses/poisoned/3.png",
			"assets/used/character/statuses/poisoned/4.png",
		];
	}

	/**
	 * Returns an array of image paths for character hurt status animation.
	 * @returns {string[]}
	 */
	static getCharacterIsHurtImages() {
		return [
			"assets/used/character/statuses/hurt/1.png",
			"assets/used/character/statuses/hurt/2.png",
			"assets/used/character/statuses/hurt/1.png",
			"assets/used/character/statuses/hurt/2.png",
			"assets/used/character/statuses/hurt/1.png",
			"assets/used/character/statuses/hurt/2.png",
		];
	}

	/**
	 * Returns an array of image paths for character dead animation.
	 * @returns {string[]}
	 */
	static getCharacterIsDeadImages() {
		return [
			"assets/used/character/dead/normal/1.png",
			"assets/used/character/dead/normal/2.png",
			"assets/used/character/dead/normal/3.png",
			"assets/used/character/dead/normal/5.png",
			"assets/used/character/dead/normal/6.png",
			"assets/used/character/dead/normal/7.png",
			"assets/used/character/dead/normal/8.png",
			"assets/used/character/dead/normal/9.png",
			"assets/used/character/dead/normal/10.png",
			"assets/used/character/dead/normal/11.png",
			"assets/used/character/dead/normal/12.png",
		];
	}

	/**
	 * Returns an array of image paths for character electrified status animation.
	 * @returns {string[]}
	 */
	static getCharacterElectrifiedImages() {
		return [
			"assets/used/character/statuses/electrified/1.png",
			"assets/used/character/statuses/electrified/2.png",
			"assets/used/character/statuses/electrified/3.png",
			"assets/used/character/statuses/electrified/1.png",
			"assets/used/character/statuses/electrified/2.png",
			"assets/used/character/statuses/electrified/3.png",
		];
	}

	/**
	 * Returns an array of image paths for puffer fish swimming animation based on color.
	 * @param {string} color - Color variant of the puffer fish.
	 * @returns {string[]}
	 */
	static getPufferFishSwimImages(color) {
		return [
			`assets/used/enemies/puffer-fish/${color}/swim/1.png`,
			`assets/used/enemies/puffer-fish/${color}/swim/2.png`,
			`assets/used/enemies/puffer-fish/${color}/swim/3.png`,
			`assets/used/enemies/puffer-fish/${color}/swim/4.png`,
			`assets/used/enemies/puffer-fish/${color}/swim/5.png`,
		];
	}

	/**
	 * Returns an array of image paths for puffer fish dead animation based on color.
	 * @param {string} color - Color variant of the puffer fish.
	 * @returns {string[]}
	 */
	static getPufferFishDeadImages(color) {
		return [`assets/used/enemies/puffer-fish/${color}/dead/1.png`];
	}

	/**
	 * Returns an array of image paths for jellyfish swimming animation based on color.
	 * @param {string} color - Color variant of the jellyfish.
	 * @returns {string[]}
	 */
	static getJellyFishSwimImages(color) {
		return [
			`assets/used/enemies/jelly-fish/${color}/swim/1.png`,
			`assets/used/enemies/jelly-fish/${color}/swim/2.png`,
			`assets/used/enemies/jelly-fish/${color}/swim/3.png`,
			`assets/used/enemies/jelly-fish/${color}/swim/4.png`,
		];
	}

	/**
	 * Returns an array of image paths for jellyfish dead animation based on color.
	 * @param {string} color - Color variant of the jellyfish.
	 * @returns {string[]}
	 */
	static getJellyFishDeadImages(color) {
		return [
			`assets/used/enemies/jelly-fish/${color}/dead/1.png`,
			`assets/used/enemies/jelly-fish/${color}/dead/2.png`,
			`assets/used/enemies/jelly-fish/${color}/dead/3.png`,
			`assets/used/enemies/jelly-fish/${color}/dead/4.png`,
		];
	}

	/**
	 * Placeholder for puffer fish data retrieval.
	 */
	static getPufferFish() {}

	/**
	 * Returns an array of image paths for coin collectable animation.
	 * @returns {string[]}
	 */
	static getCoinImages() {
		return [
			"assets/used/collectables/coin/1.png",
			"assets/used/collectables/coin/2.png",
			"assets/used/collectables/coin/3.png",
			"assets/used/collectables/coin/4.png",
		];
	}

	/**
	 * Returns an array of image paths for poison collectable animation.
	 * @returns {string[]}
	 */
	static getPoisonCollectableImages() {
		return [
			"assets/used/collectables/poison/1.png",
			"assets/used/collectables/poison/2.png",
			"assets/used/collectables/poison/3.png",
			"assets/used/collectables/poison/4.png",
			"assets/used/collectables/poison/5.png",
			"assets/used/collectables/poison/6.png",
			"assets/used/collectables/poison/7.png",
			"assets/used/collectables/poison/8.png",
		];
	}

	/**
	 * Returns the image path for the bubble attack.
	 * @returns {string}
	 */
	static getBubbleImage() {
		return "assets/used/character/attacks/Bubble.png";
	}

	/**
	 * Returns an array of image paths for whale spawn animation.
	 * @returns {string[]}
	 */
	static getWhaleSpawnImages() {
		return [
			"assets/used/enemies/whale/spawn/1.png",
			"assets/used/enemies/whale/spawn/2.png",
			"assets/used/enemies/whale/spawn/3.png",
			"assets/used/enemies/whale/spawn/4.png",
			"assets/used/enemies/whale/spawn/5.png",
			"assets/used/enemies/whale/spawn/6.png",
			"assets/used/enemies/whale/spawn/7.png",
			"assets/used/enemies/whale/spawn/8.png",
			"assets/used/enemies/whale/spawn/9.png",
			"assets/used/enemies/whale/spawn/10.png",
		];
	}

	/**
	 * Returns an array of image paths for whale idle animation.
	 * @returns {string[]}
	 */
	static getWhaleIdleImages() {
		return [
			"assets/used/enemies/whale/idle/1.png",
			"assets/used/enemies/whale/idle/2.png",
			"assets/used/enemies/whale/idle/3.png",
			"assets/used/enemies/whale/idle/4.png",
			"assets/used/enemies/whale/idle/5.png",
			"assets/used/enemies/whale/idle/6.png",
			"assets/used/enemies/whale/idle/7.png",
			"assets/used/enemies/whale/idle/8.png",
			"assets/used/enemies/whale/idle/9.png",
			"assets/used/enemies/whale/idle/10.png",
			"assets/used/enemies/whale/idle/11.png",
			"assets/used/enemies/whale/idle/12.png",
			"assets/used/enemies/whale/idle/13.png",
		];
	}

	/**
	 * Returns an array of image paths for whale attack animation.
	 * @returns {string[]}
	 */
	static getWhaleAttackImages() {
		return [
			"assets/used/enemies/whale/attack/1.png",
			"assets/used/enemies/whale/attack/2.png",
			"assets/used/enemies/whale/attack/3.png",
			"assets/used/enemies/whale/attack/4.png",
			"assets/used/enemies/whale/attack/5.png",
			"assets/used/enemies/whale/attack/6.png",
		];
	}

	/**
	 * Returns an array of image paths for whale hurt animation.
	 * @returns {string[]}
	 */
	static getWhaleHurtImages() {
		return [
			"assets/used/enemies/whale/hurt/1.png",
			"assets/used/enemies/whale/hurt/2.png",
			"assets/used/enemies/whale/hurt/3.png",
			"assets/used/enemies/whale/hurt/4.png",
		];
	}

	/**
	 * Returns an array of image paths for whale dead animation.
	 * @returns {string[]}
	 */
	static getWhaleDeadImages() {
		return [
			"assets/used/enemies/whale/dead/1.png",
			"assets/used/enemies/whale/dead/2.png",
			"assets/used/enemies/whale/dead/3.png",
			"assets/used/enemies/whale/dead/4.png",
			"assets/used/enemies/whale/dead/5.png",
			"assets/used/enemies/whale/dead/6.png",
		];
	}

	/**
	 * Returns an array of image paths for poison status bar levels.
	 * @returns {string[]}
	 */
	static getStatusBarPoisonImages() {
		return [
			"assets/used/statuses/poison/0.png",
			"assets/used/statuses/poison/20.png",
			"assets/used/statuses/poison/40.png",
			"assets/used/statuses/poison/60.png",
			"assets/used/statuses/poison/80.png",
			"assets/used/statuses/poison/100.png",
		];
	}

	/**
	 * Returns an array of image paths for health status bar levels.
	 * @returns {string[]}
	 */
	static getStatusBarHealthImages() {
		return [
			"assets/used/statuses/health/0.png",
			"assets/used/statuses/health/20.png",
			"assets/used/statuses/health/40.png",
			"assets/used/statuses/health/60.png",
			"assets/used/statuses/health/80.png",
			"assets/used/statuses/health/100.png",
		];
	}

	/**
	 * Returns an array of image paths for coins status bar levels.
	 * @returns {string[]}
	 */
	static getStatusBarCoinsImages() {
		return [
			"assets/used/statuses/coins/0.png",
			"assets/used/statuses/coins/20.png",
			"assets/used/statuses/coins/40.png",
			"assets/used/statuses/coins/60.png",
			"assets/used/statuses/coins/80.png",
			"assets/used/statuses/coins/100.png",
		];
	}

	/**
	 * Returns an array of image paths for whale boss health status bar levels.
	 * @returns {string[]}
	 */
	static getStatusBarBossHealthImages() {
		return [
			"assets/used/enemies/whale/statusbar/0.png",
			"assets/used/enemies/whale/statusbar/20.png",
			"assets/used/enemies/whale/statusbar/40.png",
			"assets/used/enemies/whale/statusbar/60.png",
			"assets/used/enemies/whale/statusbar/80.png",
			"assets/used/enemies/whale/statusbar/100.png",
		];
	}
}
