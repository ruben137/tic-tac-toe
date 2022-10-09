import { useParams } from "react-router-dom";
import Singleplayer from "./Singleplayer";
import Multiplayer from "./Multiplayer";

const TicTacToe = () => {
  const { id } = useParams();

  return !id ? <Singleplayer /> : <Multiplayer />;
};

export default TicTacToe;
