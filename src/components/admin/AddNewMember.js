import {
  Button,
  Dialog,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const AddNewMember = ({
  memberData = {},
  modalType = "",
  onChangeMemberDataHandler,
  onClose,
  open,
  ...props
}) => {
  const [selectedDate, handleDateChange] = useState(new Date());
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Grid container spacing={2}>
          {modalType !== "Remove" ? (
            <>
              <Grid item xs={12}>
                <Typography style={{ fontSize: "1.2rem" }}>
                  {modalType} Member
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  value={memberData.name}
                  onChange={(e) => onChangeMemberDataHandler("name", e)}
                  fullWidth
                  label="Name"
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={memberData.email}
                  onChange={(e) => onChangeMemberDataHandler("email", e)}
                  size="small"
                  fullWidth
                  label="Email"
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    placeholder="2018/10/10"
                    value={memberData.doj}
                    onChange={(date) => onChangeMemberDataHandler("doj", date)}
                    format="yyyy/MM/dd"
                    label="Date of Joining"
                    fullWidth
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  fullWidth
                  value={memberData.office_location}
                  onChange={(e) =>
                    onChangeMemberDataHandler("office_location", e)
                  }
                  label="Joining Location"
                ></TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  size="small"
                  fullWidth
                  label="Experience"
                  value={memberData?.experience}
                  onChange={(e) => onChangeMemberDataHandler("experience", e)}
                  type={"number"}
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  fullWidth
                  label="Employe Code"
                  value={memberData.emp_code}
                  onChange={(e) => onChangeMemberDataHandler("emp_code", e)}
                  type={"number"}
                ></TextField>
              </Grid>
            </>
          ) : (
            <Grid item xs={12}>
              <Typography align="center">
                Remove {memberData?.name} ?
              </Typography>
            </Grid>
          )}

          <Grid item xs={12} justifyContent={"center"} container>
            <Button
              disabled={
                !memberData?.name ||
                !memberData.email ||
                !memberData?.office_location ||
                !memberData?.experience
              }
              variant={"outlined"}
              onClick={() => props.onSubmit(memberData?.id)}
            >
              {modalType}
            </Button>
          </Grid>
        </Grid>
      </DialogTitle>
    </Dialog>
  );
};

export default AddNewMember;
