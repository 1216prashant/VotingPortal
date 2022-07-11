import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useStyles } from "./style";
import moment from "moment";
import InfoIcon from "@mui/icons-material/Info";
import { Images } from "../../utils/Images";
import { Info } from "@mui/icons-material";

const Tiles = ({ data = {}, onClickTiles }) => {
  const classes = useStyles();
  const getInitials = (nameString) => {
    const fullName = nameString.split(" ");
    const firstLetter = fullName[0].charAt(0);
    const secondLetter = fullName?.[1]?.charAt(0) || "";
    return `${firstLetter.toUpperCase()}${secondLetter.toUpperCase()}`;
  };
  return (
    <div
      style={{
        width: "80%",
        // paddingTop: "80%",
        position: "relative",
        // minHeight: 100,
        // border: "1px solid",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <Paper
        elevation={0}
        style={{
          // position: "absolute",
          // top: 0,
          overflow: "hidden",
          borderRadius: 15,

          height: "100%",

          width: "100%",

          paddingTop: 10,
          boxSizing: "border-box",
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Avatar
              style={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid",
                width: 60,
                height: 60,
              }}
            >
              {getInitials(data.name)}
            </Avatar>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center", paddingTop: 5 }}
          >
            <img style={{ width: 40 }} alt="" src={Images.medal}></img>
          </Grid>

          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Typography style={{ fontWeight: "bold" }}>{data.name}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Typography>
              {moment(data?.champion_date).format("Do MMM, YY")}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Info
              onClick={() => onClickTiles(data)}
              style={{ color: "blue", cursor: "pointer" }}
            />
            {/* <Typography
              onClick={() => onClickTiles(data)}
              style={{ cursor: "pointer" }}
            >
              View Comments
            </Typography> */}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Tiles;
