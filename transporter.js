class Transporter {
    constructor(game, x, y, size) {
        Object.assign(this, { game, x, y});

        this.spritesheet = ASSET_MANAGER.getAsset("./assets/Transporter.png");
        
        this.animationArr = [];
        this.animationArr.push(new Animator(this.spritesheet, 0, 0, 32, 16, 4, 0.1, 0, false, true));
        for (let i = 0; i < size; i++) {
            this.animationArr.push(new Animator(this.spritesheet, 0, 32, 32, 16, 4, 0.1, 0, false, true));
        }
        this.animationArr.push(new Animator(this.spritesheet, 0, 32*2, 32, 16, 4, 0.1, 0, false, true));

    };

    update() {
        // no changes 
    };

    drawMinimap(ctx, mmX, mmY) {

    };

    draw(ctx) {
        for (let i = 0; i < this.animationArr.length; i++) {
            let xPos = this.x - this.game.camera.x + (i * PARAMS.SCALE * 32);
            this.animationArr[i].drawFrame(this.game.clockTick, ctx, xPos, this.y, PARAMS.SCALE);
        }

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
};