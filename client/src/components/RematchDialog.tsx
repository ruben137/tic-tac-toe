import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import { blue } from "@mui/material/colors";
import { Typography } from "@mui/material";
interface Props {
  open: boolean;
  onAccept: () => void;
  onReject: () => void;
}
export default function RematchDialog({ open, onAccept, onReject }: Props) {
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/");
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            bgcolor: blue[50],
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ bgcolor: blue[200] }}>
          <Typography sx={{ color: blue[900] }} fontWeight={700}>
            {"Rematch request"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography sx={{ color: blue[900], mt: 2 }}>
              Player 2 wants to play again
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onReject}
            autoFocus
            variant="outlined"
            color="error"
            sx={{
              boxShadow: 0,
              textTransform: "none",
              "&:hover": {
                boxShadow: "none",
              },
            }}
            size="small"
          >
            <b>Reject</b>
          </Button>
          <Button
            onClick={onAccept}
            autoFocus
            variant="contained"
            sx={{
              boxShadow: 0,
              textTransform: "none",
              bgcolor: blue[900],
              color: "#fff",
              border: `1px solid ${blue[900]}`,
              "&:hover": {
                boxShadow: "none",
                color: blue[900],
                bgcolor: "transparent",
                border: `1px solid ${blue[900]}`,
              },
            }}
            size="small"
          >
            <b>Accept</b>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
