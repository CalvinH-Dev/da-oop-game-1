const canvas = document.getElementById("mainCanvas");
canvas.width = BOARD_WIDTH;
canvas.height = BOARD_HEIGHT;

const keyboard = new Keyboard();

let levelId = 1;
const world = new World(keyboard, canvas);
