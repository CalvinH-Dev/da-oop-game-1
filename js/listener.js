window.screen.orientation.addEventListener("change", () => {
	if (window.screen.orientation.type.startsWith("portrait")) {
		if (world.playState !== "paused") {
			openMenu();
		}
	}
});
