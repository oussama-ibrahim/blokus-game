import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { selectShapeReducer, rotateShapeReducer } from "../store/slice/player";

const Player = ({ playerId }) => {
  const dispatch = useDispatch();
  const playerColor = [
    "greenPlayer",
    "redPlayer",
    "yellowPlayer",
    "bluePlayer",
  ];
  const squireColor = [
    "greenSquire",
    "redSquire",
    "yellowSquire",
    "blueSquire",
  ];
  const shapeType = [
    "oneSquire",
    "twoSquire",
    "treeSquie",
    "fourSquire",
    "fiveSquire",
  ];
  const players = useSelector((state) => state.player.players);
  const playerShapes = players[playerId - 1].shapes;
  const { currentPlayer } = useSelector((state) => state.broad);
  const [rotateDeg, setRotateDeg] = useState(0);
  const [shapeId, setShapeId] = useState(0);

  const addId = (e) => {
    const selectedShape = e.target.parentElement.id.startsWith("shape")
      ? e.target.parentElement.id.split("---")[1]
      : 0;
    const numberOfRotate = e.target.parentElement.id.startsWith("shape")
      ? e.target.parentElement.id.split("---")[2] * 1
      : 0;
    setShapeId(selectedShape);
    let rotate = rotateDeg;

    // if the user Select an over shape set rotate to init value
    if (shapeId !== selectedShape) {
      rotate = 0;
      setRotateDeg(0);
    }
    if (currentPlayer !== playerId || rotate > numberOfRotate - 2) {
      setRotateDeg(0);
    }
    if (currentPlayer === playerId && rotate < numberOfRotate - 1) {
      setRotateDeg((state) => state + 1);
    }
    if (currentPlayer === playerId) {
      dispatch(selectShapeReducer({ playerId, selectedShape }));
      dispatch(rotateShapeReducer({ rotate, selectedShape, playerId }));
    }
  };


  return (
    <>
      {players[playerId - 1].isStillPlaying && (
        <div
          className={playerColor[playerId - 1]}
          style={
            currentPlayer !== playerId
              ? { cursor: "not-allowed" }
              : {
                  backgroundColor: "rgba(255, 249, 249,0.3) ",
                  borderRadius: "18px",
                }
          }
          onClick={addId}
        >
          {playerShapes.map((el) => {
            return (
              <div
                key={el.id}
                style={
                  currentPlayer !== playerId ? { cursor: "not-allowed" } : null
                }
                className={`${shapeType[el.shapeLength - 1]} ${
                  el.isPlaced ? "displayShape" : ""
                } `}
                id={`shape---${el.id}---${el.rotation.length}`}
              >
                {el.matris.map((squire, index) => {
                  return (
                    <div
                      key={`array-${index}`}
                      className={`${
                        squire !== 0
                          ? `${squireColor[playerId - 1]} squire`
                          : "emptySquire"
                      }`}
                    ></div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};;

export default Player;
