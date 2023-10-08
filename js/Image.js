//imports
import Vector3 from "./Vector3.js";
import Ray from "./Ray.js";

export default class Image {
    constructor(gl, W, H, imageInfo) {
        this.gl = gl;
        this.w = W;
        this.h = H;
        this.horizontal = imageInfo[0];
        this.vertical = imageInfo[1];
        this.red = imageInfo[2];
        this.green = imageInfo[3];
        this.blue = imageInfo[4];

        this.vertices = [];
    }

    create() {
        this.gl.clearColor(this.red, this.green, this.blue, 1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.createVertices(this.horizontal, this.vertical);

        const vertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.STATIC_DRAW);
    }

    createVertices(horizontal, vertical) {
        const origin = new Vector3(0.0, 0.0, 30.0);
        const s = this.h / this.vertices.length;

        for (let i = 0; i < this.vertices.length; i++) {
            for (let j = 0; j < this.horizontal.length; j++) {
                const px = (i + 0.5) * s - this.w / 2.0;
                const py = -(j + 0.5) * s + this.h / 2.0;
                const pz = 0.0;

                const direction = new Vector3(px, py, - 30.0);
                direction.normalize();
                
                const ray = new Ray(origin, direction);
            }
        }
    }

    traceRay(ray, rec) {
        
    }
}