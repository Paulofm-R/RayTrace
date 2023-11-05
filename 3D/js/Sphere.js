import { Shape } from "./Shape.js";
import { Vector } from "./Vector.js";

export class Sphere extends Shape {
    constructor(center, radius, color) {
        super(color);
        this.center = center;
        this.radius = radius;
    }

    intersect = ray => {
        let os = Vector.from(this.center).to(ray.start);
        let b = 2 * os.dot(ray.direction);
        let c = os.squid - this.radius * this.radius;
        let discriminat = b * b - 4 * c;
        if (discriminat < 0) return [];
        if (discriminat == 0) return [-b / 2];
        let root = Math.sqrt(discriminat);
        return [(-b - root) / 2, (-b + root) / 2];
    }
}