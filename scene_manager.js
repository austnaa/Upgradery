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


        this.game.addEntity(new Money(this.game, 2.25 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2.25));
        this.game.addEntity(new Money(this.game, 2.75 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2.25));
        this.game.addEntity(new Money(this.game, 3.25 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2.25));
        this.game.addEntity(new Money(this.game, 3.75 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2.25));

        this.game.addEntity(new Money(this.game, 2.5 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 1.75));
        this.game.addEntity(new Money(this.game, 3 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 1.75));
        this.game.addEntity(new Money(this.game, 3.5 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 1.75));

        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 0, PARAMS.BLOCKWIDTH * 0, 0, 3, 2, 1, true)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 1, PARAMS.BLOCKWIDTH * 0, 0, 3, 2, 1, true)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 2, PARAMS.BLOCKWIDTH * 0, 0, 3, 2, 1, true));
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 3, PARAMS.BLOCKWIDTH * 0, 0, 3, 2, 1, true)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 4, PARAMS.BLOCKWIDTH * 0, 0, 3, 2, 1, true)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 7, PARAMS.BLOCKWIDTH * 0, 0, 3, 2, 1, true)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 8, PARAMS.BLOCKWIDTH * 0, 0, 3, 2, 1, true)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 9, PARAMS.BLOCKWIDTH * 0, 0, 3, 2, 1), true);
        
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 0, PARAMS.BLOCKWIDTH * 3, 0, 3, 0, 0, true)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 1, PARAMS.BLOCKWIDTH * 3, 0, 3, 0, 1, true));
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 2, PARAMS.BLOCKWIDTH * 3, 0, 3, 0, 1, true));
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 3, PARAMS.BLOCKWIDTH * 3, 0, 3, 0, 1, true)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 4, PARAMS.BLOCKWIDTH * 3, 0, 3, 0, 2, true)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 7, PARAMS.BLOCKWIDTH * 3, 0, 3, 0, 0, true)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 8, PARAMS.BLOCKWIDTH * 3, 0, 3, 0, 1, true)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 9, PARAMS.BLOCKWIDTH * 3, 0, 3, 0, 2, true)); 
        

        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 0, PARAMS.BLOCKWIDTH * 4, 0, 3, 1, 0, true)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 1, PARAMS.BLOCKWIDTH * 4, 0, 3, 1, 1, false)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 2, PARAMS.BLOCKWIDTH * 4, 0, 3, 1, 1), false);
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 3, PARAMS.BLOCKWIDTH * 4, 0, 3, 1, 1), false); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 4, PARAMS.BLOCKWIDTH * 4, 0, 3, 1, 2, true)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 7, PARAMS.BLOCKWIDTH * 4, 0, 3, 1, 0, true)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 8, PARAMS.BLOCKWIDTH * 4, 0, 3, 1, 1, false)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 9, PARAMS.BLOCKWIDTH * 4, 0, 3, 1, 2), false);



        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 0, PARAMS.BLOCKWIDTH * 5, 0, 3, 1, 0, true)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 1, PARAMS.BLOCKWIDTH * 5, 0, 3, 1, 1, false)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 2, PARAMS.BLOCKWIDTH * 5, 0, 3, 1, 1), false);
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 3, PARAMS.BLOCKWIDTH * 5, 0, 3, 1, 1), false); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 4, PARAMS.BLOCKWIDTH * 5, 0, 3, 1, 2, true)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 7, PARAMS.BLOCKWIDTH * 5, 0, 3, 1, 0, true)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 8, PARAMS.BLOCKWIDTH * 5, 0, 3, 1, 1, false)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 9, PARAMS.BLOCKWIDTH * 5, 0, 3, 1, 2), false);

        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 0, PARAMS.BLOCKWIDTH * 6, 0, 3, 1, 0, true)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 1, PARAMS.BLOCKWIDTH * 6, 0, 3, 1, 1, false)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 2, PARAMS.BLOCKWIDTH * 6, 0, 3, 1, 1), false);
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 3, PARAMS.BLOCKWIDTH * 6, 0, 3, 1, 1), false); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 4, PARAMS.BLOCKWIDTH * 6, 0, 6, 1, 0, true));
        
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 5, PARAMS.BLOCKWIDTH * 6, 0, 3, 0, 1, true)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 6, PARAMS.BLOCKWIDTH * 6, 0, 6, 1, 1, true)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 6, PARAMS.BLOCKWIDTH * 5, 0, 3, 0, 0, true)); 

        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 7, PARAMS.BLOCKWIDTH * 6, 0, 3, 1, 0, true)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 8, PARAMS.BLOCKWIDTH * 6, 0, 3, 1, 1, false)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 9, PARAMS.BLOCKWIDTH * 6, 0, 3, 1, 2), false);

        this.game.addEntity(new Background(this.game, 0, 0));
    };

    updateAudio() {
        var mute = document.getElementById("mute").checked;
        var volume = document.getElementById("volume").value;

        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);

    };

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;
        this.updateAudio();
    };

}