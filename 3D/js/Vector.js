export class  Vector{
    #x = 0;
    #y = 0;
    #z = 0;
    #xyz = [];
    
    constructor(x, y, z) {
        this.#xyz = [this.#x, this.#y, this.#z] = [x, y, z];
    }

    get x(){return this.#x}
    get y(){return this.#y}
    get z(){return this.#z}

    static X = new Vector(1, 0, 0);
    static Y = new Vector(0, 1, 0);
    static Z = new Vector(0, 0, 1);
    static O = new Vector(0, 0, 0); //origem

    #length = null;
    get length(){
        return this.#length ??= Math.sqrt(this.squid);
    }

    #squid = null;
    // Get x^2 + y^2 + z^2, aka the squared Euclidian distance
     get squid(){
        return this.#squid ??= this.#xyz.map(c => c*c).reduce((a,b) => a+b);
     }

     scale = (s) => new Vector(this.x * s, this.y * s, this.z * s);
     divide = (d) => new Vector(this.x / d, this.y / d, this.z / d);
     unit = () => this.divide(this.length);
     add = that => new Vector(this.x + that.x, this.y + that.y, this.z + that.z);
     invert = () => new Vector(-this.x, -this.y, -this.z);
     subtract = that => new Vector(this.x - that.x, this.y - that.y, -this.z - that.z);

    //  return the dot-product of this vector and that vector
    dot = (that) => this.x * that.x + this.y * that.y + this.z * that.z;

    // return the cross-product of this vector and that vector
    cross = (that) => new Vector(
        this.y * that.z - this.z * that.y,
        this.z * that.x - this.x * that.z,
        this.x * that.y - this.y * that.x,
    )

    static from = (origin) => ({
        to: target => target.subtract(origin)
    });
}