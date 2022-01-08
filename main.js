const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

// audio
ASSET_MANAGER.queueDownload("./assets/audio/CoinCollect.wav");
ASSET_MANAGER.queueDownload("./assets/audio/Jump.wav");
ASSET_MANAGER.queueDownload("./assets/audio/Upgrade.wav");
ASSET_MANAGER.queueDownload("./assets/audio/CoinUpgrade.wav");


// visuals
ASSET_MANAGER.queueDownload("./assets/visuals/Gunner.png");
ASSET_MANAGER.queueDownload("./assets/visuals/EnvironmentTiles.png");
ASSET_MANAGER.queueDownload("./assets/visuals/Hammer.png");
ASSET_MANAGER.queueDownload("./assets/visuals/Entry.png");
ASSET_MANAGER.queueDownload("./assets/visuals/Money.png");
ASSET_MANAGER.queueDownload("./assets/visuals/RoofScreen.png");
ASSET_MANAGER.queueDownload("./assets/visuals/Screen.png");
ASSET_MANAGER.queueDownload("./assets/visuals/Transporter.png");
ASSET_MANAGER.queueDownload("./assets/visuals/Shadow.png");
ASSET_MANAGER.queueDownload("./assets/visuals/MuzzleFlash.png");
ASSET_MANAGER.queueDownload("./assets/visuals/Background.png");

ASSET_MANAGER.downloadAll(() => {
	var gameEngine = new GameEngine();

	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;

	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');
	ctx.imageSmoothingEnabled = false;

	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;

	gameEngine.init(ctx);
		
	new SceneManager(gameEngine);

	gameEngine.start();
});