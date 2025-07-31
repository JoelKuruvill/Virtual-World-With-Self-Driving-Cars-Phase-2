class Envelope {
    constructor(skeleton, width, roundness = 1) {
        if (skeleton) {
            this.skeleton = skeleton;
            this.poly = this.#generatePolygon(width, roundness);
        }
    }

    static load(info) {
        const env = new Envelope();
        env.skeleton = new Segment(info.skeleton.p1, info.skeleton.p2);
        env.poly = Polygon.load(info.poly);
        return env;
    }

    #generatePolygon(width, roundness) {
        const { p1, p2 } = this.skeleton; //Destructuring Assignment

        const radius = width / 2;
        const alpha = angle(subtract(p1, p2)); //Angle between p1 and p2 utilizing Math.atan2.
        const alpha_cw = alpha + Math.PI / 2; //Angle offset 90 degrees clockwise
        const alpha_ccw = alpha - Math.PI / 2; //Angle offset 90 degrees counter-clockwise.
        /* points that are offset i.e. const p1_ccw = translate(p1, alpha_ccw, radius)  etc. */
        const points = [];
        const step = Math.PI / Math.max(1, roundness);
        const eps = step / 2;
        for (let i = alpha_ccw; i <= alpha_cw + eps; i += step) {
            points.push(translate(p1, i, radius)); //translates p1 points, at 'i' angle by the given radius.
        }
        for (let i = alpha_ccw; i <= alpha_cw + eps; i += step) {
            points.push(translate(p2, Math.PI + i, radius)); //translates p1 points, at 'i' angle by the given radius.
        }

        return new Polygon(points);
    }

    draw(ctx, options) {
        this.poly.draw(ctx, options);   
        // this.poly.drawSegments(ctx); //colourful highlighting.. disabled.
    }
}
