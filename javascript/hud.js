class Hud {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});

        this.cashSheet = ASSET_MANAGER.getAsset("./assets/visuals/Money.png");
        this.cashAnimation = new Animator(this.cashSheet, 0, 0, 24, 24, 6, 0.2, 0, false, true); 

        this.heartSheet = ASSET_MANAGER.getAsset("./assets/visuals/Hearts.png");
        this.heartAnimation = new Animator(this.heartSheet, 0, 0, 32, 32, 1, 0.2, 0, false, true);

        this.exitBB = new BoundingBox(PARAMS.CANVAS_WIDTH / 2 - 50, PARAMS.CANVAS_HEIGHT * .85, 200, 50);
    };

    update() {
        if (this.game.mouse) {
            this.mouseBB = new BoundingBox(this.game.mouse.x, this.game.mouse.y, 1, 1);
        }

        if (this.game.click) {
            if (this.mouseBB.collide(this.exitBB)) {
                this.game.timeRemaining = 0;
            }
        }

    };

    draw(ctx) {  
        ctx.save();  
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

        ctx.strokeStyle = "lightgrey";
        if (this.mouseBB && this.mouseBB.collide(this.exitBB)) {
            ctx.strokeStyle = "LightGreen";
            ctx.fillStyle = "LightGreen";
        }
        ctx.lineWidth = 10;
        ctx.strokeRect(this.exitBB.left, this.exitBB.top, this.exitBB.width, this.exitBB.height);
        ctx.fillText("FINISH", this.exitBB.left + 10, this.exitBB.bottom - 10);

        ctx.restore();
    };
};