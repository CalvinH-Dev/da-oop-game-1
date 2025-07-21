let state;

window.addEventListener("keydown", (event) => {
	console.log(event.key);
	switch (event.key) {
		case "ArrowUp":
			world.characterRef.moveUp();

			break;
		case "ArrowLeft":
			world.characterRef.moveLeft();

			break;
		case "ArrowDown":
			world.characterRef.moveDown();

			break;
		case "ArrowRight":
			world.characterRef.moveRight();
			world.scroll();

			break;
	}
});
