export default class Hit{
    constructor(found, material, point, normal, t, tmin) {
        this.found = found;
        this.material = material;
        this.point = point;
        this.normal = normal;
        this.t = t;
        this.tmin = tmin;
    }
}