
// hostile gunner currently very basic. Meant to stay on a particular y value.
// X value back and forth planned for future...?

class HostileGunner {
    constructor(game, x, y, facing, shootTimeout, health) {
        Object.assign(this, { game, x, y, facing, shootTimeout, health});
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/visuals/gunnerRed.png");
        
        this.shootTimer = this.shootTimeout;

        this.maxHealth = this.health;

        this.state = 0;  // 0: idle,  1: run,  2: jump, 3: dead

        this.showWinText = false;

        this.updateBB();

        this.addAnimations();
        this.addConstants();
    };

    addAnimations() {
        this.animations = [];
        for (let i = 0; i < 4; i++) { // idle: 0, running: 1, jumping: 2, dying: 3
            this.animations.push([]);
            for (let j = 0; j < 2; j++) { // left: 0, right: 1
                this.animations.push([]);                
            }
        }

        // idle
        this.animations[0][0] = new Animator(this.spritesheet, 0, 48*4, 48, 48, 5, 0.2, 0, false, true); // idle left
        this.animations[0][1] = new Animator(this.spritesheet, 0, 0, 48, 48, 5, 0.2, 0, false, true); // idle right
        
        // run
        this.animations[1][0] = new Animator(this.spritesheet, 0, 48*5, 48, 48, 6, 0.15, 0, false, true); // run left
        this.animations[1][1] = new Animator(this.spritesheet, 0, 48, 48, 48, 6, 0.15, 0, false, true); // run right
        
        // jump
        this.animations[2][0] = new Animator(this.spritesheet, 0, 48*6, 48, 48, 2, 0.6, 0, false, true); // jump left
        this.animations[2][1] = new Animator(this.spritesheet, 0, 48*2, 48, 48, 2, 0.6, 0, false, true); // jump right
        
        // die
        this.animations[3][0] = new Animator(this.spritesheet, 0, 48*7, 48, 48, 8, 0.1, 0, false, false); // die left
        this.animations[3][1] = new Animator(this.spritesheet, 0, 48*3, 48, 48, 8, 0.1, 0, false, false); // die right
    }

    addConstants() {
        this.BB_TOP_MARGIN = 9 * PARAMS.SCALE;
        // consider inserting constants from the update() function in here
    }

    updateBB() {
        this.lastBB = this.BB;
        let leftXOffset = this.facing ? 18 : 12;
        this.BB = new BoundingBox(this.x + leftXOffset * PARAMS.SCALE, this.y + this.BB_TOP_MARGIN, PARAMS.BLOCKWIDTH - 6 * PARAMS.SCALE, PARAMS.BLOCKWIDTH * 1.03); 
    };

    decrementHealth() {
        this.health--;
        if (this.health <= 0) {
            this.state = 3;
        }
    }

    isCloseToGunner() {
        let xD = Math.abs(this.game.gunner.x - this.x);
        let yD = Math.abs(this.game.gunner.y - this.y);
        return xD < PARAMS.BLOCKWIDTH * 5 && yD < PARAMS.BLOCKWIDTH;
    }
    
    update() {

        // handle death
        if (this.state == 3) {
            // todo: handle death?
            if (this.animations[this.state][this.facing].isDone()) {
                this.removeFromWorld = true; 
                ASSET_MANAGER.playAsset("./assets/audio/gameWin.wav");
                this.showWinText = true;
            }
        }

        this.facing = this.game.gunner.x - this.x < 0 ? 0 : 1;
        this.updateBB();

        // shooting
        this.shootTimer = Math.max(0, this.shootTimer - this.game.clockTick);
        if (this.shootTimer == 0 && this.isCloseToGunner()) {
            
            this.shootTimer = this.shootTimeout;
            this.game.addEntity(new Bullet(this.game, this.x, this.y, true, this.facing ? 1 : -1));
            ASSET_MANAGER.playAsset("./assets/audio/shootSound.wav");
        }

    };

    draw(ctx) {
        ctx.save();
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE * 1.5);

        if (this.health > 0) {
            ctx.lineWidth = 5;
            ctx.strokeStyle = "Black";
            let percentage = this.health / this.maxHealth;
            if (percentage * 100 <= 25) {
                ctx.fillStyle = "Red";
            } else if (percentage * 100 >= 75) {
                ctx.fillStyle = "Green";
            } else {
                ctx.fillStyle = "Orange";
            }
            ctx.fillRect(this.BB.x - this.game.camera.x + 5, 
                         this.BB.top - 10 - this.game.camera.y, PARAMS.BLOCKWIDTH * .8, 10);
            ctx.strokeRect(this.BB.x - this.game.camera.x + 5, 
                            this.BB.top - 10 - this.game.camera.y, PARAMS.BLOCKWIDTH * .8, 10);
        }

        if (this.showWinText) {
            ctx.font = 48 + 'px "silkscreennormal"';
            ctx.textAlign = "center";
            ctx.fillText("YOU WIN!", 100, 200);
        }

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }

        ctx.restore();
    };
};