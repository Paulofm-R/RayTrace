export default class Transformation {
    constructor(gl, W, H) {
        this.gl = gl;
        this.w = W;
        this.h = H;

        this.T = [];
        this.Rx = 0;
        this.Ry = 0;
        this.Rz = 0;
        this.S = [];

        this.vertCode =
            'attribute vec3 coordinates;' +
            'uniform vec3 translation;' +
            'void main(void) {' +
            '  gl_Position = coordinates + translation;' +
            '}';
        this.fragCode =
            'void main(void) {' +
            '   gl_FragColor = vec3(0.0, 0.0, 0.0);' +
            '}';
    }

    saveInfo(info) {
        const values = info.split(' ');

        for (let i = 0; i < values.length; i++) {
            switch (values[i]) {
                case 'T':
                    this.T.push(values[i + 1]);
                    this.T.push(values[i + 2]);
                    this.T.push(values[i + 3]);
                    break;
                case 'Rx':
                    this.Rx = values[i + 1];
                    break;
                case 'Ry':
                    this.Ry = values[i + 1];
                    break;
                case 'Rz':
                    this.Rz = values[i + 1];
                    break;
                case 'S':
                    this.S.push(values[i + 1]);
                    this.S.push(values[i + 2]);
                    this.S.push(values[i + 3]);
                    break;
            }
        }
    }

    create() {
        this.translation()
    }

    translation() {
        let vertex_buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertex_buffer);    

        let vertShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(vertShader, this.vertCode);
        this.gl.compileShader(vertShader);

        let fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(fragShader, this.fragCode);
        this.gl.compileShader(fragShader);

        let shaderProgram = this.gl.createProgram();
        this.gl.attachShader(shaderProgram, vertShader);
        this.gl.attachShader(shaderProgram, fragShader);
        this.gl.linkProgram(shaderProgram);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertex_buffer);
        let coordinatesVar = this.gl.getAttribLocation(shaderProgram, "coordinates");
        this.gl.vertexAttribPointer(coordinatesVar, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(coordinatesVar);

        let translation = this.gl.getUniformLocation(shaderProgram, 'translation');
        this.gl.uniform3f(translation, this.T[0], this.T[1], this.T[2]);
    }
}
