function renderMenu() {
	return /*html*/ `
    ${renderVolumeInMenu()}
    <div class="instructions-container">
      ${renderInstructions()}
    </div>
`;
}

function renderLoseMenu() {
	return /*html*/ `
  ${renderVolumeInMenu()}
    <div class="game-over-container">
      <button class="back-to-menu-btn" onclick="openMenu()">Back To Menu</button>
      <div class="img-container">
        <img class="game-over" src="assets/used/ui/game-over.png" alt="">
      </div>
    </div>
  `;
}

function renderWinMenu() {
	return /*html*/ `
  ${renderVolumeInMenu()}
    <div class="game-over-container">
      <button class="back-to-menu-btn" onclick="backToMenu()">Back To Menu</button>
      <div class="img-container">
        <img class="game-over" src="assets/used/ui/you-win.png" alt="">
      </div>
    </div>
  `;
}

function renderFooter() {
	return /*html*/ `
    <footer><a href="/impressum">Impressum</a><a href="/credits">Credits</a><a href="/">Zum Projekt (GitHub)</a></footer>
  `;
}

function renderInstructions() {
	return /*html*/ `
      ${renderInstructionsText()}   
    <div class="instructions-left">
      <div class="img-container">
        <img src="assets/used/ui/instructions.png" alt="">
      </div>
      <button class="start-btn" onclick="startGame()">
        <div class="img-container">
          <img src="assets/used/ui/start.png" alt="" >
        </div>
      </button>
    </div>
  `;
}

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
      <ul>
        <li class="orange">Orange Puffer Fish (40 DMG on collision)</li>
        <li class="green">Green Puffer Fish (20 DMG on collision & 20 DMG after a few seconds)</li>
        <li class="yellow">Yellow Jelly Fish (20 DMG on collision & stuns for 1 second)</li>
        <li class="purple">Purple Jelly Fish (20 DMG on collision)</li>
      </ul>
      <span>You start the game with 100 HP. Use your attacks wisely and avoid getting hit!</span>
  </div>    
  `;
}

function renderVolumeInMenu() {
	return /*html*/ `   
	  <div class="sound">
      <button class="back-to-homepage"><a href="index.html">Back To Homepage</a></button>
			<button
			  class="sound-button"
		  	id="sound-button"
				onclick="SoundHub.muted ? activateSounds() : muteSounds()"
			>
			<img src="assets/img/volume.svg" alt="" srcset="" />
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
