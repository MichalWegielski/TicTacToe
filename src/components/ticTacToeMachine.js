import { createMachine, assign } from 'xstate';

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
  for (let i = 0; i < winningLines.length; i++) {
    const [pos1, pos2, pos3] = winningLines[i].split(",").map(Number);

    if (board[pos1] === "x" && board[pos2] === "x" && board[pos3] === "x") {
      return "x";
    }

    if (board[pos1] === "o" && board[pos2] === "o" && board[pos3] === "o") {
      return "o";
    }
  }

  return null;
};

const initialContext = {
  player: "x",
  board: Array(9).fill(null),
  moves: 0,
  winner: null
};

export const ticTacToeMachine = createMachine(
  {
    id: "tic-tac-toe",
    initial: "playing",
    context: initialContext,
    states: {
      playing: {
        on: {
          MOVE: {
            actions: ["makeMove"],
            target: "checkOutcome"
          },
          RESET: {
            target: "playing",
            actions: "resetGame"
          }
        }
      },
      checkOutcome: {
        always: [
          {
            target: "gameEnded.win",
            guard: "checkWin",
            actions: assign({
              winner: ({ context }) => checkWin(context.board, winningLines)
            })
          },
          {
            target: "gameEnded.draw",
            guard: "checkDraw"
          },
          {
            target: "playing"
          }
        ]
      },
      gameEnded: {
        initial: "win",
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
      makeMove: assign(({ context, event }) => {
        const { player, board, moves } = context;
        const move = event.move;
        const newBoard = [...board];

        newBoard[move] = player;
        const nextPlayer = player === "x" ? "o" : "x";

        return {
          board: newBoard,
          player: nextPlayer,
          moves: moves + 1
        };
      }),
      resetGame: assign(() => ({
        player: "x",
        board: Array(9).fill(null),
        moves: 0,
        winner: null
      }))
    },
    guards: {
      validMove: ({ context, event }) => {
        const move = event.move;
        return move >= 0 && move <= 8 && !context.board[move];
      },
      checkWin: ({ context }) => {
        return Boolean(checkWin(context.board, winningLines));
      },
      checkDraw: ({ context }) => {
        return context.moves >= 9 && !checkWin(context.board, winningLines);
      }
    }
  }
);
