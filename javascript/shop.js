class Shop {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        this.addConstants();
        this.addBBs();

        

        

    };

    addConstants() { 
        let yOffset = PARAMS.BLOCKWIDTH * 1.3;
        this.BOX_X = 0.25 * PARAMS.BLOCKWIDTH
        this.TEXT_X = 0.3 * PARAMS.BLOCKWIDTH
        this.BOX_WIDTH = PARAMS.BLOCKWIDTH * 9.5;
        this.BOX_HEIGHT = PARAMS.BLOCKWIDTH * 1;
        
        this.SPEED_TEXT_Y = (1 + (0 * 1.25)) * PARAMS.BLOCKWIDTH + yOffset;
        this.SPEED_BOX_Y = (0.25 + (0 * 1.25)) * PARAMS.BLOCKWIDTH + yOffset;
        this.JUMP_TEXT_Y = (1 + (1 * 1.25)) * PARAMS.BLOCKWIDTH + yOffset;
        this.JUMP_BOX_Y = (0.25 + (1 * 1.25)) * PARAMS.BLOCKWIDTH + yOffset;    
        this.TIME_TEXT_Y = (1 + (2 * 1.25)) * PARAMS.BLOCKWIDTH + yOffset;
        this.TIME_BOX_Y = (0.25 + (2 * 1.25)) * PARAMS.BLOCKWIDTH + yOffset;
        this.AMMO_TEXT_Y = (1 + (3 * 1.25)) * PARAMS.BLOCKWIDTH + yOffset;
        this.AMMO_BOX_Y = (0.25 + (3 * 1.25)) * PARAMS.BLOCKWIDTH + yOffset;
        this.SHOOT_SPEED_TEXT_Y = (1 + (4 * 1.25)) * PARAMS.BLOCKWIDTH + yOffset;
        this.SHOOT_SPEED_BOX_Y = (0.25 + (4 * 1.25)) * PARAMS.BLOCKWIDTH + yOffset;
        this.MULTIPLIER_TEXT_Y = (1 + (5 * 1.25)) * PARAMS.BLOCKWIDTH + yOffset;
        this.MULTIPLIER_BOX_Y = (0.25 + (5 * 1.25)) * PARAMS.BLOCKWIDTH + yOffset;

        this.PLAY_BOX_X = 3.5 * PARAMS.BLOCKWIDTH;
        this.PLAY_BOX_Y = 9 * PARAMS.BLOCKWIDTH;
        this.PLAY_BOX_WIDTH = PARAMS.BLOCKWIDTH * 2.63;
        this.PLAY_BOX_HEIGHT = PARAMS.BLOCKWIDTH * .7;
        
        this.PLAY_TEXT_X = 3.5 * PARAMS.BLOCKWIDTH;
        this.PLAY_TEXT_Y = 9.6 * PARAMS.BLOCKWIDTH;
    }

    addBBs() {
        this.mouseBB = new BoundingBox(0, 0, 1, 1);   
        
        
        this.speedBB = new BoundingBox(this.BOX_X, this.SPEED_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);
        this.jumpBB = new BoundingBox(this.BOX_X, this.JUMP_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);
        this.timeBB = new BoundingBox(this.BOX_X, this.TIME_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);
        this.ammoBB = new BoundingBox(this.BOX_X, this.AMMO_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);
        this.shootSpeedBB = new BoundingBox(this.BOX_X, this.SHOOT_SPEED_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);
        this.multiplierBB = new BoundingBox(this.BOX_X, this.MULTIPLIER_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);

        this.playBB = new BoundingBox(this.PLAY_BOX_X, this.PLAY_BOX_Y, this.PLAY_BOX_WIDTH, this.PLAY_BOX_HEIGHT);
        
    }

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

    
    setDefaultFillAndStroke(ctx) {
        ctx.fillStyle = "LightGrey";
        ctx.strokeStyle = "LightGrey";
    }

    draw(ctx) {    
        let oldLineWidth = ctx.lineWidth;

        ctx.fillStyle = "LightGrey";
        ctx.strokeStyle = "LightGrey";
        ctx.lineWidth = 10;
         
        // SHOP title
        ctx.font = PARAMS.BLOCKWIDTH + 'px "silkscreenbold"';
        ctx.fillText("SHOP", 0.5 * PARAMS.BLOCKWIDTH, 1.25 * PARAMS.BLOCKWIDTH);
        
        ctx.font = .75 * PARAMS.BLOCKWIDTH + 'px "silkscreennormal"'; 
        
        // speed
        if (this.mouseBB.collide(this.speedBB)) {
            ctx.strokeStyle =  "LightGreen";
            ctx.fillStyle = "LightGreen";
        } 
        ctx.fillText("SPEED", this.TEXT_X, this.SPEED_TEXT_Y);
        ctx.strokeRect(this.BOX_X, this.SPEED_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);

        this.setDefaultFillAndStroke(ctx);
        
        // jump
        if (this.mouseBB.collide(this.jumpBB)) {
            ctx.strokeStyle =  "LightGreen";
            ctx.fillStyle = "LightGreen";
        }
        ctx.fillText("JUMP", this.TEXT_X, this.JUMP_TEXT_Y);
        ctx.strokeRect(this.BOX_X, this.JUMP_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);

        this.setDefaultFillAndStroke(ctx)
        
        // time
        if (this.mouseBB.collide(this.timeBB)) {
            ctx.strokeStyle =  "LightGreen";
            ctx.fillStyle = "LightGreen";
        }
        ctx.fillText("TIME", this.TEXT_X, this.TIME_TEXT_Y);
        ctx.strokeRect(this.BOX_X, this.TIME_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);

        this.setDefaultFillAndStroke(ctx)

        // ammo
        if (this.mouseBB.collide(this.ammoBB)) {
            ctx.strokeStyle =  "LightGreen";
            ctx.fillStyle = "LightGreen";
        }
        ctx.fillText("AMMO", this.TEXT_X, this.AMMO_TEXT_Y);
        ctx.strokeRect(this.BOX_X, this.AMMO_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);

        this.setDefaultFillAndStroke(ctx)

        // shoot speed
        if (this.mouseBB.collide(this.shootSpeedBB)) {
            ctx.strokeStyle =  "LightGreen";
            ctx.fillStyle = "LightGreen";
        }
        ctx.fillText("SHOOT SPEED", this.TEXT_X, this.SHOOT_SPEED_TEXT_Y);
        ctx.strokeRect(this.BOX_X, this.SHOOT_SPEED_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);

        this.setDefaultFillAndStroke(ctx)
 
        // multiplier
        if (this.mouseBB.collide(this.multiplierBB)) {
            ctx.strokeStyle =  "LightGreen";
            ctx.fillStyle = "LightGreen";
        }
        ctx.fillText("MULTIPLIER", this.TEXT_X, this.MULTIPLIER_TEXT_Y);
        ctx.strokeRect(this.BOX_X, this.MULTIPLIER_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);

        this.setDefaultFillAndStroke(ctx)

        // play
        if (this.mouseBB.collide(this.playBB)) {
            ctx.strokeStyle =  "LightGreen";
            ctx.fillStyle = "LightGreen";
        }
        ctx.font = .75 * PARAMS.BLOCKWIDTH + 'px "silkscreenbold"';  
        ctx.fillText("PLAY", this.PLAY_TEXT_X, this.PLAY_TEXT_Y);
        ctx.strokeRect(this.PLAY_BOX_X, this.PLAY_BOX_Y, this.PLAY_BOX_WIDTH, this.PLAY_BOX_HEIGHT);

        ctx.lineWidth = oldLineWidth;

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.mouseBB.x, this.mouseBB.y, this.mouseBB.width, this.mouseBB.height);

            ctx.strokeRect(this.speedBB.x, this.speedBB.y, this.speedBB.width, this.speedBB.height);
            ctx.strokeRect(this.jumpBB.x, this.jumpBB.y, this.jumpBB.width, this.jumpBB.height);
            ctx.strokeRect(this.timeBB.x, this.timeBB.y, this.timeBB.width, this.timeBB.height);
            ctx.strokeRect(this.ammoBB.x, this.ammoBB.y, this.ammoBB.width, this.ammoBB.height);
            ctx.strokeRect(this.shootSpeedBB.x, this.shootSpeedBB.y, this.shootSpeedBB.width, this.shootSpeedBB.height);
            ctx.strokeRect(this.multiplierBB.x, this.multiplierBB.y, this.multiplierBB.width, this.multiplierBB.height);

            ctx.strokeRect(this.playBB.x, this.playBB.y, this.playBB.width, this.playBB.height);
        }

    };
};