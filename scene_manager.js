class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;

        this.loadLevel();
    };

    // add the entities for animation (basic)
    loadLevel() {
        // this.game.addEntity(new Screen(this.game, 2.5 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 3.25, 0));
        // this.game.addEntity(new RoofScreen(this.game, 3.5 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 3.25, 0));
        // this.game.addEntity(new Transporter(this.game, 2.5 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2, 0));
        // this.game.addEntity(new Transporter(this.game, 2.5 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2.5, 1));
        // this.game.addEntity(new Entry(this.game, 4 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH / 4));
        // this.game.addEntity(new Hammer(this.game, 3 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH / 4));
        // this.game.addEntity(new Money(this.game, 2.5 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH / 4));
        this.game.addEntity(new Gunner(this.game, PARAMS.BLOCKWIDTH / 4, PARAMS.BLOCKWIDTH));
        this.game.addEntity(new Floor(this.game, 0, PARAMS.BLOCKWIDTH * 3));
        this.game.addEntity(new Floor(this.game, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 3));
        this.game.addEntity(new Floor(this.game, PARAMS.BLOCKWIDTH * 2, PARAMS.BLOCKWIDTH * 3));

        this.game.addEntity(new Floor(this.game, PARAMS.BLOCKWIDTH * 3, PARAMS.BLOCKWIDTH * 4));
        this.game.addEntity(new Floor(this.game, PARAMS.BLOCKWIDTH * 4, PARAMS.BLOCKWIDTH * 4));

        this.game.addEntity(new Floor(this.game, PARAMS.BLOCKWIDTH * 5, PARAMS.BLOCKWIDTH * 3));
        this.game.addEntity(new Floor(this.game, PARAMS.BLOCKWIDTH * 6, PARAMS.BLOCKWIDTH * 3));
        this.game.addEntity(new Floor(this.game, PARAMS.BLOCKWIDTH * 7, PARAMS.BLOCKWIDTH * 3));
        this.game.addEntity(new Floor(this.game, PARAMS.BLOCKWIDTH * 8, PARAMS.BLOCKWIDTH * 3));
        
        this.game.addEntity(new Floor(this.game, PARAMS.BLOCKWIDTH * 5, 0));
        this.game.addEntity(new Floor(this.game, PARAMS.BLOCKWIDTH * 6, 0));
        this.game.addEntity(new Floor(this.game, PARAMS.BLOCKWIDTH * 7, 0));
        this.game.addEntity(new Floor(this.game, PARAMS.BLOCKWIDTH * 8, 0));
        this.game.addEntity(new Background(this.game, 0, 0));
    };

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;
    };

}