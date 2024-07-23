import {clsx} from "clsx";

export default function Board({boardState, handleClick}) {
    return (
        <div className="inline-grid grid-cols-3 auto-rows-auto">
            {
                boardState.map((square, index) =>
                    <div key={index}
                         onClick={() => handleClick(index)}
                         className={
                             clsx("flex border justify-center items-center p-2 w-16 h-16 cursor-pointer",
                                 square === null ? "hover:bg-blue-200" : ""
                             )
                         }
                    >
                        {square}
                    </div>)
            }
        </div>
    );
}