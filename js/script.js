const cha = new Character({ x: 20, y: 30 });

const canvas = document.getElementById("mainCanvas");

let enemy;

const world = new World(canvas, cha);
world.draw();
