import { useSelector, useDispatch } from "react-redux";
import rocketImg from "../../assets/img/rocket.jpg";
import { resetBroadInitialSate } from "../../store/slice/broad";
import { openAndCloseModal } from "../../store/slice/modal";
import { resetGameInitialSate } from "../../store/slice/player";
const Modal = () => {
  const dispatch = useDispatch();
  const { players } = useSelector((state) => state.player);
  const { isOpen } = useSelector((state) => state.modal);

  const playersScores = [
    {
      color: "green",
      score: players[0].score,
      className: "greenPlayerScore",
      id: 1,
    },
    {
      color: "red",
      score: players[1].score,
      className: "redPlayerScore",
      id: 2,
    },
    {
      color: "yellow",
      score: players[2].score,
      className: "yellowPlayerScore",
      id: 3,
    },
    {
      color: "blue",
      score: players[3].score,
      className: "bluePlayerScore",
      id: 4,
    },
  ];
  const repeatGame = (event) => {
    event.preventDefault();
    dispatch(openAndCloseModal({ isOpen: false }));
    dispatch(resetBroadInitialSate());
    dispatch(resetGameInitialSate());
  };
  const cancel = (event) => {
    event.preventDefault();
    dispatch(openAndCloseModal({ isOpen: false }));
  };
  return (
    <div className={isOpen ? "showed" : "modal"}>
      <div className="modalContainer">
        <img src={rocketImg} alt="endGame " />
        {playersScores.map((el) => {
          return (
            <ul
              className={`${el.className} modalScore`}
              key={el.className + 12}
            >
              <li className="color"> {el.color}</li>
              <li className="score"> Score: -{el.score < 1 ? 91 : el.score}</li>
            </ul>
          );
        })}
        <div className="modalBtn">
          <button onClick={repeatGame} className="repeatBtn">
            Repeat{" "}
          </button>
          <button className="closeBtn" onClick={cancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
