window.addEventListener("keydown", (event) => {
	switch (event.key) {
		case "w":
			world.characterRef.moveUp();

			break;
		case "a":
			world.characterRef.moveLeft();

			break;
		case "s":
			world.characterRef.moveDown();

			break;
		case "d":
			world.characterRef.moveRight();

			break;
	}
});
