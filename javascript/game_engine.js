// This game shell was happily modified from Googler Seth Ladd's
// "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];
        // Entities to be added at the end of each update
        this.entitiesToAdd = [];

        // Information on the input
        this.click = null;
        this.mouse = null;
        this.wheel = null;
        this.keys = {};

        // THE KILL SWITCH
        this.running = false;

        // Options and the Details
        this.options = options || {
            prevent: {
                contextMenu: true,
                scrolling: true,
            },
            debugging: false,
        };
    };

    init(ctx) {
        this.ctx = ctx;
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        this.running = true;
        const gameLoop = () => {
            this.loop();
            if (this.running) {
                requestAnimFrame(gameLoop, this.ctx.canvas);
            }
        };
        gameLoop();
    };

    startInput() {
        const getXandY = e => ({
            x: e.clientX - this.ctx.canvas.getBoundingClientRect().left,
            y: e.clientY - this.ctx.canvas.getBoundingClientRect().top
        });

        this.ctx.canvas.addEventListener("mousemove", e => {
            if (this.options.debugging) {
                console.log("MOUSE_MOVE", getXandY(e));
            }
            this.mouse = getXandY(e);
        });

        this.ctx.canvas.addEventListener("click", e => {
            if (this.options.debugging) {
                console.log("CLICK", getXandY(e));
            }
            this.click = getXandY(e);
        });

        this.ctx.canvas.addEventListener("wheel", e => {
            if (this.options.debugging) {
                console.log("WHEEL", getXandY(e), e.wheelDelta);
            }
            if (this.options.prevent.scrolling) {
                e.preventDefault(); // Prevent Scrolling
            }
            this.wheel = e;
        });

        this.ctx.canvas.addEventListener("contextmenu", e => {
            if (this.options.debugging) {
                console.log("RIGHT_CLICK", getXandY(e));
            }
            if (this.options.prevent.contextMenu) {
                e.preventDefault(); // Prevent Context Menu
            }
            this.rightclick = getXandY(e);
        });

        window.addEventListener("keydown", event => this.keys[event.key] = true);
        window.addEventListener("keyup", event => this.keys[event.key] = false);
    };

    addEntity(entity) {
        this.entitiesToAdd.push(entity);
    };

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // Draw latest things first
        for (let i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].draw(this.ctx, this);
        }
    };

    update() {

        // Update Entities
        this.entities.forEach(entity => entity.update(this));

        // Remove dead things
        this.entities = this.entities.filter(entity => !entity.removeFromWorld);

        // Add new things
        this.entities = this.entities.concat(this.entitiesToAdd);
        this.entitiesToAdd = [];

        this.camera.update();
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };

    // added code below
    up() {
        return this.keys['ArrowUp'] || this.keys['w'] || this.keys['W'];
    }

    left() {
        return this.keys['ArrowLeft'] || this.keys['a'] || this.keys['A'];
    }

    right() {
        return this.keys['ArrowRight'] || this.keys['d'] || this.keys['D'];
    }

    shoot() {
        return this.keys[' '];
    }
    // added code above

    get["deltaTime"]() { return this.clockTick; }
    get["width"]() { return this.ctx?.canvas?.width || 0; }
    get["height"]() { return this.ctx?.canvas?.height || 0; }
};

// KV Le was here :)