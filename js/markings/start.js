class Start extends Marking {
    constructor(center, directionVector, width, height) {
        super(center, directionVector, width, height);

        this.img = new Image();
        this.img.src = "";
        this.type = "start";
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.center.x, this.center.y);
        ctx.rotate(angle(this.directionVector) - Math.PI / 2);

        ctx.drawImage(this.img, -this.img.width / 2, -this.img.heigth / 2) //0

        ctx.restore(); //restores to orignal state without translation or rotation.
    }
}