import "./App.css";

import { Provider } from "react-redux";
import { store } from "./store";
import Broad from "./game/Broad";
import ActivePlayer from "./game/ActivePlayer";
import Player from "./game/Player";
import Cursor from "./game/Cursor";
import Modal from "./components/modal/Modal";

function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <Modal />
        <div className="game">
          <div className="broadContainer">
            <h2 className="title">Blockus Game</h2>
            <Broad />
            <Player playerId={1} />
            <Player playerId={2} />
            <Player playerId={3} />
            <Player playerId={4} />
          </div>

          <ActivePlayer />
          <Cursor />
        </div>
      </Provider>
    </div>
  );
}

export default App;
