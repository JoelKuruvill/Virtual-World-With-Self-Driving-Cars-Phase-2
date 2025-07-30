class Marking {
    constructor(center, directionVector, width, height) {
        this.center = center;
        this.directionVector = directionVector;
        this.width = width;
        this.height = height;

        this.support = new Segment(
            translate(center, angle(directionVector), height /2), //support relative to centre location.
            translate(center, angle(directionVector), -height /2), //2nd point, at opposite angle.
        );
        this.poly = new Envelope(this.support, width, 0).poly;
    }

    draw(ctx) {
        this.poly.draw(ctx);
    }
}