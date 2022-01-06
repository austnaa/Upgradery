class Money {
    constructor(game, x, y, w) {
        Object.assign(this, { game, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset("./assets/Money.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 24, 24, 6, 0.2, 0, false, true); 
    };

    update() {
        // no changes 
    };

    drawMinimap(ctx, mmX, mmY) {

    };

    draw(ctx) {
        
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
};