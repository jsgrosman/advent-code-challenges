export default class Point {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
      }

    public toString(): string {
        return `${this.x},${this.y}`;
    }

    public equals(p: Point): boolean {
        return this.x === p.x && this.y === p.y;
    }

    public getManhattanNeighbors(maxX: number|null = null, maxY: number|null = null): Point[] {
        const result: Point[] = [];

        // top
        if (this.y > 0) {
            result.push(new Point(this.x, this.y - 1));
        }

        // bottom
        if (!maxY || this.y < maxY ) {
            result.push(new Point(this.x, this.y + 1));
        }

        // left
        if (this.x > 0) {
            result.push(new Point(this.x - 1, this.y));
        }

        // right
        if (!maxX || this.x < maxX ) {
            result.push(new Point(this.x + 1, this.y));
        }

        return result;
    }

    public getDiagonalNeighbors(maxX: number|null = null, maxY: number|null = null): Point[] {
        const result: Point[] = [];

        // top left
        if (this.x > 0 && this.y > 0) {
            result.push(new Point(this.x - 1, this.y - 1));
        }

        // top right
        if ((!maxX || this.x < maxX) && this.y > 0) {
            result.push(new Point(this.x + 1, this.y - 1));
        }

        // bottom left
        if (this.x > 0 && (!maxY || this.y < maxY)) {
            result.push(new Point(this.x - 1, this.y + 1));
        }

        // bottom right
        if ((!maxX || this.x < maxX) && (!maxY || this.y < maxY)) { 
            result.push(new Point(this.x + 1, this.y + 1));
        }

        return result;
    }

    public getAllNeighbors(maxX: number|null = null, maxY: number|null = null): Point[] {
        return [...this.getManhattanNeighbors(maxX, maxY), ...this.getDiagonalNeighbors(maxX, maxY)];
    }

  }
   