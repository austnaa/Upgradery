class Transporter {
    constructor(game, x, y, size, isRotatingRight) {
        Object.assign(this, { game, x, y, isRotatingRight});

        this.transportValue = .7 * (this.isRotatingRight ? 1 : -1);

        this.spritesheet = ASSET_MANAGER.getAsset("./assets/visuals/Transporter.png");
        let bbWidth = PARAMS.BLOCKWIDTH * (size + .7);
        let bbHeight = 16;
        this.BB = new BoundingBox(x, y, bbWidth, 2 * bbHeight);
        this.topBB = new BoundingBox(x, y, bbWidth, bbHeight);
        this.bottomBB = new BoundingBox(x, y + 16, bbWidth, bbHeight);
        
        this.animationArr = [];
        this.animationArr.push(new Animator(this.spritesheet, 0, 0, 32, 16, 4, 0.1, 0, !this.isRotatingRight, true));
        for (let i = 0; i < size; i++) {
            this.animationArr.push(new Animator(this.spritesheet, 0, 32, 32, 16, 4, 0.1, 0, !this.isRotatingRight, true));
        }
        this.animationArr.push(new Animator(this.spritesheet, 0, 32*2, 32, 16, 4, 0.1, 0, !this.isRotatingRight, true));

    };

    update() {
        // no changes 
    };

    drawMinimap(ctx, mmX, mmY) {

    };

    draw(ctx) {
        for (let i = 0; i < this.animationArr.length; i++) {
            let xPos = this.x - this.game.camera.x + (i * PARAMS.SCALE * 32);
            this.animationArr[i].drawFrame(this.game.clockTick, ctx, xPos, this.y - this.game.camera.y, PARAMS.SCALE);
        }

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.topBB.x - this.game.camera.x, this.topBB.y, this.topBB.width, this.topBB.height);
            ctx.strokeRect(this.bottomBB.x - this.game.camera.x, this.bottomBB.y, this.bottomBB.width, this.bottomBB.height);
        }
    };
};