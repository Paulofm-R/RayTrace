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
        this.gl.fillStyle = `rgb(${Math.round(this.red * 255)}, ${Math.round(this.green * 255)}, ${Math.round(this.blue * 255)})`;

        this.createVertices(this.horizontal, this.vertical);

        const vertexBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.STATIC_DRAW);
    }

    createVertices(horizontal, vertical) {
        // Preencha o array com vértices da grade
        for (let x = 0; x < horizontal; x++) {
            for (let y = 0; y < vertical; y++) {
                // Crie vértices para cada quadrado de pixel
                const x0 = (x / horizontal) * 2 - 1;
                const y0 = 1 - (y / vertical) * 2;
                const x1 = ((x + 1) / horizontal) * 2 - 1;
                const y1 = 1 - ((y + 1) / vertical) * 2;

                // Adicione os vértices do quadrado ao array
                this.vertices.push(x0, y0, x1, y0, x0, y1, x0, y1, x1, y0, x1, y1);
            }
        }
    }
}