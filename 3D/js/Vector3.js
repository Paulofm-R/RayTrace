export default class Vector3{
    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    normalize() {
        const length = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        this.x /= length;
        this.y /= length;
        this.z /= length;
    }
}