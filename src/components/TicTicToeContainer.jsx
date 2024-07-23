import {bestNextMove, bestNextMoveStartMiddle, middleFirstDecision, randomDecision} from "../lib/algorithms.js";
import {useState} from "react";
import TicTacToe from "./TicTacToe.jsx";

export default function TicTacToeContainer() {
    const data = [
        {
            "name": "Totally random",
            "algorithm": randomDecision,
            "description": "The next move is decided randomly"
        },
        {
            "name": "Middle first",
            "algorithm": middleFirstDecision,
            "description": "First move is always in the middle, the following moves are random"
        },
        {
            "name": "Best next move",
            "algorithm": bestNextMove,
            "description": "If the current player can win, or block the opponent from winning, the move is made accordingly. Otherwise, the move is random."
        },
        {
            "name": "Best next move start middle",
            "algorithm": bestNextMoveStartMiddle,
            "description": "Start in the middle, otherwise play the next best move algorithm"
        }
    ]

    const [selected, setSelected] = useState(data[0]);

    return (
        <>
            <div className="flex gap-4 items-center">
                <label form="algorithmSwitcher">Algo for Autoplay:</label>
                <select id="algorithmSwitcher"
                        className="p-2 rounded-md"
                        onChange={() => setSelected(data[event.target.value])}>
                    {data.map((item, index) => (
                        <option key={index} value={index}>{item.name}</option>
                    ))}
                </select>
            </div>
            <p className="text-sm text-gray-500 mb-4">{selected.description}</p>
            <TicTacToe decideNextMove={selected.algorithm}/>
        </>

    )
}