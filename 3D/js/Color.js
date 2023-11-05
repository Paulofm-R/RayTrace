export class Color {
    #r = 0;
    #g = 0;
    #b = 0;

    constructor(r, g, b) {
        this.#r = r;
        this.#g = g;
        this.#b = b;
    }

    get r() { return this.#r; }
    get g() { return this.#g; }
    get b() { return this.#b; }

    get rgba() { return [this.r, this.g, this.b, 0xFF];} // 0xFF == 255 em hexdecimal

    get html() { return `rgb(${this.r},${this.g},${this.b})`;}

    static White = new Color(255, 255, 255);
    static Black = new Color(0, 0, 0);
    static Gray = new Color(127, 127, 127);
    static Red = new Color(255, 0, 0);
    static Green = new Color(0, 255, 0);
    static Blue = new Color(0, 0, 255);
    static Yellow = new Color(255, 255, 0);
    static Magenta = new Color(255, 0, 255);
    static Cyan = new Color(0, 255, 255);

    add = (that) => new Color(
        this.r + that.r, this.g + that.g, this.b + that.b
    );

    multiply = (that) => new Color(
        Math.floor(this.r * that.r / 0xff),
        Math.floor(this.g * that.g / 0xff),
        Math.floor(this.b * that.b / 0xff),
    );

    scale = (factor) => new Color(
        this.r * factor,
        this.g * factor,
        this.b * factor,
    )
}