import SoundTurn from "../../sounds/turn.mp3";
import WinSound from "../../sounds/win.mp3";
import JSConfetti from "js-confetti";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface TableProps {
  setElement: React.Dispatch<React.SetStateAction<JSX.Element>>;
  setWinner: React.Dispatch<React.SetStateAction<string>>;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Table = ({ setElement, setWinner, setState }: TableProps) => {
  const players = {
    O: "O",
    X: "X",
  };

  const winCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [table, setTable] = useState<any[]>([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const retry = () => {
    setTable([null, null, null, null, null, null, null, null, null]);
    setWin(false);
    setState(false);
  };

  const soundTurn = new Audio(SoundTurn);
  const winSound = new Audio(WinSound);

  const [turn, setTurn] = useState<string>(players.O);
  const [win, setWin] = useState<boolean>(false);

  const checkWinner = () => {
    for (const combination of winCombination) {
      const [a, b, c] = combination;
      if (table[a] && table[a] === table[b] && table[a] === table[c]) {
        return table[a];
      }
    }
    return null;
  };

  const confetti = new JSConfetti();

  useEffect(() => {
    const winner = checkWinner();

    if (winner) {
      setElement(
        <button
          className="px-20 bg-neutral-900 transition-all hover:bg-neutral-800 py-3 rounded-md text-white capitalize font-bold text-sm"
          onClick={retry}
        >
          retry
        </button>
      );

      setWinner(winner);
      setState(true);
      setWin(true);

      confetti.addConfetti();
      winSound.play();
    }

    () => {
      confetti.clearCanvas();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  const play = (data: string | null, i: number) => {
    if (data === null) {
      /*====verify turn====*/
      turn === players.O ? setTurn(players.X) : setTurn(players.O);

      /*====replace value====*/
      const newTable = [...table.slice(0, i), turn, ...table.slice(i + 1)];
      setTable(newTable);

      soundTurn.play();
    } else {
      null;
    }
  };

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
      <div className="max-sm:w-80 p-2 flex items-center gap-5 h-20 mb-5 w-96 bg-neutral-900 border border-neutral-800 rounded-md">
        <h3
          className={`transition-all rounded-md w-full h-full flex items-center justify-center text-2xl font-extrabold text-white  ${
            turn === players.O ? "bg-blue-500" : "bg-transparent"
          }`}
        >
          {players.O}
        </h3>
        <h3
          className={`transition-all rounded-md w-full h-full flex items-center justify-center text-2xl font-extrabold text-white  ${
            turn === players.X ? "bg-yellow-500" : "bg-transparent"
          }`}
        >
          {players.X}
        </h3>
      </div>

      <div className="max-sm:w-80 max-sm:h-80 max-sm:p-2 p-3 gap-2 w-96 h-96 bg-neutral-900 border border-neutral-800 rounded-md grid grid-cols-3">
        {table.map((data, index) => {
          return (
            <div
              onClick={() => (win === false ? play(data, index) : undefined)}
              className="transition-all hover:border-neutral-500 border-transparent border max-sm:w-24 max-sm:h-24 w-28 h-28 rounded-md flex items-center justify-center m-auto bg-neutral-800 cursor-pointer"
              key={index}
            >
              {data !== null ? (
                <motion.span
                  className={`text-4xl font-extrabold ${
                    data === players.O
                      ? "text-blue-500 drop-shadow-O"
                      : "text-yellow-500 drop-shadow-X"
                  }`}
                  variants={container}
                  initial="hidden"
                  animate="visible"
                >
                  {data}
                </motion.span>
              ) : undefined}
            </div>
          );
        })}
      </div>
    </>
  );
};
