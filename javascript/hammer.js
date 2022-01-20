class Hammer {
    constructor(game, x, y, timeBetween) {
        Object.assign(this, { game, x, y, timeBetween});

        this.spritesheet = ASSET_MANAGER.getAsset("./assets/visuals/Hammer.png");
        this.animation = new HammerAnimator(this, this.spritesheet, 0, 0, 32, 64, 8, 0.15, 0, false, false); 

        this.elapsedTime = 0;
        this.currFrame = 0;

        
        // the BBs for each animation frame (frame is the index)
        this.BBs = [
            new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH * 2, PARAMS.BLOCKWIDTH * 2),
            new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH * 2, PARAMS.BLOCKWIDTH * 3.2),
            new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH * 2, PARAMS.BLOCKWIDTH * 4), 
            new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH * 2, PARAMS.BLOCKWIDTH * 4),
            new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH * 2, PARAMS.BLOCKWIDTH * 4),
            new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH * 2, PARAMS.BLOCKWIDTH * 3.2),
            new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH * 2, PARAMS.BLOCKWIDTH * 2.6),
            new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH * 2, PARAMS.BLOCKWIDTH * 2),
        ];

    };

    isLethalAnimation() {
        return this.currFrame != 0 && this.currFrame != 7;
    }

    updateBB(currFrame) {
        this.currFrame = currFrame;
        this.BB = this.BBs[currFrame];
    }

    updateAnimationTimeout(clocktick) {
        this.elapsedTime += clocktick;
    }

    readyToLoop() {
        if (this.elapsedTime > 2) {
            this.elapsedTime = 0;
            return true;
        } else {
            return false;
        }
    }

    update() {
        // no changes 
    };

    draw(ctx) {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE * 3);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};