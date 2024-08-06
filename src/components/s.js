import "./styles.css";
import React from "react";
import ReactDOM from "react-dom";
import { createMachine, assign } from "xstate";
import { inspect } from "@xstate/inspect";
import { useMachine } from "@xstate/react";

// inspect({
//   iframe: () => document.querySelector("iframe[data-xstate]"),
//   url: "https://statecharts.io/inspect"
// });

function range(start, end) {
  return Array(end - start)
    .fill(null)
    .map((_, i) => i + start);
}

const winningLines = [
  "0,1,2",
  "3,4,5",
  "6,7,8",
  "0,4,8",
  "2,4,6",
  "0,3,6",
  "1,4,7",
  "2,5,8"
];

const checkWin = (board, winningLines) => {
  let result;
  for (let i = 0; i < winningLines.length; i++) {
    const [pos1, pos2, pos3] = winningLines[i].split(",");

    if (board[pos1] === "x" && board[pos2] === "x" && board[pos3] === "x") {
      result = "x";
    }

    if (board[pos1] === "o" && board[pos2] === "o" && board[pos3] === "o") {
      result = "o";
    }
  }

  return result;
};

const initialContext = {
  player: "x",
  board: Array(9).fill(null),
  moves: 0,
  winner: null
};

const ticTacToeMachine = createMachine(
  {
    id: "tic-tac-toe",
    initial: "playing",
    context: initialContext,
    states: {
      playing: {
        always: [
          {
            target: "gameEnded.win",
            cond: "checkWin",
            actions: assign({
              winner: (context) => checkWin(context.board, winningLines)
            })
          },
          { target: "gameEnded.draw", cond: "checkDraw" }
        ],
        on: {
          MOVE: [{ target: "", cond: "validMove", actions: ["makeMove"] }]
        }
      },
      gameEnded: {
        on: {
          RESET: {
            target: "playing",
            actions: "resetGame"
          }
        },
        states: {
          win: {},
          draw: {}
        }
      }
    }
  },
  {
    actions: {
      makeMove: assign((context, event) => {
        const currentPlayer = context.player;
        const move = event.move;
        const newBoard = [...context.board];

        newBoard[move] = currentPlayer;
        const nextPlayer = currentPlayer === "x" ? "o" : "x";

        return {
          board: newBoard,
          player: nextPlayer,
          moves: context.moves + 1
        };
      }),
      resetGame: assign(initialContext)
    },
    guards: {
      validMove: (context, event) => {
        const move = event.move;
        const newBoard = [...context.board];
        const isValidMove = Boolean(
          move >= 0 && move <= context.board.length - 1 && !newBoard[move]
        );

        return isValidMove;
      },
      checkWin: (context) => {
        return Boolean(checkWin(context.board, winningLines));
      },
      checkDraw: (context) => {
        return context.moves >= 9;
      }
    }
  }
);

function App() {
  const [current, send] = useMachine(ticTacToeMachine, { devTools: true });

  const { board, winner, moves, player } = current.context;

  return (
    <div className="App">
      <h1>XState React Tic-Tac-Toe</h1>

      {current.matches("gameEnded.win") && (
        <h3>
          <span role="img" aria-label="winner">
            🎉🎉🎉 Winner{" "}
            <span
              className="current-player"
              style={{ color: player === "x" ? "tomato" : "bisque" }}
            >
              {winner}
            </span>{" "}
            in {moves} moves! 🎉🎉🎉
          </span>
        </h3>
      )}

      {current.matches("gameEnded.draw") && (
        <h3>
          <span role="img" aria-label="winner">
            😱😱😱 There was a draw! 😱😱😱
          </span>
        </h3>
      )}

      {current.matches("playing") && (
        <h3>
          PLAYING:{" "}
          <span
            className="current-player"
            style={{ color: player === "x" ? "tomato" : "bisque" }}
          >
            {player}
          </span>
        </h3>
      )}

      <div className="play-area">
        {range(0, 9).map((index) => {
          return (
            <div
              className={`block ${
                board[index] ? "block--invalid" : "block--valid"
              }`}
              key={index}
              onClick={() => send({ type: "MOVE", move: index })}
              data-player={board[index]}
              style={{
                border: current.matches("gameEnded.win")
                  ? "2px solid green"
                  : ""
              }}
            >
              {board[index]}
            </div>
          );
        })}
      </div>

      {current.matches("gameEnded") && (
        <button type="button" onClick={() => send("RESET")} className="button">
          Play again!
        </button>
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);