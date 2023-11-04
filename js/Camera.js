export default class Camera{
    constructor(info) {
        this.transformation = info[0];
        this.distance = info[1];
        this.fov = (info[2] * Math.PI) / 180.0;
    }
}