import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firebaseDB } from "../../services/firebase/FirebaseConfig";

import {
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import { useStyles } from "./style.js";
import SnackBarComponent from "../../common/SnackBarComponent";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import { collection, getDocs, query, where } from "firebase/firestore";

const LoginComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const history = useHistory();

  const onEmailChangeHandler = (e) => {
    let value = e.target.value;
    setEmail(e.target.value);

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
  const onPassChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitHandler = async () => {
    let user;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      user = userCredential?.user;
      let loggedUser;

      const userDbRef = collection(firebaseDB, "members");
      const q = query(userDbRef, where("id", "==", user.uid));
      const userQuerySnapshot = await getDocs(q);

      userQuerySnapshot.forEach((doc) => {
        loggedUser = { ...doc.data() };
      });
      dispatch(actions.loginSucces(loggedUser));
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("userid", user.uid);
      history.push("/voting");
    } catch (error) {
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
    <Container className={classes.loginContainer} maxWidth="sm" fixed>
      <Paper className={classes.loginPaper} elevation={4}>
        <Grid container>
          <Grid item xs={12}>
            <p className={classes.loginHeading}>Login</p>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              className={classes.textFields}
              label="email"
              fullWidth
              size="small"
              error={error.email}
              value={email}
              onChange={onEmailChangeHandler}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={onPassChangeHandler}
              required
              label="password"
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
            <Typography
              style={{
                textAlign: "right",
                textDecoration: "underline",
                opacity: 0.8,
              }}
              onClick={() => history.push("/forgot-password")}
            >
              Forgot Password ?
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.loginButtonContainer}>
              {!email || !password || error.email || error.password ? (
                <Button
                  variant="contained"
                  disabled
                  fullWidth
                  className={classes.loginButtonDisabled}
                >
                  Login
                </Button>
              ) : (
                <Button
                  onClick={onSubmitHandler}
                  variant="contained"
                  fullWidth
                  className={classes.loginButton}
                >
                  Login
                </Button>
              )}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <p className={classes.signupText}>
              Create an admin account?&nbsp;
              <span onClick={() => history.push("/register")}>
                Sign up here
              </span>
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

export default LoginComponent;
