class Shop {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        this.addConstants();
        this.addBBs();
        this.cashSheet = ASSET_MANAGER.getAsset("./assets/visuals/Money.png");
        this.cashAnimation = new Animator(this.cashSheet, 0, 0, 24, 24, 6, 0.2, 0, false, true);
        
        this.speedCost = this.SPEED_COSTS[0];
        this.jumpCost = this.JUMP_COSTS[0];
        this.timeCost = this.TIME_COSTS[0];
        this.ammoCost = this.AMMO_COSTS[0];
        this.shootSpeedCost = this.SHOOT_SPEED_COSTS[0];
        this.multiplierCost = this.MULTIPLIER_COSTS[0];
    };

    addConstants() { 

        this.SPEED_COSTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.JUMP_COSTS  = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.TIME_COSTS  = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.AMMO_COSTS  = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.SHOOT_SPEED_COSTS  = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.MULTIPLIER_COSTS  = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        let yOffset = PARAMS.BLOCKWIDTH * 1.3;
        this.BOX_X = 0.25 * PARAMS.BLOCKWIDTH
        this.TEXT_X = 0.3 * PARAMS.BLOCKWIDTH
        this.BOX_WIDTH = PARAMS.BLOCKWIDTH * 9.5;
        this.BOX_HEIGHT = PARAMS.BLOCKWIDTH * 1;

        this.COST_OFFSET_X = 880;
        this.COST_OFFSET_Y = 25;

        this.LEVEL_OFFSET_X = 810;
        
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
 
    setDefaultFillAndStroke(ctx) {
        ctx.fillStyle = "LightGrey";
        ctx.strokeStyle = "LightGrey";
    }

    setStrokeAndFillGreen(ctx) {
        ctx.strokeStyle = "LightGreen";
        ctx.fillStyle = "LightGreen";
    }

    setStrokeAndFillDark(ctx) {
        ctx.strokeStyle = "DimGrey";
        ctx.fillStyle = "DimGrey";
    }
    setStrokeAndFillMaxLevel(ctx) {
        ctx.strokeStyle = "Orange";
        ctx.fillStyle = "Orange";
    }

    setSmallFont(ctx) {
        ctx.font = PARAMS.BLOCKWIDTH / 4 + 'px "silkscreennormal"';
    }

    setMediumFont(ctx) {
        ctx.font = PARAMS.BLOCKWIDTH / 2 + 'px "silkscreennormal"';
    }

    setLargeFont(ctx) {
        ctx.font = .75 * PARAMS.BLOCKWIDTH + 'px "silkscreennormal"'; 
    }

    update() {
        if (this.game.click) {
            this.mouseBB = new BoundingBox(this.game.click.x, this.game.click.y, 1, 1);   
            
            if (this.mouseBB.collide(this.speedBB) && this.game.cash >= this.speedCost) { // click speed
                this.game.speedLevel++;
                this.game.cash -= this.speedCost;
            }
            if (this.mouseBB.collide(this.jumpBB) && this.game.cash >= this.jumpCost) { // click jump
                this.game.jumpLevel++;
                this.game.cash -= this.jumpCost;
            }
            if (this.mouseBB.collide(this.timeBB) && this.game.cash >= this.timeCost) { // click time
                this.game.timeLevel++;
                this.game.cash -= this.timeCost;
            }
            if (this.mouseBB.collide(this.ammoBB) && this.game.cash >= this.ammoCost) { // click ammo
                this.game.ammoLevel++;
                this.game.cash -= this.ammoCost;
            }
            if (this.mouseBB.collide(this.shootSpeedBB) && this.game.cash >= this.shootSpeedCost) { // click shoot speed
                this.game.shootSpeedLevel++;
                this.game.cash -= this.shootSpeedCost;
            }
            if (this.mouseBB.collide(this.multiplierBB) && this.game.cash >= this.multiplierCost) { // click multiplier
                this.game.multiplierLevel++;
                this.game.cash -= this.multiplierCost;
            }
            if (this.mouseBB.collide(this.playBB)) { // click play
                this.game.camera.play();
            }

            this.game.click = null;
        }

        if (this.game.mouse) {
            this.mouseBB = new BoundingBox(this.game.mouse.x, this.game.mouse.y, 1, 1);   
        }
        
    };

    formatLevel(level) {
        return String(level).padStart(2, '0') + "/10";
    }

    draw(ctx) {  
        this.speedCost = this.SPEED_COSTS[this.game.speedLevel];
        this.jumpCost = this.JUMP_COSTS[this.game.jumpLevel];
        this.timeCost = this.TIME_COSTS[this.game.timeLevel];
        this.ammoCost = this.AMMO_COSTS[this.game.ammoLevel];
        this.shootSpeedCost = this.SHOOT_SPEED_COSTS[this.game.shootSpeedLevel];
        this.multiplierCost = this.MULTIPLIER_COSTS[this.game.multiplierLevel];

        let oldLineWidth = ctx.lineWidth;

        // black background
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);

        this.setDefaultFillAndStroke(ctx);
        ctx.lineWidth = 10;
         
        // SHOP title
        ctx.font = PARAMS.BLOCKWIDTH + 'px "silkscreenbold"';
        ctx.fillText("SHOP", 0.5 * PARAMS.BLOCKWIDTH, 1.25 * PARAMS.BLOCKWIDTH);
        
        // cash
        this.cashOffset = (("" + this.game.cash).length - 1) * 30 + 10;
        this.cashTextX = 9.3 * PARAMS.BLOCKWIDTH - this.cashOffset;
        this.cashAnimX = PARAMS.BLOCKWIDTH * 8.5 - this.cashOffset;
        this.setMediumFont(ctx);
        ctx.fillText("" + this.game.cash, this.cashTextX, PARAMS.BLOCKWIDTH * 1.25);
        this.cashAnimation.drawFrame(this.game.clockTick, ctx, this.cashAnimX, PARAMS.BLOCKWIDTH * 0.74, PARAMS.SCALE * 1.5); 
        
        // speed
        if (this.mouseBB.collide(this.speedBB)) { 
            this.setStrokeAndFillGreen(ctx);
        } 
        if (this.speedCost > this.game.cash) {
            this.setStrokeAndFillDark(ctx);
        }
        if (this.game.speedLevel == 10) {
            this.setStrokeAndFillMaxLevel(ctx);
        }
        this.setLargeFont(ctx);
        ctx.fillText("SPEED", this.TEXT_X, this.SPEED_TEXT_Y);
        this.setSmallFont(ctx);
        ctx.fillText("Upgrade your speed", this.TEXT_X + 255, this.SPEED_TEXT_Y);
        ctx.fillText(this.formatLevel(this.game.speedLevel), this.TEXT_X + this.LEVEL_OFFSET_X, this.SPEED_TEXT_Y);
        this.setMediumFont(ctx);
        let costText = this.game.speedLevel == 10 ? "MAX " : "$" + this.speedCost;
        ctx.fillText(costText, this.TEXT_X + this.COST_OFFSET_X - ("" + costText).length * 25, this.SPEED_TEXT_Y - this.COST_OFFSET_Y);
        ctx.strokeRect(this.BOX_X, this.SPEED_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);

        this.setDefaultFillAndStroke(ctx);
        
        // jump
        if (this.mouseBB.collide(this.jumpBB)) {
            this.setStrokeAndFillGreen(ctx);
        }
        if (this.jumpCost > this.game.cash) {
            this.setStrokeAndFillDark(ctx);
        }
        if (this.game.jumpLevel == 10) {
            this.setStrokeAndFillMaxLevel(ctx);
        }
        this.setLargeFont(ctx);
        ctx.fillText("JUMP", this.TEXT_X, this.JUMP_TEXT_Y);
        this.setSmallFont(ctx);
        ctx.fillText("Upgrade your jump", this.TEXT_X + 220, this.JUMP_TEXT_Y);
        ctx.fillText(this.formatLevel(this.game.jumpLevel), this.TEXT_X + this.LEVEL_OFFSET_X, this.JUMP_TEXT_Y);
        this.setMediumFont(ctx);
        costText = this.game.jumpLevel == 10 ? "MAX " : "$" + this.jumpCost;
        ctx.fillText(costText, this.TEXT_X + this.COST_OFFSET_X - ("" + costText).length * 25, this.JUMP_TEXT_Y - this.COST_OFFSET_Y);
        ctx.strokeRect(this.BOX_X, this.JUMP_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);

        this.setDefaultFillAndStroke(ctx)
        
        // time
        if (this.mouseBB.collide(this.timeBB)) {
            this.setStrokeAndFillGreen(ctx);
        }
        if (this.timeCost > this.game.cash) {
            this.setStrokeAndFillDark(ctx);            
        }
        if (this.game.timeLevel == 10) {
            this.setStrokeAndFillMaxLevel(ctx);
        }
        this.setLargeFont(ctx);
        ctx.fillText("TIME", this.TEXT_X, this.TIME_TEXT_Y);
        this.setSmallFont(ctx);
        ctx.fillText("Get more time", this.TEXT_X + 180, this.TIME_TEXT_Y);
        ctx.fillText(this.formatLevel(this.game.timeLevel), this.TEXT_X + this.LEVEL_OFFSET_X, this.TIME_TEXT_Y);
        this.setMediumFont(ctx);
        costText = this.game.timeLevel == 10 ? "MAX " : "$" + this.timeCost;
        ctx.fillText(costText, this.TEXT_X + this.COST_OFFSET_X - ("" + costText).length * 25, this.TIME_TEXT_Y - this.COST_OFFSET_Y);
        ctx.strokeRect(this.BOX_X, this.TIME_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);

        this.setDefaultFillAndStroke(ctx)

        // ammo
        if (this.mouseBB.collide(this.ammoBB)) {
            this.setStrokeAndFillGreen(ctx);
        }
        if (this.ammoCost > this.game.cash) {
            this.setStrokeAndFillDark(ctx);
        }
        if (this.game.ammoLevel == 10) {
            this.setStrokeAndFillMaxLevel(ctx);
        }
        this.setLargeFont(ctx);
        ctx.fillText("AMMO", this.TEXT_X, this.AMMO_TEXT_Y);
        ctx.strokeRect(this.BOX_X, this.AMMO_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);
        this.setSmallFont(ctx);
        ctx.fillText("Get more ammo", this.TEXT_X + 235, this.AMMO_TEXT_Y);
        ctx.fillText(this.formatLevel(this.game.ammoLevel), this.TEXT_X + this.LEVEL_OFFSET_X, this.AMMO_TEXT_Y);
        this.setMediumFont(ctx);
        costText = this.game.ammoLevel == 10 ? "MAX " : "$" + this.ammoCost;
        ctx.fillText(costText, this.TEXT_X + this.COST_OFFSET_X - ("" + costText).length * 25, this.AMMO_TEXT_Y - this.COST_OFFSET_Y);
        this.setDefaultFillAndStroke(ctx)

        // shoot speed
        if (this.mouseBB.collide(this.shootSpeedBB)) {
            this.setStrokeAndFillGreen(ctx);
        }
        if (this.shootSpeedCost > this.game.cash) {
            this.setStrokeAndFillDark(ctx);
        }
        if (this.game.shootSpeedLevel == 10) {
            this.setStrokeAndFillMaxLevel(ctx);
        }
        this.setLargeFont(ctx);
        ctx.fillText("SHOOT SPEED", this.TEXT_X, this.SHOOT_SPEED_TEXT_Y);
        this.setSmallFont(ctx);
        ctx.fillText("Shoot faster", this.TEXT_X + 550, this.SHOOT_SPEED_TEXT_Y);
        ctx.fillText(this.formatLevel(this.game.shootSpeedLevel), this.TEXT_X + this.LEVEL_OFFSET_X, this.SHOOT_SPEED_TEXT_Y);
        this.setMediumFont(ctx);
        costText = this.game.shootSpeedLevel == 10 ? "MAX " : "$" + this.shootSpeedCost;
        ctx.fillText(costText, this.TEXT_X + this.COST_OFFSET_X - ("" + costText).length * 25, this.SHOOT_SPEED_TEXT_Y - this.COST_OFFSET_Y);
        ctx.strokeRect(this.BOX_X, this.SHOOT_SPEED_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);

        this.setDefaultFillAndStroke(ctx)
 
        // multiplier
        if (this.mouseBB.collide(this.multiplierBB)) {
            this.setStrokeAndFillGreen(ctx);
        }
        if (this.multiplierCost > this.game.cash) {
            this.setStrokeAndFillDark(ctx);
        }
        if (this.game.multiplierLevel == 10) {
            this.setStrokeAndFillMaxLevel(ctx);
        }
        this.setLargeFont(ctx);
        ctx.fillText("MULTIPLIER", this.TEXT_X, this.MULTIPLIER_TEXT_Y);
        this.setSmallFont(ctx);
        ctx.fillText("Increase cash value", this.TEXT_X + 460, this.MULTIPLIER_TEXT_Y);
        ctx.fillText(this.formatLevel(this.game.multiplierLevel), this.TEXT_X + this.LEVEL_OFFSET_X, this.MULTIPLIER_TEXT_Y);
        this.setMediumFont(ctx);
        costText = this.game.multiplierLevel == 10 ? "MAX " : "$" + this.multiplierCost;
        ctx.fillText(costText, this.TEXT_X + this.COST_OFFSET_X - ("" + costText).length * 25, this.MULTIPLIER_TEXT_Y - this.COST_OFFSET_Y);
        ctx.strokeRect(this.BOX_X, this.MULTIPLIER_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);

        this.setDefaultFillAndStroke(ctx)

        // play
        if (this.mouseBB.collide(this.playBB)) {
            this.setStrokeAndFillGreen(ctx);
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