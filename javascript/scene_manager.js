class SceneManager {
    constructor(game) {
        resetData(); 
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.playing = false; // should be the main level is running

        this.TIME_LEVELS = [3, 6, 12, 24, 48, 100, 150, 200, 250, 300, 350];
        this.MULTIPLIER_LEVELS = [1, 1.5, 2, 2.5, 3];

        // resetData();

        // saved data contains JSON that has cash data and upgradeLevel data
        // see local_storage.js for example
        this.game.savedData = loadData(); 
        console.log(this.game.savedData);
   
        
        this.game.timeRemaining = this.TIME_LEVELS[this.game.timeLevel];
        
        this.game.gunner = new Gunner(this.game, PARAMS.BLOCKWIDTH * 4, PARAMS.BLOCKWIDTH);
        
        this.play();
    };

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };

    collectCash() {
        this.game.savedData.cash += this.MULTIPLIER_LEVELS[this.game.savedData.multiplierLevel];
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
        this.game.timeRemaining = this.TIME_LEVELS[this.game.savedData.timeLevel];
        this.game.gunner = new Gunner(this.game, PARAMS.BLOCKWIDTH * 9, PARAMS.BLOCKWIDTH * 4, this.game.healthLevel, this.game.ammoLevel, this.game.shootSpeedLevel);
        this.game.addEntity(this.game.gunner);


        const hostileGunners = [
            // { x: 12, y: 3.8, facing: 0, shootSpeed: 0.5, health: 4},
            { x: 3, y: 1.8, facing: 1, shootSpeed: 0.5, health: 4},
        ]; 
        hostileGunners.forEach(gunner => {
            this.game.addEntity(new HostileGunner(this.game, PARAMS.BLOCKWIDTH * gunner.x , PARAMS.BLOCKWIDTH * gunner.y, gunner.facing, gunner.shootSpeed, gunner.health));
        });
        

        this.game.addEntity(new Hud(this.game));
        
        // this.game.addEntity(new Screen(this.game, PARAMS.BLOCKWIDTH * 4, PARAMS.BLOCKWIDTH * 1.7, 0));

        // near start
        cashLocals.forEach(c => {
            this.game.addEntity(new Cash(this.game, c.x * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * c.y));
        });
        blocks.forEach(block => {
            this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * block.x, PARAMS.BLOCKWIDTH * block.y, block.startRow, block.startCol, block.row, block.col, block.isCollidable)); 
        });
        hammers.forEach(h => {
            this.game.addEntity(new Hammer(this.game, PARAMS.BLOCKWIDTH * h.x, PARAMS.BLOCKWIDTH * h.y));
        });
        transporters.forEach(t => {
            this.game.addEntity(new Transporter(this.game, PARAMS.BLOCKWIDTH * t.x, PARAMS.BLOCKWIDTH * t.y, t.w, t.movingRight));
        });
        
        // row 4
        // this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 0, PARAMS.BLOCKWIDTH * 4, 0, 3, 1, 0, true)); 
        // this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 1, PARAMS.BLOCKWIDTH * 4, 0, 3, 1, 1, false)); 
        // this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 2, PARAMS.BLOCKWIDTH * 4, 0, 3, 1, 1), true);
        // this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 3, PARAMS.BLOCKWIDTH * 4, 0, 3, 1, 1), true); 
        // this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 4, PARAMS.BLOCKWIDTH * 4, 0, 3, 1, 2, true)); 
        // this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 7, PARAMS.BLOCKWIDTH * 4, 0, 3, 1, 0, true)); 


        // // row 5
        // this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 0, PARAMS.BLOCKWIDTH * 5, 0, 3, 1, 0, true)); 
        // this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 1, PARAMS.BLOCKWIDTH * 5, 0, 3, 1, 1, false)); 
        // this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 2, PARAMS.BLOCKWIDTH * 5, 0, 3, 1, 1), false);
        // this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 3, PARAMS.BLOCKWIDTH * 5, 0, 3, 1, 1), false); 
        // this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 4, PARAMS.BLOCKWIDTH * 5, 0, 3, 1, 2, true)); 
        // this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 6, PARAMS.BLOCKWIDTH * 5, 0, 3, 0, 0, true)); 
        // this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 7, PARAMS.BLOCKWIDTH * 5, 0, 3, 1, 0, true)); 
        // this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 8, PARAMS.BLOCKWIDTH * 5, 0, 3, 1, 1, false)); 
        // this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 9, PARAMS.BLOCKWIDTH * 5, 0, 3, 1, 2), false);
        // // row 6
        // this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 0, PARAMS.BLOCKWIDTH * 6, 0, 3, 1, 0, true)); 
        // this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 1, PARAMS.BLOCKWIDTH * 6, 0, 3, 1, 1, false)); 
        // this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 2, PARAMS.BLOCKWIDTH * 6, 0, 3, 1, 1), false);
        // this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 3, PARAMS.BLOCKWIDTH * 6, 0, 3, 1, 1), false); 
        // this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 4, PARAMS.BLOCKWIDTH * 6, 0, 6, 1, 0, true));
        // this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 5, PARAMS.BLOCKWIDTH * 6, 0, 3, 0, 1, true)); 
        // this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 6, PARAMS.BLOCKWIDTH * 6, 0, 6, 1, 1, true)); 
        // this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 7, PARAMS.BLOCKWIDTH * 6, 0, 3, 1, 0, true)); 
        // this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 8, PARAMS.BLOCKWIDTH * 6, 0, 3, 1, 1, false)); 
        // this.game.addEntity(new Block(this.game, PARAMS.BLOCKWIDTH * 9, PARAMS.BLOCKWIDTH * 6, 0, 3, 1, 2), false);

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

        if (PARAMS.DEBUG === true && this.game.click) {
            console.log(floor((this.game.click.x + this.game.camera.x) / PARAMS.BLOCKWIDTH) + " " + floor((this.game.click.y + this.game.camera.y) / PARAMS.BLOCKWIDTH));
            this.game.click = null;

        }







        // decrement time if currently playing the main level
        if (this.playing) {
            this.game.timeRemaining -= this.game.clockTick;
        }
        
        // load the shop if the time remaining is 0
        if (this.game.timeRemaining < 0) {
            // todo: this is where we could do a die animation
            this.playing = false;
            this.game.timeRemaining = this.TIME_LEVELS[0];
            storeData(this.game.savedData);
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
        this.x = Math.min(10000, this.x); // todo: will need a bound for the right of the map...

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

    