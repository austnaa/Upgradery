class TitleScreen {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});

        this.playBB = new BoundingBox(3.5 * PARAMS.BLOCKWIDTH, 5.4 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2.7, PARAMS.BLOCKWIDTH * .8);
        this.mouseBB = new BoundingBox(0, 0, 1, 1);
    };

    update() {
        if (this.game.click) {
            this.mouseBB = new BoundingBox(this.game.click.x, this.game.click.y, 1, 1);   
            if (this.mouseBB.collide(this.playBB)) {
                this.game.camera.play();
            }
            this.game.click = null;
        }

        if (this.game.mouse) {
            this.mouseBB = new BoundingBox(this.game.mouse.x, this.game.mouse.y, 1, 1);   
        }
    };


    draw(ctx) {    
        let oldLineWidth = ctx.lineWidth;

        ctx.fillStyle = "LightGrey";
        ctx.strokeStyle = "LightGrey";
        ctx.lineWidth = 10;

        // title
        ctx.font = PARAMS.BLOCKWIDTH + 'px "silkscreenbold"';
        ctx.fillText("UPGRADERY", 0.75 * PARAMS.BLOCKWIDTH, 3 * PARAMS.BLOCKWIDTH);

        // by Austn
        ctx.font = PARAMS.BLOCKWIDTH / 4 + 'px "silkscreenbold"';
        ctx.fillText("by Austn", 13.2 * PARAMS.BLOCKWIDTH / 2, 3.25 * PARAMS.BLOCKWIDTH);

        // play
        if (this.mouseBB.collide(this.playBB)) {
            ctx.strokeStyle =  "LightGreen";
            ctx.fillStyle = "LightGreen";
        }
        ctx.font = .75 * PARAMS.BLOCKWIDTH + 'px "silkscreenbold"';  
        ctx.fillText("PLAY", 3.5 * PARAMS.BLOCKWIDTH, 6 * PARAMS.BLOCKWIDTH);
        ctx.strokeRect(3.5 * PARAMS.BLOCKWIDTH, 5.4 * PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH * 2.63, PARAMS.BLOCKWIDTH * .7);

        ctx.lineWidth = oldLineWidth;

    };
};