import { Alert, Snackbar } from "@mui/material";
import React from "react";

const SnackBarComponent = (props) => {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={6000}
      onClose={props.handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      {props.type === "error" ? (
        <Alert
          onClose={props.handleClose}
          sx={{ width: "100%" }}
          severity="error"
        >
          {props.message}
        </Alert>
      ) : props.type === "success" ? (
        <Alert
          onClose={props.handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {props.message}
        </Alert>
      ) : null}
    </Snackbar>
  );
};

export default SnackBarComponent;
