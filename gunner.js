class Gunner {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/Gunner.png");
        
        this.jumpLevel = 3;  // which upgrade level the jump is on
        this.speedLevel = 3; // which upgrade level the walk speed is on

        // how many times we can apply upward 
        // force after initially jumping
        // used to allow for higher jumps when the up continues to be pressed
        this.upPower = 100; 
        
        this.velocityX = 0;
        this.velocityY = 0;

        this.facing = 1; // 0: right, 1: left,
        this.state = 0;  // 0: idle,  1: run,  2: jump, 3: dead

        this.addAnimations();
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
        this.animations[3][0] = new Animator(this.spritesheet, 0, 48*7, 48, 48, 8, 0.2, 0, false, true); // die left
        this.animations[3][1] = new Animator(this.spritesheet, 0, 48*3, 48, 48, 8, 0.2, 0, false, true); // die right
    }

    update() {
// print("x: " + this.x);
// print("y: " + this.y);

        const TICK = this.game.clockTick;
        const WALK_SPEED = [0, 25, 50, 100][this.speedLevel];
        const JUMP_INITIAL_VELOCITY = [0, -100, -200, -250][this.jumpLevel]; 
        const GRAVITY = 20;

        if (this.state == 3) {
            // todo: handle death?
        } else {

            if (this.state == 2) { // gunner is currently jumping (air functionality)
                
                if (this.y > PARAMS.BLOCKWIDTH * 3) { 
                    // determine if the player should still be jumping
                    // this may no longer be needed once collision is implemented
                    this.y == 0;
                    this.velocityY = 0;
                    this.state = 0;
                    this.upPower = 100;
                } else {
                    this.velocityY += GRAVITY;
                    
                    // adds to the upwards velocity if the UP is pressed
                    // (will run out eventually) 
                    if (this.game.up() && this.upPower > 0 && this.velocityY < 0) {
                        // add to the upwards velocity if allowed
                        this.velocityY += -10;
                        this.upPower -= 1;
                    }
                }

                // direction the gunner is looking in air 
                // has a small impact on velocityX
                if (this.game.left() && !this.game.right()) {
                    this.facing = 0; 
                    this.velocityX = Math.max(-WALK_SPEED, this.velocityX - WALK_SPEED / 10);
                }
                else if (!this.game.left() && this.game.right()) {
                    this.facing = 1;
                    this.velocityX = Math.min(WALK_SPEED, this.velocityX + WALK_SPEED / 10);
                }
            } 
            else { // the gunner is not jumping (ground functionality)
                
                if (this.game.left()) {
                    this.state = 1;
                    this.facing = 0;
                    this.velocityX = -WALK_SPEED;
                }
                else if (this.game.right()) {
                    this.state = 1;
                    this.facing = 1;
                    this.velocityX = WALK_SPEED;
                } else {
                    // not trying to move right or left so state is idle
                    this.state = 0;
                    this.velocityX = 0;
                }

                if (this.game.up()) {
                    this.state = 2;
                    this.velocityY = JUMP_INITIAL_VELOCITY;
                    
                }

            }

            // if (this.game.shoot()) {
            //     print("shoot");
            // }
        }

        this.x += this.velocityX * TICK * PARAMS.SCALE;
        this.y += this.velocityY * TICK * PARAMS.SCALE;

        // todo: collisions
    };

    drawMinimap(ctx, mmX, mmY) {
        // ctx.fillStyle = "Red";
        // ctx.fillRect(mmX + this.x / PARAMS.BITWIDTH, mmY + this.y / PARAMS.BITWIDTH, this.w / PARAMS.BITWIDTH, PARAMS.SCALE * 2);
    };

    draw(ctx) {

        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
};