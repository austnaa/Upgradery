/*
    Summary: 
        The scene_manager has MAX_<CATEGORY>_LEVEL and <category>Level that
        represent the max level for a particular category 
        and the current level for a particular level.
        
        The Shop has <CATEGORY>_COSTS that has the cost for each level of a category, 
        as well as <category>Cost which is the current cost for the level of a category.

        This class allows the user to upgrade the level for a particular category.
        When a category is upgraded, the cost is decremented from the scene_manager cash.
        The categoryLevel is also incremented to represent the upgrade

        The main character will have particular stats that will be selected based 
        on the state of each category level represented in the scene_manager.

*/
class Shop {
    constructor(game) {
        Object.assign(this, {game});
        this.cashSheet = ASSET_MANAGER.getAsset("./assets/visuals/Money.png");
        this.cashAnimation = new Animator(this.cashSheet, 0, 0, 24, 24, 6, 0.2, 0, false, true);
        
        this.addConstants();
        this.addBBs();
        
        this.speedCost = this.SPEED_COSTS[0];
        this.jumpCost = this.JUMP_COSTS[0];
        this.healthCost = this.HEALTH_COSTS[0];
        this.timeCost = this.TIME_COSTS[0];
        this.ammoCost = this.AMMO_COSTS[0];
        this.shootSpeedCost = this.SHOOT_SPEED_COSTS[0];
        this.multiplierCost = this.MULTIPLIER_COSTS[0];
    };

    addConstants() { 

        this.game.MAX_SPEED_LEVEL = 10;
        this.game.MAX_JUMP_LEVEL = 10;
        this.game.MAX_HEALTH_LEVEL = 4;
        this.game.MAX_TIME_LEVEL = 10;
        this.game.MAX_AMMO_LEVEL = 10;
        this.game.MAX_SHOOT_SPEED_LEVEL = 10;
        this.game.MAX_MULTIPLIER_LEVEL = 4;

        this.SPEED_COSTS    = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.JUMP_COSTS     = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.HEALTH_COSTS   = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.TIME_COSTS     = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.AMMO_COSTS     = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.SHOOT_SPEED_COSTS  = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.MULTIPLIER_COSTS   = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        this.SHOP_TEXT_X = 24;  // x pos of shop title
        this.SHOP_TEXT_Y = 115; // y pos of shop title

        this.CASH_TEXT_X = 883; // x pos of cash title
        this.CASH_TEXT_Y = 105; // y pos of cash title
        this.CASH_TEXT_WIDTH = 30; // width of cash text font for 1 char

        this.CASH_ANIM_X = 816;  // cash animation x pos
        this.CASH_ANIM_Y = 57.6; // cash animation y pos

        
        this.TEXT_X = 29;      // x start position of category text
        this.BOX_X = 24;        // x start for category boxes
        this.BOX_WIDTH = 912;   // width of category boxes
        this.BOX_HEIGHT = 96;   // height of category boxes

        this.COST_OFFSET_X = 880;  // x offset from TEXT_X to cost text
        this.COST_OFFSET_Y = 20;   // y offset from category y value to cost text
        this.LEVEL_OFFSET_X = 810; // x offset from TEXT_X to level text
        this.LEVEL_OFFSET_Y = 10;  // y offset from category y value for level text
        
        this.TEXT_Y_INITIAL = 200; // starting y pos for category text
        this.BOX_Y_INITIAL = 130;  // starting y pos for category text
        this.TEXT_BOX_Y_OFFSET = 120; // y offset for each category box

        // y positions for the text and box for each category
        this.SPEED_TEXT_Y = this.TEXT_Y_INITIAL + (0 * this.TEXT_BOX_Y_OFFSET);
        this.SPEED_BOX_Y = this.BOX_Y_INITIAL + (0 * this.TEXT_BOX_Y_OFFSET); 
        this.JUMP_TEXT_Y = this.TEXT_Y_INITIAL + (1 * this.TEXT_BOX_Y_OFFSET);
        this.JUMP_BOX_Y =  this.BOX_Y_INITIAL + (1 * this.TEXT_BOX_Y_OFFSET); 
        this.HEALTH_TEXT_Y = this.TEXT_Y_INITIAL + (2 * this.TEXT_BOX_Y_OFFSET);
        this.HEALTH_BOX_Y = this.BOX_Y_INITIAL + (2 * this.TEXT_BOX_Y_OFFSET);
        this.TIME_TEXT_Y = this.TEXT_Y_INITIAL + (3 * this.TEXT_BOX_Y_OFFSET);
        this.TIME_BOX_Y = this.BOX_Y_INITIAL + (3 * this.TEXT_BOX_Y_OFFSET); 
        this.AMMO_TEXT_Y = this.TEXT_Y_INITIAL + (4 * this.TEXT_BOX_Y_OFFSET);
        this.AMMO_BOX_Y = this.BOX_Y_INITIAL + (4 * this.TEXT_BOX_Y_OFFSET); 
        this.SHOOT_SPEED_TEXT_Y = this.TEXT_Y_INITIAL + (5 * this.TEXT_BOX_Y_OFFSET);
        this.SHOOT_SPEED_BOX_Y = this.BOX_Y_INITIAL + (5 * this.TEXT_BOX_Y_OFFSET); 
        this.MULTIPLIER_TEXT_Y = this.TEXT_Y_INITIAL + (6 * this.TEXT_BOX_Y_OFFSET);
        this.MULTIPLIER_BOX_Y = this.BOX_Y_INITIAL + (6 * this.TEXT_BOX_Y_OFFSET); 
        
        // play button stats
        this.PLAY_BOX_X = 374;
        this.PLAY_BOX_Y = 67;
        this.PLAY_BOX_WIDTH = 153;
        this.PLAY_BOX_HEIGHT = 48; 
        this.PLAY_TEXT_X = 382;
        this.PLAY_TEXT_Y = 103;
    }

    addBBs() {
        this.mouseBB = new BoundingBox(0, 0, 1, 1);   
        
        this.speedBB = new BoundingBox(this.BOX_X, this.SPEED_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);
        this.jumpBB = new BoundingBox(this.BOX_X, this.JUMP_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);
        this.healthBB = new BoundingBox(this.BOX_X, this.HEALTH_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);
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
        ctx.font = 24 + 'px "silkscreennormal"';
    }
    setMediumFont(ctx) {
        ctx.font = 48 + 'px "silkscreennormal"';
    }
    setLargeFont(ctx) {
        ctx.font = 72 + 'px "silkscreennormal"'; 
    }

    playUpgradeSound(isMaxLevel) {
        if (isMaxLevel) {
            ASSET_MANAGER.playAsset("./assets/audio/MaxLevelUpgrade.wav");
        } else {
            ASSET_MANAGER.playAsset("./assets/audio/Upgrade.wav");
        }
        
    }

    update() {
        // check for a click 
        if (this.game.click) {
            // update the click bounding box so we can use it
            this.mouseBB = new BoundingBox(this.game.click.x, this.game.click.y, 1, 1);   
            
            // for the speed, jump, time, ammo, shoot speed, and multilier boxes, 
            // we need to: 
            //  - check to see if the mouse clicked on the box
            //  - check to see if we have enough cash to buy that upgrade
            //  - check to see if the current upgrade level is not max

            // click speed
            if (this.mouseBB.collide(this.speedBB) 
                    && this.game.cash >= this.speedCost 
                    && this.game.speedLevel < this.game.MAX_SPEED_LEVEL) {
                this.game.speedLevel++;
                this.game.cash -= this.speedCost;
                this.playUpgradeSound(this.game.speedLevel == this.game.MAX_SPEED_LEVEL);
            }
            // click jump
            if (this.mouseBB.collide(this.jumpBB) 
                    && this.game.cash >= this.jumpCost 
                    && this.game.jumpLevel < this.game.MAX_JUMP_LEVEL) { 
                this.game.jumpLevel++;
                this.game.cash -= this.jumpCost;
                this.playUpgradeSound(this.game.jumpLevel == this.game.MAX_JUMP_LEVEL);
            }
            // click health
            if (this.mouseBB.collide(this.healthBB) 
                    && this.game.cash >= this.healthCost 
                    && this.game.healthLevel < this.game.MAX_HEALTH_LEVEL) {
                this.game.healthLevel++;
                this.game.cash -= this.healthCost;
                this.playUpgradeSound(this.game.healthLevel == this.game.MAX_HEALTH_LEVEL);
            }
            // click time
            if (this.mouseBB.collide(this.timeBB) 
                    && this.game.cash >= this.timeCost 
                    && this.game.timeLevel < this.game.MAX_TIME_LEVEL) { 
                this.game.timeLevel++;
                this.game.cash -= this.timeCost;
                this.playUpgradeSound(this.game.timeLevel == this.game.MAX_TIME_LEVEL);
            }
            // click ammo
            if (this.mouseBB.collide(this.ammoBB) 
                    && this.game.cash >= this.ammoCost 
                    && this.game.ammoLevel < this.game.MAX_AMMO_LEVEL) { 
                this.game.ammoLevel++;
                this.game.cash -= this.ammoCost;
                this.playUpgradeSound(this.game.ammoLevel == this.game.MAX_AMMO_LEVEL);
            }
            // click shoot speed
            if (this.mouseBB.collide(this.shootSpeedBB)
                     && this.game.cash >= this.shootSpeedCost 
                    && this.game.shootSpeedLevel < this.game.MAX_SHOOT_SPEED_LEVEL) { 
                this.game.shootSpeedLevel++;
                this.game.cash -= this.shootSpeedCost;
                this.playUpgradeSound(this.game.shootSpeedLevel == this.game.MAX_SHOOT_SPEED_LEVEL);
            }
            // click multiplier
            if (this.mouseBB.collide(this.multiplierBB) 
                    && this.game.cash >= this.multiplierCost 
                    && this.game.multiplierLevel < this.game.MAX_MULTIPLIER_LEVEL) { 
                this.game.multiplierLevel++;
                this.game.cash -= this.multiplierCost;
                if (this.game.multiplierLevel == this.game.MAX_MULTIPLIER_LEVEL) {
                    this.playUpgradeSound(true);
                } else {   
                    ASSET_MANAGER.playAsset("./assets/audio/CoinUpgrade.wav");
                }
            }

            // click play
            if (this.mouseBB.collide(this.playBB)) { 
                this.game.camera.play();
            }

            this.game.click = null;
        }

        if (this.game.mouse) {
            this.mouseBB = new BoundingBox(this.game.mouse.x, this.game.mouse.y, 1, 1);   
        }
        
    };

    // formats and returns the upgrade level text depending on the current 
    // level and the maximum possible level
    formatLevel(currentLevel, maxLevel) {
        return String(currentLevel).padStart(2, '0') + "/" + String(maxLevel).padStart(2, '0');
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
        let shopFontSize = 96;
        ctx.font = shopFontSize + 'px "silkscreenbold"';
        ctx.fillText("SHOP", this.SHOP_TEXT_X, this.SHOP_TEXT_Y);
        
        // cash
        this.cashOffset = (("" + this.game.cash).length - 1) * this.CASH_TEXT_WIDTH;
        this.cashTextX = this.CASH_TEXT_X - this.cashOffset;
        this.cashAnimX = this.CASH_ANIM_X - this.cashOffset;

        
        this.setMediumFont(ctx);
        ctx.fillText("" + this.game.cash, this.cashTextX, this.CASH_TEXT_Y);
        this.cashAnimation.drawFrame(this.game.clockTick, ctx, this.cashAnimX, this.CASH_ANIM_Y, PARAMS.SCALE * 1.5); 

        this.setDefaultFillAndStroke(ctx); // R

        
    // SPEED
        if (this.mouseBB.collide(this.speedBB)) { // first, check for hovering over
            this.setStrokeAndFillGreen(ctx);
        } 
        if (this.speedCost > this.game.cash) { // the, highlight dark if can't afford 
            this.setStrokeAndFillDark(ctx);
        }
        if (this.game.speedLevel == this.game.MAX_SPEED_LEVEL) { // finally, highlight max level
            this.setStrokeAndFillMaxLevel(ctx);
        }     
        // main text
        this.setLargeFont(ctx);
        ctx.fillText("SPEED", this.TEXT_X, this.SPEED_TEXT_Y);   
        // description
        this.setSmallFont(ctx);
        ctx.fillText("Upgrade your speed", this.TEXT_X + 255, this.SPEED_TEXT_Y); 
        // upgrade level
        ctx.fillText(this.formatLevel(this.game.speedLevel, this.game.MAX_SPEED_LEVEL), this.TEXT_X + this.LEVEL_OFFSET_X, this.SPEED_TEXT_Y + this.LEVEL_OFFSET_Y);
        // cost text
        this.setMediumFont(ctx);
        let costText = this.game.speedLevel == this.game.MAX_SPEED_LEVEL ? "MAX " : "$" + this.speedCost;
        ctx.fillText(costText, this.TEXT_X + this.COST_OFFSET_X - ("" + costText).length * this.CASH_TEXT_WIDTH, this.SPEED_TEXT_Y - this.COST_OFFSET_Y);
        // outline border
        ctx.strokeRect(this.BOX_X, this.SPEED_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);

        this.setDefaultFillAndStroke(ctx);
        
    // JUMP
        if (this.mouseBB.collide(this.jumpBB)) {
            this.setStrokeAndFillGreen(ctx);
        }
        if (this.jumpCost > this.game.cash) {
            this.setStrokeAndFillDark(ctx);
        }
        if (this.game.jumpLevel == this.game.MAX_JUMP_LEVEL) {
            this.setStrokeAndFillMaxLevel(ctx);
        }
        this.setLargeFont(ctx);
        ctx.fillText("JUMP", this.TEXT_X, this.JUMP_TEXT_Y);
        this.setSmallFont(ctx);
        ctx.fillText("Upgrade your jump", this.TEXT_X + 220, this.JUMP_TEXT_Y);
        ctx.fillText(this.formatLevel(this.game.jumpLevel, this.game.MAX_JUMP_LEVEL), this.TEXT_X + this.LEVEL_OFFSET_X, this.JUMP_TEXT_Y + this.LEVEL_OFFSET_Y);
        this.setMediumFont(ctx);
        costText = this.game.jumpLevel == this.game.MAX_JUMP_LEVEL ? "MAX " : "$" + this.jumpCost;
        ctx.fillText(costText, this.TEXT_X + this.COST_OFFSET_X - ("" + costText).length * this.CASH_TEXT_WIDTH, this.JUMP_TEXT_Y - this.COST_OFFSET_Y);
        ctx.strokeRect(this.BOX_X, this.JUMP_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);

        this.setDefaultFillAndStroke(ctx);
        
    // TIME
        if (this.mouseBB.collide(this.timeBB)) {
            this.setStrokeAndFillGreen(ctx);
        }
        if (this.timeCost > this.game.cash) {
            this.setStrokeAndFillDark(ctx);            
        }
        if (this.game.timeLevel == this.game.MAX_TIME_LEVEL) {
            this.setStrokeAndFillMaxLevel(ctx);
        }
        this.setLargeFont(ctx);
        ctx.fillText("TIME", this.TEXT_X, this.TIME_TEXT_Y);
        this.setSmallFont(ctx);
        ctx.fillText("Get more time", this.TEXT_X + 180, this.TIME_TEXT_Y);
        ctx.fillText(this.formatLevel(this.game.timeLevel, this.game.MAX_TIME_LEVEL), this.TEXT_X + this.LEVEL_OFFSET_X, this.TIME_TEXT_Y + this.LEVEL_OFFSET_Y);
        this.setMediumFont(ctx);
        costText = this.game.timeLevel == this.game.MAX_TIME_LEVEL ? "MAX " : "$" + this.timeCost;
        ctx.fillText(costText, this.TEXT_X + this.COST_OFFSET_X - ("" + costText).length * this.CASH_TEXT_WIDTH, this.TIME_TEXT_Y - this.COST_OFFSET_Y);
        ctx.strokeRect(this.BOX_X, this.TIME_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);

        this.setDefaultFillAndStroke(ctx);

    // HEALTH
        if (this.mouseBB.collide(this.healthBB)) {
            this.setStrokeAndFillGreen(ctx);
        }
        if (this.healthCost > this.game.cash) {
            this.setStrokeAndFillDark(ctx);
        }
        if (this.game.healthLevel == this.game.MAX_HEALTH_LEVEL) {
            this.setStrokeAndFillMaxLevel(ctx);
        }
        this.setLargeFont(ctx);
        ctx.fillText("HEALTH", this.TEXT_X, this.HEALTH_TEXT_Y);
        this.setSmallFont(ctx);
        ctx.fillText("Increase health", this.TEXT_X + 300, this.HEALTH_TEXT_Y);
        ctx.fillText(this.formatLevel(this.game.healthLevel, this.game.MAX_HEALTH_LEVEL), this.TEXT_X + this.LEVEL_OFFSET_X, this.HEALTH_TEXT_Y + this.LEVEL_OFFSET_Y);
        this.setMediumFont(ctx);
        costText = this.game.healthLevel == this.game.MAX_HEALTH_LEVEL ? "MAX " : "$" + this.healthCost;
        ctx.fillText(costText, this.TEXT_X + this.COST_OFFSET_X - ("" + costText).length * this.CASH_TEXT_WIDTH, this.HEALTH_TEXT_Y - this.COST_OFFSET_Y);
        ctx.strokeRect(this.BOX_X, this.HEALTH_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);

        this.setDefaultFillAndStroke(ctx);

    // AMMO
        if (this.mouseBB.collide(this.ammoBB)) {
            this.setStrokeAndFillGreen(ctx);
        }
        if (this.ammoCost > this.game.cash) {
            this.setStrokeAndFillDark(ctx);
        }
        if (this.game.ammoLevel == this.game.MAX_AMMO_LEVEL) {
            this.setStrokeAndFillMaxLevel(ctx);
        }
        this.setLargeFont(ctx);
        ctx.fillText("AMMO", this.TEXT_X, this.AMMO_TEXT_Y);
        ctx.strokeRect(this.BOX_X, this.AMMO_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);
        this.setSmallFont(ctx);
        ctx.fillText("Get more ammo", this.TEXT_X + 235, this.AMMO_TEXT_Y);
        ctx.fillText(this.formatLevel(this.game.ammoLevel, this.game.MAX_AMMO_LEVEL), this.TEXT_X + this.LEVEL_OFFSET_X, this.AMMO_TEXT_Y + this.LEVEL_OFFSET_Y);
        this.setMediumFont(ctx);
        costText = this.game.ammoLevel == this.game.MAX_AMMO_LEVEL ? "MAX " : "$" + this.ammoCost;
        ctx.fillText(costText, this.TEXT_X + this.COST_OFFSET_X - ("" + costText).length * this.CASH_TEXT_WIDTH, this.AMMO_TEXT_Y - this.COST_OFFSET_Y);
        
        this.setDefaultFillAndStroke(ctx);

    // SHOOT SPEED
        if (this.mouseBB.collide(this.shootSpeedBB)) {
            this.setStrokeAndFillGreen(ctx);
        }
        if (this.shootSpeedCost > this.game.cash) {
            this.setStrokeAndFillDark(ctx);
        }
        if (this.game.shootSpeedLevel == this.game.MAX_SHOOT_SPEED_LEVEL) {
            this.setStrokeAndFillMaxLevel(ctx);
        }
        this.setLargeFont(ctx);
        ctx.fillText("SHOOT SPEED", this.TEXT_X, this.SHOOT_SPEED_TEXT_Y);
        this.setSmallFont(ctx);
        ctx.fillText("Shoot faster", this.TEXT_X + 550, this.SHOOT_SPEED_TEXT_Y);
        ctx.fillText(this.formatLevel(this.game.shootSpeedLevel, this.game.MAX_SHOOT_SPEED_LEVEL), this.TEXT_X + this.LEVEL_OFFSET_X, this.SHOOT_SPEED_TEXT_Y + this.LEVEL_OFFSET_Y);
        this.setMediumFont(ctx);
        costText = this.game.shootSpeedLevel == this.game.MAX_SHOOT_SPEED_LEVEL ? "MAX " : "$" + this.shootSpeedCost;
        ctx.fillText(costText, this.TEXT_X + this.COST_OFFSET_X - ("" + costText).length * this.CASH_TEXT_WIDTH, this.SHOOT_SPEED_TEXT_Y - this.COST_OFFSET_Y);
        ctx.strokeRect(this.BOX_X, this.SHOOT_SPEED_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);

        this.setDefaultFillAndStroke(ctx);
 
    // MULTIPLIER
        if (this.mouseBB.collide(this.multiplierBB)) {
            this.setStrokeAndFillGreen(ctx);
        }
        if (this.multiplierCost > this.game.cash) {
            this.setStrokeAndFillDark(ctx);
        }
        if (this.game.multiplierLevel == this.game.MAX_MULTIPLIER_LEVEL) {
            this.setStrokeAndFillMaxLevel(ctx);
        }
        this.setLargeFont(ctx);
        ctx.fillText("MULTIPLIER", this.TEXT_X, this.MULTIPLIER_TEXT_Y);
        this.setSmallFont(ctx);
        ctx.fillText("Increase cash value", this.TEXT_X + 460, this.MULTIPLIER_TEXT_Y);
        ctx.fillText(this.formatLevel(this.game.multiplierLevel, this.game.MAX_MULTIPLIER_LEVEL), this.TEXT_X + this.LEVEL_OFFSET_X, this.MULTIPLIER_TEXT_Y + this.LEVEL_OFFSET_Y);
        this.setMediumFont(ctx);
        costText = this.game.multiplierLevel == this.game.MAX_MULTIPLIER_LEVEL ? "MAX " : "$" + this.multiplierCost;
        ctx.fillText(costText, this.TEXT_X + this.COST_OFFSET_X - ("" + costText).length * this.CASH_TEXT_WIDTH, this.MULTIPLIER_TEXT_Y - this.COST_OFFSET_Y);
        ctx.strokeRect(this.BOX_X, this.MULTIPLIER_BOX_Y, this.BOX_WIDTH, this.BOX_HEIGHT);

        this.setDefaultFillAndStroke(ctx);

   

        

        // play
        if (this.mouseBB.collide(this.playBB)) {
            this.setStrokeAndFillGreen(ctx);
        }
        ctx.lineWidth = 7;
        let playFontSize = 38;
        ctx.font = playFontSize + 'px "silkscreenbold"';  
        ctx.fillText("PLAY", this.PLAY_TEXT_X, this.PLAY_TEXT_Y);
        ctx.strokeRect(this.PLAY_BOX_X, this.PLAY_BOX_Y, this.PLAY_BOX_WIDTH, this.PLAY_BOX_HEIGHT);

        ctx.lineWidth = oldLineWidth;

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.mouseBB.x, this.mouseBB.y, this.mouseBB.width, this.mouseBB.height);

            ctx.strokeRect(this.speedBB.x, this.speedBB.y, this.speedBB.width, this.speedBB.height);
            ctx.strokeRect(this.jumpBB.x, this.jumpBB.y, this.jumpBB.width, this.jumpBB.height);
            ctx.strokeRect(this.healthBB.x, this.healthBB.y, this.healthBB.width, this.healthBB.height);
            ctx.strokeRect(this.timeBB.x, this.timeBB.y, this.timeBB.width, this.timeBB.height);
            ctx.strokeRect(this.ammoBB.x, this.ammoBB.y, this.ammoBB.width, this.ammoBB.height);
            ctx.strokeRect(this.shootSpeedBB.x, this.shootSpeedBB.y, this.shootSpeedBB.width, this.shootSpeedBB.height);
            ctx.strokeRect(this.multiplierBB.x, this.multiplierBB.y, this.multiplierBB.width, this.multiplierBB.height);

            ctx.strokeRect(this.playBB.x, this.playBB.y, this.playBB.width, this.playBB.height);
        }

    };
};