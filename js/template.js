/**
 * Renders the main game menu, including volume controls and game instructions.
 * @returns {string} HTML string representing the main menu layout.
 */
function renderMenu() {
	return /*html*/ `
    ${renderVolumeInMenu()}
    <div class="instructions-container">
      ${renderInstructions()}
    </div>
`;
}

/**
 * Renders the "Lose" menu, shown when the player loses the game.
 * @returns {string} HTML string for the lose menu.
 */
function renderLoseMenu() {
	return /*html*/ `
  ${renderVolumeInMenu()}
    <div class="game-over-container lose">
      <button class="back-to-menu-btn" onclick="openMenu()">Back To Menu</button>
      <button class="try-again-btn" onclick="restartGame()">
        <div class="img-container">
          <img class="game-over" src="assets/used/ui/try-again.png" alt="Try Again">
        </div>
      </button>
    </div>
  `;
}

/**
 * Renders the "Win" menu, shown when the player wins the game.
 * @returns {string} HTML string for the win menu.
 */
function renderWinMenu() {
	return /*html*/ `
  ${renderVolumeInMenu()}
    <div class="game-over-container win">
      <button class="back-to-menu-btn" onclick="backToMenu()">Back To Menu</button>
      <button class="try-again-btn" onclick="restartGame()">
        <div class="img-container">
          <img class="game-over" src="assets/used/ui/try-again.png" alt="Try Again">
        </div>
      </button>
    </div>
  `;
}

/**
 * Renders the footer with links to Impressum, Credits, and the GitHub project.
 * @returns {string} HTML string for the footer.
 */
function renderFooter() {
	return /*html*/ `
    <footer><a href="/impressum">Impressum</a><a href="/credits">Credits</a><a href="/">Zum Projekt (GitHub)</a></footer>
  `;
}

/**
 * Renders the main game instructions layout, including text and start button.
 * @returns {string} HTML string for the instructions section.
 */
function renderInstructions() {
	return /*html*/ `
      ${renderInstructionsText()}   
    <div class="instructions-left">
      <div class="img-container">
        <img src="assets/used/ui/instructions.png" alt="Instructions">
      </div>
      <button class="start-btn" onclick="resumeGame()">
        <div class="img-container">
          <img src="assets/used/ui/start.png" alt="Start" >
        </div>
      </button>
    </div>
  `;
}

/**
 * Renders the text content for the game instructions.
 * @returns {string} HTML string for the instructions text.
 */
function renderInstructionsText() {
	return /*html*/ `
    <div class="instructions-text">
      <h2>Game Instructions</h2>
      <h4>You control a shark with two main attacks:</h4>
      <ul>
        <li>Bubble Shot (Hotkey: D): A ranged attack that requires Poison Bottles to use. Collect these bottles to shoot bubbles at enemies from a distance.</li>
        <li>Fin Slap (Hotkey: F): A close-range melee attack. Use it when enemies get too close.</li>
      </ul>
      <h4>Objective:</h4><span>Defeat the Final Boss – a giant Whale.</span>
      <h4>Enemies:</h4>
      ${renderEnemyList()}
      <span>You start the game with 100 HP. Use your attacks wisely and avoid getting hit!</span>
  </div>    
  `;
}

/**
 * Renders the volume control section inside the menu, including mute/unmute button and volume slider.
 * @returns {string} HTML string for the volume control UI.
 */
function renderVolumeInMenu() {
	return /*html*/ `   
	  <div class="sound">
      <button class="back-to-homepage"><a href="index.html">Back To Homepage</a></button>
			<button
			  class="sound-button"
		  	id="sound-button"
				onclick="SoundHub.muted ? activateSounds() : muteSounds()"
			>
			<img src="assets/img/volume.svg" alt="Volume Image" />
			</button>
			<input
				type="range"
				oninput="SoundHub.setVolume()"
				id="volume"
				min="0"
				max="1"
				step="0.01"
				value="0.5"
			/>
		</div>
  `;
}

function renderEnemyList() {
	return /*html*/ `
    <ul>
      <li class="orange">Orange Puffer Fish (40 DMG on collision)</li>
      <li class="green">Green Puffer Fish (20 DMG on collision & 20 DMG after a few seconds)</li>
      <li class="yellow">Yellow Jelly Fish (20 DMG on collision & stuns for 1 second)</li>
      <li class="purple">Purple Jelly Fish (20 DMG on collision)</li>
    </ul>
  `;
}
