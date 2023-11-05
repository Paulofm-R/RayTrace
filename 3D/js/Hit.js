export default class Hit{
    constructor(material, point, normal, t) {
        this.found = false;
        this.material = material;
        this.point = point;
        this.normal = normal;
        this.t = t;
        this.tmin = 1.0 * 10 ** 12;
    }
}