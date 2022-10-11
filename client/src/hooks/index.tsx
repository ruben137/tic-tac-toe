import { Count, Matrix, Winner } from "../types";
import { CircleOutlined, Close, Info } from "@mui/icons-material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSocket } from "./useSocket";
const initialGame = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
export const useTicTacToe = () => {
  const [turn, setTurn] = useState<1 | 2>(1);
  const [game, setGame] = useState<Matrix>(initialGame);
  const [winners, setWinners] = useState<number[]>([]);
  const [fireworks, setFireworks] = useState<string>("");
  const { socket }: any = useSocket();

  function checkHorizontal(matrix: Matrix, index = 0): Winner {
    let count: Count[] = [];
    if (index > 2) return { value: -1, count };
    const element = matrix[index];
    for (let i = 0; i < element.length; i++) {
      count = [...count, { value: element[i], positions: `${index},${i}` }];
    }

    if (count.every((item) => item.value === 1)) {
      return { value: 1, count };
    }
    if (count.every((item) => item.value === 2)) {
      return { value: 2, count };
    }

    return checkHorizontal(matrix, index + 1);
  }
  function checkVertical(matrix: Matrix, index = 0): Winner {
    let count: Count[] = [];
    if (index > 2) return { value: -1, count };
    const element = matrix[index];
    for (let i = 0; i < element.length; i++) {
      count = [
        ...count,
        { value: matrix[i][index], positions: `${i},${index}` },
      ];
    }

    if (count.every((item) => item.value === 1)) {
      return { value: 1, count };
    }
    if (count.every((item) => item.value === 2)) {
      return { value: 2, count };
    }

    return checkVertical(matrix, index + 1);
  }
  function checkDiagonal(matrix: Matrix, index = 0): Winner {
    let count: Count[] = [];
    if (index > 2) return { value: -1, count };

    if (index) {
      let j = 0;
      for (let i = 2; i > -1; i--) {
        count = [...count, { value: matrix[j][i], positions: `${j},${i}` }];
        j++;
      }
    } else {
      for (let i = 0; i < 3; i++) {
        count = [...count, { value: matrix[i][i], positions: `${i},${i}` }];
      }
    }

    if (count.every((item) => item.value === 1)) {
      return { value: 1, count };
    }
    if (count.every((item) => item.value === 2)) {
      return { value: 2, count };
    }

    return checkDiagonal(matrix, index + 1);
  }

  const ticTacToe = (matrix: Matrix) => {
    const horizontal = checkHorizontal(matrix);
    const vertical = checkVertical(matrix);
    const diagonal = checkDiagonal(matrix);
    const checkCat = matrix.every((item) => item.every((item) => item));
    if (horizontal.value !== -1) {
      return horizontal;
    }
    if (vertical.value !== -1) {
      return vertical;
    }
    if (diagonal.value !== -1) {
      return diagonal;
    }
    if (checkCat) {
      return { value: 0, count: [] };
    }
    return { value: -1, count: [] };
  };

  const handleGetFigure = (char: number, blink: boolean) => {
    if (!char) {
      return "";
    }
    if (char === 1) {
      return (
        <CircleOutlined
          sx={{ fontSize: "60px" }}
          className={blink ? "blink" : "scale-up"}
        />
      );
    }
    if (char === 2) {
      return (
        <Close
          sx={{ fontSize: "60px" }}
          className={blink ? "blink" : "scale-up"}
        />
      );
    }
  };

  const handleGetLetter = (char: number) => {
    if (char === 1) return "O";
    if (char === 2) return "X";

    return "";
  };
  const handleResetGame = () => {
    setGame([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
  };
  const handleMovement = (
    char: 1 | 2,
    row: number,
    index: number,
    game: Matrix
  ) => {
    setTurn((turn) => (turn === 1 ? 2 : 1));
    let newGame = game;
    newGame[row][index] = char;
    setGame(newGame);
  };
  const { value: winner, count } = ticTacToe(game);
  const winnerPositions = count.map((item) => item.positions);
  useEffect(() => {
    if (winner === 0) {
      toast("Draw!", { icon: <Info /> });
      return;
    }
    if (winner !== -1 && winner !== 0) {
      toast.success(`${handleGetLetter(winner)} wins`);
      return;
    }
  }, [turn]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (winner !== -1) {
        setWinners([...winners, winner]);
        handleResetGame();
      }
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [winner, turn]);
  const handleScore = (num: 1 | 2) => {
    if (num === 1) {
      return winners.filter((winner) => winner === 1).length;
    }
    if (num === 2) {
      return winners.filter((winner) => winner === 2).length;
    }
    return 0;
  };

  const handleMatchWinner = () => {
    const oWins = handleScore(1) > 1;
    const xWins = handleScore(2) > 1;
    if (oWins) {
      setFireworks("O");
      setWinners([]);
      return;
    }
    if (xWins) {
      setFireworks("X");
      setWinners([]);
      return;
    }
    setFireworks("");
  };
  const handleRematch = () => {
    setFireworks("");
  };
  useEffect(() => {
    if (winners.length) {
      handleMatchWinner();
    }
  }, [winners]);

  const encodeWinner = (char: string) => {
    if (char === "X") {
      return 2;
    }
    if (char === "O") {
      return 1;
    }
    return 0;
  };

  const encodedWinner = encodeWinner(fireworks);

  return {
    ticTacToe,
    handleGetFigure,
    game,
    handleMovement,
    turn,
    setTurn,
    winner,
    count,
    winnerPositions,
    handleScore,
    fireworks,
    handleRematch,
    socket,
    handleResetGame,
    encodedWinner,
    setFireworks,
    setWinners,
  };
};
