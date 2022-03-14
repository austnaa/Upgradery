class Boss {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/visuals/gunnerYellow.png");

        this.AMMO_LEVELS = [0, 1, 2, 4, 6, 10, 12, 15, 20, 50, 100];
        this.SHOOT_SPEED_LEVELS = [1.2, 1, 0.8, 0.6, 0.4, 0.3, 0.2];
        this.LIVE_LEVELS = [1, 2, 3, 4, 5];

        this.maxLives = 10;
        this.numLives = this.maxLives;
        this.ammo = 10000;
        this.shootTimeout = 0.9;
        this.shootTimer = this.shootTimeout;
       
        this.velocityX = 0;
        this.velocityY = 0;

        this.facing = 1; // 0: right, 1: left,
        this.state = 0;  // 0: idle,  1: run,  2: jump, 3: dead

        this.gameState = 0; // 0: looking left, 1: moving left, 2: looking right, 3: moving right
        this.gameStateTimers = [7, 4, 7, 4];
        this.currentTimer = this.gameStateTimers[0];

        this.updateBB();

        this.addAnimations();
        this.addConstants();

    };

    addAnimations() {
        this.animations = [];
        for (let i = 0; i < 4; i++) { // idle: 0, running: 1, jumping: 2, dying: 3
            this.animations.push([]);
            for (let j = 0; j < 2; j++) { // left: 0, right: 1
                this.animations.push([]);                
            }
        }

        // idle
        this.animations[0][0] = new Animator(this.spritesheet, 0, 48*4, 48, 48, 5, 0.2, 0, false, true); // idle left
        this.animations[0][1] = new Animator(this.spritesheet, 0, 0, 48, 48, 5, 0.2, 0, false, true); // idle right
        
        // run
        this.animations[1][0] = new Animator(this.spritesheet, 0, 48*5, 48, 48, 6, 0.15, 0, false, true); // run left
        this.animations[1][1] = new Animator(this.spritesheet, 0, 48, 48, 48, 6, 0.15, 0, false, true); // run right
        
        // jump
        this.animations[2][0] = new Animator(this.spritesheet, 0, 48*6, 48, 48, 2, 0.6, 0, false, true); // jump left
        this.animations[2][1] = new Animator(this.spritesheet, 0, 48*2, 48, 48, 2, 0.6, 0, false, true); // jump right
        
        // die
        this.animations[3][0] = new Animator(this.spritesheet, 0, 48*7, 48, 48, 8, 0.1, 0, false, false); // die left
        this.animations[3][1] = new Animator(this.spritesheet, 0, 48*3, 48, 48, 8, 0.1, 0, false, false); // die right
    }

    addConstants() {
        this.BB_TOP_MARGIN = 9 * PARAMS.SCALE;
        // consider inserting constants from the update() function in here
    }

    updateBB() {
        this.lastBB = this.BB;
        this.lastLandingBB = this.landingBB;
        let leftXOffset = this.facing ? 18 : 12;
        this.BB = new BoundingBox(this.x + leftXOffset * PARAMS.SCALE, this.y + this.BB_TOP_MARGIN, PARAMS.BLOCKWIDTH - 6 * PARAMS.SCALE, PARAMS.BLOCKWIDTH * 1.03); 
    };

    decrementHealth() {
        this.numLives--;
        if (this.numLives <= 0) {
            this.state = 3;
        }
    }
    
    update() {

        if (Math.abs(this.game.gunner.x - this.x) < 8 * PARAMS.BLOCKWIDTH
                && Math.abs(this.game.gunner.y - this.y) < 2 * PARAMS.BLOCKWIDTH) {
            this.activated = true;
        }
        
        if (this.activated) {

            // handle death
            if (this.state == 3) {
                // todo: handle death?
                if (this.animations[this.state][this.facing].isDone()) {
                    this.game.camera.gameOver = true;
                    ASSET_MANAGER.playAsset("./assets/audio/gameWin.wav");
                    this.game.addEntity(new WinScreen(this.game));
                    this.removeFromWorld = true;
                    console.log("GAME OVER, YOU WIN!") 
                }
            } else {

                const TICK = this.game.clockTick;
                const WALK_SPEED = 60;
                const JUMP_INITIAL_VELOCITY = -200;
                const GRAVITY = 20;

                this.currentTimer = Math.max(0, this.currentTimer - TICK);
                if (this.currentTimer == 0) {
                    this.gameState = (++this.gameState) % 4;
                    this.currentTimer = this.gameStateTimers[this.gameState];
                }

                if (this.gameState == 0) {
                    // moving left
                    this.state = 1;
                    this.facing = 0;
                    this.velocityX = -WALK_SPEED;
                } else if (this.gameState == 1) {
                    // looking right
                    console.log("1")

                    this.state = 0;
                    this.velocityX = 0;
                    this.facing = 1;
                } else if (this.gameState == 2) {
                    // walking right
                    console.log("2")
                    
                    this.state = 1;
                    this.facing = 1;
                    this.velocityX = WALK_SPEED;
    
                } else if (this.gameState == 3) {
                    // looking left
                    console.log("3")
                
                    this.state = 0;
                    this.velocityX = 0;
                    this.facing = 0;

                }


                this.x += this.velocityX * TICK * PARAMS.SCALE;

                if (this.gameState == 0 || this.gameState == 2) {
                    // shooting
                    this.shootTimer = Math.max(0, this.shootTimer - this.game.clockTick);
                    if (this.shootTimer == 0 && this.ammo > 0) {
                        this.ammo--;
                        this.shootTimer = this.shootTimeout;
                        this.game.addEntity(new Bullet(this.game, this.x, this.y, true, this.facing ? 1 : -1));
                        ASSET_MANAGER.playAsset("./assets/audio/shootSound.wav");
                    }
                }

                this.updateBB();
                }   
            
            }   


    };

    draw(ctx) {

        ctx.save();

        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE * 1.5);


        if (this.numLives > 0) {

            ctx.lineWidth = 5;
            ctx.strokeStyle = "Black";
            let percentage = this.numLives / this.maxLives;
            if (percentage * 100 <= 25) {
                ctx.fillStyle = "Red";
            } else if (percentage * 100 >= 75) {
                ctx.fillStyle = "Green";
            } else {
                ctx.fillStyle = "Orange";
            }


            ctx.fillRect(this.BB.x - this.game.camera.x + 5, 
                         this.BB.top - 10 - this.game.camera.y, PARAMS.BLOCKWIDTH * .8, 10);
            ctx.strokeRect(this.BB.x - this.game.camera.x + 5, 
                            this.BB.top - 10 - this.game.camera.y, PARAMS.BLOCKWIDTH * .8, 10);
        }





        if (PARAMS.DEBUG) {
            ctx.lineWidth = 3
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }

        ctx.restore();
    };
};