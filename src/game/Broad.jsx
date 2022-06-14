import { useSelector, useDispatch } from "react-redux";
import { addShapeToGrid, resetIsShapePlaced } from "../store/slice/broad";
import {
  displayShapeReducer,
  calculateScoreReducer,
} from "../store/slice/player";
import { useEffect } from "react";
const Broad = () => {
  const dispatch = useDispatch();
  const {
    broad: broadGame,
    isShapePlaced,
    currentPlayer,
  } = useSelector((state) => state.broad);
  const players = useSelector((state) => state.player.players);
  const { shapes, selectedShape, corner, point, playerId, score } =
    players[currentPlayer - 1];

  const playerAttributes = { corner, point, id: playerId };
  const currentSlecetedShape = shapes.find((el) => el.id === selectedShape);
  const shape = currentSlecetedShape?.matris || [];
  const shapeLength = currentSlecetedShape?.shapeLength || 0;

  const addShape = (e) => {
    const clickPostion = e.target.className.split(" ")[0] * 1;
    if (shapeLength > 0 && shape.length > 0) {
      dispatch(
        addShapeToGrid({ clickPostion, shape, shapeLength, playerAttributes })
      );
    }
  };
  const prevPlayer = players[playerId - 2] || players[3];

  useEffect(() => {
    if (isShapePlaced) {
      dispatch(
        displayShapeReducer({
          selectedShape: prevPlayer.selectedShape,
          playerId: prevPlayer.playerId,
        })
      );
      dispatch(calculateScoreReducer({ playerId: prevPlayer.playerId }));
      setTimeout(() => {
        dispatch(resetIsShapePlaced());
      }, 1000);
    }
  }, [isShapePlaced, currentPlayer]);

  const addColorToBroad = (squire) => {
    if (squire === 1 || squire === 11) return "greenSquire";
    if (squire === 2 || squire === 12) return "redSquire";
    if (squire === 3 || squire === 13) return "yellowSquire";
    if (squire === 4 || squire === 14) return "blueSquire";
    if (squire === 0) return "empty";
  };
  const colorFirstSquireForPlayer = (index) => {
    if (index === 399) return "firstGreenSquire";
    if (index === 19) return "firstRedSquire";
    if (index === 0) return "firstYellowSquire";
    if (index === 380) return "firstBlueSquire";
  };
  return (
    <div className="broad" onClick={addShape}>
      {broadGame.map((squire, index) => {
        return (
          <div
            key={`squire-${index + 1}`}
            className={`${index} ${addColorToBroad(
              squire
            )} gridSquire ${colorFirstSquireForPlayer(index)}`}
          ></div>
        );
      })}
    </div>
  );
};

export default Broad;
