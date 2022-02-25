
// hostile gunner currently very basic. Meant to stay on a particular y value.
// X value back and forth planned for future...?

class HostileGunner {
    constructor(game, x, y, facing, shootTimeout, health) {
        Object.assign(this, { game, x, y, facing, shootTimeout, health});
        this.spritesheet = ASSET_MANAGER.getAsset("./assets/visuals/gunnerRed.png");

        // this.WALK_SPEED_LEVELS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
        // this.JUMP_LEVELS = [0, -75, -100, -150, -200, -225, -250, -275, -300, -325, -350];
        // this.AMMO_LEVELS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        // this.SHOOT_SPEED_LEVELS = [1.2, 1, 0.8, 0.6, 0.4, 0.3, 0.2];
        // this.LIVE_LEVELS = [1, 2, 3, 4, 5];

        // this.numLives = this.LIVE_LEVELS[this.game.savedData.healthLevel];
        // this.ammo = this.AMMO_LEVELS[this.game.savedData.ammoLevel];
        // this.shootTimeout = this.SHOOT_SPEED_LEVELS[this.game.savedData.shootSpeedLevel];
        
        this.shootTimeout = 1.5
        this.shootTimer = this.shootTimeout;

        this.maxHealth = this.health;
       
        
        // this.velocityX = 0;
        // this.velocityY = 0;

        this.state = 0;  // 0: idle,  1: run,  2: jump, 3: dead


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
        this.lastLandingBB = this.landingBB;
        let leftXOffset = this.facing ? 18 : 12;
        this.BB = new BoundingBox(this.x + leftXOffset * PARAMS.SCALE, this.y + this.BB_TOP_MARGIN, PARAMS.BLOCKWIDTH - 6 * PARAMS.SCALE, PARAMS.BLOCKWIDTH * 1.03); 
    };

    decrementHealth() {
        this.health--;
        if (this.health <= 0) {
            this.removeFromWorld = true;
        }
    }


    isCloseToGunner() {
        let xD = Math.abs(this.game.gunner.x - this.x);
        let yD = Math.abs(this.game.gunner.y - this.y);
        return xD < PARAMS.BLOCKWIDTH * 5 && yD < PARAMS.BLOCKWIDTH * 2;
         
        // console.log();
        // let xD = this.game.gunner.x - this.x;
        // let xD = this.game.gunner.y - this.y;
        // console.log(xD);
        // console.log(yD);
        // return true;
    }
    
    update() {


// print("gunner ");
// print({x: this.x, y: this.y});

        // const TICK = this.game.clockTick;
        // const WALK_SPEED = this.WALK_SPEED_LEVELS[this.game.savedData.speedLevel]; // could be moved to constructor
        // const JUMP_INITIAL_VELOCITY = this.JUMP_LEVELS[this.game.savedData.jumpLevel]; // could be moved to constructor
        // const 
        // const GRAVITY = 20;

        this.facing = this.game.gunner.x - this.x < 0 ? 0 : 1;
        this.updateBB();

        // shooting
        this.shootTimer = Math.max(0, this.shootTimer - this.game.clockTick);
        if (this.shootTimer == 0 && this.isCloseToGunner()) {
            
            this.shootTimer = this.shootTimeout;
            this.game.addEntity(new Bullet(this.game, this.x, this.y, true, this.facing ? 1 : -1));
            ASSET_MANAGER.playAsset("./assets/audio/shootSound.wav");
        }

        // collisions
        

//         if (this.state == 3) {
//             // todo: handle death?
//         } else {
            
//             if (this.state == 2) { // gunner is currently jumping (air functionality)
                
//                 this.velocityY += GRAVITY;
                
//                 // adds to the upwards velocity if the UP is pressed
//                 // (will not be powerful to completely overcome gravity
//                 // and no longer works once going down) 
//                 if (this.game.up() && this.velocityY < 0) {
//                     // add to the upwards velocity if allowed
//                     this.velocityY += -10;
//                 }

//                 // direction the gunner is looking in air 
//                 // has a small but noticeable impact on velocityX
//                 if (this.game.left() && !this.game.right()) {
//                     this.facing = 0; 
//                     this.velocityX = Math.max(-WALK_SPEED, this.velocityX - WALK_SPEED / 10);
//                 }
//                 else if (!this.game.left() && this.game.right()) {
//                     this.facing = 1;
//                     this.velocityX = Math.min(WALK_SPEED, this.velocityX + WALK_SPEED / 10);
//                 }
//             } 
//             else { // the gunner is not jumping (ground functionality)
                
//                 if (this.game.left()) {
//                     this.state = 1;
//                     this.facing = 0;
//                     this.velocityX = -WALK_SPEED;
//                 }
//                 else if (this.game.right()) {
//                     this.state = 1;
//                     this.facing = 1;
//                     this.velocityX = WALK_SPEED;
//                 } else {
//                     // not trying to move right or left so state is idle
//                     this.state = 0;
//                     this.velocityX = 0;
//                 }
                
//                 // start a jump if the gunner is not in freefall
//                 if (this.game.up() && this.velocityY == 0) {
// // print("here")
//                     this.state = 2;
//                     this.velocityY = JUMP_INITIAL_VELOCITY;
//                     ASSET_MANAGER.playAsset("./assets/audio/Jump.wav");
                    
//                 }

//                 this.velocityY += GRAVITY;

//             }

//             // if (this.game.shoot()) {
//             //     print("shoot");
//             // }
//         }

//         this.x += this.velocityX * TICK * PARAMS.SCALE;
//         this.y += this.velocityY * TICK * PARAMS.SCALE;
        
//         this.updateBB();

//         // collisions
//         let that = this;
//         this.game.entities.forEach(function (entity) {
//             if (entity.BB && that.BB.collide(entity.BB) && entity != that) {

//                 if (entity instanceof Cash) {
//                      entity.removeFromWorld = true;
//                      that.game.camera.collectCash();
//                 }

//                 // moving down
//                 if (that.velocityY > 0 && (entity instanceof Block || entity instanceof Transporter)
//                         && that.BB.collide(entity.topBB) && !that.BB.collide(entity.bottomBB)) {
// // print("above")
//                     that.y = Math.floor(entity.BB.top - (that.BB_TOP_MARGIN + PARAMS.BLOCKWIDTH * 1.03));
//                     that.velocityY = 0;
                    
//                     if (that.state == 2) {
//                         that.state = 0;
//                     }
//                     that.updateBB();

//                     if (entity instanceof Transporter) {
//                         that.x += entity.transportValue;
//                     }
//                 }

//                 // moving up
//                 if (that.velocityY < 0 && (entity instanceof Block || entity instanceof Transporter)
//                         && that.BB.collide(entity.bottomBB) && !that.BB.collide(entity.topBB)) {
// // print("below")
//                     that.y = Math.floor(entity.BB.bottom - that.BB_TOP_MARGIN);
//                     that.velocityY = 0;
//                     that.updateBB();
//                 }

//                 // sprite to the right or left    
//                 if (that.velocityX != 0 && (entity instanceof Block || entity instanceof Transporter) 
//                         && that.BB.collide(entity.topBB) && that.BB.collide(entity.bottomBB)) {
//                     // to right
//                     if (that.lastBB.left <= entity.BB.right && that.lastBB.right >= entity.BB.right) {
// // print("to right") 
//                         // movedHorizontally = true;
                        
//                         let leftXOffset = that.facing ? 18 : 12;
//                         that.x = entity.BB.right - leftXOffset * PARAMS.SCALE;
//                         that.velocityX = 0;
//                         that.updateBB();        
//                     } 
//                     // to left 
//                     else if (that.lastBB.right >= entity.BB.left && that.lastBB.left <= entity.BB.left) {
// // print("to left")
                        
//                         let leftXOffset = that.facing ? 18 : 12;
//                         that.x = entity.BB.left - (PARAMS.BITWIDTH * PARAMS.SCALE * 1.5) + ((PARAMS.BITWIDTH * PARAMS.SCALE * 1.5) - (leftXOffset * PARAMS.SCALE) - (PARAMS.BLOCKWIDTH - 6 * PARAMS.SCALE));
                
//                         that.velocityX = 0;
//                         that.updateBB();        
//                     }
        
//                 }   
                
//                 if (entity instanceof Hammer && entity.isLethalAnimation()) {
//                     that.state = 3;
//                 }
                
//             }
//         });


    };

    drawMinimap(ctx, mmX, mmY) {
        // ctx.fillStyle = "Red";
        // ctx.fillRect(mmX + this.x / PARAMS.BITWIDTH, mmY + this.y / PARAMS.BITWIDTH, this.w / PARAMS.BITWIDTH, PARAMS.SCALE * 2);
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

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }

        ctx.restore();
    };
};