import { Grid, Typography } from "@mui/material";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Tiles from "./Tiles";
import { firebaseDB } from "../../services/firebase/FirebaseConfig";
import DialogComponent from "./DialogComponent";
import { useStyles } from "./style";
import moment from "moment";
import { useSelector } from "react-redux";
import { Images } from "../../utils/Images";

const Results = () => {
  const classes = useStyles();
  const { userData } = useSelector((state) => state);

  const [candidates, setCandidates] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState({});
  const [fridayDate, setFridayDate] = useState();

  useEffect(() => {
    loadResults();
  }, []);
  const loadResults = async () => {
    const t = new Date().getDate() + (6 - new Date().getDay() - 1) - 7;
    const lastFriday = new Date();
    lastFriday.setDate(t);

    let allCandidateNames = [];
    const candidatesDBref = collection(firebaseDB, "members");
    const userQuerySnapshotx = await getDocs(candidatesDBref);
    userQuerySnapshotx.forEach((doc) => {
      allCandidateNames.push(doc.data());
    });
    allCandidateNames = allCandidateNames.filter(
      (el, i) => el.team_id === userData?.team_id && el.admin == false
    );
    let results = [];
    const resultDBref = collection(firebaseDB, "results");
    const userQuerySnapshot = await getDocs(resultDBref);
    userQuerySnapshot.forEach((doc) => {
      results.push(doc.data());
    });

    //if today is Friday, result will contain filtered array containing elements of today's Date only
    // otherwise it will contain elements filtered as per last friday date

    if (moment(new Date()).format("dddd") === "Friday") {
      results = results.filter((el, i) => {
        return (
          moment(el.date).format("DD-MM-YYYY") ===
          moment(new Date()).format("DD-MM-YYYY")
        );
      });
      setFridayDate(moment(new Date()).format("DD-MM-YYYY"));
    } else {
      results = results.filter((el, i) => {
        return (
          moment(el.date).format("DD-MM-YYYY") ===
          moment(lastFriday).format("DD-MM-YYYY")
        );
      });
      setFridayDate(moment(lastFriday).format("DD-MM-YYYY"));
    }
    let temp = allCandidateNames.map((el, i) => {
      return { ...el, count: 0, comments: [] };
    });
    for (let i of allCandidateNames) {
      for (let j in results) {
        if (i?.name === results[j].votedFor) {
          const indexOfCandidate = temp.findIndex((el) => el.name === i.name);
          temp[indexOfCandidate].count++;
          temp[indexOfCandidate].comments = [
            ...temp[indexOfCandidate]?.comments,
            {
              commentator: results[j]?.userName,
              email: results[j]?.email,
              comment: results[j]?.reason,
            },
          ];
        }
      }
    }
    setCandidates(temp.slice().sort((a, b) => b.count - a.count));
  };
  const onClickTiles = (data) => {
    setDialogData(data);
    setOpenDialog(true);
  };
  const closeDialog = () => {
    setDialogData({});
    setOpenDialog(false);
  };
  const makeChampionHandler = async (data) => {
    try {
      let champions = [];

      const championsDBRef = collection(firebaseDB, "champions");
      const q = query(championsDBRef, where("team_id", "==", userData.team_id));
      const userQuerySnapshot = await getDocs(q);
      userQuerySnapshot.forEach((doc) => {
        champions.push(doc.data());
      });
      champions = champions.filter(
        (el, i) =>
          moment(el?.champion_date).format("DD-MM-YY") ===
          moment(new Date()).format("DD-MM-YY")
      );

      if (champions.length > 0) {
        await deleteDoc(doc(firebaseDB, "champions", champions[0]?.id));
      }

      const docs = await doc(championsDBRef);
      const docRef = await setDoc(docs, {
        ...data,
        id: docs.id,
        champion_date: moment(new Date()).format(),
      });
    } catch (error) {
      console.log(error);
    }
  };

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
        <>
          <Grid item xs={12}>
            <Typography className={classes.titleHeading}>
              Poll Results
            </Typography>
            <Typography
              align="center"
              marginTop={"-15px"}
              marginBottom={"25px"}
            >
              {moment(new Date()).format("dddd") === "Friday"
                ? "(Today)"
                : "(Last Friday)"}
              {fridayDate}
            </Typography>
          </Grid>
          {candidates.map((el, i) => (
            <Grid
              item
              key={i}
              xs={6}
              sm={4}
              md={3}
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <Tiles
                champion={1}
                onSubmit={makeChampionHandler}
                key={i}
                data={el}
                onClickTiles={onClickTiles}
              />
            </Grid>
          ))}
          <DialogComponent
            open={openDialog}
            data={dialogData}
            close={closeDialog}
          />
        </>
      )}
    </Grid>
  );
};

export default Results;
