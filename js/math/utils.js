function getNearestPoint(loc, points, threshold = Number.MAX_SAFE_INTEGER) {
    let minDist = threshold;
    let nearest = null;
    for (const point of points) {
        const dist = distance(point, loc);
        if (dist < minDist && dist < threshold) {
            minDist = dist;
            nearest = point;
        }
    }
    return nearest;
}

function distance(p1, p2) {
    return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

function average(p1, p2) {
    return new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
}

function add(p1, p2) {
    return new Point(p1.x + p2.x, p1.y + p2.y);
}

function subtract(p1, p2) {
    return new Point(p1.x - p2.x, p1.y - p2.y);
}

function scale(p, scaler) {
    return new Point(p.x * scaler, p.y * scaler);
}

function normalize(p) {
    return scale(p, 1 / magnitude(p));
}

function magnitude(p) {
    return Math.hypot(p.x, p.y);
}

function translate(loc, angle, offset) {
    return new Point(
        loc.x + Math.cos(angle) * offset,
        loc.y + Math.sin(angle) * offset
    );
}

function angle(p) {
    return Math.atan2(p.y, p.x);
}

//Linear Interpolation & Segment Intersection function respectively.
//Code block copied from Phase 1 of course I copleted (https://github.com/JoelKuruvill/self-driving-car-with-javascript):
function lerp(A,B,t) {
    return (A+(B-A)*t);
}
function getIntersection(A,B,C,D){
    const tTop=(D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);
    const uTop=(C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y);
    const bottom=(D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);

    const eps = 0.001; //Resolving floating points issue - # being close to 0 but != 0 .. triggering false-positive intersection.
    if(Math.abs(bottom) > eps) { 
        const t = tTop/bottom;
        const u = uTop/bottom;
        if(t>=0 && t<=1 && u>=0 && u<=1){
            return {
                x:lerp(A.x,B.x,t),
                y:lerp(A.y,B.y,t),
                offset:t
            }
        }
    }
    return null;
}
    //Code below copied from Phase 2 code to copy (https://radufromfinland.com/projects/virtualworld/CODES/lesson_4.js):
    // if you're following along, this comes in a few minutes ;-)
    function getRandomColor() {
        const hue = 290 + Math.random() * 260;
        return "hsl(" + hue + ", 100%, 60%)";
    }

    //Code below copied from Phase 2 code to copy, II (https://radufromfinland.com/projects/virtualworld/CODES/lesson_5.js):
    // this one goes to utils.js
    function dot(p1, p2) {
        return p1.x * p2.x + p1.y * p2.y;
    }
// End of Cited Code block.
