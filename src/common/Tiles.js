import { Paper, Typography } from "@mui/material";
import React from "react";
import { useStyles } from "./style";

const Tiles = ({ data = {}, onClickTiles }) => {
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
      </Paper>
    </div>
  );
};

export default Tiles;
