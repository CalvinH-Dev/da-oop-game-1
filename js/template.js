function renderMenu() {
	return /*html*/ `
  <div class="menu-buttons">
    <button onclick="startGame()">Start</button>
    </div>
    <div class="image-container">
      <img src="assets/sharkie/6.Botones/Instructions 1.png" alt="">
    </div>
    ${renderFooter()}

  `;
}

function renderLoseMenu() {
	return /*html*/ `
  <div class="menu-buttons">
    <button onclick="initMenu()">Back To Menu</button>
    <button class="img-btn" onclick="restartGame()">
      <img src="assets/sharkie/6.Botones/Try again/Recurso 16.png" alt="">
    </button>
    </div>
    <div class="image-container">
      <img src="assets/sharkie/6.Botones/Tittles/Game Over/Recurso 11.png" alt="">
    </div>
    ${renderFooter()}
  `;
}

function renderWinMenu() {
	return /*html*/ `
  <div class="menu-buttons">
    <button onclick="initMenu()">Back To Menu</button>
    </div>
    <div class="image-container">
      <img src="assets/sharkie/6.Botones/Tittles/You win/Mesa de trabajo 1.png" alt="">
    </div>
    ${renderFooter()}
  `;
}

function renderFooter() {
	return /*html*/ `
    <footer><a href="/impressum">Impressum</a><a href="/credits">Credits</a><a href="/">Zum Projekt (GitHub)</a></footer>
  `;
}

function renderMenuIngame() {
	return /*html*/ `
  <div class="menu-buttons">
    <button onclick="startGame()">Resume</button>
    <button onclick="restartGame()">Restart</button>
    </div>
    <div class="image-container">
      <img src="assets/sharkie/6.Botones/Instructions 1.png" alt="">
    </div>
    ${renderFooter()}
  `;
}
