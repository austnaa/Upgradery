class Cash {
    constructor(game, x, y, w) {
        Object.assign(this, { game, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset("./assets/visuals/Money.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 24, 24, 6, 0.2, 0, false, true); 

        this.BB = new BoundingBox(this.x + 4, this.y + 4, 16 * PARAMS.SCALE, 16 * PARAMS.SCALE); 
    };

    update() {
        // no changes 
    };

    drawMinimap(ctx, mmX, mmY) {

    };

    draw(ctx) {
        
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};