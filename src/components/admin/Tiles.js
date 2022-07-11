import { Button, Paper, Typography } from "@mui/material";
import React from "react";
import { useStyles } from "./style";

const Tiles = ({ data = {}, onClickTiles, onSubmit }) => {
  const classes = useStyles();

  return (
    <div className={classes.tileBoxes}>
      <Paper className={classes.tilePaper}>
        <Typography className={classes.tileName}>{data.name} </Typography>
        <Typography> Votes: {data.count}</Typography>
        <Typography
          className={classes.detailsText}
          onClick={() => onClickTiles(data)}
        >
          View Details
        </Typography>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{ textTransform: "none" }}
            onClick={() => onSubmit(data)}
            variant="outlined"
          >
            Make Winner
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Tiles;
