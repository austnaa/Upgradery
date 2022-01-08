class Block {
    constructor(game, x, y, startRow, startCol, row, col, isCollidable) {
        Object.assign(this, { game, x, y, isCollidable });

        this.spritesheet = ASSET_MANAGER.getAsset("./assets/visuals/EnvironmentTiles.png");
        
        row += startRow;
        col += startCol;            

        this.animation = new Animator(this.spritesheet, 48 * col, 48 * row, 48, 48, 1, 1, 0, false, true); 

        if (isCollidable) {
            this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH); 
            this.topBB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH / 2); 
            this.bottomBB = new BoundingBox(this.x, this.y + PARAMS.BLOCKWIDTH * 0.5, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH / 2);   
            // this.leftBB = new BoundingBox(this.x, this.y + PARAMS.BLOCKWIDTH * 0.1, PARAMS.BLOCKWIDTH * .1, PARAMS.BLOCKWIDTH * .8);   
            // this.rightBB = new BoundingBox(this.x + PARAMS.BLOCKWIDTH * 0.8, this.y + PARAMS.BLOCKWIDTH * 0.1, PARAMS.BLOCKWIDTH * .1, PARAMS.BLOCKWIDTH * .8);   
        }
    };


    update() {
        // no changes 
    };

    drawMinimap(ctx, mmX, mmY) {

    };

    draw(ctx) {
        
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE);

        if (PARAMS.DEBUG && this.isCollidable) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
            ctx.strokeRect(this.topBB.x - this.game.camera.x, this.topBB.y - this.game.camera.y, this.topBB.width, this.topBB.height);
            ctx.strokeRect(this.bottomBB.x - this.game.camera.x, this.bottomBB.y - this.game.camera.y, this.bottomBB.width, this.bottomBB.height);
            // ctx.strokeRect(this.rightBB.x - this.game.camera.x, this.rightBB.y, this.rightBB.width, this.rightBB.height);
            // ctx.strokeRect(this.leftBB.x - this.game.camera.x, this.leftBB.y, this.leftBB.width, this.leftBB.height);
        }
    };
};