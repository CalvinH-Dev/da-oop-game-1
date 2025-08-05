const canvas = document.getElementById("mainCanvas");
canvas.width = BOARD_WIDTH;
canvas.height = BOARD_HEIGHT;
SoundHub.setVolume();
const audios = document.querySelectorAll(".loopSound");
console.log(audios);
for (const audio of audios) {
	audio.volume = 0.3;
}
