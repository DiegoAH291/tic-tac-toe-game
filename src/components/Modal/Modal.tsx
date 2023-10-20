interface ModalProps {
  state: boolean;
  element: JSX.Element;
  winner: string;
}

export const Modal = ({ state, element, winner }: ModalProps) => {
  return (
    <div
      className={`absolute h-screen w-full bg-modal ${
        state === true ? "flex" : "hidden"
      } flex-col justify-center items-center`}
    >
      <div className="p-5  z-10 max-sm:w-80 bg-neutral-100 w-modal h-80 rounded-md flex items-center justify-center flex-col gap-5">
        <h3 className="max-sm:text-sm flex items-center gap-1 capitalize text-neutral-900 text-xl font-semibold">
          🎉 congratulations you have won
          <span
            className={`text-white rounded-md w-10 h-10 flex items-center justify-center ${
              winner === "O" ? "bg-blue-500" : "bg-yellow-500"
            }`}
          >
            {winner}
          </span>
        </h3>

        {element}
      </div>
    </div>
  );
};
