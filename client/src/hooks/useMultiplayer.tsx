import { useEffect, useState } from "react";
import { useTicTacToe } from ".";
import { useSocket } from "./useSocket";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import { Matrix } from "../types";
import { Navigate, useNavigate } from "react-router-dom";
import { Info } from "@mui/icons-material";
import { useBeforeunload } from "react-beforeunload";
interface Body {
  char: 1 | 2;
  row: number;
  index: number;
  game: Matrix;
}
interface Player {
  player: number;
}
export const useMultiplayer = () => {
  const {
    game,
    handleGetFigure,
    handleMovement,
    turn,
    winnerPositions,
    winner,
    handleScore,
    fireworks,
    handleRematch,
    handleResetGame,
    encodedWinner,
    setWinners,
    setFireworks,
  } = useTicTacToe();
  const { socket }: any = useSocket();
  const [loading, setLoading] = useState<boolean>(false);
  const [player, setPlayer] = useState(1);
  const [fullMatch, setFullMatch] = useState<boolean>(false);
  const [rematchDialog, setRematchDialog] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!socket) return;
    socket?.on("user-joined", ({ player }: Player) => {
      setPlayer(player === 1 ? 2 : 1);
      toast.success("Player 2 joined to the match");
      setFireworks("");
      setLoading(false);
    });
    return () => socket?.close();
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    setLoading(true);
    socket?.emit("joined", { player });
    return () => socket?.close();
  }, [socket]);
  useEffect(() => {
    if (!socket) return;
    socket?.on("created", () => {
      setLoading(false);
      toast.success("You have joined the game");
    });
    return () => socket?.close();
  }, [socket]);
  useEffect(() => {
    if (!socket) return;
    socket?.on("full", () => {
      setFullMatch(true);
    });
    return () => socket?.close();
  }, [socket]);
  useEffect(() => {
    if (!socket) return;
    socket?.on("receive-move", ({ char, row, index, game }: Body) => {
      toast("It's your turn", {
        icon: <Info sx={{ color: "primary.main" }} />,
      });
      handleMovement(char, row, index, game);
    });
    return () => socket?.close();
  }, [socket]);
  useEffect(() => {
    if (!socket) return;
    socket.on("user-left", ({ player }: { player: number }) => {
      toast.success("Player 2 left the game, you win!");
      setFireworks(player === 1 ? "X" : "O");
      setWinners([]);
    });

    return () => socket?.close();
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    socket.on("receive-rematch", () => {
      setRematchDialog(true);
    });
    return () => socket?.close();
  }, [socket]);
  useEffect(() => {
    if (!socket) return;
    socket.on("rematch-accepted", () => {
      toast.success("Player 2 accept to rematch");
      setFireworks("");
    });
    return () => socket?.close();
  }, [socket]);
  useEffect(() => {
    if (!socket) return;
    socket.on("rematch-rejected", () => {
      toast.error("Player 2 refuse to rematch");
      setFireworks("");
      handleResetGame();
      navigate("/");
    });
    return () => socket?.close();
  }, [socket]);

  const handleSendMovement = (
    char: 2 | 1,
    row: number,
    index: number,
    game: Matrix
  ) => {
    handleMovement(char, row, index, game);
    socket.emit("send-move", { char, row, index, game });
  };

  const handleSendRematch = (e: any) => {
    e.stopPropagation();
    socket.emit("send-rematch");
    toast.success("Rematch request sended");
  };
  const handleAcceptRematch = () => {
    setFireworks("");
    setRematchDialog(false);
    socket.emit("accept-rematch");
  };
  const handleRejectRematch = () => {
    setFireworks("");
    handleResetGame();
    socket.emit("reject-rematch");
    navigate("/");
  };
  const handleLeft = () => {
    socket.emit("left", { player });
    navigate("/")
  };
  useBeforeunload(() => {
    socket.emit("left", { player });
  });

  return {
    game,
    handleGetFigure,
    handleMovement,
    turn,
    winnerPositions,
    winner,
    handleScore,
    fireworks,
    handleRematch,
    loading,
    handleSendMovement,
    player,
    fullMatch,
    handleResetGame,
    encodedWinner,
    handleSendRematch,
    rematchDialog,
    handleAcceptRematch,
    handleRejectRematch,
    handleLeft
  };
};
