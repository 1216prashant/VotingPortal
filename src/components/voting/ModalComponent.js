import { Button, Dialog, DialogTitle, Grid, Typography } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React from "react";
import { useStyles } from "./styles";

const ModalComponent = (props) => {
  const classes = useStyles();
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>
        <Grid container>
          <Grid item xs={12} className={classes.justifyCenter}>
            {props.error ? (
              <WarningIcon style={{ color: "red" }} fontSize={"large"} />
            ) : (
              <CheckCircleIcon style={{ color: "green" }} fontSize={"large"} />
            )}
          </Grid>
          <Grid
            item
            xs={12}
            className={classes.justifyCenter}
            style={{ margin: "10px 0" }}
          >
            <Typography> {props.message}</Typography>
          </Grid>
          <Grid item xs={12} className={classes.justifyCenter}>
            <Button onClick={props.onClose} variant="contained">
              Ok
            </Button>
          </Grid>
        </Grid>
      </DialogTitle>
    </Dialog>
  );
};

export default ModalComponent;
