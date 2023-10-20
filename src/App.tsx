import { useState } from "react";
import { Modal } from "./components/Modal/Modal";
import { Table } from "./components/Table/Table";

function App() {
  const [state, setState] = useState<boolean>(false);
  const [winner, setWinner] = useState<string>("");
  const [element, setElement] = useState<JSX.Element>(<button></button>);

  return (
    <>
      <main className="flex items-center justify-center flex-col h-screen w-full">
        <Modal state={state} element={element} winner={winner} />
        <Table
          setElement={setElement}
          setState={setState}
          setWinner={setWinner}
        />
      </main>
    </>
  );
}

export default App;
