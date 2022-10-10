import {
  Box,
  Grid,
  Typography,
  Button,
  Backdrop,
  CircularProgress,
  Fab,
} from "@mui/material";
import { blue, green, grey } from "@mui/material/colors";
import React, { useRef } from "react";
import "./styles.css";
import { Fireworks, FireworksHandlers } from "@fireworks-js/react";
import { useMultiplayer } from "../hooks/useMultiplayer";
import FullMatchDialog from "./FullMatchDialog";
import RematchDialog from "./RematchDialog";
import { useNavigate } from "react-router-dom";
import { ArrowBackIos } from "@mui/icons-material";
import ConfirmDialog from "./ConfirmDialog";

const Multiplayer = () => {
  const ref = useRef<FireworksHandlers>(null);
  const {
    game,
    handleGetFigure,
    handleSendMovement,
    turn,
    winnerPositions,
    winner,
    handleScore,
    fireworks,
    handleSendRematch,
    loading,
    player,
    fullMatch,
    encodedWinner,
    rematchDialog,
    handleRejectRematch,
    handleAcceptRematch,
    handleLeft,
  } = useMultiplayer();
  const navigate = useNavigate();
  return (
    <>
      <ConfirmDialog onAccept={handleLeft} />
      <RematchDialog
        open={rematchDialog}
        onAccept={handleAcceptRematch}
        onReject={handleRejectRematch}
      />
      <FullMatchDialog open={fullMatch} />
      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{ width: "100%", justifyContent: "center", display: "flex" }}
          >
            {" "}
            <CircularProgress color="primary" />{" "}
          </Box>
          <Typography sx={{ color: "#fff", mt: 1 }}>
            Waiting for player 2
          </Typography>
        </Box>
      </Backdrop>
      <Box sx={{ width: "306px", display: "flex", flexWrap: "wrap" }}>
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            top: 30,
            left: 0,
            right: 0,
            margin: "auto",
          }}
        >
          {fireworks && encodedWinner === player ? (
            <>
              <Typography
                variant="h3"
                textAlign={"center"}
                className="scale-up"
              >
                You win!
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  position: "absolute",
                  zIndex: 100,
                }}
              >
                <Button onClick={() => navigate("/")}>Home</Button>
              </Box>

              <Fireworks
                ref={ref}
                options={{ opacity: 0.5 }}
                style={{
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  position: "fixed",
                }}
              />
            </>
          ) : fireworks && encodedWinner !== player ? (
            <>
              <Typography
                variant="h3"
                textAlign={"center"}
                className="scale-up"
              >
                You lose
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  position: "absolute",
                  zIndex: 100,
                }}
              >
                <Button onClick={handleSendRematch}>Rematch</Button>
              </Box>
            </>
          ) : (
            ""
          )}
        </Box>

        {game.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {row.map((item, itemIndex) => (
              <Box
                key={itemIndex}
                onClick={() => {
                  if (!item && winner === -1 && turn === player) {
                    handleSendMovement(turn, rowIndex, itemIndex, game);
                  }
                }}
                sx={{
                  width: "100px",
                  height: "100px",
                  borderRight: itemIndex !== 2 ? "2px solid" : undefined,
                  borderBottom: rowIndex !== 2 ? "2px solid" : undefined,
                  borderColor: blue[800],
                  color: winnerPositions.some(
                    (item) => item === `${rowIndex},${itemIndex}`
                  )
                    ? green[800]
                    : blue[800],
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {handleGetFigure(
                  item,
                  winnerPositions.some(
                    (item) => item === `${rowIndex},${itemIndex}`
                  )
                )}
              </Box>
            ))}
          </React.Fragment>
        ))}
        <Grid container direction="row" sx={{ mt: 2 }}>
          <Grid xs={6}>
            <Box
              sx={{ bgcolor: blue[900], px: 1, borderRadius: "8px 0 0px 0" }}
            >
              <Typography
                fontWeight={700}
                sx={{ color: "#fff" }}
                textAlign="center"
              >
                Player (O)
              </Typography>
            </Box>
          </Grid>
          <Grid xs={6}>
            <Box
              sx={{ bgcolor: blue[200], px: 1, borderRadius: "0px 8px 0px 0" }}
            >
              <Typography fontWeight={700} textAlign="center">
                Player (X)
              </Typography>
            </Box>
          </Grid>
          <Grid xs={6}>
            <Box sx={{ bgcolor: blue[100], px: 1, py: 1 }}>
              <Typography fontWeight={700} textAlign="center">
                {handleScore(1)}
              </Typography>
            </Box>
          </Grid>
          <Grid xs={6}>
            <Box sx={{ bgcolor: blue[100], px: 1, py: 1 }}>
              <Typography fontWeight={700} textAlign="center">
                {handleScore(2)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ mt: 2 }}>
              <Box
                sx={{ bgcolor: grey[100], border: `1px solid ${grey[400]}` }}
              >
                {" "}
                <Typography
                  textAlign={"center"}
                  fontWeight={700}
                  sx={{ color: blue[900] }}
                >
                  You are player ({player === 1 ? "O" : "X"})
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Multiplayer;
