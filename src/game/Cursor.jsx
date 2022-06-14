import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const { currentPlayer } = useSelector((state) => state.broad);
  const players = useSelector((state) => state.player.players);
  const { shapes, selectedShape } = players[currentPlayer - 1];
  const currentSlecetedShape = shapes.find((el) => el.id === selectedShape);
  const shape = currentSlecetedShape?.matris || [];
  const shapeLength = currentSlecetedShape?.shapeLength || 0;


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

  useEffect(() => {
    addEventListeners();
    return () => removeEventListeners();
  }, []);

  const addEventListeners = () => {
    document.addEventListener("mousemove", onMouseMove);
  };

  const removeEventListeners = () => {
    document.removeEventListener("mousemove", onMouseMove);
  };

  const onMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className={` cursor ${shapeType[shapeLength - 1]}`}
      style={{ left: `${position.x + 0.5}px`, top: `${position.y - 2}px` }}
    >
      {shape.map((el) => {
        return (
          <div
            key={nanoid(10)}
            className={`${
              el !== 0
                ? `${squireColor[currentPlayer - 1]} squire`
                : "emptySquire"
            }`}
          ></div>
        );
      })}
    </div>
  );
};
export default Cursor;
