import { Color } from "./Color.js";

export class Vector {
    constructor() {
        this.color = new Color();
    }

    intersection(origin, direction, objects) {
        let minDistance = Infinity
        let collided = false
        let closestIntersection
        let closestObject

        for (let object of objects) {
            let intersection
            if (object.shape == "sphere") {
                intersection = this.sphereIntersection(origin, direction, object)
                if (intersection.dist < minDistance) {
                    closestIntersection = intersection
                    closestObject = object

                    minDistance = intersection.dist
                }

                //if collided, set to true, else keep it the same
                collided = collided || intersection.collided
            }
        }

        return {
            collided: collided,
            point: closestIntersection?.point ?? [0, 0, 0],
            dist: closestIntersection?.dist ?? Infinity,
            normal: closestIntersection?.normal ?? [0, 0, 0],
            object: closestObject
        }
    }

    sphereIntersection(origin, direction, sphere) {
        let sphereRay = this.color.sub(sphere.position, origin)
        let distSphereRay = this.color.mag(sphereRay)
        let distToClosestPointOnRay = this.color.dot(sphereRay, direction) // length of the segment along the ray to the closest point
        let distFromClosestPointToSphere = Math.sqrt(distSphereRay ** 2 - distToClosestPointOnRay ** 2)

        let distToIntersection = distToClosestPointOnRay - Math.sqrt(Math.abs(sphere.radius ** 2 - distFromClosestPointToSphere ** 2))
        let point = this.color.add(origin, this.color.mul(direction, distToIntersection))
        let normal = this.color.normalize(this.color.sub(point, sphere.position))

        //calculate roughness
        normal = this.color.normalize(this.color.add(normal, this.color.mul([Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5], sphere.roughness)))

        if (distToClosestPointOnRay > 0 && distFromClosestPointToSphere < sphere.radius) {
            return {
                collided: true,
                dist: distToIntersection,
                point: point,
                normal: normal
            }
        }

        return {
            collided: false,
            dist: Infinity
        }
    }
}