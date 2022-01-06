class Entry {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset("./assets/Entry.png");
        this.animation = new Animator(this.spritesheet, 0, 0, 32, 64, 8, 0.15, 0, false, true); 
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