export default function TurnMessage({player, winner}) {
    let text = '';
    let color = '';
    if (winner) {
        if (winner !== 'draw') {
            text = `player ${winner} wins!`;
            color = 'text-green-500';
        } else {
            text = `it's a draw!`;
            color = 'text-orange-500';
        }
    } else {
        text = `player ${player}'s turn`;
        color = '';
    }
    return (
        <>
            <h2 className={`text-xl font-bold uppercase ${color}`}>
                {text}
            </h2>
        </>
    );
}