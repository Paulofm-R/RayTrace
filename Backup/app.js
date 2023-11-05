//imports
import Image from "./Image.js";
import Transformation from "./Transformation.js";
import Camera from "../3D/js/Camera.js";
import Vector3 from "./Vector3.js";


// declarações DOM
const startButton = document.querySelector('#startButton');
const fileInput = document.querySelector('#fileInput');
const loadButton = document.querySelector('#loadButton');
const progress = document.querySelector('.progressBar>div');
const saveButton = document.querySelector('#saveButton');
const canvas = document.querySelector("#canvas");

// variabeis globais
let objectScene;
const regexInfo = /\{ ([^}]*)\ }/; // ajuda a buscar as informações que estão entre {}
const gl = canvas.getContext("webgl", {preserveDrawingBuffer: true});

let image;
let camera;

canvas.width = 295; // 295px
canvas.height = 265; // 265px
const W = canvas.width;
const H = canvas.height;


startButton.addEventListener('click', () => {
    const recursionDepth = parseInt(document.querySelector('#recursionDepth').value, 10);

    if (!isNaN(recursionDepth)) {
        // progress.setAttribute("style", "width: 60%");
        saveInformation(objectScene);
        createScene();
    }
    else
        alert('O Recursion depth não é um número valido.');
})

loadButton.addEventListener('click', () => fileInput.click())

saveButton.addEventListener("click", () => {
    const a = document.createElement('a');
    a.download = "rayTracer.png";
    a.href = canvas.toDataURL("image/png");
    a.click();
})


const saveInformation = (object) => {
    for (const obj of object) {
        if (obj.includes("Camera")) {
            const cameraInfo = obj.replace(/\s+/g, ' ').match(regexInfo);
            camera = new Camera(cameraInfo[1].split(' '))
        }
        else if (obj.includes("Image")) {
            const imageInfo = obj.replace(/\s+/g, ' ').match(regexInfo);
            image = new Image(imageInfo[1].split(' '))
        }
        else if (obj.includes("Transformation")) {
            const transInfo = obj.replace(/\s+/g, ' ').match(regexInfo);
            if (transInfo) {
                const transformation = new Transformation(gl, W, H);
                transformation.saveInfo(transInfo[1]);
                // transformation.create();
            }
        }
        else if (obj.includes("Material"))
            console.log("Material");
        else if (obj.includes("Light"))
            console.log("Luz");
        else if (obj.includes("Triangles"))
            console.log("Triangles");
        else if (obj.includes("Box"))
            console.log("Caixa");
        else if (obj.includes("Sphere"))
            console.log("Esfera");
    }

    // chamar todas as funções para criar o raytracing no canvas
}

const createScene = () => {
    const origin = new Vector3(0.0, 0.0, camera.distance);
}

window.addEventListener("DOMContentLoaded", () => {
    fileInput.addEventListener("change", () => {
        let file = fileInput.files.item(0);

        // ler um arquivo
        let reader = new FileReader();
        reader.readAsText(file);

        reader.onload = (e) => {
            const content = e.target.result;

            const objects = content.split(/\n(?=\w+\s*{)/).map(object => object.trim());
            objectScene = objects.map(object => object.replace(/\r?\n|\r|\t/g, ' '));
        }
    })
})
