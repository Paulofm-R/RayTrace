export class Ray {
    // Construct a new ray starting from the specified start point, and pointing in the specified direction
    constructor(start, direction) {
        this.start = start;
        this.direction = direction.unit();
    }

    // Trace this ray through the specified scene, and return the resulting color
    trace = (scene) => {
        let distances = scene.shapes.map( s => s.closestDistanceAlongRay(this));
        // console.log(distances);
        let shortestDistance = Math.min.apply(Math, distances);
        if (shortestDistance == Infinity) return scene.background;
        let nearestShape = scene.shapes[distances.indexOf(shortestDistance)];
        return nearestShape.color;
    }
}