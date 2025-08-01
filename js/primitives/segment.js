class Segment {
    constructor(p1, p2){
        this.p1 = p1; //saves as attributes of the class.
        this.p2 = p2;
    }

    length() {
        return distance(this.p1, this.p2);
    }

    directionVector() {
        return normalize(subtract(this.p2, this.p1));
    }

    equals(seg) {
        return this.includes(seg.p1) && this.includes(seg.p2)
    }

    includes(point) { //A helper method.
        return this.p1.equals(point) || this.p2.equals(point);
    }

    //Code below copied from Phase 2 code to copy, II (https://radufromfinland.com/projects/virtualworld/CODES/lesson_5.js):
    distanceToPoint(point) {
        const proj = this.projectPoint(point);
        if (proj.offset > 0 && proj.offset < 1) {
            return distance(point, proj.point);
        }
        const distToP1 = distance(point, this.p1);
        const distToP2 = distance(point, this.p2);
        return Math.min(distToP1, distToP2);
    }

    projectPoint(point) {
        const a = subtract(point, this.p1);
        const b = subtract(this.p2, this.p1);
        const normB = normalize(b);
        const scaler = dot(a, normB);
        const proj = {
            point: add(this.p1, scale(normB, scaler)),
            offset: scaler / magnitude(b),
        };
        return proj;
    }
    
    // End of Cited Code block.

    draw(ctx, { width=2, color="black", dash = [] } = {}){
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.setLineDash(dash);
        ctx.moveTo(this.p1.x, this.p1.y);
        ctx.lineTo(this.p2.x, this.p2.y);
        ctx.stroke();
        ctx.setLineDash([]); //Resets the dash, to avoid affecting following drawings. Maybe better performace than ctx save etc.
    }
}