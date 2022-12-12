export interface point {
        row: number,
        col: number
};

export class Basin {

    private basinSize = 0; 
    private visited: point[] = [];
    private toBeVisited: point[] = [];

    private heightmap: number[][];

    constructor(heightmap: number[][]) {
        this.heightmap = heightmap;
    }

    private equalsPoint( loc1: point, loc2: point ){
        return loc1.row === loc2.row && loc1.col === loc2.col;
    }

    private getCellValue(loc: point) {
        if (loc.row >= 0 && loc.col >= 0 && loc.row < this.heightmap.length && loc.col < this.heightmap[0].length) {
            return this.heightmap[loc.row][loc.col];
        } else {
            return 9;
        }
    }

    private shouldAdd(loc: point) {
        return (this.getCellValue(loc) !== 9 
            && !this.visited.some( (v) => this.equalsPoint(v, loc ))
            && !this.toBeVisited.some( (v) => this.equalsPoint(v, loc) ));
    }

    private getUpPoint(loc: point) {
        return {
            row: loc.row - 1,
            col: loc.col
        }
    }
    
    private getDownPoint(loc: point) {
        return {
            row: loc.row + 1,
            col: loc.col
        }
    }
    
    private getWestPoint(loc: point) {
        return {
            row: loc.row,
            col: loc.col - 1
        }
    }
    
    private getEastPoint(loc: point) {
        return {
            row: loc.row,
            col: loc.col + 1
        }
    }


    public generateBasin(loc: point) {

        this.basinSize++;
        this.visited.push(loc);
    
        if (this.shouldAdd(this.getUpPoint(loc))) {
            this.toBeVisited.push(this.getUpPoint(loc));
        }
    
        if (this.shouldAdd(this.getDownPoint(loc))) {
            this.toBeVisited.push(this.getDownPoint(loc));
        }
    
        if (this.shouldAdd(this.getWestPoint(loc))) {
            this.toBeVisited.push(this.getWestPoint(loc));
        }
    
        if (this.shouldAdd(this.getEastPoint(loc))) {
            this.toBeVisited.push(this.getEastPoint(loc));
        }
    
        if (this.toBeVisited.length > 0) {
            this.generateBasin(this.toBeVisited.shift()!);
        }
    }

    public getBasinSize() {
        return this.basinSize;
    }
}