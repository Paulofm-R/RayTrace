//imports
import Image from "./Image.js";
import Transformation from "./Transformation.js";

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
const gl = canvas.getContext("webgl");

canvas.width = 295; // 295px
canvas.height = 265; // 265px
const W = canvas.width;
const H = canvas.height;


startButton.addEventListener('click', () => {
    const recursionDepth = parseInt(document.querySelector('#recursionDepth').value, 10);

    if (!isNaN(recursionDepth)) {
        // progress.setAttribute("style", "width: 60%");
        createScene(objectScene);
    }
    else
        alert('O Recursion depth não é um número valido.');
})

loadButton.addEventListener('click', () => fileInput.click())

saveButton.addEventListener("click", () => {
    const vctx = canvas.getContext('2d'); // para guardar a imagem

    //    vctx.drawImage(canvas, 0, 0); 

    // const vctx = videocanvas.getContext('2d');
    // vctx.drawImage(webGLTestCanvas, 0, 0);
    // const capturedImage = videocanvas.toDataURL();

    const a = document.createElement('a');
    a.download = "rayTracer.png";
    a.href = canvas.toDataURL("image/png");
    a.click();
})


const createScene = (object) => {
    for (const obj of object) {
        if (obj.includes("Image")) {
            const imageInfo = obj.replace(/\s+/g, ' ').match(regexInfo);
            const image = new Image(gl, W, H, imageInfo[1].split(' '))
            image.create();
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
        else if (obj.includes("Camera"))
            console.log("Camara");
        else if (obj.includes("Light"))
            console.log("Luz");
        else if (obj.includes("Triangles"))
            console.log("Triangles");
        else if (obj.includes("Box"))
            console.log("Caixa");
        else if (obj.includes("Sphere"))
            console.log("Esfera");
    }
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
