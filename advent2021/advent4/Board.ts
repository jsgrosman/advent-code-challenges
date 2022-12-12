import { BingoSquare } from "./BingoSquare";

export class Board {

    boardSize: number;
    board: BingoSquare[][];

    constructor(squares: number[], size: number) {
        this.boardSize = size;
        this.board = new Array<Array<BingoSquare>>()

        for (let row = 0; row < size; row++) {
            this.board[row] = new Array<BingoSquare>();
            for (let col = 0; col < size; col++) {
                this.board[row][col] = {
                    value: squares.shift()!,
                    hasBeenCalled: false
                } 
            }
        }
    }

    markSquare(calledNumber: number) {

        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                if (this.board[row][col].value === calledNumber) {
                    this.board[row][col].hasBeenCalled = true;
                    return;
                }
            }
        }

    }

    isWinner() {

        for (let row = 0; row < this.boardSize; row++) {
            if (this.checkRow(row)) {
                return true;
            }
        }

        for (let col = 0; col < this.boardSize; col++) {
            if (this.checkColumn(col)) {
                return true;
            }
        }

    }

    checkRow(row: number) {
        for (let col = 0; col < this.boardSize; col++) {
            if (!this.board[row][col].hasBeenCalled) {
                return false;
            }
        }
        return true;
    }

    checkColumn(col: number) {
        for (let row = 0; row < this.boardSize; row++) {
            if (!this.board[row][col].hasBeenCalled) {
                return false;
            }
        }
        return true;
    }

    getScore(calledNumber: number) {
        let sum = 0;

        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                if (!this.board[row][col].hasBeenCalled) {
                    sum += this.board[row][col].value;
                }
            }
        }

        return sum * calledNumber;
    }

    print() {

        let output: string = '';
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                if (!this.board[row][col].hasBeenCalled) {
                    output += this.board[row][col].value.toString().padStart(5, ' ');
                }
                else {
                    output += ("(" + this.board[row][col].value.toString() + ")").padStart(5, ' ');
                }
                
            }
            output += "\n";
        }

        console.log(output);
    }

}