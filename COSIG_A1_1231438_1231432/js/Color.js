export class Color {

    reflect(direction, normal) {
        let normalLength = this.dot(direction, normal) * 2
        return this.sub(direction, this.mul(normal, normalLength))
    }

    mag([x, y, z]) {
        return Math.sqrt(x ** 2 + y ** 2 + z ** 2)
    }

    mul([x, y, z], s) {
        return [x * s, y * s, z * s]
    }

    mulParts([a, b, c], [x, y, z]) {
        return [a * x, b * y, c * z]
    }

    add([a, b, c], [x, y, z]) {
        return [a + x, b + y, c + z]
    }

    sub(v, w) {
        return this.add(v, this.mul(w, -1))
    }

    dot([a, b, c], [x, y, z]) {
        return a * x + b * y + c * z
    }

    normalize(v) {
        let magnitude = this.mag(v)
        return this.mul(v, 1 / magnitude)
    }
}