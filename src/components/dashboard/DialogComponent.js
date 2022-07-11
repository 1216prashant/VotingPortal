import { Dialog, DialogTitle, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useStyles } from "./style";
import moment from "moment";

const DialogComponent = ({ data = {}, close, ...props }) => {
  const classes = useStyles();
  const demo =
    " asdfasdfadfadfahhghgjhhguiuiuiiii999asdfsadfasdfasdfhksfsdfdsfasdfasdfadfadfahhghgjhhguiuiuiiii999asdfsadfasdfasdfhksfasdfasdf0-";

  return (
    <Dialog open={props.open} onClose={close}>
      <DialogTitle>
        <Grid container>
          <Grid xs={12} item>
            <Typography style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
              {data?.name}
            </Typography>
          </Grid>

          <Grid xs={12} item>
            <Typography>
              Voted On : {moment(data?.champion_date).format("DD-MM-YYYY")}
            </Typography>
          </Grid>
          <Grid xs={12} item style={{ marginBottom: 10 }}>
            <Typography>Comments: </Typography>
          </Grid>

          {data?.comments?.map((el, i) => (
            <Grid item xs={12} style={{ marginBottom: 10 }} key={i}>
              <Paper
                variant="outlined"
                style={{
                  width: "100%",
                  padding: "0 5px",
                  boxSizing: "border-box",

                  backgroundColor: "#e6e6e6",
                }}
              >
                <Grid item xs={12}>
                  <div>
                    <Typography
                      style={{
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        wordBreak: "break-word",
                        WebkitLineClamp: 3,
                      }}
                      variant="body1"
                    >
                      {el?.comment}
                    </Typography>
                  </div>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DialogTitle>
    </Dialog>
  );
};

export default DialogComponent;
