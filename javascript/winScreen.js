class WinScreen {
    constructor(game) {
        Object.assign(this, { game});
    };

    update() {

    }

    draw(ctx) {

        ctx.save();
        console.log("asdlkfjgasldfh");
        
        ctx.fillStyle = "White";
        ctx.font = 64 + 'px "silkscreennormal"';
        ctx.textAlign = "center";
        ctx.fillText("YOU WIN!", 500,400);

        ctx.restore();
    };
};