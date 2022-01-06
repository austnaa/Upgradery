class Gunner {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset("./assets/Gunner.png");

        this.animations = [];
        for (let i = 0; i < 4; i++) { // idle: 0, running: 1, jumping: 2, dying: 3
            this.animations.push([]);
            for (let j = 0; j < 2; j++) { // left: 0, right: 1
                this.animations.push([]);                
            }
        }

        // idle
        this.animations[0][0] = new Animator(this.spritesheet, 0, 0, 48, 48, 5, 0.2, 0, false, true); // idle right
        this.animations[0][1] = new Animator(this.spritesheet, 0, 48*4, 48, 48, 5, 0.2, 0, false, true); // idle left

        // run
        this.animations[1][0] = new Animator(this.spritesheet, 0, 48, 48, 48, 6, 0.3, 0, false, true); // run right
        this.animations[1][1] = new Animator(this.spritesheet, 0, 48*5, 48, 48, 6, 0.3, 0, false, true); // run left

        // jump
        this.animations[2][0] = new Animator(this.spritesheet, 0, 48*2, 48, 48, 2, 0.6, 0, false, true); // jump right
        this.animations[2][1] = new Animator(this.spritesheet, 0, 48*6, 48, 48, 2, 0.6, 0, false, true); // jump left

        // die
        this.animations[3][0] = new Animator(this.spritesheet, 0, 48*3, 48, 48, 8, 0.2, 0, false, true); // die right
        this.animations[3][1] = new Animator(this.spritesheet, 0, 48*7, 48, 48, 8, 0.2, 0, false, true); // die left

    };

    update() {
        // no changes 
    };

    drawMinimap(ctx, mmX, mmY) {
        // ctx.fillStyle = "Red";
        // ctx.fillRect(mmX + this.x / PARAMS.BITWIDTH, mmY + this.y / PARAMS.BITWIDTH, this.w / PARAMS.BITWIDTH, PARAMS.SCALE * 2);
    };

    draw(ctx) {
        
        // idle
        this.animations[0][0].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);
        this.animations[0][1].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x + PARAMS.BLOCKWIDTH, this.y, PARAMS.SCALE);

        // run
        this.animations[1][0].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y + PARAMS.BLOCKWIDTH, PARAMS.SCALE);
        this.animations[1][1].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x + PARAMS.BLOCKWIDTH, this.y + PARAMS.BLOCKWIDTH, PARAMS.SCALE);

        // jump
        this.animations[2][0].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y + (PARAMS.BLOCKWIDTH * 2), PARAMS.SCALE);
        this.animations[2][1].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x + PARAMS.BLOCKWIDTH, this.y + (PARAMS.BLOCKWIDTH * 2), PARAMS.SCALE);
        
        // die
        this.animations[3][0].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y + (PARAMS.BLOCKWIDTH * 3), PARAMS.SCALE);
        this.animations[3][1].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x + PARAMS.BLOCKWIDTH, this.y + (PARAMS.BLOCKWIDTH * 3), PARAMS.SCALE);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
};