import { Avatar, Container, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { firebaseDB } from "../../services/firebase/FirebaseConfig";
import { Images } from "../../utils/Images";
import DialogComponent from "./DialogComponent";
import { useStyles } from "./style";
import Tiles from "./Tiles";

const Dashboard = () => {
  const classes = useStyles();

  const { userData } = useSelector((store) => store);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState({});
  const [championsList, setChampionsList] = useState([]);
  useEffect(() => {
    fetchChampionsData();
  }, []);

  const fetchChampionsData = async () => {
    let temp = [];
    const resultDBref = collection(firebaseDB, "champions");
    const q = query(resultDBref, where("team_id", "==", userData.team_id));
    const userQuerySnapshot = await getDocs(q);
    userQuerySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });
    setChampionsList(temp);
  };
  const closeDialog = () => {
    setDialogData({});
    setOpenDialog(false);
  };
  const onClickTiles = (data) => {
    setDialogData(data);
    setOpenDialog(true);
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <p className={classes.titleHeading}>Champions</p>
      </Grid>
      {championsList.length > 0 ? null : (
        <>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <img alt="" style={{ width: 100 }} src={Images.nodata}></img>
          </Grid>
          <Grid item xs={12}>
            <p
              style={{
                marginBottom: "30px",

                textAlign: "center",
              }}
            >
              No Data !
            </p>
          </Grid>
          <Grid item xs={12}></Grid>
        </>
      )}
      <Grid item xs={12} style={{ padding: "10px 10px" }}>
        <Grid container>
          {championsList.map((el, i) => (
            <Grid
              item
              key={i}
              xs={6}
              sm={4}
              md={3}
              style={{
                display: "flex",
                justifyContent: "space-evenly",

                marginBottom: 15,
              }}
            >
              <Tiles key={i} data={el} onClickTiles={onClickTiles} />
            </Grid>
          ))}
        </Grid>
      </Grid>

      <DialogComponent
        open={openDialog}
        data={dialogData}
        close={closeDialog}
      />
    </Grid>
  );
};

export default Dashboard;
