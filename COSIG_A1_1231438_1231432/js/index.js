import { Renderer } from "./Renderer.js";

const startButton = document.querySelector('#startButton');
// const fileInput = document.querySelector('#fileInput');
// const loadButton = document.querySelector('#loadButton');
// const progress = document.querySelector('.progressBar>div');
const saveButton = document.querySelector('#saveButton');
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d')

// valores default
canvas.height = 265;
canvas.width = 295

saveButton.addEventListener("click", () => {
    const a = document.createElement('a');
    a.download = "rayTracer.png";
    a.href = canvas.toDataURL("image/png");
    a.click();
})

startButton.addEventListener('click', () => {
    canvas.height = document.querySelector('#horImage')?.value ?? 265;
    canvas.width = document.querySelector('#verImage')?.value ?? 295;
    let focalLength = document.querySelector('#distance')?.value ?? 50;
    let samples = document.querySelector('#fieldView')?.value ?? 100;

    const W = canvas.width;
    const H = canvas.height;

    function paint(x, y, color) {
        ctx.fillStyle = `rgb(${color[0]},${color[1]},${color[2]})`
        ctx.fillRect(x, y, 1, 1);
    }

    let pixels = Array(W).fill(0).map(() => Array(H).fill(0).map(() => { return [0, 0, 0] }))

    let objects = [
        {
            shape: "sphere",
            position: [1000, 0, 0],
            radius: 990,
            emission: [0, 0, 0],
            reflectivity: [1, 0, 0],
            roughness: 10,
        },
        {
            shape: "sphere",
            position: [-1000, 0, 0],
            radius: 990,
            emission: [0, 0, 0],
            reflectivity: [0, 1, 0],
            roughness: 3,
        },
        {
            shape: "sphere",
            position: [0, 1000, 0],
            radius: 990,
            emission: [0, 0, 0],
            reflectivity: [1, 1, 1],
            roughness: 3,
        },
        {
            shape: "sphere",
            position: [0, -1000, 0],
            radius: 990,
            emission: [0, 0, 0],
            reflectivity: [1, 1, 1],
            roughness: 3,
        },
        {
            shape: "sphere",
            position: [0, 0, 1000],
            radius: 990,
            emission: [0, 0, 0],
            reflectivity: [1, 1, 1],
            roughness: 3,
        },
        {
            shape: "sphere",
            position: [0, -14.5, 7],
            radius: 5,
            emission: [5550, 5550, 5550],
            reflectivity: [1, 1, 1],
            roughness: 3,
        },
        {
            shape: "sphere",
            position: [3, 7, 7],
            radius: 3,
            emission: [0, 0, 0],
            reflectivity: [1, 1, 1],
            roughness: 0,
        },
    ]

    const render = new Renderer(H, W, focalLength, samples)
    pixels = render.trace(objects, pixels);
    render.render(pixels, paint)
});
