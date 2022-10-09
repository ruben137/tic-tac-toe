import { Box } from "@mui/material";
import { blue } from "@mui/material/colors";
import TicTacToe from "../components/TicTacToe";

const Home = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        bgcolor: blue[50],
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TicTacToe />
    </Box>
  );
};

export default Home;
