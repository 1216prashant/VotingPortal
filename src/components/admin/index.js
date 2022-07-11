import { Button, Grid, Typography } from "@mui/material";

import React, { useEffect, useMemo, useState } from "react";
import Tiles from "../../common/Tiles";

import { useStyles } from "./style";

import { Images } from "../../utils/Images";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const AdminComponent = () => {
  const classes = useStyles();
  const history = useHistory();
  const { userData } = useSelector((store) => store);

  const menu = useMemo(
    () => [
      { name: "Show Poll Results", route: "/admin-panel/poll-results" },
      { name: "Show Candidates", route: "admin-panel/my-teams" },
      { name: "Show Users", route: "admin-panel/users" },
    ],
    []
  );

  return (
    <Grid container>
      {!userData?.admin ? (
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                alt=""
                src={Images.denied}
                style={{ height: 80, width: 80 }}
              ></img>
            </div>

            <h3>You don't have access to this panel !</h3>
          </div>
        </Grid>
      ) : (
        menu.map((el, i) => (
          <Grid
            item
            xs={12}
            key={i}
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "20px 0",
            }}
          >
            <Button
              onClick={() => {
                history.push(el.route);
              }}
              variant={"contained"}
            >
              {el.name}
            </Button>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default AdminComponent;
