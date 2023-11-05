import { Color } from './Color.js';
import { Vector } from './Vector.js';
import { Camera } from './Camera.js';
import { Scene } from './Scene.js';

class Renderer {
    #canvasWidth;
    #canvasHeight;

    constructor(canvasWidth, canvasHeight) {
        this.#canvasWidth = canvasWidth;
        this.#canvasHeight = canvasHeight;
    }

    render(scene, callback) {
        // verificar depois isto
        for (let py = 0; py < this.#canvasHeight; py++) {
            for (let px = 0; px < this.#canvasWidth; px++) {
                // let x = (px / this.#canvasWidth) - 0.5;
                // let y = (py / this.#canvasHeight) - 0.5;
                // let color = scene.trace(x, y);
                // callback(x, y, color);

                let color = scene.trace(px, py);
                callback(px, py, color);
            }
            
        }
    }
}

export { Renderer, Scene, Camera, Color, Vector };