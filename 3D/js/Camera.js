import { Vector } from "./Vector.js";
import { Ray } from "./Ray.js";

export class Camera {
    constructor(location, look_at, width = 4, height = 9/4) {
        this.location = location;
        this.look_at = look_at;

        this.direction = Vector.from(this.location).to(this.look_at).unit();
        this.right = Vector.Y.cross(this.direction).unit().scale(width/2);
        this.up = this.right.cross(this.direction).unit().scale(-height/2);
    }

    trace(scene, x, y) {
        let xRay = this.right.scale(x);
        let yRay = this.up.scale(y).invert();
        let rayDirection = this.direction.add(xRay).add(yRay);
        let ray = new Ray(this.location, rayDirection);
        return ray.trace(scene);
    }
}