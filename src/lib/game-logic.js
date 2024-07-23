export const calculateWinner = (newBoardState) => {
    const winningLines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];
    for (const [a, b, c] of winningLines) {
        if (newBoardState[a]
            && newBoardState[a] === newBoardState[b]
            && newBoardState[a] === newBoardState[c]) {
            return true;
        }
    }
    return false;
};