import { Color } from "./Color.js";
import { Vector } from "./Vector.js";

export class Ray {
    constructor(){
        this.color = new Color()
        this.vector = new Vector()
    }

    trace(origin, direction, objects, steps) {
        let intersect = this.vector.intersection(origin, direction, objects)

        if (intersect.collided && steps > 0) {
            let reflectedOrigin = intersect.point
            let reflectedDirection = this.color.reflect(direction, intersect.normal)

            return this.color.add(intersect.object.emission, this.color.mulParts(this.trace(reflectedOrigin, reflectedDirection, objects.filter(o => o != intersect.object), steps - 1), intersect.object.reflectivity))
        }
        return [0, 0, 0]
    }
}