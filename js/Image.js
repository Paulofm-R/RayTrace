//imports
import Vector3 from "./Vector3.js";
import Ray from "./Ray.js";
import Color3 from "./Color3.js";

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
        this.origin = new Vector3(0.0, 0.0, 30.0);
        this.s = this.h / this.vertices.length;
        this.ray;
    }

    create() {
        this.createVertices(this.horizontal, this.vertical);

        const color = this.traceRay(this.ray, 0);

        console.log(color);
        this.gl.clearColor(this.red, this.green, this.blue, 1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        const vertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.STATIC_DRAW);
    }

    createVertices(horizontal, vertical) {
        for (let i = 0; i < vertical.length; i++) {
            for (let j = 0; j < horizontal.length; j++) {
                const px = (i + 0.5) * this.s - this.w / 2.0;
                const py = -(j + 0.5) * this.s + this.h / 2.0;
                const pz = 0.0;

                const direction = new Vector3(px, py, - 30.0);
                direction.normalize();

                this.ray = new Ray(origin, direction);
            }
        }
    }

    traceRay(ray, rec) {
        hit = new Hit();

        hit.found = false; // inicialização; também pode ser realizada no construtor da classe Hit
        hit.tmin = 1.0 * 10 ** 12; // usem um valor muito elevado. Por exemplo, hit.tmin = 1.0E12;

        sceneObjects.forEach(object => {
            // ciclo para percorrer todos os objectos da cena
            object.intersect(ray, hit);
        });
        if (hit.found)
            return hit.material.color; // se houver intersecção, retorna a cor do material constituinte do objecto intersectado mais próximo da origem do raio
        else
            return image.backgroundColor; // caso contrário, retorna a cor de fundo
    }
}