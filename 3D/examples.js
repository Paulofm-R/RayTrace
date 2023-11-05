import { Camera, Scene, Vector, Color } from './js/Renderer.js'
import { Sphere } from './js/Sphere.js';

export function ColoredSphere() {
    let camera = new Camera(new Vector(0, 2, -8), Vector.Z);
    let background = Color.Black
    let shapes = [
        new Sphere(new Vector(-4, 0, 4), 1, Color.Yellow),
        new Sphere(new Vector(-2, 0, 2), 1, Color.Red),
        new Sphere(new Vector(+0, 0, 0), 1, Color.White),
        new Sphere(new Vector(+2, 0, 2), 1, Color.Green),
        new Sphere(new Vector(+4, 0, 4), 1, Color.Blue),
    ];

    return new Scene(camera, background, shapes);
}