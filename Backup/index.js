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


    function paint(pixels) {
        for (let i = 0; i < pixels.length; i++) {
            for (let j = 0; j < pixels[0].length; j++) {
                let color = pixels[i][j]
                ctx.fillStyle = `rgb(${color[0]},${color[1]},${color[2]})`
                ctx.fillRect(i, j, 1, 1);
            }
        }
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

    for (let i = 0; i < W; i++) {
        for (let j = 0; j < H; j++) {
            let x = i - W / 2
            let y = j - H / 2

            let direction = normalize([x, y, focalLength])

            let color = [0, 0, 0]
            for (let i = 0; i < samples; i++) {
                color = add(color, trace([0, 0, 0], direction, objects, 4))
            }
            color = mul(color, 1 / samples)

            pixels[i][j] = color

        }
    }

    paint(pixels)

    function trace(origin, direction, objects, steps) {
        let intersect = intersection(origin, direction, objects)

        if (intersect.collided && steps > 0) {
            let reflectedOrigin = intersect.point
            let reflectedDirection = reflect(direction, intersect.normal)

            return add(intersect.object.emission, mulParts(trace(reflectedOrigin, reflectedDirection, objects.filter(o => o != intersect.object), steps - 1), intersect.object.reflectivity))
        }
        return [0, 0, 0]
    }

    function intersection(origin, direction, objects) {
        let minDistance = Infinity
        let collided = false
        let closestIntersection
        let closestObject

        for (let object of objects) {
            let intersection
            if (object.shape == "sphere") {
                intersection = sphereIntersection(origin, direction, object)
                if (intersection.dist < minDistance) {
                    closestIntersection = intersection
                    closestObject = object

                    minDistance = intersection.dist
                }

                //if collided, set to true, else keep it the same
                collided = collided || intersection.collided
            }
        }

        return {
            collided: collided,
            point: closestIntersection?.point ?? [0, 0, 0],
            dist: closestIntersection?.dist ?? Infinity,
            normal: closestIntersection?.normal ?? [0, 0, 0],
            object: closestObject
        }
    }

    function sphereIntersection(origin, direction, sphere) {
        let sphereRay = sub(sphere.position, origin)
        let distSphereRay = mag(sphereRay)
        let distToClosestPointOnRay = dot(sphereRay, direction) // length of the segment along the ray to the closest point
        let distFromClosestPointToSphere = Math.sqrt(distSphereRay ** 2 - distToClosestPointOnRay ** 2)

        let distToIntersection = distToClosestPointOnRay - Math.sqrt(Math.abs(sphere.radius ** 2 - distFromClosestPointToSphere ** 2))
        let point = add(origin, mul(direction, distToIntersection))
        let normal = normalize(sub(point, sphere.position))

        //calculate roughness
        normal = normalize(add(normal, mul([Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5], sphere.roughness)))

        if (distToClosestPointOnRay > 0 && distFromClosestPointToSphere < sphere.radius) {
            return {
                collided: true,
                dist: distToIntersection,
                point: point,
                normal: normal
            }
        }

        return {
            collided: false,
            dist: Infinity
        }
    }

    function reflect(direction, normal) {
        let normalLength = dot(direction, normal) * 2
        return sub(direction, mul(normal, normalLength))
    }

    function mag([x, y, z]) {
        return Math.sqrt(x ** 2 + y ** 2 + z ** 2)
    }

    function mul([x, y, z], s) {
        return [x * s, y * s, z * s]
    }

    function mulParts([a, b, c], [x, y, z]) {
        return [a * x, b * y, c * z]
    }

    function add([a, b, c], [x, y, z]) {
        return [a + x, b + y, c + z]
    }

    function sub(v, w) {
        return add(v, mul(w, -1))
    }

    function dot([a, b, c], [x, y, z]) {
        return a * x + b * y + c * z
    }

    function normalize(v) {
        let magnitude = mag(v)
        return mul(v, 1 / magnitude)
    }
});
