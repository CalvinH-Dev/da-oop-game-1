class SoundHub {
	/** Current global volume level (0 to 1). */
	static volume = 0;

	/** Whether all sounds are muted. */
	static muted = false;

	static bgWater = new Audio("assets/audio/bg_water_running.wav");
	static charBubbleShoot = new Audio("assets/audio/character/bubble-shoot.ogg");
	static charBubbleHit = new Audio("assets/audio/character/bubble-hit.ogg");
	static charFinSlap = new Audio("assets/audio/character/fin-slap.ogg");
	static charFinSlapMiss = new Audio("assets/audio/character/fin-slap-miss.mp3");
	static charGettingHit = new Audio("assets/audio/character/getting-hit.wav");
	static charDeath = new Audio("assets/audio/character/death.wav");
	static charDeathBell = new Audio("assets/audio/character/death-bell.wav");
	static charSwim = new Audio("assets/audio/character/swim.wav");
	static charSnore = new Audio("assets/audio/character/snore.ogg");
	static coinCollect = new Audio("assets/audio/pickup/coin.wav");
	static poisonCollect = new Audio("assets/audio/pickup/poison.mp3");
	static jellyElectrified = new Audio("assets/audio/jelly-fish/electrified.mp3");
	static fishLeaves = new Audio("assets/audio/fish-leaves-canvas.ogg");
	static whaleAttack = new Audio("assets/audio/whale-maul.ogg");
	static whaleHit = new Audio("assets/audio/whale-hit.ogg");
	static won = new Audio("assets/audio/won.wav");

	/** All sounds collected for batch operations. */
	static allSounds = [
		SoundHub.bgWater,
		SoundHub.charBubbleShoot,
		SoundHub.charBubbleHit,
		SoundHub.charFinSlap,
		SoundHub.charFinSlapMiss,
		SoundHub.charGettingHit,
		SoundHub.charDeath,
		SoundHub.charDeathBell,
		SoundHub.charSwim,
		SoundHub.charSnore,
		SoundHub.coinCollect,
		SoundHub.poisonCollect,
		SoundHub.jellyElectrified,
		SoundHub.fishLeaves,
		SoundHub.whaleAttack,
		SoundHub.whaleHit,
		SoundHub.won,
	];

	/**
	 * Plays a given sound with volume adjusted based on its loudness category and mute status.
	 * @param {Audio} sound - The sound to play.
	 */
	static play(sound) {
		if (this.muted) return;

		if (this.isQuietSound(sound)) {
			sound.volume = Math.min(1, this.volume * 3);
		} else if (this.isLoudSound(sound)) {
			sound.volume = this.volume / 3;
		} else {
			sound.volume = this.volume;
		}

		sound.currentTime = 0;
		sound.play();
	}

	/**
	 * Checks if the sound is classified as loud.
	 * @param {Audio} sound
	 * @returns {boolean}
	 */
	static isLoudSound(sound) {
		return sound === SoundHub.fishLeaves || sound === SoundHub.charSnore;
	}

	/**
	 * Checks if the sound is classified as quiet.
	 * @param {Audio} sound
	 * @returns {boolean}
	 */
	static isQuietSound(sound) {
		return sound === SoundHub.charBubbleShoot || sound === SoundHub.charBubbleHit;
	}

	/** Pauses all sounds in the allSounds array. */
	static pauseAll() {
		SoundHub.allSounds.forEach((sound) => {
			sound.pause();
		});
	}

	/**
	 * Pauses a single sound.
	 * @param {Audio} sound
	 */
	static pause(sound) {
		sound.pause();
	}

	/**
	 * Updates volume from a DOM input and applies to all sounds and looped sounds.
	 * Also saves the volume setting in localStorage.
	 */
	static setVolume() {
		this.volume = Number(document.getElementById("volume").value);

		for (const sound of this.allSounds) {
			sound.volume = this.volume;
		}

		const loops = document.querySelectorAll(".loopSound");
		for (const loop of loops) {
			loop.volume = 0.3 * this.volume;
		}

		localStorage.setItem("sound-volume", JSON.stringify(this.volume));
	}

	/**
	 * Mutes all loop sounds, updates mute flag and saves setting.
	 */
	static muteSounds() {
		const loops = document.querySelectorAll(".loopSound");
		for (const loop of loops) {
			loop.pause();
		}

		localStorage.setItem("sound-enabled", JSON.stringify(false));
		this.muted = true;
	}

	/**
	 * Activates (plays) all loop sounds, updates mute flag and saves setting.
	 */
	static activateSounds() {
		const loops = document.querySelectorAll(".loopSound");
		for (const loop of loops) {
			loop.play();
		}

		localStorage.setItem("sound-enabled", JSON.stringify(true));
		this.muted = false;
	}
}
