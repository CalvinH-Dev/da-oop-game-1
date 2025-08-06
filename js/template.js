function renderMenu() {
	return /*html*/ `
    <button onclick="startGame()">Start</button>
    <img src="/assets/sharkie/6.Botones/Instructions 1.png" alt="">
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
    <button onclick="startGame()">Resume</button>
    <button onclick="restartGame()">Restart</button>
    <div class="image-container">
      <img src="/assets/sharkie/6.Botones/Instructions 1.png" alt="">
    </div>
    ${renderFooter()}
  `;
}
