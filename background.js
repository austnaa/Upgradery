class Background {
    constructor(game, x, y,) {
        Object.assign(this, { game, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset("./assets/Background.png");
    };

    update() {
        // no changes 
    };

    drawMinimap(ctx, mmX, mmY) {
        // not needed
    };

    draw(ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);
        ctx.drawImage(this.spritesheet, 0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);
    };
};