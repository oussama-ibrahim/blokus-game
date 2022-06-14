import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { nextPlayer } from "../store/slice/broad";
import { quiteGameReducer } from "../store/slice/player";
import { openAndCloseModal } from "../store/slice/modal";
const ActivePlayer = () => {
  const { currentPlayer } = useSelector((state) => state.broad);
  const { players } = useSelector((state) => state.player);
  let activePlayers = [];
  const dispatch = useDispatch();
  for (let i = 0; i < players.length; i++) {
    if (players[i].isStillPlaying) {
      activePlayers.push(players[i].playerId);
    }
  }
  useEffect(() => {
    if (!activePlayers.includes(currentPlayer) && activePlayers.length > 0) {
      dispatch(nextPlayer());
    }
  }, [currentPlayer]);

  const next = (event) => {
    event.preventDefault();
    dispatch(nextPlayer());
    activePlayers = [];
  };
  const quiteGame = () => {
    dispatch(quiteGameReducer({ playerId: currentPlayer }));
    dispatch(nextPlayer());
  };

  const playersScores = [
    {
      color: "green",
      score: players[0].score,
      className: "greenPlayerScore",
      id: 1,
      isStillPlaying: players[0].isStillPlaying,
    },
    {
      color: "red",
      score: players[1].score,
      className: "redPlayerScore",
      id: 2,
      isStillPlaying: players[1].isStillPlaying,
    },
    {
      color: "yellow",
      score: players[2].score,
      className: "yellowPlayerScore",
      id: 3,
      isStillPlaying: players[2].isStillPlaying,
    },
    {
      color: "blue",
      score: players[3].score,
      className: "bluePlayerScore",
      id: 4,
      isStillPlaying: players[3].isStillPlaying,
    },
  ];

  // end game
  useEffect(() => {
    if (
      !players[0].isStillPlaying &&
      !players[1].isStillPlaying &&
      !players[2].isStillPlaying &&
      !players[3].isStillPlaying
    ) {
      dispatch(openAndCloseModal({ isOpen: true }));
    }
  });

  return (
    <div className="activePlayerContainer">
      <h2> Players Scores</h2>
      {playersScores.map((el) => {
        return (
          <ul
            className={`${el.className} scoreContainer`}
            key={el.className}
            style={
              !el.isStillPlaying
                ? { opacity: "0.2" }
                : null || currentPlayer === el.id
                ? { opacity: "1" }
                : null
            }
          >
            <li className="color"> {el.color}</li>
            <li className="score"> Score: -{el.score < 1 ? 91 : el.score}</li>
            {currentPlayer === el.id && (
              <li className="quiteBtn" onClick={quiteGame}>
                Quite
              </li>
            )}
          </ul>
        );
      })}

      <button onClick={next} className="nextBtn">
        next
      </button>
    </div>
  );
};

export default ActivePlayer;
