import { Renderer, Camera, Scene, Vector, Color } from './js/Renderer.js';
import { ColoredSphere } from './examples.js'

let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
let renderer = new Renderer(canvas.width, canvas.height);

function paintPixel(x, y, color) {
    ctx.fillStyle = color.html;
    ctx.fillRect(x, y, 1, 1);
}

// let camera = new Camera(new Vector(0, 0, 0), Vector.O);
// let background = Color.Black;
let scene = ColoredSphere();
renderer.render(scene, paintPixel);