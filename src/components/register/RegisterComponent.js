import { Visibility, VisibilityOff } from "@mui/icons-material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
// import * as actions from "../login/actions";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { useHistory } from "react-router-dom";
import { useStyles } from "./style";
import {
  auth,
  firebaseDB,
  firebaseStorage,
} from "../../services/firebase/FirebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";
import SnackBarComponent from "../../common/SnackBarComponent";

const RegisterComponent = () => {
  //   const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    name: "",
    team_name: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({
    email: false,
    phone: false,
    password: false,
  });

  const onEmailChangeHandler = (e) => {
    let value = e.target.value;

    setSignUpData({ ...signUpData, email: value });
    if (value) {
      if (
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(
          value
        )
      ) {
        setError({ ...error, email: false });
      } else setError({ ...error, email: true });
    } else setError({ ...error, email: false });
  };
  const handlePasswordChange = (e) => {
    let value = e.target.value;

    setSignUpData({ ...signUpData, password: e.target.value });
    if (value) {
      value.length < 6
        ? setError({ ...error, password: true })
        : setError({ ...error, password: false });
    } else setError({ ...error, password: false });
  };

  const onSubmitHandler = async () => {
    let user;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signUpData.email,
        signUpData.password
      );
      user = userCredential?.user;

      const teamDataBaseRef = collection(firebaseDB, "teams");

      const docs = await doc(teamDataBaseRef);
      const docRef = await setDoc(docs, {
        team_id: docs.id,
        id: docs.id,
        team_name: signUpData.team_name,
        team_lead: signUpData.name,
        email: signUpData.email,
        admin: signUpData.name,
        user_id: user?.uid,
      });

      const memberDocRef = await setDoc(doc(firebaseDB, "members", user?.uid), {
        email: signUpData.email,

        phone: signUpData.phone || "",
        name: signUpData.name,
        admin: true,

        uid: user?.uid,
        id: user?.uid,
        experience: signUpData.experience || "",
        doj: signUpData.doj || "",
        emp_code: signUpData.emp_code || "",
        office_location: signUpData.office_location || "",
        team_id: docs.id,
        team_name: signUpData.team_name,
        team_lead: signUpData.name,
      });
      history.push("/login");
    } catch (error) {
      console.log(error.message);
      setAlertMessage(error.code || error.message);
      setOpen(true);
    }
  };
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleCloseAlert = () => {
    setOpen(false);
  };
  return (
    <Container className={classes.loginContainer} maxWidth={"sm"} fixed>
      <Paper className={classes.loginPaper} elevation={4}>
        <Grid container>
          <Grid item xs={12}>
            <p className={classes.loginHeading}>Make Your Team</p>
          </Grid>
          <Grid item container xs={12} spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                className={classes.textFields}
                label="User Name"
                fullWidth
                size="small"
                value={signUpData.name}
                onChange={(e) =>
                  setSignUpData({
                    ...signUpData,
                    name: e.target.value,
                  })
                }
              ></TextField>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              className={classes.textFields}
              label="email"
              fullWidth
              size="small"
              error={error.email}
              value={signUpData.email}
              onChange={onEmailChangeHandler}
              helperText={error.email ? "Please enter a valid email" : null}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              className={classes.textFields}
              label="Team Name"
              fullWidth
              size="small"
              value={signUpData.team_name}
              onChange={(e) =>
                setSignUpData({
                  ...signUpData,
                  team_name: e.target.value,
                })
              }
            ></TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={signUpData.password}
              onChange={handlePasswordChange}
              error={error.password}
              required
              label="password"
              helperText={
                error.password ? "Password should be of minimum 6 charac" : null
              }
              className={classes.textFields}
              size="small"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      // onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Box className={classes.loginButtonContainer}>
              {!signUpData.name ||
              !signUpData.password ||
              !signUpData.email ||
              !signUpData.team_name ||
              error.password ||
              error.confirm ||
              error.email ? (
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

          <Grid item xs={12}>
            <p className={classes.signupText}>
              Already have account?
              <span onClick={() => history.push("/login")}>Login here</span>
            </p>
          </Grid>
        </Grid>
      </Paper>
      <SnackBarComponent
        handleClose={handleCloseAlert}
        open={open}
        type="error"
        message={alertMessage}
      />
    </Container>
  );
};

export default RegisterComponent;
