const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./assets/Gunner.png");
ASSET_MANAGER.queueDownload("./assets/Hammer.png");
ASSET_MANAGER.queueDownload("./assets/Entry.png");
ASSET_MANAGER.queueDownload("./assets/Money.png");
ASSET_MANAGER.queueDownload("./assets/RoofScreen.png");
ASSET_MANAGER.queueDownload("./assets/Screen.png");
ASSET_MANAGER.queueDownload("./assets/Transporter.png");
ASSET_MANAGER.queueDownload("./assets/Shadow.png");
ASSET_MANAGER.queueDownload("./assets/MuzzleFlash.png");
ASSET_MANAGER.queueDownload("./assets/Background.png");

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