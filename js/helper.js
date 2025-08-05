function muteSounds(button) {
	const img = button.querySelector("img");
	img.src = "/assets/img/volume-muted.svg";

	SoundHub.muteSounds();
}

function activateSounds(button) {
	const img = button.querySelector("img");
	img.src = "/assets/img/volume.svg";
	SoundHub.activateSounds();
}

function openMenu() {
	world.pause();
	const menu = document.querySelector(".menu");
	menu.classList.remove("d-none");
}

function closeMenu() {
	world.unpause();
	const menu = document.querySelector(".menu");
	menu.classList.add("d-none");
}
