import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { blue } from "@mui/material/colors";
import { Typography } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
interface Props {
  onAccept: () => void;
  onReject?: () => void;
}
export default function ConfirmDialog({ onAccept, onReject }: Props) {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        size="small"
        startIcon={<ArrowBackIos />}
        sx={{ position: "absolute", left: 10, top: 10, textTransform: "none" }}
        onClick={handleOpen}
      >
        Go to singleplayer
      </Button>
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
            {"Confirmation"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography sx={{ color: blue[900], mt: 2 }}>
              Are you sure you want to go to singleplayer mode? You will lose
              the game
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            variant="outlined"
            color="error"
            onClick={() => {
              handleClose();
              if (onReject) {
                onReject();
              }
            }}
            sx={{
              boxShadow: 0,
              textTransform: "none",
              "&:hover": {
                boxShadow: "none",
              },
            }}
            size="small"
          >
            <b>No</b>
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleClose();
              onAccept();
            }}
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
            <b>Yes</b>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
