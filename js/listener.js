window.screen.orientation.addEventListener("change", () => {
	if (window.screen.orientation.type.startsWith("portrait")) {
		if (world.playState !== "paused") {
			openMenu();
		}
	}
});

function toggleFullscreen() {
	if (isFullscreen()) {
		document.exitFullscreen();
	} else {
		const mainView = document.querySelector(".main-view");
		mainView.requestFullscreen();
		openMenu();
	}
}

function isFullscreen() {
	const mainView = document.querySelector(".main-view");
	return document.fullscreenElement === mainView;
}
