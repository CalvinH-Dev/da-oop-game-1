function renderMenu() {
	return /*html*/ `
    <button onclick="startGame()">Start</button>
    <img src="/assets/sharkie/6.Botones/Instructions 1.png" alt="">
  `;
}

function renderMenuIngame() {
	return /*html*/ `
    <button onclick="startGame()">Resume</button>
    <button onclick="restartGame()">Restart</button>
    <div class="image-container">
      <img src="/assets/sharkie/6.Botones/Instructions 1.png" alt="">
    </div>
  `;
}
