class Animator {
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop) {
        Object.assign(this, { spritesheet, xStart, yStart, height, width, frameCount, frameDuration, framePadding, reverse, loop });

        this.elapsedTime = 0;
        this.totalTime = this.frameCount * this.frameDuration;

    };

    drawFrame(tick, ctx, x, y, scale) {
        this.elapsedTime += tick;

        if (this.isDone()) {
            if (this.loop) {
                this.elapsedTime -= this.totalTime;
            } else {
                return;
            }
        }

        let frame = this.currentFrame();
        if (this.reverse) frame = this.frameCount - frame - 1;
       
        ctx.drawImage(this.spritesheet,
            this.xStart + frame * (this.width + this.framePadding), this.yStart, //source from sheet
            this.width, this.height,
            x, y,
            this.width * scale,
            this.height * scale);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Green';
            ctx.strokeRect(x, y, this.width * scale, this.height * scale);
        }
    };

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
};

// animator that also accepts a hammer entity.
// on drawFrame, tells hammer to update its BB depending on the animation frame
class HammerAnimator extends Animator {

    constructor(hammerEntity, spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop) {
        super(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop);
        this.hammerEntity = hammerEntity;

    }
    
    // notifies the hammer entity attatched to this animator that
    // the frame has changed and the BB should also change
    drawFrame(tick, ctx, x, y, scale) {
        super.drawFrame(tick, ctx, x, y, scale);
        
        if (this.isDone()) {
            // draw the first image (looks like it isn't doing anything)
            ctx.drawImage(this.spritesheet, this.xStart, this.yStart, this.width, this.height, x, y, this.width * scale, this.height * scale);
            
            // update the BB to be the initial state
            this.hammerEntity.updateBB(0);

            // let the hammer know it is waiting until it can repeat again.
            // tell it to increment its wait timer
            this.hammerEntity.updateAnimationTimeout(tick);

            // restart the animation if the hammer is ready.
            if (this.hammerEntity.readyToLoop()) {
                this.elapsedTime = 0;
            }
        } else {
            this.hammerEntity.updateBB(this.currentFrame());
        }
        
    }
};