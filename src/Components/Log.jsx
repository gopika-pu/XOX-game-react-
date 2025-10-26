
import "./Log.css";

export default function Log({turns}){
    return (
        <ol id="Log">
            {turns.map((turn) => (
                <li key={`${turn.square.row}${turn.square.col}`}>
                    {turn.player} selected {turn.square.row},{turn.square.col}
                </li>
            ))

            }
    </ol>
    )
}