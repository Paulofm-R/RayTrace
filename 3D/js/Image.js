//imports
import Vector3 from "./Vector3.js";
import Camera from "./Camera.js";
import Ray from "./Ray.js";
import Color3 from "./Color3.js";

export default class Image {
    constructor(imageInfo) {
        this.horizontal = imageInfo[0];
        this.vertical = imageInfo[1];
        this.red = imageInfo[2];
        this.green = imageInfo[3];
        this.blue = imageInfo[4];
    }

    create() {

        this.origin = new Vector3(0.0, 0.0, Camera.distance);
        console.log(Camera.distance);
        const height = 2.0 * Camera.distance * Math.tan(Camera.fov);
        const width = height * this.horizontal / this.vertical
        const s = this.h / this.vertices;

        this.createVertices()
    }

    createVertices() {
        for (let j = 0; j < this.vertices; j++) {
            for (let i = 0; i < this.horizontal; i++) {
              const px = (i + 0.5) * s - width / 2.0;
              const py = -(j + 0.5) * s + height / 2.0;
          
              // Calcule o vetor direction
              const direction = new Vector3(px, py, -Camera.distance);
              direction.normalize();
          
              // Crie o raio
              const ray = new Ray(origin, direction);
          
              // Chame a função traceRay para calcular a cor
              const color = this.traceRay(ray, rec);
          
              // Limite as componentes primárias da cor
              this.checkRange(color);
          
              // Converta as componentes primárias da cor
              const r = Math.round(255 * color.r);
              const g = Math.round(255 * color.g);
              const b = Math.round(255 * color.b);
          
              // Defina as cores do píxel[i][j]
              // pixel[i][j].r = r;
              // pixel[i][j].g = g;
              // pixel[i][j].b = b;
          
              // Aqui você deve atribuir as cores aos píxeis da imagem, como feito no seu sistema
              // Este é apenas um exemplo de como você pode ajustar as cores
            }
          }
    }

    traceRay(ray, rec) {
        return new Color3(this.red, this.green, this.blue);
      }
      
    checkRange(color) {
        this.red = Math.max(0, Math.min(1, this.red));
        this.green = Math.max(0, Math.min(1, this.green));
        this.blue = Math.max(0, Math.min(1, this.blue));
    }
}