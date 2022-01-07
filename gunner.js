class Gunner {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset("./assets/Gunner.png");
        
        this.velocityX = 0;
        this.velocityY = 0;

        this.facing = 1; // 0: right, 1: left,
        this.state = 0;  // 0: idle,  1: run,  2: jump
        this.dead = false;


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
        
    };

    update() {
// print("x: " + this.x);
// print("y: " + this.y);

        const TICK = this.game.clockTick;
        const WALK_SPEED = 100;
        const JUMP_INITIAL_VELOCITY = -300; 
        const GRAVITY = 20;
         
        if (this.dead) {
            // todo: handle death
        } else {

            if (this.state == 2) { // gunner is currently jumping (air functionality)
                // determine if the player should still be jumping
                if (this.y > PARAMS.BLOCKWIDTH * 3) {
                    this.y == 0;
                    this.velocityY = 0;
                    this.state = 0;
                } else {
                    this.velocityY += GRAVITY;
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
                    print("left");
                    this.state = 1;
                    this.facing = 0;
                    this.velocityX = -WALK_SPEED;
                }
                else if (this.game.right()) {
                    print("right");
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






    };

    drawMinimap(ctx, mmX, mmY) {
        // ctx.fillStyle = "Red";
        // ctx.fillRect(mmX + this.x / PARAMS.BITWIDTH, mmY + this.y / PARAMS.BITWIDTH, this.w / PARAMS.BITWIDTH, PARAMS.SCALE * 2);
    };

    draw(ctx) {

        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);


        // // idle
        // this.animations[0][0].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);
        // this.animations[0][1].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x + PARAMS.BLOCKWIDTH, this.y, PARAMS.SCALE);

        // // run
        // this.animations[1][0].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y + PARAMS.BLOCKWIDTH, PARAMS.SCALE);
        // this.animations[1][1].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x + PARAMS.BLOCKWIDTH, this.y + PARAMS.BLOCKWIDTH, PARAMS.SCALE);

        // // jump
        // this.animations[2][0].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y + (PARAMS.BLOCKWIDTH * 2), PARAMS.SCALE);
        // this.animations[2][1].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x + PARAMS.BLOCKWIDTH, this.y + (PARAMS.BLOCKWIDTH * 2), PARAMS.SCALE);
        
        // // die
        // this.animations[3][0].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y + (PARAMS.BLOCKWIDTH * 3), PARAMS.SCALE);
        // this.animations[3][1].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x + PARAMS.BLOCKWIDTH, this.y + (PARAMS.BLOCKWIDTH * 3), PARAMS.SCALE);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
};