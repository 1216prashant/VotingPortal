import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { firebaseDB } from "../../services/firebase/FirebaseConfig";
import ModalComponent from "./ModalComponent";
import { useStyles } from "./styles";

const VotingComponent = () => {
  const classes = useStyles();
  const { userData } = useSelector((state) => state);
  const [reason, setReason] = useState("");
  const [modalError, setModalError] = useState(true);
  const [modalMessage, setModalMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [candidateNames, setCandidateNames] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  useEffect(() => {
    loadCandidateNames();
  }, []);
  const onChangeReasonHandler = (e) => {
    setReason(e.target.value);
  };
  const selectCandidateHandler = (e) => {
    setSelectedCandidate(e.target.value);
  };
  const onSubmitHandler = async () => {
    if (moment(new Date()).format("dddd") === "Friday") {
      const resultDBref = collection(firebaseDB, "results");
      let results = [];

      const userQuerySnapshot = await getDocs(resultDBref);
      userQuerySnapshot.forEach((doc) => {
        results.push(doc.data());
      });
      results = results.map((el, i) => {
        return { ...el, date: moment(el.date).format() };
      });
      let findCurrentUserIndex = results.findIndex((el, i) => {
        return userData?.uid === el.userId;
      });
      // console.log(results, findCurrentUserIndex);
      if (findCurrentUserIndex === -1) {
        const response = {
          date: moment().format(),
          email: userData?.email,
          userName: userData?.name || "abc",
          votedFor: selectedCandidate,
          reason,
          userId: userData?.uid,
          team_id: userData?.team_id,
          team_lead: userData?.team_lead,
        };
        // console.log(response);

        const resultDocs = await doc(resultDBref);
        const docRef = await setDoc(resultDocs, {
          ...response,
          id: resultDocs.id,
        });
        setOpenModal(true);
        setModalError(false);
        setModalMessage("Voted Successfully");
      } else {
        setOpenModal(true);
        setModalError(true);
        setModalMessage("Voting is allowed only one time per user");
      }
    } else {
      setModalError(true);
      setModalMessage("Voting is allowed only on Fridays");
      setOpenModal(true);
    }
  };
  const loadCandidateNames = async () => {
    let temp = [];
    const candidatesDBref = collection(firebaseDB, "members");
    const userQuerySnapshot = await getDocs(candidatesDBref);
    userQuerySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });

    setCandidateNames(
      temp.filter(
        (el, i) => el?.team_id == userData?.team_id && el.admin === false
      )
    );
  };
  const closeModalHandler = () => {
    setOpenModal(false);
    setSelectedCandidate("");
    setReason("");
  };

  return (
    <Container className={classes.loginContainer} maxWidth="sm" fixed>
      <Paper className={classes.loginPaper} elevation={1}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <p className={classes.loginHeading}>Lets Vote</p>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Candidates</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedCandidate}
                label="Candidates"
                onChange={selectCandidateHandler}
              >
                {candidateNames.map((el, i) => (
                  <MenuItem key={i} value={el.name}>
                    {el.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              className={classes.textFields}
              label="Reason"
              fullWidth
              size="small"
              multiline
              minRows={4}
              onChange={onChangeReasonHandler}
              value={reason}
            ></TextField>
          </Grid>

          <Grid item xs={12}>
            <Box className={classes.loginButtonContainer}>
              {!selectedCandidate || !reason ? (
                <Button
                  variant="contained"
                  disabled
                  fullWidth
                  className={classes.loginButtonDisabled}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  onClick={onSubmitHandler}
                  variant="contained"
                  fullWidth
                  className={classes.loginButton}
                >
                  Submit
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <ModalComponent
        open={openModal}
        onClose={closeModalHandler}
        error={modalError}
        message={modalMessage}
      />
    </Container>
  );
};

export default VotingComponent;
