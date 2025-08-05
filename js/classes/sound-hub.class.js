class SoundHub {
	static muted = false;

	static bgWater = new Audio("/assets/audio/bg_water_running.wav");
	static charBubbleShoot = new Audio("/assets/audio/character/bubble-shoot.ogg"); // https://opengameart.org/users/pokmon63
	static charBubbleHit = new Audio("/assets/audio/character/bubble-hit.ogg");
	static charFinSlap = new Audio("/assets/audio/character/fin-slap.ogg"); // https://freesound.org/people/CGEffex/
	static charFinSlapMiss = new Audio("/assets/audio/character/fin-slap-miss.mp3"); // https://freesound.org/people/CGEffex/
	static charGettingHit = new Audio("/assets/audio/character/getting-hit.wav");
	static charDeath = new Audio("/assets/audio/character/death.wav"); // https://opengameart.org/users/macro
	static charDeathBell = new Audio("/assets/audio/character/death-bell.wav"); // https://opengameart.org/users/specter5053
	static charSwim = new Audio("/assets/audio/character/swim.wav"); // https://opengameart.org/users/youre-perfect-studio
	static charSnore = new Audio("/assets/audio/character/snore.ogg");
	static coinCollect = new Audio("/assets/audio/pickup/coin.wav");
	static poisonCollect = new Audio("/assets/audio/pickup/poison.mp3");
	static jellyElectrified = new Audio("/assets/audio/jelly-fish/electrified.mp3"); // https://opengameart.org/users/macro
	static fishLeaves = new Audio("/assets/audio/fish-leaves-canvas.ogg"); // https://opengameart.org/users/antumdeluge

	static allSounds = [SoundHub.testSound];
	static volume = 0;

	static play(sound) {
		if (this.muted) return;
		let volumeValue = document.getElementById("volume").value;

		if (this.isQuietSound(sound)) {
			volumeValue = 1;
		} else if (this.isLoudSound(sound)) {
			volumeValue = volumeValue / 3;
		}

		sound.volume = volumeValue;
		sound.currentTime = 0;
		sound.play();
	}

	static isLoudSound(sound) {
		return sound === SoundHub.fishLeaves;
	}

	static isQuietSound(sound) {
		return sound === SoundHub.charBubbleShoot || sound === SoundHub.charBubbleHit;
	}

	static pauseAll() {
		SoundHub.allSounds.forEach((sound) => {
			sound.pause();
		});
	}

	static pause(sound) {
		sound.pause();
	}

	static setVolume() {
		this.volume = Number(document.getElementById("volume").value);
	}

	static muteSounds() {
		document.getElementById("loopSound").pause();
		this.muted = true;
	}

	static activateSounds() {
		document.getElementById("loopSound").play();

		this.muted = false;
	}
}
