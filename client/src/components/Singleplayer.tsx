import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  Link as MuiLink,
  Tooltip,
} from "@mui/material";
import { blue, green, grey } from "@mui/material/colors";
import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import { useTicTacToe } from "../hooks";
import { Fireworks, FireworksHandlers } from "@fireworks-js/react";
import { Link } from "react-router-dom";
import ContentCopy from "@mui/icons-material/ContentCopy";
import toast from "react-hot-toast";

const Singleplayer = () => {
  const ref = useRef<FireworksHandlers>(null);
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
  } = useTicTacToe();

  const generateId = Math.random().toString(16).slice(2, 10);
  const [generatedId] = useState(generateId);
  const link = `${process.env.REACT_APP_CLIENT}/${generateId}`;
  const [shareLink] = useState(link);
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    toast.success("Link copied to clipboard");
  };
  useEffect(() => {
    return () => handleResetGame();
  }, []);
  return (
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
        {fireworks && (
          <>
            <Typography variant="h3" textAlign={"center"} className="scale-up">
              Player {fireworks} Wins the game!
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
              <Button onClick={handleRematch}>Rematch</Button>
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
        )}
      </Box>

      {game.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {row.map((item, itemIndex) => (
            <Box
              key={itemIndex}
              onClick={() => {
                if (!item && winner === -1) {
                  handleMovement(turn, rowIndex, itemIndex, game);
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
          <Box sx={{ bgcolor: blue[900], px: 1, borderRadius: "8px 0 0px 0" }}>
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
            <Typography textAlign={"center"}>
              Share this link with a friend to play
              <br />
              <Box
                sx={{ bgcolor: grey[100], border: `1px solid ${grey[400]}` }}
              >
                <MuiLink component={Link} to={`${generatedId}`}>
                  {shareLink}
                </MuiLink>
                <Tooltip title="Copy to clipboard">
                  <IconButton size="small" onClick={handleCopyLink}>
                    {" "}
                    <ContentCopy />
                  </IconButton>
                </Tooltip>
              </Box>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Singleplayer;
