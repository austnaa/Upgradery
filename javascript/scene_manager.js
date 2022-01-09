class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.playing = false; // should be the main level is running
        
        this.game.speedLevel = 0;
        this.game.jumpLevel = 0;
        this.game.timeLevel = 0;
        this.game.ammoLevel = 0;
        this.game.shootSpeedLevel = 0;
        this.game.multiplierLevel = 0;

        // this.game.MAX_LIVES = 5;
        this.game.lives = 1; // the number of lives available at the start of the level
        
        this.game.cash = 100;
       
        this.TIME = [10];
        this.game.timeRemaining = this.TIME[0];
        
        this.game.gunner = new Gunner(this.game, PARAMS.BLOCKWIDTH / 4, PARAMS.BLOCKWIDTH);
        
        // this.loadLevel();
        // this.loadTitleScreen();
        this.loadShop();
    };

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };

    collectCash() {
        this.game.cash++;
        ASSET_MANAGER.playAsset("./assets/audio/CoinCollect.wav");
    }

    loadTitleScreen() {
        this.game.addEntity(new TitleScreen(this.game));
        this.game.addEntity(new Background(this.game, 0, 0));
    }

    play() {
        this.clearEntities();
        this.loadMainLevel();
        this.playing = true;
    }
    
    loadMainLevel() {
        
        this.game.addEntity(this.game.gunner);

        this.game.addEntity(new Hud(this.game));
        
        this.game.addEntity(new Screen(this.game, PARAMS.BLOCKWIDTH * 8, PARAMS.BLOCKWIDTH * 1.7, 0));

        // near start
        this.game.addEntity(new Cash(this.game, 2.25 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2.25));
        this.game.addEntity(new Cash(this.game, 2.75 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2.25));
        this.game.addEntity(new Cash(this.game, 3.25 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2.25));
        this.game.addEntity(new Cash(this.game, 3.75 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2.25));
        this.game.addEntity(new Cash(this.game, 2.5 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 1.75));
        this.game.addEntity(new Cash(this.game, 3 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 1.75));
        this.game.addEntity(new Cash(this.game, 3.5 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 1.75));

       
        // row 3
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 0, PARAMS.BLOCKWIDTH * 3, 0, 3, 0, 0, true)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 1, PARAMS.BLOCKWIDTH * 3, 0, 3, 0, 1, true));
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 2, PARAMS.BLOCKWIDTH * 3, 0, 3, 0, 1, true));
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 3, PARAMS.BLOCKWIDTH * 3, 0, 3, 0, 1, true)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 4, PARAMS.BLOCKWIDTH * 3, 0, 3, 0, 2, true)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 7, PARAMS.BLOCKWIDTH * 3, 0, 3, 0, 0, true)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 8, PARAMS.BLOCKWIDTH * 3, 0, 3, 0, 1, true)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 9, PARAMS.BLOCKWIDTH * 3, 0, 3, 0, 2, true));   
        // row 4
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 0, PARAMS.BLOCKWIDTH * 4, 0, 3, 1, 0, true)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 1, PARAMS.BLOCKWIDTH * 4, 0, 3, 1, 1, false)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 2, PARAMS.BLOCKWIDTH * 4, 0, 3, 1, 1), false);
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 3, PARAMS.BLOCKWIDTH * 4, 0, 3, 1, 1), false); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 4, PARAMS.BLOCKWIDTH * 4, 0, 3, 1, 2, true)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 7, PARAMS.BLOCKWIDTH * 4, 0, 3, 1, 0, true)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 8, PARAMS.BLOCKWIDTH * 4, 0, 3, 1, 1, false)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 9, PARAMS.BLOCKWIDTH * 4, 0, 3, 1, 2), false);
        // row 5
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 0, PARAMS.BLOCKWIDTH * 5, 0, 3, 1, 0, true)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 1, PARAMS.BLOCKWIDTH * 5, 0, 3, 1, 1, false)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 2, PARAMS.BLOCKWIDTH * 5, 0, 3, 1, 1), false);
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 3, PARAMS.BLOCKWIDTH * 5, 0, 3, 1, 1), false); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 4, PARAMS.BLOCKWIDTH * 5, 0, 3, 1, 2, true)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 6, PARAMS.BLOCKWIDTH * 5, 0, 3, 0, 0, true)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 7, PARAMS.BLOCKWIDTH * 5, 0, 3, 1, 0, true)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 8, PARAMS.BLOCKWIDTH * 5, 0, 3, 1, 1, false)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 9, PARAMS.BLOCKWIDTH * 5, 0, 3, 1, 2), false);
        // row 6
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 0, PARAMS.BLOCKWIDTH * 6, 0, 3, 1, 0, true)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 1, PARAMS.BLOCKWIDTH * 6, 0, 3, 1, 1, false)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 2, PARAMS.BLOCKWIDTH * 6, 0, 3, 1, 1), false);
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 3, PARAMS.BLOCKWIDTH * 6, 0, 3, 1, 1), false); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 4, PARAMS.BLOCKWIDTH * 6, 0, 6, 1, 0, true));
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 5, PARAMS.BLOCKWIDTH * 6, 0, 3, 0, 1, true)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 6, PARAMS.BLOCKWIDTH * 6, 0, 6, 1, 1, true)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 7, PARAMS.BLOCKWIDTH * 6, 0, 3, 1, 0, true)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 8, PARAMS.BLOCKWIDTH * 6, 0, 3, 1, 1, false)); 
        this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 9, PARAMS.BLOCKWIDTH * 6, 0, 3, 1, 2), false);

        this.game.addEntity(new Background(this.game, 0, 0));
    };

    loadShop() {
        this.game.addEntity(new Shop(this.game));
        this.game.addEntity(new Background(this.game, 0, 0));
    }

    updateAudio() {
        var mute = document.getElementById("mute").checked;
        var volume = document.getElementById("volume").value;

        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);
    };

    update() {
        // decrement time if currently playing the main level
        if (this.playing) {
            this.game.timeRemaining -= this.game.clockTick;
        }
        
        // load the shop if the time remaining is 0
        if (this.game.timeRemaining < 0) {
            // todo: this is where we could do a dye animation
            this.playing = false;
            this.game.timeRemaining = this.TIME[0];
            this.clearEntities();
            this.loadShop();
        }

        PARAMS.DEBUG = document.getElementById("debug").checked;
        this.updateAudio();

        // camera settings
        let midpointW = PARAMS.CANVAS_WIDTH / 2 - PARAMS.BLOCKWIDTH / 2;

        // set the left and right bounds on the camera
        this.x = this.game.gunner.x - midpointW;
        this.x = Math.max(0, this.x);
        this.x = Math.min(400, this.x); // todo: will need a bound for the right of the map...

        // updates the y value only if the gunner is not jumping
        if (this.game.gunner.state != 2) {
            // todo: 
        }

        this.y = this.game.gunner.y  - midpointW;
        this.y = Math.max(0, this.y);
        // todo: will need a bound for the bottom of the map...

        



// print("camera: ") 
// print({x: this.x, y: this.y})

        
        
    };

}


// CAN DELETE THESE EVENTUALLY
// this.game.addEntity(new Screen(this.game, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2.15, 0));
// this.game.addEntity(new RoofScreen(this.game, 3.5 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 3.25, 0));
// this.game.addEntity(new Transporter(this.game, 2.5 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2, 0));
// this.game.addEntity(new Transporter(this.game, 2.5 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2.5, 1));
// this.game.addEntity(new Entry(this.game, 4 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH / 4));
// this.game.addEntity(new Hammer(this.game, 3 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH / 4));
// this.game.addEntity(new Money(this.game, 2.5 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH / 4));

    