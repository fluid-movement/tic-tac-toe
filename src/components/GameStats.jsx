import {Cell, Pie, PieChart, ResponsiveContainer} from "recharts";
import colors from "tailwindcss/colors";

export default function GameStats({startingPlayerWins, startingPlayerLosses, draws}) {
    const gamesPlayed = startingPlayerWins + startingPlayerLosses + draws;
    const getPercent = (value) => {
        return (typeof gamesPlayed === 'number' && gamesPlayed > 0) ? value / gamesPlayed * 100 : 0;
    }
    const data = [
        {
            name: 'Starting player wins',
            value: startingPlayerWins,
            percent: getPercent(startingPlayerWins),
            color: colors.green[500],
            colorName: 'text-green-500'
        },
        {
            name: 'Starting player losses',
            value: startingPlayerLosses,
            percent: getPercent(startingPlayerLosses),
            color: colors.red[500],
            colorName: 'text-red-500'
        },
        {
            name: 'Draws',
            value: draws,
            percent: getPercent(draws),
            color: colors.orange[500],
            colorName: 'text-orange-500'
        }
    ];
    return (
        <>
            <div>
                <h2 className="text-xl font-bold uppercase">game stats</h2>
                {
                    data.map((entry, index) =>
                        <p key={index} className={entry.colorName}>{entry.name}: {Math.round(entry.percent)} %</p>
                    )
                }
            </div>
            <div className="grow">
                <ResponsiveContainer width="100%" height={400} className="p-8">
                    <PieChart>
                        <Pie data={data} dataKey='value' nameKey='name' label>
                            {
                                data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color}/>
                                ))
                            }
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}