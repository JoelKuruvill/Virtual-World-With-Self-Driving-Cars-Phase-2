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

        this.type = "marking";
    }

    static load(info) {
        const point = new Point(info.center.x, info.center.y);
        const dir = new Point(info.directionVector.x, info.directionVector.y);
        switch(info.type) {
            case "crossing":
                return new Crossing(point, dir, info.width, info.height);
            case "light":
                console.log("Marking - light, not implemented atm");
            case "marking":
                return new Marking(point, dir, info.width, info.height);
            case "parking":
                console.log("Marking - parking, not implemented atm");
            case "start":
                return new Start(point, dir, info.width, info.height);
            case "stop":
                return new Stop(point, dir, info.width, info.height);
            case "target":
                console.log("Marking - target, not implemented atm");
            case "yield":
                console.log("Marking - yield, not implemented atm");
        }
    }

    draw(ctx) {
        this.poly.draw(ctx);
    }
}