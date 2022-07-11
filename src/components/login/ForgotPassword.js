import { Box, Button, Container, Grid, Paper, TextField } from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SnackBarComponent from "../../common/SnackBarComponent";
import { auth } from "../../services/firebase/FirebaseConfig";
import { useStyles } from "./style";

const ForgotPassword = () => {
  const history = useHistory();
  const classes = useStyles();
  const [alertMessage, setAlertMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [email, setEmail] = useState("");
  const onEmailChangeHandler = (e) => {
    setEmail(e.target?.value);
  };
  const handleCloseAlert = () => {
    setOpen(false);
  };

  const onSubmitHandler = () => {
    sendPasswordResetEmail(auth, email)
      .then((data) => {
        setAlertType("success");
        setAlertMessage("password reset link sent to your email");
        setOpen(true);
        setTimeout(() => {
          history.push("/login");
        }, 3000);
      })
      .catch((err) => {
        setAlertType("error");
        setAlertMessage(err?.message);
        setOpen(true);
      });
  };
  return (
    <Container className={classes.loginContainer} maxWidth="sm" fixed>
      <Paper className={classes.loginPaper} elevation={4}>
        <Grid container>
          <Grid item xs={12}>
            <p className={classes.loginHeading}>Forgot Password</p>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              className={classes.textFields}
              label="email"
              fullWidth
              size="small"
              value={email}
              onChange={onEmailChangeHandler}
            ></TextField>
          </Grid>

          <Grid item xs={12}>
            <Box className={classes.loginButtonContainer}>
              {!email ? (
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
      <SnackBarComponent
        handleClose={handleCloseAlert}
        open={open}
        type={alertType}
        message={alertMessage}
      />
    </Container>
  );
};

export default ForgotPassword;
