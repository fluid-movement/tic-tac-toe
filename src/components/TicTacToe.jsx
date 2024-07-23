import {useEffect, useRef, useState} from "react";
import GameStats from "./GameStats.jsx";
import TurnMessage from "./TurnMessage.jsx";
import Board from "./Board.jsx";
import {clsx} from "clsx";
import {ArrowPathIcon, PlayIcon, StopIcon} from "@heroicons/react/16/solid/index.js";
import {calculateWinner} from "../lib/game-logic.js";

export default function TicTacToe({decideNextMove}) {
    const newBoardState = Array(9).fill(null);

    const [boardState, setBoardState] = useState(newBoardState);
    const [player, setPlayer] = useState('X');
    const [winner, setWinner] = useState(null);

    // auto play
    const [autoPlay, setAutoPlay] = useState(false);
    const [autoPlayInterval, setAutoPlayInterval] = useState(500);
    const autoPlayIntervalRef = useRef(null); // Use ref to keep track of the interval

    const [computerOpponent, setComputerOpponent] = useState(false);

    // game statistics
    const [startingPlayerWins, setStartingPlayerWins] = useState(0);
    const [startingPlayerLosses, setStartingPlayerLosses] = useState(0);
    const [draws, setDraws] = useState(0);
    const [turns, setTurns] = useState(0);
    const [averageTurns, setAverageTurns] = useState(0);



    useEffect(() => {
        const doAutoPlay = () => {
            if (winner || boardState.every(square => square !== null)) {
                newGame();
                return;
            }

            handleClick(decideNextMove(boardState, player));
        }

        if (autoPlay) {
            if (autoPlayIntervalRef.current) clearInterval(autoPlayIntervalRef.current);
            autoPlayIntervalRef.current = setInterval(doAutoPlay, autoPlayInterval);
        } else {
            clearInterval(autoPlayIntervalRef.current);
        }
        return () => clearInterval(autoPlayIntervalRef.current);
    }, [autoPlay, autoPlayInterval, boardState, decideNextMove, player, winner]);

    useEffect(() => {
        if (computerOpponent && player === 'O') {
            handleClick(decideNextMove(boardState, player));
        }
    }, [boardState, computerOpponent, decideNextMove, player]);

    const resetGame = () => {
        setBoardState(newBoardState);
        setPlayer('X');
        setWinner(null);
        setTurns(0);
    }

    const newGame = () => {
        resetGame();
    }


    const handleClick = (index) => {
        if (boardState[index] || winner) {
            return;
        }
        let newBoardState = [...boardState];
        newBoardState[index] = player;
        setBoardState(newBoardState);
        if (calculateWinner(newBoardState)) {
            // game ended with a winner
            if (player === 'X') {
                setStartingPlayerWins(startingPlayerWins + 1);
            } else {
                setStartingPlayerLosses(startingPlayerLosses + 1);
            }
            setWinner(player);
        } else if (newBoardState.every(square => square !== null)) {
            // game ended in a draw
            setDraws(draws + 1);
            setWinner('draw')
        } else {
            // toggle next player
            let nextPlayer = player === 'X' ? 'O' : 'X';
            setPlayer(nextPlayer);
        }
    }

    return (
        <div className="flex gap-8">
            <div className="flex flex-col gap-4">
                <TurnMessage player={player} winner={winner}/>
                <Board boardState={boardState} handleClick={handleClick}/>
                <button onClick={resetGame}
                        className="flex gap-4 items-center justify-center bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">
                    <span>Reset game</span><ArrowPathIcon className="h-4"/>
                </button>
                <button onClick={() => setAutoPlay(!autoPlay)}
                        className={
                            clsx("flex gap-4 items-center justify-center text-white font-bold py-2 px-4 rounded",
                                autoPlay ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600")
                        }>
                    <span>Auto play</span>
                    {autoPlay ? <StopIcon className="h-4"/> : <PlayIcon className="h-4"/>}
                </button>
                <button onClick={() => setComputerOpponent(!computerOpponent)}
                        className={
                            clsx("flex gap-4 items-center justify-center text-white font-bold py-2 px-4 rounded",
                                computerOpponent ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600")
                        }>
                    <span>Bot opponent</span>
                    {computerOpponent ? <StopIcon className="h-4"/> : <PlayIcon className="h-4"/>}
                </button>
                <div className="flex flex-col">
                    <label htmlFor="autoPlayInterval">Auto play interval:</label>
                    <input id="autoPlayInterval" type="range" min={1} max={500} value={autoPlayInterval}
                           onChange={(e) => setAutoPlayInterval(Number(e.target.value))}/>
                    <span>{autoPlayInterval} ms</span>
                </div>
            </div>
            <GameStats
                startingPlayerWins={startingPlayerWins}
                startingPlayerLosses={startingPlayerLosses}
                draws={draws}
            />
        </div>
    )
}

