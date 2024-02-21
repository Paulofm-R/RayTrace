import { Color } from "./Color.js";
import { Ray } from "./Ray.js";

export class Renderer {
    constructor(height, width, focalLength, samples) {
        this.height = height;
        this.width = width;
        this.focalLength = focalLength;
        this.samples = samples;

        this.color = new Color()
        this.ray = new Ray()
    }

    trace(objects, pixels) {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                let x = i - this.width / 2
                let y = j - this.height / 2

                let direction = this.color.normalize([x, y, this.focalLength])

                let color = [0, 0, 0]
                for (let i = 0; i < this.samples; i++) {
                    color = this.color.add(color, this.ray.trace([0, 0, 0], direction, objects, 4))
                }
                color = this.color.mul(color, 1 / this.samples)

                pixels[i][j] = color
            }
        }

        return pixels
    }

    render(pixels, callback) {
        for (let i = 0; i < pixels.length; i++) {
            for (let j = 0; j < pixels[0].length; j++) {
                let color = pixels[i][j]
                callback(i,j,color)
            }
        }
    }
}