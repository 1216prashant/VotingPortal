import { Edit } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogTitle,
  Grid,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useStyles } from "./style";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { firebaseDB } from "../../services/firebase/FirebaseConfig";
import { useSelector } from "react-redux";

const Users = () => {
  const classes = useStyles();
  const { userData } = useSelector((store) => store);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchAllUsers();
  }, []);
  const fetchAllUsers = async () => {
    let temp = [];
    const resultDBref = collection(firebaseDB, "users");
    const userQuerySnapshot = await getDocs(resultDBref);
    userQuerySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });
    setUsers(temp);
  };
  const openModalHandler = (data) => {
    setModalData(data);
    setModalOpen(true);
  };
  const adminButtonHandler = async (uid) => {
    const washingtonRef = doc(firebaseDB, "users", uid);

    await updateDoc(washingtonRef, {
      admin: true,
    });
    setModalOpen(false);
    fetchAllUsers();
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography className={classes.titleHeading}>All Users</Typography>
      </Grid>

      {users
        .slice()
        .sort((a, b) => b.admin - a.admin)
        .map((el, i) => (
          <Grid
            item
            key={i}
            xs={6}
            sm={4}
            md={3}
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <div
              className={classes.tileBoxes}
              onClick={() =>
                userData.uid !== el.uid ? openModalHandler(el) : null
              }
            >
              <Paper className={classes.tilePaper}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography className={classes.tileName}>
                    {el?.name}
                  </Typography>
                  {el?.admin && (
                    <AdminPanelSettingsIcon style={{ color: "#cc6600" }} />
                  )}
                </div>
                <Typography className={classes.emailText}>
                  {el?.email}
                </Typography>
              </Paper>
            </div>
          </Grid>
        ))}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography>{modalData?.name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>{modalData?.email}</Typography>
            </Grid>
            {!modalData.admin ? (
              <Grid item xs={12} justifyContent={"center"} container>
                <Button
                  variant={"outlined"}
                  onClick={() => adminButtonHandler(modalData?.uid)}
                >
                  Make Admin
                </Button>
              </Grid>
            ) : (
              <Typography>(Admin)</Typography>
            )}
          </Grid>
        </DialogTitle>
      </Dialog>
    </Grid>
  );
};

export default Users;
