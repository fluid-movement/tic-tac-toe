import {calculateWinner} from "./game-logic.js";

export const randomDecision = (boardState, player) => {
    if (boardState === null) {
        return;
    }
    const emptySquares = boardState.map((square, index) =>
        square === null ? index : null).filter(square => square !== null);
    return emptySquares.sample();
}

export const middleFirstDecision = (boardState, player) => {
    if (boardState === null) {
        return;
    }
    const emptySquares = boardState.map((square, index) =>
        square === null ? index : null).filter(square => square !== null);
    if (emptySquares.includes(4)) return 4;
    return emptySquares.sample();
}

export const bestNextMove = (boardState, player) => {
    if (boardState === null) {
        return;
    }

    const opponent = player === 'X' ? 'O' : 'X';
    for (const [index, value] of boardState.entries()) {
        // if the square is not empty, skip it
        if (value !== null) {
            continue;
        }

        // if the player can win, make this move, otherwise, block the opponent from winning
        let simulatedBoardState = [...boardState];
        simulatedBoardState[index] = player;
        if (calculateWinner(simulatedBoardState)) {
            return index;
        }
        simulatedBoardState[index] = opponent;
        if (calculateWinner(simulatedBoardState)) {
            return index;
        }

    }

    // no move can win or lose, choose a random one
    return randomDecision(boardState, player)
}

export function bestNextMoveStartMiddle(boardState, player){
    const emptySquares = boardState.map((square, index) =>
        square === null ? index : null).filter(square => square !== null);
    if (emptySquares.includes(4)) return 4;

    return bestNextMove(boardState, player);
}
Array.prototype.sample = function () {
    return this[Math.floor(Math.random() * this.length)];
}