class Hud {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});

        this.cashSheet = ASSET_MANAGER.getAsset("./assets/visuals/Money.png");
        this.cashAnimation = new Animator(this.cashSheet, 0, 0, 24, 24, 6, 0.2, 0, false, true); 

        this.heartSheet = ASSET_MANAGER.getAsset("./assets/visuals/Hearts.png");
        this.heartAnimation = new Animator(this.heartSheet, 0, 0, 32, 32, 1, 0.2, 0, false, true);
    };

    update() {

    };

    draw(ctx) {    
        ctx.fillStyle = "LightGrey";    
    
        // cash
        ctx.font = PARAMS.BLOCKWIDTH / 2 + 'px "silkscreennormal"';
        ctx.fillText("" + floor(this.game.savedData.cash), 0.8 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 0.6);
        this.cashAnimation.drawFrame(this.game.clockTick, ctx, PARAMS.BLOCKWIDTH * .1, PARAMS.BLOCKWIDTH * 0.1, PARAMS.SCALE * 1.6);

        // time remaining
        ctx.fillText("" + floor(this.game.timeRemaining), 5 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 0.6);

        // lives
        for (let i = 0; i < this.game.gunner.numLives; i++) {
            this.heartAnimation.drawFrame(this.game.clockTick, ctx, (9.25 - 0.5 * i) * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 0.15, PARAMS.SCALE * 0.75);
        }

    };
};