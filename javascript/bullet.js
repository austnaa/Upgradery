// NOTE COMMENTED CODE IS RELATED TO MUZZLE FLASH

class Bullet {
    constructor(game, x, y, isHostile, direction = 1) {
        Object.assign(this, { game, x, y, isHostile, direction });

        this.spritesheet = ASSET_MANAGER.getAsset("./assets/visuals/Bullet.png");
        this.animation = new Animator(this.spritesheet, 0, direction == 1 ? 0 : 1, 3, 1, 1, 1, 0, false, true); 

        this.xOffset = this.direction == 1 ? PARAMS.BLOCKWIDTH + 20 : 10;
        this.yOffset = PARAMS.BLOCKWIDTH / 2 + 14;

        this.x += this.xOffset;
        this.y += this.yOffset;

        this.BB = new BoundingBox(this.x, this.y, 3, 1);
    }


    update() {
        this.x += this.direction * 10;
        this.BB = new BoundingBox(this.x, this.y, 3, 1);

        let that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                // hitting something that should stop the bullet (not enemies)
                if (entity instanceof Block || entity instanceof Hammer || entity instanceof Transporter) {
                     that.removeFromWorld = true;
                }

                // hitting an enemy
                if (entity instanceof HostileGunner || entity instanceof Boss) {
                    entity.decrementHealth();
                    that.removeFromWorld = true;
                    // play enemy hit sound
                    ASSET_MANAGER.playAsset("./assets/audio/owHurt.wav");
                    
                }

                if (entity instanceof Gunner && that.isHostile) {
                    entity.decrementHealth();
                    that.removeFromWorld = true;
                    
                    // play enemy hit sound
                    ASSET_MANAGER.playAsset("./assets/audio/owHurt.wav");
                }


            }
        });

    }

    draw(ctx) {
        ctx.fillStyle = 'White';
        ctx.strokeWidth = 10;
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE * 2.5)
    }

}